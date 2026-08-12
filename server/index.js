import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedDatabase } from './config/seed.js';
import authRoutes from './routes/auth.js';
import conversationRoutes from './routes/conversations.js';
import ticketRoutes from './routes/tickets.js';
import articleRoutes from './routes/articles.js';
import analyticsRoutes from './routes/analytics.js';
import userRoutes from './routes/users.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Seed database and start server
seedDatabase();

app.listen(PORT, () => {
  console.log(`\n🚀 LinkXO Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/api/health\n`);
  console.log('Available endpoints:');
  console.log('  POST /api/auth/signup      - Register new user');
  console.log('  POST /api/auth/login       - Login');
  console.log('  GET  /api/auth/me          - Get current user');
  console.log('  GET  /api/conversations    - List conversations');
  console.log('  POST /api/conversations    - Create conversation');
  console.log('  GET  /api/tickets          - List tickets');
  console.log('  POST /api/tickets          - Create ticket');
  console.log('  GET  /api/articles         - List articles');
  console.log('  GET  /api/analytics/*      - Analytics data');
  console.log('  GET  /api/users            - List users\n');
});
