import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/tickets
router.get('/', authenticateToken, (req, res) => {
  try {
    const { status, priority, search, category } = req.query;

    let query = `
      SELECT t.*, u.firstName as assigneeFirstName, u.lastName as assigneeLastName
      FROM tickets t
      LEFT JOIN users u ON t.assigneeId = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'all') {
      query += ' AND t.status = ?';
      params.push(status);
    }
    if (priority && priority !== 'all') {
      query += ' AND t.priority = ?';
      params.push(priority);
    }
    if (category && category !== 'all') {
      query += ' AND t.category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (t.subject LIKE ? OR t.customerName LIKE ? OR t.ticketNumber LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY t.updatedAt DESC';

    const tickets = db.prepare(query).all(...params);

    const stats = {
      open: db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status = 'open'").get().count,
      inProgress: db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status = 'inProgress'").get().count,
      resolved: db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status = 'resolved'").get().count,
      closed: db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status = 'closed'").get().count,
      total: db.prepare('SELECT COUNT(*) as count FROM tickets').get().count,
    };

    res.json({ tickets, stats });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tickets
router.post('/', authenticateToken, (req, res) => {
  try {
    const { subject, description, priority, category, assigneeId, customerName, customerEmail } = req.body;

    if (!subject || !description || !customerName) {
      return res.status(400).json({ error: 'Subject, description, and customer name are required' });
    }

    const id = uuidv4();
    const ticketCount = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;
    const ticketNumber = `TK-${String(ticketCount + 1).padStart(3, '0')}`;

    db.prepare(`
      INSERT INTO tickets (id, ticketNumber, subject, description, status, priority, category, assigneeId, customerName, customerEmail)
      VALUES (?, ?, ?, ?, 'open', ?, ?, ?, ?, ?)
    `).run(id, ticketNumber, subject, description, priority || 'medium', category || 'General', assigneeId || req.user.id, customerName, customerEmail || '');

    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);
    res.status(201).json({ ticket });
  } catch (error) {
    console.error('Create ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/tickets/:id
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const ticket = db.prepare(`
      SELECT t.*, u.firstName as assigneeFirstName, u.lastName as assigneeLastName
      FROM tickets t
      LEFT JOIN users u ON t.assigneeId = u.id
      WHERE t.id = ?
    `).get(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json({ ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/tickets/:id
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { status, priority, assigneeId, description } = req.body;

    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    db.prepare(`
      UPDATE tickets SET
        status = COALESCE(?, status),
        priority = COALESCE(?, priority),
        assigneeId = COALESCE(?, assigneeId),
        description = COALESCE(?, description),
        updatedAt = datetime('now')
      WHERE id = ?
    `).run(status, priority, assigneeId, description, req.params.id);

    const updatedTicket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    res.json({ ticket: updatedTicket });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/tickets/:id
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    db.prepare('DELETE FROM tickets WHERE id = ?').run(req.params.id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Delete ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tickets/:id/assign
router.post('/:id/assign', authenticateToken, (req, res) => {
  try {
    const { agentId } = req.body;

    db.prepare("UPDATE tickets SET assigneeId = ?, updatedAt = datetime('now') WHERE id = ?").run(agentId, req.params.id);

    const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
    res.json({ ticket });
  } catch (error) {
    console.error('Assign ticket error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
