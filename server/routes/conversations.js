import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { processMessage, getConversationSuggestions } from '../ai/localModel.js';

const router = Router();

// GET /api/conversations
router.get('/', authenticateToken, (req, res) => {
  try {
    const { status, language, search } = req.query;

    let query = `
      SELECT c.*, u.firstName as agentFirstName, u.lastName as agentLastName,
      (SELECT text FROM messages WHERE conversationId = c.id ORDER BY createdAt DESC LIMIT 1) as lastMessage,
      (SELECT COUNT(*) FROM messages WHERE conversationId = c.id AND sender = 'customer' AND createdAt > c.updatedAt) as unread
      FROM conversations c
      LEFT JOIN users u ON c.assignedTo = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'all') {
      query += ' AND c.status = ?';
      params.push(status);
    }
    if (language) {
      query += ' AND c.language = ?';
      params.push(language);
    }
    if (search) {
      query += ' AND (c.customerName LIKE ? OR c.customerEmail LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY c.updatedAt DESC';

    const conversations = db.prepare(query).all(...params);
    res.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/conversations
router.post('/', optionalAuth, (req, res) => {
  try {
    const { customerName, customerEmail, language } = req.body;

    const id = uuidv4();
    const avatar = customerName ? customerName.split(' ').map(n => n[0]).join('') : 'U';

    db.prepare(`
      INSERT INTO conversations (id, customerName, customerEmail, customerAvatar, language, status)
      VALUES (?, ?, ?, ?, ?, 'active')
    `).run(id, customerName || 'Guest', customerEmail || '', avatar, language || 'en');

    const conversation = db.prepare('SELECT * FROM conversations WHERE id = ?').get(id);
    res.status(201).json({ conversation });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/conversations/:id
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const conversation = db.prepare(`
      SELECT c.*, u.firstName as agentFirstName, u.lastName as agentLastName
      FROM conversations c
      LEFT JOIN users u ON c.assignedTo = u.id
      WHERE c.id = ?
    `).get(req.params.id);

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ conversation });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/conversations/:id/assign
router.put('/:id/assign', authenticateToken, (req, res) => {
  try {
    const { agentId } = req.body;

    db.prepare("UPDATE conversations SET assignedTo = ?, updatedAt = datetime('now') WHERE id = ?").run(agentId, req.params.id);

    res.json({ message: 'Conversation assigned successfully' });
  } catch (error) {
    console.error('Assign conversation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/conversations/:id/status
router.put('/:id/status', authenticateToken, (req, res) => {
  try {
    const { status } = req.body;

    db.prepare("UPDATE conversations SET status = ?, updatedAt = datetime('now') WHERE id = ?").run(status, req.params.id);

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/conversations/:id/messages
router.get('/:id/messages', authenticateToken, (req, res) => {
  try {
    const messages = db.prepare(`
      SELECT m.*, u.firstName as senderName
      FROM messages m
      LEFT JOIN users u ON m.senderId = u.id
      WHERE m.conversationId = ?
      ORDER BY m.createdAt ASC
    `).all(req.params.id);

    res.json({ messages });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/conversations/:id/messages
router.post('/:id/messages', optionalAuth, (req, res) => {
  try {
    const { text, sender } = req.body;
    const conversationId = req.params.id;

    const conversation = db.prepare('SELECT * FROM conversations WHERE id = ?').get(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Save user message
    const userMsgId = uuidv4();
    db.prepare(`
      INSERT INTO messages (id, conversationId, sender, senderId, text, language)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userMsgId, conversationId, sender || 'customer', req.user?.id || null, text, conversation.language);

    // Update conversation timestamp
    db.prepare("UPDATE conversations SET updatedAt = datetime('now') WHERE id = ?").run(conversationId);

    let botResponse = null;

    // Generate AI response if customer message
    if (sender === 'customer' || !sender) {
      const aiResult = processMessage(text, conversation.language);

      const botMsgId = uuidv4();
      db.prepare(`
        INSERT INTO messages (id, conversationId, sender, senderId, text, language)
        VALUES (?, ?, 'bot', NULL, ?, ?)
      `).run(botMsgId, conversationId, aiResult.response, aiResult.language);

      // Log chat for analytics
      db.prepare(`
        INSERT INTO chat_logs (id, conversationId, userMessage, botResponse, intent, confidence, language, responseTime)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run(uuidv4(), conversationId, text, aiResult.response, aiResult.intent, aiResult.confidence, aiResult.language, aiResult.responseTime);

      botResponse = {
        id: botMsgId,
        text: aiResult.response,
        sender: 'bot',
        intent: aiResult.intent,
        confidence: aiResult.confidence,
        language: aiResult.language,
        responseTime: aiResult.responseTime,
      };
    }

    const userMessage = {
      id: userMsgId,
      text,
      sender: sender || 'customer',
      language: conversation.language,
    };

    res.json({ userMessage, botResponse });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/conversations/:id/suggestions
router.get('/:id/suggestions', authenticateToken, (req, res) => {
  try {
    const suggestions = getConversationSuggestions(req.params.id);
    res.json(suggestions);
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
