# Contact Form Integration Guide

This guide explains how to set up the contact form to save submissions to Google Sheets and view them in the admin dashboard.

## 🎯 Features

- ✅ Submissions saved to Google Sheets automatically
- ✅ Local admin dashboard to view submissions
- ✅ Search and filter submissions
- ✅ Export to CSV
- ✅ Real-time statistics
- ✅ Works offline (saves locally even if Google Sheets fails)

## 📋 Setup Instructions

### Option 1: Google Sheets Integration (Recommended)

#### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Qlystra Contact Submissions"
4. Keep this tab open

#### Step 2: Set Up Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Open the file `google-apps-script.js` in your project folder
4. Copy ALL the code from that file
5. Paste it into the Apps Script editor
6. Click the **Save** icon (💾)
7. Name your project "Contact Form Handler"

#### Step 3: Deploy as Web App

1. In Apps Script, click **Deploy** > **New deployment**
2. Click the ⚙️ gear icon next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: Contact Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access** and follow the prompts
7. **IMPORTANT**: Copy the **Web App URL** (it looks like: `https://script.google.com/macros/s/...`)

#### Step 4: Update Your Website

1. Open `contact.js` in your project
2. Find this line (around line 46):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your Web App URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL_HERE';
   ```
4. Save the file

#### Step 5: Test the Integration

1. Open your website
2. Go to the contact page
3. Fill out and submit the form
4. Check your Google Sheet - a new row should appear!

### Option 2: Admin Dashboard Only (No Google Sheets)

If you prefer not to use Google Sheets, the form will still work and save submissions locally:

1. Simply use the contact form as normal
2. Access the admin dashboard at: `your-website.com/admin-dashboard.html`
3. View, search, and export submissions

**Note**: Local storage is browser-specific. Clear your browser data and submissions are lost. Google Sheets is recommended for permanent storage.

## 📊 Accessing the Admin Dashboard

### URL
Navigate to: `https://your-website.com/admin-dashboard.html`

### Features
- **View all submissions** in a clean table format
- **Search** by name, email, company, or message content
- **Statistics**: Total submissions, this week, this month
- **Export to CSV** for use in Excel or other tools
- **View details** of individual submissions

### Security Note
The admin dashboard is publicly accessible. For production use, you should:
1. Add password protection
2. Move it to a secure subdomain
3. Use server-side authentication

## 🔧 Optional: Email Notifications

To receive email notifications when someone submits the form:

1. Open your Google Apps Script editor
2. Find the commented section (around line 60):
   ```javascript
   // Optional: Send email notification to admin
   ```
3. Uncomment the code (remove the `/*` and `*/`)
4. Replace `'your-email@example.com'` with your actual email
5. Save and redeploy the script

## 📱 How It Works

```
User fills form → JavaScript validates → Saves to localStorage → Sends to Google Sheets → Shows success message
                                              ↓
                                    Admin Dashboard displays data
```

## 🐛 Troubleshooting

### Form submits but nothing appears in Google Sheet

1. Check the browser console for errors (F12)
2. Verify the Google Script URL in `contact.js` is correct
3. Make sure the Apps Script deployment is set to "Anyone" access
4. Try redeploying the Apps Script

### Admin dashboard shows no submissions

1. Submit a test form first
2. Check browser localStorage (F12 > Application > Local Storage)
3. Make sure you're on the same browser where you submitted forms

### Google Sheets shows "Authorization required"

1. Redeploy the Apps Script
2. Make sure you authorized the script during deployment
3. Check that "Execute as: Me" is selected

## 📁 File Structure

```
qlystra-technologies/
├── contact.html              # Contact form page
├── contact.js                # Form submission logic
├── admin-dashboard.html      # Admin panel to view submissions
├── google-apps-script.js     # Code to paste in Google Apps Script
└── CONTACT_FORM_SETUP.md     # This file
```

## 🔐 Security Recommendations

For production use:

1. **Protect the admin dashboard**:
   - Add HTTP Basic Auth
   - Use a secret URL
   - Implement proper authentication

2. **Validate data server-side**:
   - Add validation in the Apps Script
   - Sanitize inputs to prevent XSS

3. **Rate limiting**:
   - Add CAPTCHA to prevent spam
   - Implement rate limiting

4. **HTTPS only**:
   - Ensure your site uses HTTPS
   - Google Apps Script URLs are always HTTPS

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review the Apps Script execution logs
3. Verify all URLs are correct
4. Test with a simple submission first

## ✅ Quick Checklist

- [ ] Created Google Sheet
- [ ] Set up Apps Script
- [ ] Deployed as Web App
- [ ] Copied Web App URL
- [ ] Updated `contact.js` with URL
- [ ] Tested form submission
- [ ] Verified data appears in Google Sheet
- [ ] Tested admin dashboard
- [ ] (Optional) Set up email notifications

---

**Last Updated**: February 2026
**Version**: 1.0
