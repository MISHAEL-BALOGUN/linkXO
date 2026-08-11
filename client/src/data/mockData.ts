export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  language?: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  timestamp: Date;
  status: 'active' | 'waiting' | 'resolved';
  language: string;
  unread: number;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'inProgress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  customer: string;
  created: string;
  updated: string;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  views: number;
  helpful: number;
  language: string;
  tags: string[];
}

export const conversations: Conversation[] = [
  {
    id: '1',
    customerName: 'Maria Garcia',
    customerAvatar: 'MG',
    lastMessage: 'Thank you for your help!',
    timestamp: new Date(Date.now() - 300000),
    status: 'active',
    language: 'es',
    unread: 2,
  },
  {
    id: '2',
    customerName: 'Jean Dupont',
    customerAvatar: 'JD',
    lastMessage: 'I need help with my order',
    timestamp: new Date(Date.now() - 900000),
    status: 'waiting',
    language: 'fr',
    unread: 0,
  },
  {
    id: '3',
    customerName: 'Ahmed Hassan',
    customerAvatar: 'AH',
    lastMessage: 'My payment failed',
    timestamp: new Date(Date.now() - 1800000),
    status: 'active',
    language: 'ar',
    unread: 1,
  },
  {
    id: '4',
    customerName: 'Chen Wei',
    customerAvatar: 'CW',
    lastMessage: 'How do I reset my password?',
    timestamp: new Date(Date.now() - 3600000),
    status: 'resolved',
    language: 'zh',
    unread: 0,
  },
  {
    id: '5',
    customerName: 'Sarah Johnson',
    customerAvatar: 'SJ',
    lastMessage: 'Where is my package?',
    timestamp: new Date(Date.now() - 7200000),
    status: 'active',
    language: 'en',
    unread: 3,
  },
];

export const tickets: Ticket[] = [
  {
    id: 'TK-001',
    subject: 'Payment Processing Error',
    description: 'Customer unable to complete payment due to gateway timeout error.',
    status: 'open',
    priority: 'high',
    assignee: 'John Smith',
    customer: 'Maria Garcia',
    created: '2026-08-10',
    updated: '2026-08-10',
    category: 'Billing',
  },
  {
    id: 'TK-002',
    subject: 'Account Login Issue',
    description: 'Customer locked out after multiple failed login attempts.',
    status: 'inProgress',
    priority: 'medium',
    assignee: 'Emily Davis',
    customer: 'Jean Dupont',
    created: '2026-08-09',
    updated: '2026-08-10',
    category: 'Account',
  },
  {
    id: 'TK-003',
    subject: 'Order Not Received',
    description: 'Package shows delivered but customer claims non-receipt.',
    status: 'open',
    priority: 'high',
    assignee: 'John Smith',
    customer: 'Ahmed Hassan',
    created: '2026-08-10',
    updated: '2026-08-10',
    category: 'Shipping',
  },
  {
    id: 'TK-004',
    subject: 'Refund Request',
    description: 'Customer requesting refund for defective product.',
    status: 'resolved',
    priority: 'medium',
    assignee: 'Emily Davis',
    customer: 'Chen Wei',
    created: '2026-08-08',
    updated: '2026-08-09',
    category: 'Billing',
  },
  {
    id: 'TK-005',
    subject: 'Feature Request',
    description: 'Customer suggesting new feature for mobile app.',
    status: 'closed',
    priority: 'low',
    assignee: 'Mike Wilson',
    customer: 'Sarah Johnson',
    created: '2026-08-07',
    updated: '2026-08-08',
    category: 'General',
  },
  {
    id: 'TK-006',
    subject: 'API Integration Help',
    description: 'Need assistance with API authentication setup.',
    status: 'inProgress',
    priority: 'medium',
    assignee: 'John Smith',
    customer: 'Carlos Mendez',
    created: '2026-08-09',
    updated: '2026-08-10',
    category: 'Technical',
  },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Getting Started with Your Account',
    content: 'Learn how to set up your account, complete your profile, and configure your settings for the best experience.',
    category: 'Account',
    views: 1250,
    helpful: 89,
    language: 'en',
    tags: ['account', 'setup', 'profile'],
  },
  {
    id: '2',
    title: 'Understanding Billing & Payments',
    content: 'A comprehensive guide to our billing system, payment methods, invoicing, and how to manage your subscriptions.',
    category: 'Billing',
    views: 980,
    helpful: 76,
    language: 'en',
    tags: ['billing', 'payment', 'invoice'],
  },
  {
    id: '3',
    title: 'Shipping & Delivery Information',
    content: 'Everything you need to know about shipping options, delivery times, tracking your orders, and handling delays.',
    category: 'Shipping',
    views: 1540,
    helpful: 92,
    language: 'en',
    tags: ['shipping', 'delivery', 'tracking'],
  },
  {
    id: '4',
    title: 'Troubleshooting Common Issues',
    content: 'Step-by-step solutions for the most common technical issues, login problems, and connectivity errors.',
    category: 'Technical',
    views: 2100,
    helpful: 95,
    language: 'en',
    tags: ['troubleshooting', 'errors', 'technical'],
  },
  {
    id: '5',
    title: 'API Documentation & Integration',
    content: 'Complete API reference with code examples, authentication guides, and best practices for integration.',
    category: 'Technical',
    views: 870,
    helpful: 88,
    language: 'en',
    tags: ['api', 'integration', 'documentation'],
  },
  {
    id: '6',
    title: 'Cómo Configurar Tu Cuenta',
    content: 'Aprende a configurar tu cuenta, completar tu perfil y ajustar tus preferencias para la mejor experiencia.',
    category: 'Account',
    views: 650,
    helpful: 82,
    language: 'es',
    tags: ['cuenta', 'configurar', 'perfil'],
  },
  {
    id: '7',
    title: 'Guide de Facturation & Paiements',
    content: 'Guide complet de notre système de facturation, méthodes de paiement et gestion des abonnements.',
    category: 'Billing',
    views: 420,
    helpful: 78,
    language: 'fr',
    tags: ['facturation', 'paiement', 'facture'],
  },
  {
    id: '8',
    title: 'Comment Configurer Votre Compte',
    content: 'Apprenez à configurer votre compte, compléter votre profil et ajuster vos préférences.',
    category: 'Account',
    views: 380,
    helpful: 75,
    language: 'fr',
    tags: ['compte', 'configurer', 'profil'],
  },
];

