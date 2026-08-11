import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'linkxo_secret_key_2026_final_year_project';

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  try {
    const { email, password, firstName, lastName, language } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const id = uuidv4();
    const avatar = firstName[0] + lastName[0];

    db.prepare(`
      INSERT INTO users (id, email, password, firstName, lastName, role, avatar, language)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, email, hashedPassword, firstName, lastName, 'agent', avatar, language || 'en');

    const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '7d' });
    const user = db.prepare('SELECT id, email, firstName, lastName, role, avatar, language FROM users WHERE id = ?').get(id);

    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/auth/me
router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// PUT /api/auth/profile
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const { firstName, lastName, language } = req.body;

    db.prepare(`
      UPDATE users SET firstName = COALESCE(?, firstName), lastName = COALESCE(?, lastName),
      language = COALESCE(?, language), updatedAt = datetime('now')
      WHERE id = ?
    `).run(firstName, lastName, language, req.user.id);

    const user = db.prepare('SELECT id, email, firstName, lastName, role, avatar, language FROM users WHERE id = ?').get(req.user.id);
    res.json({ user });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/auth/password
router.put('/password', authenticateToken, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = db.prepare('SELECT password FROM users WHERE id = ?').get(req.user.id);
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    db.prepare("UPDATE users SET password = ?, updatedAt = datetime('now') WHERE id = ?").run(hashedPassword, req.user.id);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
