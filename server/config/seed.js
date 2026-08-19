import db from './database.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export function seedDatabase() {
  const existingUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (existingUsers.count > 0) return;

  console.log('Seeding database...');

  // Create admin user
  const adminId = uuidv4();
  const adminPassword = bcrypt.hashSync('admin123', 10);
  db.prepare(`
    INSERT INTO users (id, email, password, firstName, lastName, role, avatar, language)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(adminId, 'admin@aicustomersupport.com', adminPassword, 'Admin', 'User', 'admin', 'AU', 'en');

  // Create agents
  const agents = [
    { email: 'john@aicustomersupport.com', firstName: 'John', lastName: 'Smith' },
    { email: 'emily@aicustomersupport.com', firstName: 'Emily', lastName: 'Davis' },
    { email: 'mike@aicustomersupport.com', firstName: 'Mike', lastName: 'Wilson' },
  ];

  const agentIds = [];
  for (const agent of agents) {
    const id = uuidv4();
    agentIds.push(id);
    const password = bcrypt.hashSync('agent123', 10);
    db.prepare(`
      INSERT INTO users (id, email, password, firstName, lastName, role, avatar, language)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, agent.email, password, agent.firstName, agent.lastName, 'agent', agent.firstName[0] + agent.lastName[0], 'en');
  }

  // Create conversations
  const conversations = [
    { name: 'Maria Garcia', email: 'maria@example.com', status: 'active', language: 'es' },
    { name: 'Jean Dupont', email: 'jean@example.com', status: 'waiting', language: 'fr' },
    { name: 'Ahmed Hassan', email: 'ahmed@example.com', status: 'active', language: 'ar' },
    { name: 'Chen Wei', email: 'chen@example.com', status: 'resolved', language: 'zh' },
    { name: 'Sarah Johnson', email: 'sarah@example.com', status: 'active', language: 'en' },
  ];

  const convIds = [];
  for (let i = 0; i < conversations.length; i++) {
    const id = uuidv4();
    convIds.push(id);
    const c = conversations[i];
    db.prepare(`
      INSERT INTO conversations (id, customerName, customerEmail, customerAvatar, status, language, assignedTo)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(id, c.name, c.email, c.name.split(' ').map(n => n[0]).join(''), c.status, c.language, agentIds[i % agentIds.length]);
  }

  // Create messages
  const messagesData = [
    { convIdx: 0, sender: 'customer', text: 'Hola, necesito ayuda con mi pedido reciente.' },
    { convIdx: 0, sender: 'agent', text: '¡Hola María! Con gusto te ayudo con tu pedido. ¿Podrías proporcionarme tu número de pedido?' },
    { convIdx: 0, sender: 'customer', text: 'Mi número de pedido es #ORD-7892.' },
    { convIdx: 0, sender: 'agent', text: '¡Gracias! Puedo ver tu pedido. Está siendo procesado y se enviará dentro de 24 horas.' },
    { convIdx: 1, sender: 'customer', text: "Bonjour, j'ai besoin d'aide avec mon compte." },
    { convIdx: 1, sender: 'agent', text: "Bonjour Jean ! Je serais ravi de vous aider avec votre compte. Quel est le problème?" },
    { convIdx: 2, sender: 'customer', text: 'My payment failed and I need help urgently.' },
    { convIdx: 2, sender: 'agent', text: "I'm sorry to hear that, Ahmed. Let me look into your payment issue right away." },
    { convIdx: 3, sender: 'customer', text: 'How do I reset my password?' },
    { convIdx: 3, sender: 'agent', text: "I'll guide you through the password reset process. Go to Settings > Security > Change Password." },
    { convIdx: 4, sender: 'customer', text: 'Where is my package? It was supposed to arrive yesterday.' },
    { convIdx: 4, sender: 'agent', text: "Let me check the status of your package. Could you provide your order number?" },
  ];

  for (const msg of messagesData) {
    db.prepare(`
      INSERT INTO messages (id, conversationId, sender, senderId, text, language, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now', '-' || ? || ' minutes'))
    `).run(uuidv4(), convIds[msg.convIdx], msg.sender, msg.sender === 'agent' ? agentIds[0] : null, msg.text, conversations[msg.convIdx].language, Math.floor(Math.random() * 60));
  }

  // Create tickets
  const ticketsData = [
    { subject: 'Payment Processing Error', description: 'Customer unable to complete payment due to gateway timeout error.', status: 'open', priority: 'high', category: 'Billing', customer: 'Maria Garcia' },
    { subject: 'Account Login Issue', description: 'Customer locked out after multiple failed login attempts.', status: 'inProgress', priority: 'medium', category: 'Account', customer: 'Jean Dupont' },
    { subject: 'Order Not Received', description: 'Package shows delivered but customer claims non-receipt.', status: 'open', priority: 'high', category: 'Shipping', customer: 'Ahmed Hassan' },
    { subject: 'Refund Request', description: 'Customer requesting refund for defective product.', status: 'resolved', priority: 'medium', category: 'Billing', customer: 'Chen Wei' },
    { subject: 'Feature Request', description: 'Customer suggesting new feature for mobile app.', status: 'closed', priority: 'low', category: 'General', customer: 'Sarah Johnson' },
    { subject: 'API Integration Help', description: 'Need assistance with API authentication setup.', status: 'inProgress', priority: 'medium', category: 'Technical', customer: 'Carlos Mendez' },
  ];

  for (let i = 0; i < ticketsData.length; i++) {
    const t = ticketsData[i];
    db.prepare(`
      INSERT INTO tickets (id, ticketNumber, subject, description, status, priority, category, assigneeId, customerName, conversationId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(uuidv4(), `TK-${String(i + 1).padStart(3, '0')}`, t.subject, t.description, t.status, t.priority, t.category, agentIds[i % agentIds.length], t.customer, convIds[i % convIds.length]);
  }

  // Create articles
  const articlesData = [
    { title: 'Getting Started with Your Account', content: 'Learn how to set up your account, complete your profile, and configure your settings for the best experience.', category: 'Account', language: 'en', views: 1250, helpful: 89, tags: 'account,setup,profile' },
    { title: 'Understanding Billing & Payments', content: 'A comprehensive guide to our billing system, payment methods, invoicing, and how to manage your subscriptions.', category: 'Billing', language: 'en', views: 980, helpful: 76, tags: 'billing,payment,invoice' },
    { title: 'Shipping & Delivery Information', content: 'Everything you need to know about shipping options, delivery times, tracking your orders, and handling delays.', category: 'Shipping', language: 'en', views: 1540, helpful: 92, tags: 'shipping,delivery,tracking' },
    { title: 'Troubleshooting Common Issues', content: 'Step-by-step solutions for the most common technical issues, login problems, and connectivity errors.', category: 'Technical', language: 'en', views: 2100, helpful: 95, tags: 'troubleshooting,errors,technical' },
    { title: 'API Documentation & Integration', content: 'Complete API reference with code examples, authentication guides, and best practices for integration.', category: 'Technical', language: 'en', views: 870, helpful: 88, tags: 'api,integration,documentation' },
    { title: 'Cómo Configurar Tu Cuenta', content: 'Aprende a configurar tu cuenta, completar tu perfil y ajustar tus preferencias para la mejor experiencia.', category: 'Account', language: 'es', views: 650, helpful: 82, tags: 'cuenta,configurar,perfil' },
    { title: 'Guide de Facturation & Paiements', content: 'Guide complet de notre système de facturation, méthodes de paiement et gestion des abonnements.', category: 'Billing', language: 'fr', views: 420, helpful: 78, tags: 'facturation,paiement,facture' },
    { title: 'Comment Configurer Votre Compte', content: 'Apprenez à configurer votre compte, compléter votre profil et ajuster vos préférences.', category: 'Account', language: 'fr', views: 380, helpful: 75, tags: 'compte,configurer,profil' },
  ];

  for (const a of articlesData) {
    db.prepare(`
      INSERT INTO articles (id, title, content, category, language, views, helpful, tags, authorId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(uuidv4(), a.title, a.content, a.category, a.language, a.views, a.helpful, a.tags, adminId);
  }

  console.log('Database seeded successfully!');
  console.log('Admin login: admin@aicustomersupport.com / admin123');
}
