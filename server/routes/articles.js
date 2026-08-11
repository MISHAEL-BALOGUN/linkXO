import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../config/database.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/articles
router.get('/', optionalAuth, (req, res) => {
  try {
    const { category, language, search } = req.query;

    let query = `
      SELECT a.*, u.firstName as authorFirstName, u.lastName as authorLastName
      FROM articles a
      LEFT JOIN users u ON a.authorId = u.id
      WHERE 1=1
    `;
    const params = [];

    if (category && category !== 'All') {
      query += ' AND a.category = ?';
      params.push(category);
    }
    if (language) {
      query += ' AND a.language = ?';
      params.push(language);
    }
    if (search) {
      query += ' AND (a.title LIKE ? OR a.content LIKE ? OR a.tags LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY a.updatedAt DESC';

    const articles = db.prepare(query).all(...params);

    const categories = db.prepare('SELECT DISTINCT category FROM articles ORDER BY category').all();

    res.json({
      articles: articles.map(a => ({
        ...a,
        tags: a.tags ? a.tags.split(',') : [],
      })),
      categories: categories.map(c => c.category),
    });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/articles/:id
router.get('/:id', optionalAuth, (req, res) => {
  try {
    const article = db.prepare(`
      SELECT a.*, u.firstName as authorFirstName, u.lastName as authorLastName
      FROM articles a
      LEFT JOIN users u ON a.authorId = u.id
      WHERE a.id = ?
    `).get(req.params.id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Increment views
    db.prepare('UPDATE articles SET views = views + 1 WHERE id = ?').run(req.params.id);

    res.json({
      article: {
        ...article,
        tags: article.tags ? article.tags.split(',') : [],
      },
    });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/articles
router.post('/', authenticateToken, (req, res) => {
  try {
    const { title, content, category, language, tags } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ error: 'Title, content, and category are required' });
    }

    const id = uuidv4();
    const tagsString = Array.isArray(tags) ? tags.join(',') : tags || '';

    db.prepare(`
      INSERT INTO articles (id, title, content, category, language, tags, authorId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, title, content, category, language || 'en', tagsString, req.user.id);

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    res.status(201).json({
      article: {
        ...article,
        tags: article.tags ? article.tags.split(',') : [],
      },
    });
  } catch (error) {
    console.error('Create article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/articles/:id
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const { title, content, category, language, tags } = req.body;

    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    const tagsString = Array.isArray(tags) ? tags.join(',') : tags;

    db.prepare(`
      UPDATE articles SET
        title = COALESCE(?, title),
        content = COALESCE(?, content),
        category = COALESCE(?, category),
        language = COALESCE(?, language),
        tags = COALESCE(?, tags),
        updatedAt = datetime('now')
      WHERE id = ?
    `).run(title, content, category, language, tagsString, req.params.id);

    const updatedArticle = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    res.json({
      article: {
        ...updatedArticle,
        tags: updatedArticle.tags ? updatedArticle.tags.split(',') : [],
      },
    });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/articles/:id
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/articles/:id/helpful
router.post('/:id/helpful', optionalAuth, (req, res) => {
  try {
    db.prepare('UPDATE articles SET helpful = helpful + 1 WHERE id = ?').run(req.params.id);
    res.json({ message: 'Marked as helpful' });
  } catch (error) {
    console.error('Mark helpful error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
