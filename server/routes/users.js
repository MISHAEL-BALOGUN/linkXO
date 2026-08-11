import { Router } from 'express';
import db from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/users
router.get('/', authenticateToken, (req, res) => {
  try {
    const users = db.prepare(`
      SELECT id, email, firstName, lastName, role, avatar, language, createdAt
      FROM users
      ORDER BY createdAt DESC
    `).all();

    res.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/agents
router.get('/agents', authenticateToken, (req, res) => {
  try {
    const agents = db.prepare(`
      SELECT id, firstName, lastName, avatar,
      (SELECT COUNT(*) FROM conversations WHERE assignedTo = users.id AND status = 'active') as activeConversations
      FROM users
      WHERE role IN ('agent', 'admin')
      ORDER BY firstName
    `).all();

    res.json({ agents });
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/:id
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const user = db.prepare(`
      SELECT id, email, firstName, lastName, role, avatar, language, createdAt
      FROM users WHERE id = ?
    `).get(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
