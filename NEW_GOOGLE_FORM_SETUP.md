# Create New Google Form with Google Sheets Backend

This guide will help you create a brand new Google Form connected to Google Sheets for your contact form.

## 🎯 Two Options Available

### Option A: Use Google Forms (Easiest - No Coding Required)
### Option B: Custom Form with Google Sheets API (Current Setup - More Control)

---

## 📋 OPTION A: Google Forms (Recommended for Quick Setup)

### Step 1: Create a New Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Click **+ Blank** to create a new form
3. Name your form: **"Qlystra Technologies Contact Form"**

### Step 2: Add Form Fields

Add the following questions to your form:

1. **Name** (Short answer, Required)
   - Question: "Your Name"
   - Type: Short answer
   - Toggle "Required" ON

2. **Email** (Short answer, Required)
   - Question: "Email Address"
   - Type: Short answer
   - Toggle "Required" ON
   - Click ⋮ (three dots) → "Response validation"
   - Select "Text" → "Email"

3. **Company** (Short answer, Optional)
   - Question: "Company Name"
   - Type: Short answer

4. **Phone** (Short answer, Optional)
   - Question: "Phone Number"
   - Type: Short answer

5. **Subject** (Dropdown, Required)
   - Question: "Subject"
   - Type: Multiple choice or Dropdown
   - Options:
     - General Inquiry
     - Project Discussion
     - Partnership Opportunity
     - Technical Support
     - Other
   - Toggle "Required" ON

6. **Message** (Paragraph, Required)
   - Question: "Your Message"
   - Type: Paragraph
   - Toggle "Required" ON

7. **Newsletter** (Checkbox, Optional)
   - Question: "Subscribe to our newsletter?"
   - Type: Checkboxes
   - Option: "Yes, I'd like to receive updates"

### Step 3: Link to Google Sheets

1. In your Google Form, click the **Responses** tab
2. Click the Google Sheets icon (📊) in the top right
3. Select **"Create a new spreadsheet"**
4. Name it: **"Qlystra Contact Submissions - New"**
5. Click **Create**
6. Your responses will now automatically save to this sheet!

### Step 4: Get the Form Embed Code

1. In your Google Form, click **Send** (top right)
2. Click the **< >** (Embed HTML) icon
3. Adjust the width and height (recommended: 640 x 800)
4. Copy the iframe code

### Step 5: Add Form to Your Website

**Option 1: Embed in Contact Page**

Open `contact.html` and replace the existing form with:

```html
<div class="form-container" style="max-width: 800px; margin: 0 auto;">
    <iframe 
        src="YOUR_GOOGLE_FORM_URL_HERE" 
        width="100%" 
        height="1200" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0"
        style="border-radius: 12px; background: white;">
        Loading…
    </iframe>
</div>
```

**Option 2: Link to Google Form**

Add a button that opens the form in a new tab:

```html
<a href="YOUR_GOOGLE_FORM_URL_HERE" 
   target="_blank" 
   class="button main-cta w-inline-block">
    <div class="btn-padding">
        <div class="label">Fill Contact Form</div>
    </div>
</a>
```

### Step 6: Customize Form Appearance (Optional)

1. In Google Forms, click the **Palette** icon (🎨)
2. Choose colors that match your brand:
   - Header color: #C86FFF (purple from your site)
   - Background color: #1a1a2e (dark)
3. Add your logo under **Theme options**

### Step 7: Set Up Email Notifications

1. In your Google Sheet (where responses are saved)
2. Go to **Extensions** → **Apps Script**
3. Delete any existing code
4. Paste this code:

```javascript
function onFormSubmit(e) {
  // Get the form response
  const responses = e.namedValues;
  
  // Your email address
  const adminEmail = "your-email@example.com"; // CHANGE THIS
  
  // Email subject
  const subject = "New Contact Form Submission from " + responses['Your Name'][0];
  
  // Email body
  const body = `
New contact form submission received:

