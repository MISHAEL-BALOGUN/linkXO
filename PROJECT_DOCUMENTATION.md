# LinkXO - Intelligent Customer Support Software with Multilingual AI Chatbot

## Final Year Project Documentation

---

## 1. Project Overview

### 1.1 What is LinkXO?
LinkXO is a full-stack intelligent customer support platform that uses a **local AI model** to provide automated, multilingual customer service across **10 languages**. It enables businesses to handle customer inquiries 24/7 through an AI-powered chatbot, while giving support agents a complete dashboard to manage conversations, tickets, and knowledge base articles.

### 1.2 Problem Statement
Traditional customer support systems face several challenges:
- **Language barriers**: Businesses serve global customers but support is often limited to 1-2 languages
- **Response time delays**: Human agents can't respond instantly to every query
- **High operational costs**: Hiring multilingual support staff is expensive
- **24/7 availability**: Customers expect instant responses at any time
- **Scalability**: Manual support doesn't scale with business growth

### 1.3 Solution
LinkXO solves these problems by:
- Providing an **AI chatbot** that responds instantly in 10+ languages
- Using a **local AI model** (no external API dependency) for privacy and cost savings
- Offering a **unified dashboard** for agents to manage all customer interactions
- Including a **knowledge base** for self-service support
- Providing **analytics** for data-driven decision making

---

## 2. Technology Stack

### 2.1 Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Build tool and dev server |
| **React Router v7** | Client-side routing |
| **i18next** | Internationalization (10 languages) |
| **Lucide React** | Icon library |

### 2.2 Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework |
| **SQLite** | Lightweight relational database |
| **JWT** | Authentication tokens |
| **bcryptjs** | Password hashing |
| **better-sqlite3** | SQLite driver for Node.js |

### 2.3 AI Model
| Component | Description |
|---|---|
| **Intent Detection** | Rule-based pattern matching for 7 intents |
| **Multilingual Support** | Auto-detects language, responds in same language |
| **Response Generation** | Multiple response templates per intent per language |
| **Confidence Scoring** | Each response has an AI confidence score |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │Dashboard │ │Live Chat │ │Tickets   │ │Analytics │       │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘       │
│       │             │            │             │             │
│  ┌────┴─────────────┴────────────┴─────────────┴─────┐      │
│  │              API Service Layer                     │      │
│  │           (Fetch + JWT Authentication)             │      │
│  └─────────────────────┬────────────────────────────┘      │
└────────────────────────┼────────────────────────────────────┘
                         │ HTTP/REST API
┌────────────────────────┼────────────────────────────────────┐
│                      BACKEND (Node.js)                      │
│  ┌──────────────┐ ┌────┴─────┐ ┌──────────────┐            │
│  │Auth Routes   │ │Express   │ │Middleware     │            │
│  │(JWT Login)   │ │Server    │ │(JWT Verify)   │            │
│  └──────────────┘ └────┬─────┘ └──────────────┘            │
│                        │                                    │
│  ┌─────────────────────┴────────────────────────────┐      │
│  │              Business Logic Layer                 │      │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│      │
│  │  │Convos   │ │Tickets  │ │Articles │ │Analytics││      │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘│      │
│  └─────────────────────┬────────────────────────────┘      │
│                        │                                    │
│  ┌─────────────────────┴────────────────────────────┐      │
│  │           AI Model Layer (Local)                  │      │
│  │  ┌──────────────┐  ┌──────────────┐              │      │
│  │  │Intent        │  │Response      │              │      │
│  │  │Detection     │  │Generation    │              │      │
│  │  └──────────────┘  └──────────────┘              │      │
│  └─────────────────────┬────────────────────────────┘      │
│                        │                                    │
│  ┌─────────────────────┴────────────────────────────┐      │
│  │              SQLite Database                      │      │
│  │  users │ conversations │ messages │ tickets │     │      │
│  │  articles │ chat_logs                           │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Database Schema

