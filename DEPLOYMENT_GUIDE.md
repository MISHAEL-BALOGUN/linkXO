# Deployment Guide - Vercel + Render

## Step 1: Deploy Backend to Render

### 1.1 Push latest code to GitHub
```bash
cd C:\Users\hp\Documents\My Development\linkXO
git add .
git commit -m "Ready for deployment"
git push
```

### 1.2 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

### 1.3 Create Web Service
1. Click **New** → **Web Service**
2. Connect your GitHub repo: `MISHAEL-BALOGUN/linkXO`
3. Settings:
   - **Name:** `linkxo-backend`
   - **Region:** Oregon (US West)
   - **Branch:** `main`
   - **Runtime:** Node
   - **Build Command:**
     ```
     cd server && npm install
     ```
   - **Start Command:**
     ```
     cd server && node index.js
     ```

### 1.4 Environment Variables on Render
Click **Environment** tab and add:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `JWT_SECRET` | `linkxo_prod_8f3k9d2j5m7x1p4q` |
| `DB_PATH` | `./server/database.sqlite` |

Click **Save** → **Manual Deploy** → **Deploy latest commit**

### 1.5 Get your Backend URL
After deploy, Render gives you a URL like:
```
https://linkxo-backend.onrender.com
```

Test it: Open `https://linkxo-backend.onrender.com/api/health`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Update API URL
Before deploying, update the frontend to point to your Render backend.

Edit `client/src/services/api.ts`:
```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### 2.2 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub

### 2.3 Import Project
1. Click **Add New** → **Project**
2. Import `MISHAEL-BALOGUN/linkXO`
3. Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 2.4 Environment Variables on Vercel
Click **Environment Variables** and add:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://linkxo-backend.onrender.com/api` |

Click **Save** → **Deploy**

### 2.5 Get your Frontend URL
Vercel gives you:
```
https://linkxo.vercel.app
```

---

## Step 3: Update CORS on Backend

Update `server/index.js` to allow your Vercel frontend:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://linkxo.vercel.app',
    'https://linkxo-*.vercel.app'
  ],
  credentials: true,
}));
```

Push the change:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render auto-deploys on push.

---

## Step 4: Test Everything

1. Open `https://linkxo.vercel.app`
2. Login with: `admin@linkxo.com` / `admin123`
3. Test chat, tickets, knowledge base

---

## Environment Variables Summary

### Backend (Render)
| Variable | Value | Purpose |
|---|---|---|
| `NODE_ENV` | `production` | Production mode |
| `PORT` | `5000` | Server port |
| `JWT_SECRET` | `linkxo_prod_8f3k9d2j5m7x1p4q` | JWT signing key |
| `DB_PATH` | `./server/database.sqlite` | Database location |

### Frontend (Vercel)
| Variable | Value | Purpose |
|---|---|---|
| `VITE_API_URL` | `https://linkxo-backend.onrender.com/api` | Backend API URL |

---

## Troubleshooting

| Issue | Solution |
|---|---|
| CORS error | Update CORS origins in server/index.js |
| 404 on API | Check VITE_API_URL includes `/api` |
| Database error | Render free tier has ephemeral disk - DB resets on redeploy |
| Slow first load | Render free tier spins down after inactivity |
| Build fails | Check Node version matches locally |

---

## Free Tier Limits

**Render Free:**
- Spins down after 15 min inactivity
- First request takes ~30s to wake up
- 750 hours/month

**Vercel Free:**
- 100GB bandwidth/month
- Automatic HTTPS
- Instant deploys

---

*Deployment ready!*
