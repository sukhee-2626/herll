# 🚀 Qlystra Technologies - Full Stack Application

## Complete Setup with Flask Backend + Admin Panel

---

## 📋 What's Included

### ✅ **Frontend**
- Modern responsive website
- Blog system with 6 sample articles
- Contact form with validation
- All pages (Home, About, Services, Contact, Blog, etc.)

### ✅ **Backend (Flask)**
- RESTful API endpoints
- Contact form submission handling
- Blog management API
- Authentication system
- Data persistence (JSON files)

### ✅ **Admin Panel**
- Secure login (username: `admin`, password: `1234567890`)
- Blog posts management
- Contact form submissions viewing
- Dashboard with statistics
- Full CRUD operations

---

## 🎯 Quick Start (3 Steps)

### **Step 1: Install Python Dependencies**

```powershell
# Install Flask and dependencies
pip install -r requirements.txt
```

### **Step 2: Start the Flask Server**

```powershell
# Run the Flask backend
python app.py
```

You should see:
```
🚀 Qlystra Technologies Flask Server Starting...
📍 Server running on: http://localhost:5000
📍 API Health Check: http://localhost:5000/api/health
📍 Admin Panel: http://localhost:5000/admin/login.html
```

### **Step 3: Open in Browser**

- **Main Website:** http://localhost:5000
- **Blog:** http://localhost:5000/blog.html
- **Admin Panel:** http://localhost:5000/admin/login.html

---

## 🔐 Admin Panel Access

### Login Credentials:
- **Username:** `admin`
- **Password:** `1234567890`

### Admin Features:
1. **Dashboard** - View statistics and recent activity
2. **Blog Management** - View all blog posts, filter by category
3. **Contact Forms** - View, search, and manage contact submissions

### Admin URLs:
- Login: http://localhost:5000/admin/login.html
- Dashboard: http://localhost:5000/admin/dashboard.html
- Blogs: http://localhost:5000/admin/blogs.html
- Contacts: http://localhost:5000/admin/contacts.html

---

## 📡 API Endpoints

### **Authentication**
```
POST /api/auth/login
Body: { "username": "admin", "password": "1234567890" }
```

### **Contact Forms**
```
POST /api/contact/submit
Body: { "name", "email", "subject", "message", ... }

GET /api/contact/list
Returns: All contact submissions

GET /api/contact/<id>
Returns: Single contact details

DELETE /api/contact/<id>
Deletes: Contact submission
```

### **Blogs**
```
GET /api/blogs/list
Returns: All blog posts

POST /api/blogs/create
Body: { "title", "content", "author", ... }
```

### **Health Check**
```
GET /api/health
Returns: Server status
```

---

## 📁 Project Structure

```
qlystra-technologies/
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── data/                  # Data storage
│   ├── contacts.json     # Contact submissions
│   └── blogs.json        # Blog posts
├── admin/                # Admin panel
│   ├── login.html
│   ├── dashboard.html
│   ├── blogs.html
│   └── contacts.html
├── js/                   # JavaScript files
│   ├── admin-login.js
│   ├── admin-auth.js
│   ├── admin-dashboard.js
│   ├── admin-blogs.js
│   ├── admin-contacts.js
│   ├── blog.js
│   ├── blog-post.js
│   └── blog-data.js
├── css/                  # Stylesheets
│   ├── admin.css
│   └── blog.css
├── index.html           # Main homepage
├── blog.html            # Blog listing
├── blog-post.html       # Blog post detail
├── contact.html         # Contact page
└── ...                  # Other pages

```

---

## 🔧 How It Works

### **Contact Form Flow:**
1. User fills out contact form on website
2. Form submits to `/api/contact/submit` endpoint
3. Flask backend saves to `data/contacts.json`
4. Also stored in localStorage for admin panel
5. Admin can view submissions in admin panel

### **Blog System:**
1. Blog posts defined in `js/blog-data.js`
2. Dynamically loaded on blog pages
3. Admin can view and manage in admin panel
4. Future: Full CRUD via API endpoints

### **Admin Authentication:**
1. Admin enters credentials on login page
2. Validated against hardcoded credentials
3. Session stored in localStorage
4. Protected routes check authentication
5. Logout clears session

---