export const dashboardStats = {
  totalConversations: 1284,
  activeChats: 23,
  resolvedToday: 156,
  avgResponseTime: '2.4 min',
  customerSatisfaction: 94,
  chatVolume: [
    { hour: '6AM', count: 5 },
    { hour: '8AM', count: 15 },
    { hour: '10AM', count: 45 },
    { hour: '12PM', count: 60 },
    { hour: '2PM', count: 55 },
    { hour: '4PM', count: 40 },
    { hour: '6PM', count: 25 },
    { hour: '8PM', count: 15 },
    { hour: '10PM', count: 8 },
  ],
  languageDistribution: [
    { language: 'English', percentage: 40, count: 514 },
    { language: 'Spanish', percentage: 22, count: 283 },
    { language: 'French', percentage: 15, count: 193 },
    { language: 'Chinese', percentage: 10, count: 128 },
    { language: 'Arabic', percentage: 8, count: 103 },
    { language: 'Other', percentage: 5, count: 63 },
  ],
  recentActivity: [
    { id: 1, action: 'New conversation started', customer: 'Sarah Johnson', time: '2 min ago', type: 'chat' },
    { id: 2, action: 'Ticket TK-001 resolved', customer: 'Maria Garcia', time: '15 min ago', type: 'ticket' },
    { id: 3, action: 'Knowledge base article updated', customer: 'System', time: '1 hour ago', type: 'kb' },
    { id: 4, action: 'Customer satisfaction survey received', customer: 'Jean Dupont', time: '2 hours ago', type: 'survey' },
    { id: 5, action: 'New ticket created', customer: 'Ahmed Hassan', time: '3 hours ago', type: 'ticket' },
  ],
  topIssues: [
    { issue: 'Payment Failures', count: 234, percentage: 28 },
    { issue: 'Login Problems', count: 189, percentage: 23 },
    { issue: 'Order Status', count: 156, percentage: 19 },
    { issue: 'Refund Requests', count: 134, percentage: 16 },
    { issue: 'Technical Bugs', count: 118, percentage: 14 },
  ],
};

export const botResponses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm here to help you with any questions you might have.",
    "Welcome! How can I assist you today?",
    "Hi there! What can I help you with?",
  ],
  billing: [
    "For billing inquiries, I can help you with:\n• Understanding your invoice\n• Updating payment methods\n• Requesting a refund\n• Subscription changes\n\nWhat specific billing question do you have?",
    "I'd be happy to help with billing. Could you tell me more about your specific issue?",
  ],
  shipping: [
    "For shipping questions:\n• Track your order using your order ID\n• Standard shipping takes 5-7 business days\n• Express shipping takes 2-3 business days\n\nDo you have a specific order you need help with?",
  ],
  account: [
    "For account-related issues:\n• Password reset: Click 'Forgot Password' on login\n• Profile updates: Go to Settings > Profile\n• Account deletion: Contact our privacy team\n\nWhat account issue are you experiencing?",
  ],
  technical: [
    "For technical support:\n• Clear your browser cache and cookies\n• Try a different browser\n• Check your internet connection\n• Disable browser extensions\n\nIf the issue persists, I can connect you with a technical specialist.",
  ],
  default: [
    "I understand you need help. Could you provide more details about your issue so I can assist you better?",
    "Let me help you with that. Can you tell me more about what you're experiencing?",
    "I'm here to help! Please describe the issue you're facing and I'll do my best to resolve it.",
  ],
};

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];
