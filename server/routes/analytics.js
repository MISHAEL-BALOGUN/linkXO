import { Router } from 'express';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// GET /api/analytics/overview
router.get('/overview', authenticateToken, (req, res) => {
  try {
    const totalConversations = db.prepare('SELECT COUNT(*) as count FROM conversations').get().count;
    const activeConversations = db.prepare("SELECT COUNT(*) as count FROM conversations WHERE status = 'active'").get().count;
    const totalTickets = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;
    const openTickets = db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status = 'open'").get().count;
    const resolvedTickets = db.prepare("SELECT COUNT(*) as count FROM tickets WHERE status = 'resolved'").get().count;
    const totalArticles = db.prepare('SELECT COUNT(*) as count FROM articles').get().count;
    const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'agent'").get().count;

    const avgResponseTime = db.prepare('SELECT AVG(responseTime) as avg FROM chat_logs').get().avg || 0;

    const satisfactionScore = db.prepare(`
      SELECT ROUND(AVG(helpful * 1.0 / NULLIF(views, 0) * 100), 1) as score
      FROM articles WHERE views > 0
    `).get().score || 0;

    res.json({
      totalConversations,
      activeConversations,
      totalTickets,
      openTickets,
      resolvedTickets,
      totalArticles,
      totalUsers,
      avgResponseTime: Math.round(avgResponseTime),
      satisfactionScore: Math.round(satisfactionScore),
    });
  } catch (error) {
    console.error('Get overview error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/chat-volume
router.get('/chat-volume', authenticateToken, (req, res) => {
  try {
    const { period } = req.query;

    let query;
    if (period === 'weekly') {
      query = `
        SELECT strftime('%w', createdAt) as day,
        COUNT(*) as count
        FROM chat_logs
        WHERE createdAt >= datetime('now', '-7 days')
        GROUP BY strftime('%w', createdAt)
        ORDER BY day
      `;
    } else {
      query = `
        SELECT strftime('%H', createdAt) as hour,
        COUNT(*) as count
        FROM chat_logs
        WHERE createdAt >= datetime('now', '-1 day')
        GROUP BY strftime('%H', createdAt)
        ORDER BY hour
      `;
    }

    const data = db.prepare(query).all();
    res.json({ data });
  } catch (error) {
    console.error('Get chat volume error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/language-distribution
router.get('/language-distribution', authenticateToken, (req, res) => {
  try {
    const data = db.prepare(`
      SELECT language,
      COUNT(*) as count,
      ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM chat_logs), 1) as percentage
      FROM chat_logs
      GROUP BY language
      ORDER BY count DESC
    `).all();

    res.json({ data });
  } catch (error) {
    console.error('Get language distribution error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/top-intents
router.get('/top-intents', authenticateToken, (req, res) => {
  try {
    const data = db.prepare(`
      SELECT intent,
      COUNT(*) as count,
      ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM chat_logs), 1) as percentage
      FROM chat_logs
      GROUP BY intent
      ORDER BY count DESC
      LIMIT 10
    `).all();

    res.json({ data });
  } catch (error) {
    console.error('Get top intents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/response-times
router.get('/response-times', authenticateToken, (req, res) => {
  try {
    const avgByIntent = db.prepare(`
      SELECT intent,
      AVG(responseTime) as avgTime,
      MIN(responseTime) as minTime,
      MAX(responseTime) as maxTime
      FROM chat_logs
      GROUP BY intent
      ORDER BY avgTime
    `).all();

    const avgByLanguage = db.prepare(`
      SELECT language,
      AVG(responseTime) as avgTime
      FROM chat_logs
      GROUP BY language
      ORDER BY avgTime
    `).all();

    const overall = db.prepare(`
      SELECT AVG(responseTime) as avgTime,
      MIN(responseTime) as minTime,
      MAX(responseTime) as maxTime,
      COUNT(*) as total
      FROM chat_logs
    `).get();

    res.json({ avgByIntent, avgByLanguage, overall });
  } catch (error) {
    console.error('Get response times error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/analytics/export
router.get('/export', authenticateToken, (req, res) => {
  try {
    const conversations = db.prepare('SELECT * FROM conversations').all();
    const tickets = db.prepare('SELECT * FROM tickets').all();
    const chatLogs = db.prepare('SELECT * FROM chat_logs').all();
    const articles = db.prepare('SELECT * FROM articles').all();

    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalConversations: conversations.length,
        totalTickets: tickets.length,
        totalChatLogs: chatLogs.length,
        totalArticles: articles.length,
      },
      conversations,
      tickets,
      chatLogs,
      articles,
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=aicustomersupport-report.json');
    res.json(report);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
