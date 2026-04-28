# Portfolio Deployment Guide

## Architecture
- **Frontend**: React 19 + Vite + Tailwind CSS (port 3000 in dev)
- **Backend**: Express + MongoDB + Mongoose (port 5000 in dev)

---

## Prerequisites
- Node.js 20+
- MongoDB (local or MongoDB Atlas)

---

## Local Development Setup

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Install Backend Dependencies
```bash
cd server && npm install
```

### 3. Configure Environment Variables

**Frontend** (`app/.env`):
```env
VITE_API_URL=/api
```

**Backend** (`app/server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your_secure_admin_password
NODE_ENV=development
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 4. Seed the Database
```bash
cd server && npm run seed
```

### 5. Start Both Servers

In one terminal, start the backend:
```bash
cd server && npm run dev
```

In another terminal, start the frontend:
```bash
npm run dev
```

The frontend will proxy `/api/*` requests to the backend automatically.

---

## Production Deployment

### Frontend — Vercel
1. Push your code to GitHub
2. Import the `app/` folder into Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend-url.com/api`
4. Deploy

### Backend — Render or Railway
1. Push your code to GitHub
2. Create a new Web Service pointing to the `app/server/` folder
3. Set environment variables:
   - `MONGODB_URI` (your Atlas connection string)
   - `JWT_SECRET` (generate a strong random string)
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://your-frontend-url.vercel.app`
4. Deploy

### Post-Deployment
After the backend is live, run the seed script once:
```bash
# On Render: use the Shell tab in your service dashboard
cd server && npm run seed
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login (returns JWT) |
| GET | /api/auth/me | Bearer | Get current user |
| GET | /api/projects | Public | List all projects |
| GET | /api/projects/featured | Public | List featured projects |
| GET | /api/projects/:slug | Public | Get project by slug |
| POST | /api/projects | Admin | Create project |
| PUT | /api/projects/:id | Admin | Update project |
| DELETE | /api/projects/:id | Admin | Delete project |
| GET | /api/messages | Admin | List messages |
| GET | /api/messages/unread-count | Admin | Get unread count |
| POST | /api/messages | Public | Send contact message |
| PATCH | /api/messages/:id/read | Admin | Mark as read |
| DELETE | /api/messages/:id | Admin | Delete message |
| GET | /api/portfolio/skills | Public | List skills |
| GET | /api/portfolio/experiences | Public | List experiences |
| GET | /api/health | Public | Health check |

---

## Tech Stack
- React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- GSAP, Lenis (smooth scroll), Lucide icons
- Express, Mongoose, MongoDB, bcryptjs, jsonwebtoken
- Zod validation, express-rate-limit