Name: ${responses['Your Name'][0]}
Email: ${responses['Email Address'][0]}
Company: ${responses['Company Name'] ? responses['Company Name'][0] : 'Not provided'}
Phone: ${responses['Phone Number'] ? responses['Phone Number'][0] : 'Not provided'}
Subject: ${responses['Subject'][0]}

Message:
${responses['Your Message'][0]}

Newsletter: ${responses['Subscribe to our newsletter?'] ? 'Yes' : 'No'}

Submitted: ${new Date().toLocaleString()}
  `;
  
  // Send email
  MailApp.sendEmail(adminEmail, subject, body);
}
```

5. Click **Save** (💾)
6. Click **Triggers** (⏰ clock icon on the left)
7. Click **+ Add Trigger**
8. Configure:
   - Function: `onFormSubmit`
   - Event source: From spreadsheet
   - Event type: On form submit
9. Click **Save**
10. Authorize the script when prompted

---

## 📋 OPTION B: Custom Form with Google Sheets (Current Setup)

Your current setup is already configured! Here's how to create a NEW sheet for a new form:

### Step 1: Create New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"Qlystra Contact Submissions - Custom Form"**

### Step 2: Set Up Apps Script

1. In your new Google Sheet, click **Extensions** → **Apps Script**
2. Copy the code from `google-apps-script.js` in your project
3. Paste it into the Apps Script editor
4. Click **Save** (💾)

### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click ⚙️ → **Web app**
3. Configure:
   - Description: "Custom Contact Form Handler"
   - Execute as: Me
   - Who has access: Anyone
4. Click **Deploy**
5. **Copy the Web App URL**

### Step 4: Update contact.js

1. Open `contact.js`
2. Find line 46:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpzwAqElerDwETuIKgSYIxsCckvwJ_xwwH0HbYcn8d9O7hvULde9sBnCQ5LAtq16bnAw/exec';
```
3. Replace with your NEW Web App URL

### Step 5: Test

1. Open your website
2. Go to contact page
3. Submit a test form
4. Check your new Google Sheet!

---

## 🎨 Which Option Should You Choose?

### Choose Option A (Google Forms) if:
- ✅ You want the quickest setup
- ✅ You don't need custom styling
- ✅ You want Google to handle spam protection
- ✅ You want built-in analytics

### Choose Option B (Custom Form) if:
- ✅ You want full control over design
- ✅ You want the form to match your website perfectly
- ✅ You want to add custom validation
- ✅ You're comfortable with code

---

## 📊 View Your Submissions

### For Google Forms (Option A):
- Open your Google Form
- Click **Responses** tab
- View summary or individual responses
- Click the Google Sheets icon to see all data

### For Custom Form (Option B):
- Open your Google Sheet directly
- Or use the admin dashboard: `your-website.com/admin-dashboard.html`

---

## 🔐 Security Tips

1. **For Google Forms**:
   - Enable "Limit to 1 response" if needed
   - Turn on "Collect email addresses"
   - Use CAPTCHA (automatically included)

2. **For Custom Form**:
   - Add reCAPTCHA
   - Implement rate limiting
   - Validate all inputs

---

## 📞 Need Help?

### Common Issues:

**Google Form not showing on website:**
- Check if iframe is allowed by your hosting
- Try using a direct link instead

**Responses not saving:**
- Verify the form is linked to a sheet
- Check the Responses tab in Google Forms

**Email notifications not working:**
- Make sure you authorized the Apps Script
- Check spam folder
- Verify the trigger is set up correctly

---

## ✅ Quick Setup Checklist

### Option A (Google Forms):
- [ ] Created Google Form
- [ ] Added all fields
- [ ] Linked to Google Sheets
- [ ] Got embed code or form URL
- [ ] Added to website
- [ ] Tested submission
- [ ] Set up email notifications (optional)

### Option B (Custom Form):
- [ ] Created new Google Sheet
- [ ] Set up Apps Script
- [ ] Deployed as Web App
- [ ] Updated contact.js with new URL
- [ ] Tested submission
- [ ] Verified data in sheet

---

**Created**: February 2026  
**For**: Qlystra Technologies Website
