# Deployment Guide

This guide will walk you through deploying your portfolio website with a custom domain.

## Overview

You'll need to deploy:
1. **Frontend** (React app) - Recommended: Vercel or Netlify
2. **Backend** (Node.js API) - Recommended: Railway or Render
3. **Domain** - Purchase from Namecheap, Google Domains, or Cloudflare

---

## Step 1: Purchase a Domain

### Recommended Domain Registrars:

1. **Namecheap** (https://www.namecheap.com)
   - Easy to use, good prices (~$10-15/year)
   - Free privacy protection

2. **Cloudflare** (https://www.cloudflare.com/products/registrar/)
   - At-cost pricing (~$8-10/year)
   - Built-in CDN and security

3. **Google Domains** (https://domains.google)
   - Simple interface, good integration

### Choose a Domain:
- Examples: `lukefiles.dev`, `lukefiles.com`, `lukefiles.tech`
- Check availability and purchase

---

## Step 2: Deploy Frontend (React App)

### Option A: Vercel (Recommended - Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Configure:
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Add environment variables (if needed):
     - `VITE_API_URL` = `https://your-backend-url.railway.app` (set after deploying backend)

3. **Connect Custom Domain**
   - In Vercel project settings → Domains
   - Add your domain (e.g., `lukefiles.dev`)
   - Vercel will provide DNS records to add

### Option B: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**
   - Go to https://www.netlify.com
   - Sign up with GitHub
   - Click "New site from Git"
   - Select your repository
   - Configure:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

3. **Connect Custom Domain**
   - Site settings → Domain management
   - Add custom domain
   - Follow DNS configuration instructions

---

## Step 3: Deploy Backend (Node.js API)

### Option A: Railway (Recommended - Easy Setup)

1. **Sign up at Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder as root

3. **Configure Build Settings**
   - Railway will auto-detect Node.js
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

4. **Set Environment Variables**
   - Go to Variables tab
   - Add:
     ```
     NODE_ENV=production
     PORT=5000
     CORS_ORIGIN=https://yourdomain.com
     EMAIL_USER=lukedfiles@gmail.com
     EMAIL_PASSWORD=your-gmail-app-password
     ```

5. **Get Backend URL**
   - Railway will provide a URL like: `https://your-app.railway.app`
   - Note this URL for frontend configuration

### Option B: Render

1. **Sign up at Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Root Directory**: `backend`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Environment**: Node

3. **Set Environment Variables**
   - Add same variables as Railway

4. **Get Backend URL**
   - Render provides: `https://your-app.onrender.com`

---

## Step 4: Configure Frontend API URL

After deploying the backend, update your frontend to use the production API:

### Update Vite Config (if needed)

If you have API calls, you may need to create an environment variable:

1. **Create `.env.production` in `frontend/` folder:**
   ```env
   VITE_API_URL=https://your-backend-url.railway.app
   ```

2. **Update API calls in frontend** (if using hardcoded URLs):
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

   Your contact form already uses relative URLs (`/api/contact`), so if your frontend and backend are on the same domain, you can use a proxy. Otherwise, configure CORS on backend to allow your frontend domain.

---

## Step 5: Update Backend CORS

In your backend `.env` on Railway/Render:

```
CORS_ORIGIN=https://yourdomain.com
```

Or if using subdomain:
```
CORS_ORIGIN=https://www.yourdomain.com
```

---

## Step 6: Configure DNS

After deploying both frontend and backend, configure DNS:

### For Vercel:

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add your domain
   - You'll see DNS records to add

2. **In Your Domain Registrar (e.g., Namecheap):**
   - Go to Advanced DNS settings
   - Add records provided by Vercel:
     ```
     Type: A
     Host: @
     Value: 76.76.21.21 (or Vercel's IP)
     
     Type: CNAME
     Host: www
     Value: cname.vercel-dns.com
     ```

### For Netlify:

1. **In Netlify Dashboard:**
   - Go to Site settings → Domain management
   - Add custom domain
   - Follow DNS setup instructions

2. **Add DNS Records:**
   ```
   Type: A
   Host: @
   Value: 75.2.60.5 (Netlify IP)
   
   Type: CNAME
   Host: www
   Value: your-site.netlify.app
   ```

### For Custom Backend Subdomain (Optional):

If you want `api.yourdomain.com` for your backend:

1. **In Railway/Render:**
   - Add custom domain: `api.yourdomain.com`

2. **In Domain Registrar:**
   ```
   Type: CNAME
   Host: api
   Value: your-backend.railway.app (or render URL)
   ```

---

## Step 7: Test Everything

1. **Visit your domain** - Should see your portfolio
2. **Test contact form** - Submit a message
3. **Check email** - Should receive email at `lukedfiles@gmail.com`
4. **Test all pages** - Home, About, Projects, Contact

---

## Step 8: SSL/HTTPS

Both Vercel and Netlify automatically provide SSL certificates (HTTPS) for custom domains. Railway and Render also provide HTTPS by default. No additional setup needed!

---

## Environment Variables Summary

### Backend (Railway/Render):
```
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://yourdomain.com
EMAIL_USER=lukedfiles@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

### Frontend (Vercel/Netlify):
```
VITE_API_URL=https://your-backend-url.railway.app
```
(Only if you need to configure API URL)

---

## Troubleshooting

### Contact Form Not Working:
- Check backend environment variables (`EMAIL_USER`, `EMAIL_PASSWORD`)
- Verify CORS allows your frontend domain
- Check backend logs in Railway/Render dashboard

### Domain Not Loading:
- DNS propagation can take 24-48 hours
- Verify DNS records are correct
- Use `dig yourdomain.com` or online DNS checker

### API Calls Failing:
- Verify `CORS_ORIGIN` matches your frontend domain exactly
- Check backend is running (visit backend URL directly)
- Verify API endpoint URLs are correct

---

## Estimated Costs

- **Domain**: ~$10-15/year
- **Frontend (Vercel/Netlify)**: Free tier (sufficient for portfolio)
- **Backend (Railway)**: Free tier includes $5/month credit
- **Backend (Render)**: Free tier available (with limitations)
- **Total**: ~$10-15/year (just the domain!)

---

## Quick Start Checklist

- [ ] Purchase domain
- [ ] Push code to GitHub
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Deploy backend to Railway/Render
- [ ] Configure environment variables
- [ ] Set up DNS records
- [ ] Test contact form
- [ ] Verify SSL/HTTPS works
- [ ] Share your portfolio! 🎉

---

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **DNS Help**: Check your domain registrar's documentation