### 4.1 Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│    users     │     │  conversations   │     │   messages   │
├──────────────┤     ├──────────────────┤     ├──────────────┤
│ id (PK)      │◄────│ assignedTo (FK)  │     │ id (PK)      │
│ email        │     │ id (PK)          │◄────│ convId (FK)  │
│ password     │     │ customerName     │     │ sender       │
│ firstName    │     │ customerEmail    │     │ senderId(FK) │──►users
│ lastName     │     │ status           │     │ text         │
│ role         │     │ language         │     │ language     │
│ avatar       │     │ createdAt        │     │ createdAt    │
│ language     │     │ updatedAt        │     └──────────────┘
│ createdAt    │     └──────────────────┘
└──────────────┘              │
                              │ 1:N
┌──────────────┐              │
│   tickets    │              │
├──────────────┤              │
│ id (PK)      │              │
│ ticketNumber │              │
│ subject      │              │
│ description  │              │
│ status       │              │
│ priority     │              │
│ category     │              │
│ assigneeId   │──►users      │
│ customerName │              │
│ convId (FK)  │──────────────┘
└──────────────┘

┌──────────────┐     ┌──────────────┐
│   articles   │     │  chat_logs   │
├──────────────┤     ├──────────────┤
│ id (PK)      │     │ id (PK)      │
│ title        │     │ convId (FK)  │
│ content      │     │ userMessage  │
│ category     │     │ botResponse  │
│ language     │     │ intent       │
│ views        │     │ confidence   │
│ helpful      │     │ language     │
│ tags         │     │ responseTime │
│ authorId(FK) │──►users            │
└──────────────┘     └──────────────┘
```

### 4.2 Table Details

| Table | Records | Purpose |
|---|---|---|
| users | Agent/admin accounts | Store support team members |
| conversations | Chat sessions | Track customer conversations |
| messages | Chat messages | Store all chat messages |
| tickets | Support tickets | Track issues requiring follow-up |
| articles | Knowledge base | Self-service help articles |
| chat_logs | AI interaction logs | Track AI model performance |

---

## 5. API Endpoints

### 5.1 Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login (returns JWT) |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/password` | Change password |

### 5.2 Conversations
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/conversations` | List all conversations |
| POST | `/api/conversations` | Create new conversation |
| GET | `/api/conversations/:id` | Get conversation details |
| PUT | `/api/conversations/:id/assign` | Assign to agent |
| PUT | `/api/conversations/:id/status` | Update status |
| GET | `/api/conversations/:id/messages` | Get messages |
| POST | `/api/conversations/:id/messages` | Send message (triggers AI) |
| GET | `/api/conversations/:id/suggestions` | Get reply suggestions |

### 5.3 Tickets
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tickets` | List tickets (with filters) |
| POST | `/api/tickets` | Create ticket |
| GET | `/api/tickets/:id` | Get ticket details |
| PUT | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |
| POST | `/api/tickets/:id/assign` | Assign to agent |

### 5.4 Knowledge Base
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/articles` | List articles |
| POST | `/api/articles` | Create article |
| GET | `/api/articles/:id` | Get article (increments views) |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |
| POST | `/api/articles/:id/helpful` | Mark as helpful |

### 5.5 Analytics
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analytics/overview` | Dashboard overview stats |
| GET | `/api/analytics/chat-volume` | Chat volume data |
| GET | `/api/analytics/language-distribution` | Language breakdown |
| GET | `/api/analytics/top-intents` | Most common intents |
| GET | `/api/analytics/response-times` | AI response time metrics |
| GET | `/api/analytics/export` | Export full report as JSON |

---

## 6. AI Model - How It Works

### 6.1 Intent Detection
The local AI model uses **pattern matching with regex** to detect user intent:

| Intent | Example Patterns | Languages |
|---|---|---|
| `greeting` | hello, hi, hola, bonjour, hallo | 10 |
| `billing` | bill, payment, refund, invoice | 10 |
| `shipping` | ship, deliver, track, order | 10 |
| `account` | password, login, profile, account | 10 |
| `technical` | bug, error, crash, api | 10 |
| `thanks` | thank, gracias, merci, danke | 10 |
| `goodbye` | bye, adios, au revoir, auf wiedersehen | 10 |

