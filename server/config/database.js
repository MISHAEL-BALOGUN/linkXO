import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, '..', 'database.sqlite'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    role TEXT DEFAULT 'agent',
    avatar TEXT,
    language TEXT DEFAULT 'en',
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    customerName TEXT NOT NULL,
    customerEmail TEXT,
    customerAvatar TEXT,
    status TEXT DEFAULT 'active',
    language TEXT DEFAULT 'en',
    assignedTo TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (assignedTo) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversationId TEXT NOT NULL,
    sender TEXT NOT NULL,
    senderId TEXT,
    text TEXT NOT NULL,
    language TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (conversationId) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (senderId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS tickets (
    id TEXT PRIMARY KEY,
    ticketNumber TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    priority TEXT DEFAULT 'medium',
    category TEXT DEFAULT 'General',
    assigneeId TEXT,
    customerName TEXT NOT NULL,
    customerEmail TEXT,
    conversationId TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (assigneeId) REFERENCES users(id),
    FOREIGN KEY (conversationId) REFERENCES conversations(id)
  );

  CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    language TEXT DEFAULT 'en',
    views INTEGER DEFAULT 0,
    helpful INTEGER DEFAULT 0,
    tags TEXT,
    authorId TEXT,
    createdAt TEXT DEFAULT (datetime('now')),
    updatedAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (authorId) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS chat_logs (
    id TEXT PRIMARY KEY,
    conversationId TEXT,
    userMessage TEXT NOT NULL,
    botResponse TEXT NOT NULL,
    intent TEXT,
    confidence REAL,
    language TEXT DEFAULT 'en',
    responseTime INTEGER,
    createdAt TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (conversationId) REFERENCES conversations(id)
  );
`);

export default db;