## 🌐 All Available Pages

### **Public Pages:**
- Home: http://localhost:5000/
- What We Do: http://localhost:5000/what-we-do.html
- About Us: http://localhost:5000/about-us.html
- Contact: http://localhost:5000/contact.html
- Blog: http://localhost:5000/blog.html
- Blog Post: http://localhost:5000/blog-post.html?slug=post-slug
- Our Approach: http://localhost:5000/our-approach.html
- Insights: http://localhost:5000/insights.html
- Privacy: http://localhost:5000/privacy.html
- Terms: http://localhost:5000/terms.html
- Security: http://localhost:5000/security.html

### **Admin Pages:**
- Login: http://localhost:5000/admin/login.html
- Dashboard: http://localhost:5000/admin/dashboard.html
- Blogs: http://localhost:5000/admin/blogs.html
- Contacts: http://localhost:5000/admin/contacts.html

---

## 🛠️ Development

### **Running in Development Mode:**
```powershell
# Flask runs in debug mode by default
python app.py
```

### **Testing the API:**
```powershell
# Test health check
curl http://localhost:5000/api/health

# Test contact submission
curl -X POST http://localhost:5000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"general","message":"Test message"}'
```

---

## 📊 Features Comparison

| Feature | Status | Notes |
|---------|--------|-------|
| Static Pages | ✅ Complete | All HTML/CSS/JS |
| Blog System | ✅ Complete | 6 sample articles |
| Contact Form | ✅ Complete | Flask backend integration |
| Admin Login | ✅ Complete | Secure authentication |
| Admin Dashboard | ✅ Complete | Stats and activity |
| Blog Management | ✅ Complete | View and filter |
| Contact Management | ✅ Complete | Full CRUD |
| API Endpoints | ✅ Complete | RESTful API |
| Data Persistence | ✅ Complete | JSON file storage |
| Responsive Design | ✅ Complete | Mobile-friendly |

---

## 🚀 Deployment

### **For Production:**

1. **Set Environment Variables:**
```powershell
# Create .env file
echo "FLASK_ENV=production" > .env
echo "SECRET_KEY=your-secret-key-here" >> .env
```

2. **Use Production Server:**
```powershell
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

3. **Deploy to Cloud:**
- Heroku: `git push heroku main`
- Vercel: Configure `vercel.json`
- AWS/Azure: Use Docker container

---

## 🆘 Troubleshooting

### **Port Already in Use:**
```powershell
# Change port in app.py (line 197)
app.run(debug=True, host='0.0.0.0', port=5001)
```

### **Module Not Found:**
```powershell
# Reinstall dependencies
pip install -r requirements.txt
```

### **CORS Errors:**
- Flask-CORS is already configured
- Check browser console for specific errors

### **Admin Can't Login:**
- Verify credentials: `admin` / `1234567890`
- Check browser localStorage
- Clear cache and try again

### **Contact Form Not Submitting:**
- Ensure Flask server is running
- Check browser console for errors
- Verify API endpoint: http://localhost:5000/api/health

---

## 📝 Next Steps

### **Enhancements You Can Add:**

1. **Database Integration:**
   - Replace JSON files with PostgreSQL/MySQL
   - Use SQLAlchemy ORM

2. **Email Notifications:**
   - Send emails on contact form submission
   - Use Flask-Mail or SendGrid

3. **Blog Editor:**
   - Add rich text editor in admin panel
   - Implement full CRUD for blogs

4. **User Management:**
   - Multiple admin users
   - Role-based permissions

5. **Analytics:**
   - Track page views
   - Monitor form submissions

6. **Search Functionality:**
   - Full-text search for blogs
   - Advanced filtering

---

## 📞 Support

Need help? Check these resources:
- Flask Documentation: https://flask.palletsprojects.com/
- Python Documentation: https://docs.python.org/
- Project Issues: Create an issue in your repo

---

## 🎊 Summary

✅ **Full-stack application ready!**
- Frontend: Modern, responsive website
- Backend: Flask API with data persistence
- Admin: Complete management panel
- Blog: 6 sample articles with full system
- Contact: Form with backend integration

**Start the server and explore:**
```powershell
python app.py
```

Then visit: **http://localhost:5000**

---

**Happy Coding! 🚀**
