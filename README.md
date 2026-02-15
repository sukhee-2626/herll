# Qlystra Technologies - Full Stack Website

A modern, full-stack website for Qlystra Technologies with backend API, database integration, and smooth animations.

## 🚀 Features

### Frontend
- ✨ Modern, responsive design
- 🎨 Smooth animations and transitions
- 📱 Mobile-friendly interface
- 🎯 Interactive UI components
- 🌈 Custom Qlystra branding

### Backend
- 🔐 User authentication (JWT)
- 📧 Contact form with email notifications
- 💾 MongoDB database integration
- 🛡️ Input validation and security
- 📊 RESTful API architecture

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sukhee-2626/herll.git
   cd qlystra-technologies
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env` file and update with your credentials
   - Set MongoDB URI
   - Configure email settings (optional)

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

6. **Access the website**
   - Open browser: `http://localhost:3000`
   - Branded version: `http://localhost:3000/branded`

## 📁 Project Structure

```
qlystra-technologies/
├── models/              # Database models
│   ├── Contact.js       # Contact form submissions
│   ├── User.js          # User authentication
│   └── Service.js       # Company services
├── routes/              # API routes
│   ├── contact.js       # Contact endpoints
│   ├── auth.js          # Authentication endpoints
│   └── services.js      # Services endpoints
├── css/                 # Stylesheets
├── js/                  # JavaScript libraries
├── images/              # Images and assets
├── fonts/               # Custom fonts
├── media/               # Videos and media
├── server.js            # Express server
├── api-integration.js   # Frontend API client
├── index.html           # Main homepage
├── index-branded.html   # Custom branded version
└── package.json         # Dependencies
```

## 🔌 API Endpoints

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/all` - Get all contacts (admin)
- `GET /api/contact/:id` - Get contact by ID
- `DELETE /api/contact/:id` - Delete contact

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

## 💻 Usage Examples

### Contact Form Submission
```javascript
const response = await fetch('http://localhost:3000/api/contact/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'Hello!'
    })
});
```

### User Authentication
```javascript
// Register
const user = await QlystraAuth.register('John Doe', 'john@example.com', 'password123');

// Login
const session = await QlystraAuth.login('john@example.com', 'password123');

// Get current user
const currentUser = await QlystraAuth.getCurrentUser();
```

## 🎨 Customization

### Brand Colors
Edit `styles-branded.css`:
```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --accent: #f093fb;
}
```

### Email Configuration
Update `.env`:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Input validation on all endpoints
- CORS enabled for cross-origin requests
- Environment variables for sensitive data

## 📦 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer
- **Validation**: express-validator

## 🚀 Deployment

### Deploy to Heroku
```bash
heroku create qlystra-technologies
git push heroku main
heroku config:set MONGODB_URI=your-mongodb-uri
```

### Deploy to Vercel (Frontend)
```bash
vercel --prod
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 👥 Contact

- Website: [Qlystra Technologies](http://localhost:3000)
- Email: contact@qlystra.com
- GitHub: [@sukhee-2626](https://github.com/sukhee-2626)

## 🎯 Future Enhancements

- [ ] Admin dashboard
- [ ] Blog system
- [ ] Newsletter subscription
- [ ] Live chat support
- [ ] Analytics integration
- [ ] Payment gateway
- [ ] Multi-language support

---

**Built with ❤️ by Qlystra Technologies**
