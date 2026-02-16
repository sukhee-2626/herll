# 🚀 Qlystra Technologies - Complete Setup Guide

## Current Status: ✅ Running on Python Server (Port 8000)

Your website is currently accessible at: **http://localhost:8000**

---

## 📋 Three Ways to Run Your Website

### ✅ **Option 1: Python Server (Currently Running - Quick Preview)**

**Status:** ✅ ACTIVE NOW  
**URL:** http://localhost:8000  
**Command:** `python -m http.server 8000`

**Features:**
- ✅ View all pages (HTML, CSS, JavaScript)
- ✅ Contact form works (with Web3Forms setup - see below)
- ❌ No backend API features
- ❌ No database connections
- ❌ No authentication

**To Stop:** Press `Ctrl+C` in the terminal or let me know

---

### 🔧 **Option 2: Contact Form Setup (Works with Python Server)**

To make the contact form send real emails:

1. **Get Free API Key:**
   - Visit: https://web3forms.com
   - Sign up with your email (free, no credit card)
   - Get your access key

2. **Update contact.js:**
   - Open `contact.js`
   - Find line 41: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'`
   - Replace with your actual key: `access_key: 'abc123xyz...'`
   - Update line 50: `to_email: 'contact@qlystra.com'` with your email

3. **Test:**
   - Refresh http://localhost:8000/contact.html
   - Submit the form
   - Check your email!

**Features After Setup:**
- ✅ Real email notifications
- ✅ Form validation
- ✅ Works without backend
- ✅ Free forever (up to 250 submissions/month)

---

### 🚀 **Option 3: Full Node.js Server (Complete Features)**

For full backend functionality (authentication, database, all APIs):

#### **Step 1: Install Node.js**

1. Download from: https://nodejs.org/
2. Choose **LTS version** (recommended)
3. Run installer, click "Next" through all steps
4. Restart your terminal/PowerShell

#### **Step 2: Install Dependencies**

```powershell
cd c:\Users\HP\happy\qlystra-technologies
npm install
```

#### **Step 3: Configure Environment**

Check your `.env` file has these settings:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

#### **Step 4: Start Server**

```powershell
npm start
# or for development with auto-reload:
npm run dev
```

#### **Step 5: Access**

Open: **http://localhost:3000**

**Features:**
- ✅ All static pages
- ✅ Contact form with email
- ✅ User authentication
- ✅ Database connections
- ✅ All API endpoints
- ✅ Full backend functionality

---

## 📊 Feature Comparison

| Feature | Python Server | Python + Web3Forms | Node.js Server |
|---------|--------------|-------------------|----------------|
| View Pages | ✅ | ✅ | ✅ |
| Contact Form | ❌ | ✅ | ✅ |
| Authentication | ❌ | ❌ | ✅ |
| Database | ❌ | ❌ | ✅ |
| API Routes | ❌ | ❌ | ✅ |
| Setup Time | 0 min | 5 min | 15 min |

---

## 🎯 Recommended Path

1. **Right Now:** Use Python server to preview the site ✅ (Already running!)
2. **Next 5 minutes:** Set up Web3Forms for contact form
3. **When needed:** Install Node.js for full features

---

## 🆘 Troubleshooting

### Python Server Issues
- **Port already in use:** Try `python -m http.server 8001`
- **Python not found:** Install from https://python.org

### Contact Form Not Working
- Check browser console (F12) for errors
- Verify Web3Forms API key is correct
- Make sure you're not using 'YOUR_WEB3FORMS_ACCESS_KEY'

### Node.js Issues
- **npm not found:** Restart terminal after installing Node.js
- **Port 3000 in use:** Change PORT in `.env` file
- **Dependencies fail:** Try `npm install --legacy-peer-deps`

---

## 📝 Quick Commands Reference

```powershell
# Start Python server
python -m http.server 8000

# Install Node.js dependencies
npm install

# Start Node.js server
npm start

# Start with auto-reload (development)
npm run dev

# Stop any server
Ctrl + C
```

---

## 🌐 Access URLs

- **Python Server:** http://localhost:8000
- **Node.js Server:** http://localhost:3000
- **Main Page:** /index.html
- **Contact:** /contact.html
- **About:** /about-us.html
- **Services:** /what-we-do.html

---

## ✨ Next Steps

1. ✅ **View your site:** Open http://localhost:8000 in your browser
2. 🔧 **Enable contact form:** Get Web3Forms key (5 minutes)
3. 🚀 **Full features:** Install Node.js when ready (15 minutes)

---

**Need help?** Just ask! I'm here to assist with any step.