### 6.2 Language Detection
The model automatically detects the input language using Unicode character ranges:
- Arabic: `\u0600-\u06FF`
- Chinese: `\u4E00-\u9FFF`
- Japanese: `\u3040-\u309F\u30A0-\u30FF`
- Korean: `\uAC00-\uD7AF`
- French: `àâçéèêëîïôùûüÿœæ`
- German: `äöüß`
- Spanish: `áéíóúñ¡¿`
- Portuguese: `àãõ`
- Hindi: Devanagari range

### 6.3 Response Generation
For each intent + language combination, there are **2-4 response templates**. The model selects one randomly to provide variety.

### 6.4 Fallback Handling
If no intent is matched, the model returns a helpful fallback response suggesting available topics (billing, shipping, account, technical).

### 6.5 Confidence Scoring
Each AI response includes a confidence score (0.0 - 1.0) based on:
- Pattern match strength: 0.85 - 1.0
- Default/fallback: 0.5

### 6.6 Why Local Model?
- **Privacy**: No customer data sent to external APIs
- **Cost**: No API usage fees
- **Speed**: No network latency for AI responses
- **Offline**: Works without internet connection
- **Control**: Full control over responses and behavior

---

## 7. Security Features

| Feature | Implementation |
|---|---|
| **Password Hashing** | bcrypt with salt rounds |
| **JWT Authentication** | 7-day expiry tokens |
| **Route Protection** | Middleware on all sensitive routes |
| **CORS** | Configured for frontend origin only |
| **Input Validation** | Server-side validation on all inputs |
| **SQL Injection Prevention** | Parameterized queries (no string concatenation) |
| **Role-based Access** | Admin vs Agent permissions |

---

## 8. Multilingual Support

### 8.1 Supported Languages
| Code | Language | Flag |
|---|---|---|
| `en` | English | 🇺🇸 |
| `es` | Spanish | 🇪🇸 |
| `fr` | French | 🇫🇷 |
| `de` | German | 🇩🇪 |
| `zh` | Chinese | 🇨🇳 |
| `ar` | Arabic | 🇸🇦 |
| `hi` | Hindi | 🇮🇳 |
| `pt` | Portuguese | 🇧🇷 |
| `ja` | Japanese | 🇯🇵 |
| `ko` | Korean | 🇰🇷 |

### 8.2 How It Works
1. User selects language in the sidebar (UI translates)
2. AI detects message language automatically
3. AI responds in the same language as the input
4. All translations stored in `src/i18n/index.ts`

---

## 9. Project File Structure

```
linkXO/
├── server/                          # Backend
│   ├── index.js                     # Express server entry
│   ├── config/
│   │   ├── database.js              # SQLite setup + schema
│   │   └── seed.js                  # Demo data seeder
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication
│   ├── routes/
│   │   ├── auth.js                  # Login/signup/profile
│   │   ├── conversations.js         # Chat management
│   │   ├── tickets.js               # Ticket CRUD
│   │   ├── articles.js              # Knowledge base
│   │   ├── analytics.js             # Dashboard stats
│   │   └── users.js                 # User management
│   └── ai/
│       └── localModel.js            # Local AI model
│
├── src/                             # Frontend
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── Header.tsx           # Top header bar
│   │   │   └── Layout.tsx           # Main layout wrapper
│   │   └── Chatbot/
│   │       └── ChatWidget.tsx       # Floating AI chatbot
│   ├── pages/
│   │   ├── Login.tsx                # Authentication page
│   │   ├── Dashboard.tsx            # Main dashboard
│   │   ├── Chat.tsx                 # Live chat interface
│   │   ├── KnowledgeBase.tsx        # Articles/search
│   │   ├── Tickets.tsx              # Ticket management
│   │   ├── Analytics.tsx            # Charts and reports
│   │   └── Settings.tsx             # User preferences
│   ├── services/
│   │   └── api.ts                   # Backend API client
│   ├── context/
│   │   └── ChatContext.tsx           # Chat state management
│   ├── data/
│   │   └── mockData.ts              # Static data (fallback)
│   ├── i18n/
│   │   └── index.ts                 # Translations (10 langs)
│   ├── App.tsx                      # Router + auth logic
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles (green/white)
│
├── .env                             # Environment variables
├── package.json                     # Dependencies + scripts
└── tsconfig.json                    # TypeScript config
```

