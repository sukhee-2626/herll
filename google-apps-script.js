/**
 * GOOGLE APPS SCRIPT FOR CONTACT FORM INTEGRATION
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet:
 *    - Go to https://sheets.google.com
 *    - Create a new spreadsheet
 *    - Name it "Qlystra Contact Submissions"
 * 
 * 2. Set up the Apps Script:
 *    - In your Google Sheet, go to Extensions > Apps Script
 *    - Delete any existing code
 *    - Copy and paste this entire script
 *    - Click the disk icon to save
 * 
 * 3. Deploy as Web App:
 *    - Click "Deploy" > "New deployment"
 *    - Click the gear icon next to "Select type" and choose "Web app"
 *    - Fill in the details:
 *      - Description: "Contact Form Handler"
 *      - Execute as: "Me"
 *      - Who has access: "Anyone"
 *    - Click "Deploy"
 *    - Copy the Web App URL
 * 
 * 4. Update contact.js:
 *    - Open contact.js in your project
 *    - Find the line: const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
 *    - Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE' with your Web App URL
 * 
 * 5. Test:
 *    - Submit a test form on your website
 *    - Check your Google Sheet for the new row
 */

// Main function to handle POST requests from the contact form
function doPost(e) {
    try {
        // Get the active spreadsheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse the incoming JSON data
        const data = JSON.parse(e.postData.contents);

        // Check if headers exist, if not create them
        if (sheet.getLastRow() === 0) {
            const headers = [
                'Timestamp',
                'Date',
                'Name',
                'Email',
                'Company',
                'Phone',
                'Subject',
                'Message',
                'Newsletter'
            ];
            sheet.appendRow(headers);

            // Format header row
            const headerRange = sheet.getRange(1, 1, 1, headers.length);
            headerRange.setBackground('#4a148c');
            headerRange.setFontColor('#ffffff');
            headerRange.setFontWeight('bold');
            headerRange.setHorizontalAlignment('center');
        }

        // Prepare the row data
        const rowData = [
            data.timestamp || new Date().toISOString(),
            data.date || new Date().toLocaleString(),
            data.name || '',
            data.email || '',
            data.company || '',
            data.phone || '',
            data.subject || '',
            data.message || '',
            data.newsletter ? 'Yes' : 'No'
        ];

        // Append the new row
        sheet.appendRow(rowData);

        // Auto-resize columns for better readability
        sheet.autoResizeColumns(1, 9);

        // Optional: Send email notification to admin
        // Uncomment and configure the following lines if you want email notifications
        /*
        const adminEmail = 'your-email@example.com';
        const subject = `New Contact Form Submission from ${data.name}`;
        const body = `
          New contact form submission received:
          
          Name: ${data.name}
          Email: ${data.email}
          Company: ${data.company || 'Not provided'}
          Phone: ${data.phone || 'Not provided'}
          Subject: ${data.subject}
          
          Message:
          ${data.message}
          
          Newsletter: ${data.newsletter ? 'Yes' : 'No'}
          
          Submitted: ${data.date}
        `;
        
        MailApp.sendEmail(adminEmail, subject, body);
        */

        // Return success response
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log error and return error response
        Logger.log('Error: ' + error.toString());
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Test function to verify the script works
function testSubmission() {
    const testData = {
        postData: {
            contents: JSON.stringify({
                timestamp: new Date().toISOString(),
                date: new Date().toLocaleString(),
                name: 'Test User',
                email: 'test@example.com',
                company: 'Test Company',
                phone: '+1 555-0123',
                subject: 'general',
                message: 'This is a test submission',
                newsletter: true
            })
        }
    };

    const result = doPost(testData);
    Logger.log(result.getContent());
}
