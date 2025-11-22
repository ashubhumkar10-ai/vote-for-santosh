# Deployment Guide - VoteForSantosh.com

## Quick Start Options

### Option 1: Render (Recommended for Beginners)

1. **Sign up** at https://render.com (free with GitHub/GitLab/Google)

2. **Create a new Web Service:**
   - Connect your GitHub repository (or create one first)
   - Select your repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`
   - Plan: `Free`

3. **Deploy!** Render will automatically:
   - Install dependencies
   - Run your server
   - Provide a free HTTPS URL (e.g., `your-app.onrender.com`)

**Note:** Free tier sleeps after 15 min inactivity. First request after sleep takes ~30 seconds.

---

### Option 2: Railway (Fast & Reliable)

1. **Sign up** at https://railway.app (free with GitHub)

2. **New Project → Deploy from GitHub:**
   - Select your repository
   - Railway auto-detects Node.js
   - Deploys automatically

3. **Get your URL** from the service dashboard

**Note:** Free tier gives $5 credit/month (usually enough for small apps)

---

### Option 3: Fly.io (Best Performance)

1. **Install Fly CLI:**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Initialize:**
   ```bash
   fly launch
   ```
   - Follow prompts
   - Creates `fly.toml` config

4. **Deploy:**
   ```bash
   fly deploy
   ```

---

## Important Notes

### File Persistence
- **Render**: Persistent disk storage (votes.json will persist)
- **Railway**: Ephemeral storage (may lose data on restart)
- **Fly.io**: Requires volumes for persistence

### Environment Variables
Your app uses `process.env.PORT` which is automatically set by all platforms.

### Required Files
- ✅ `package.json` (already exists)
- ✅ `server.js` (already exists)
- ✅ `.gitignore` (just created)

### Before Deploying

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Deploy** using one of the platforms above

---

## Testing After Deployment

1. **Voting Page:** `https://your-app-url.com/`
2. **Admin Page:** `https://your-app-url.com/admini.html`
3. **API Stats:** `https://your-app-url.com/api/stats`

---

## Troubleshooting

### App sleeps (Render free tier)
- First request after sleep takes ~30 seconds
- Consider upgrading to paid plan for always-on

### Votes not persisting
- Check if platform supports persistent storage
- Consider using a database (MongoDB Atlas free tier) for production

### Port binding errors
- Your code already uses `process.env.PORT` ✅
- Most platforms handle this automatically

---

## Recommended: Render for First Deployment

**Why Render?**
- Easiest setup (just connect GitHub)
- Persistent disk storage (votes.json survives restarts)
- Free HTTPS certificate
- Good documentation

**Steps:**
1. Push code to GitHub
2. Sign up at render.com
3. New Web Service → Connect GitHub
4. Deploy!