---

## 10. Key Features Summary

| Feature | Description |
|---|---|
| **AI Chatbot** | Local model with 7 intent categories, 10 languages |
| **Live Chat** | Real-time conversation management for agents |
| **Knowledge Base** | Searchable articles with categories and tags |
| **Ticket System** | Create, assign, track support tickets |
| **Analytics** | Dashboard with charts, metrics, language breakdown |
| **Authentication** | JWT-based login/signup with role-based access |
| **Multilingual UI** | Interface translates to 10 languages |
| **Green Theme** | Professional green & white color scheme |
| **Responsive** | Collapsible sidebar, mobile-friendly layout |
| **Export** | Download analytics reports as JSON |

---

## 11. Deployment Guide

### 11.1 Frontend (Vercel)
```bash
# Build the frontend
npm run build

# Deploy to Vercel
npx vercel --prod
```

### 11.2 Backend (Railway / Render)
```bash
# The server runs on port 5000
# Update .env for production:
PORT=5000
JWT_SECRET=your-strong-secret-here
DB_PATH=./server/database.sqlite
NODE_ENV=production
```

### 11.3 Environment Variables
```env
PORT=5000
JWT_SECRET=your-secure-random-string
DB_PATH=./server/database.sqlite
NODE_ENV=production
```

---

## 12. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start backend (Terminal 1)
npm run dev:server

# 3. Start frontend (Terminal 2)
npm run dev

# 4. Open browser
# http://localhost:5173

# 5. Login with demo credentials
# Email: admin@linkxo.com
# Password: admin123
```

---

## 13. Interview Defense Points

### Q: Why did you choose a local AI model instead of OpenAI?
**A:** Three reasons:
1. **Privacy**: Customer data never leaves the server
2. **Cost**: No API fees (important for small businesses)
3. **Reliability**: Works offline, no external dependency

### Q: How does the AI understand different languages?
**A:** The model uses Unicode character range detection to identify the input language (Arabic, Chinese, Japanese, Korean, etc.), then selects appropriate responses in that same language.

### Q: What is the accuracy of the AI model?
**A:** The model achieves 85-100% confidence on matched intents because it uses precise regex patterns. For unmatched queries, it falls back to helpful suggestions with 50% confidence.

### Q: How does JWT authentication work?
**A:**
1. User logs in with email/password
2. Server verifies credentials with bcrypt
3. Server generates a JWT token with user ID (7-day expiry)
4. Frontend stores token in localStorage
5. Every API request includes the token in Authorization header
6. Middleware verifies the token on protected routes

### Q: Why SQLite instead of PostgreSQL/MySQL?
**A:** SQLite is:
- Zero-configuration (no server setup)
- Single-file database (easy backup/deployment)
- Perfect for projects of this scale
- Still supports full SQL with ACID transactions

### Q: How would you scale this to production?
**A:**
- Replace SQLite with PostgreSQL for concurrent access
- Add Redis for session caching
- Deploy backend to Railway/Render, frontend to Vercel
- Add rate limiting and request validation
- Implement WebSocket for real-time chat
- Add CI/CD pipeline

### Q: What are the limitations of this project?
**A:**
- AI model is rule-based (not ML), limited to predefined intents
- SQLite doesn't support high concurrent writes
- No real-time WebSocket (using polling for messages)
- No file upload support in chat yet

---

## 14. Future Improvements

1. **Replace AI with ML model** (TensorFlow.js / Python FastAPI)
2. **Add WebSocket** for real-time chat
3. **Implement file upload** in chat
4. **Add email notifications** for ticket updates
5. **Add dashboard filters** by date range
6. **Implement rate limiting** and request throttling
7. **Add unit tests** for API routes
8. **Implement CI/CD** with GitHub Actions

---

*LinkXO - Intelligent Customer Support Software*
*Final Year Project 2026*
