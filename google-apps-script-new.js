/**
 * GOOGLE APPS SCRIPT - NEW CONTACT FORM BACKEND
 * 
 * QUICK SETUP GUIDE:
 * 
 * 1. Create a new Google Sheet at https://sheets.google.com
 * 2. Name it "Qlystra Contact Form - New"
 * 3. Go to Extensions > Apps Script
 * 4. Copy and paste this ENTIRE code
 * 5. Click Save (💾)
 * 6. Click Deploy > New deployment
 * 7. Select "Web app"
 * 8. Set "Execute as: Me" and "Who has access: Anyone"
 * 9. Click Deploy and copy the Web App URL
 * 10. Update contact.js with your new URL
 */

// ============================================
// MAIN FUNCTION - Handles form submissions
// ============================================
function doPost(e) {
    try {
        // Get the active spreadsheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Parse incoming data
        const data = JSON.parse(e.postData.contents);

        // Initialize sheet with headers if empty
        if (sheet.getLastRow() === 0) {
            createHeaders(sheet);
        }

        // Add the new submission
        addSubmission(sheet, data);

        // Optional: Send email notification
        // Uncomment the line below and set your email
        // sendEmailNotification(data);

        // Return success
        return ContentService
            .createTextOutput(JSON.stringify({
                result: 'success',
                message: 'Form submitted successfully',
                row: sheet.getLastRow()
            }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log and return error
        Logger.log('Error: ' + error.toString());
        return ContentService
            .createTextOutput(JSON.stringify({
                result: 'error',
                message: error.toString()
            }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// ============================================
// CREATE HEADERS - Sets up the spreadsheet
// ============================================
function createHeaders(sheet) {
    const headers = [
        'Timestamp',
        'Date & Time',
        'Name',
        'Email',
        'Company',
        'Phone',
        'Subject',
        'Message',
        'Newsletter',
        'Status'
    ];

    // Add headers
    sheet.appendRow(headers);

    // Style the header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#C86FFF');  // Purple from your brand
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment('center');
    headerRange.setVerticalAlignment('middle');

    // Freeze header row
    sheet.setFrozenRows(1);

    // Set column widths
    sheet.setColumnWidth(1, 180);  // Timestamp
    sheet.setColumnWidth(2, 150);  // Date & Time
    sheet.setColumnWidth(3, 150);  // Name
    sheet.setColumnWidth(4, 200);  // Email
    sheet.setColumnWidth(5, 150);  // Company
    sheet.setColumnWidth(6, 120);  // Phone
    sheet.setColumnWidth(7, 120);  // Subject
    sheet.setColumnWidth(8, 300);  // Message
    sheet.setColumnWidth(9, 80);   // Newsletter
    sheet.setColumnWidth(10, 100); // Status
}

// ============================================
// ADD SUBMISSION - Adds new row to sheet
// ============================================
function addSubmission(sheet, data) {
    const now = new Date();

    const rowData = [
        now.toISOString(),                           // Timestamp
        now.toLocaleString('en-US', {                // Date & Time
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }),
        data.name || '',                             // Name
        data.email || '',                            // Email
        data.company || 'N/A',                       // Company
        data.phone || 'N/A',                         // Phone
        data.subject || 'General',                   // Subject
        data.message || '',                          // Message
        data.newsletter ? 'Yes' : 'No',              // Newsletter
        'New'                                        // Status
    ];

    // Append the row
    sheet.appendRow(rowData);

    // Get the last row number
    const lastRow = sheet.getLastRow();

    // Style the new row
    const rowRange = sheet.getRange(lastRow, 1, 1, 10);
    rowRange.setVerticalAlignment('top');

    // Alternate row colors for better readability
    if (lastRow % 2 === 0) {
        rowRange.setBackground('#F5F5F5');
    }

    // Add border
    rowRange.setBorder(true, true, true, true, true, true, '#E0E0E0', SpreadsheetApp.BorderStyle.SOLID);

    // Make email clickable
    const emailCell = sheet.getRange(lastRow, 4);
    emailCell.setFormula(`=HYPERLINK("mailto:${data.email}", "${data.email}")`);

    // Color code status
    const statusCell = sheet.getRange(lastRow, 10);
    statusCell.setBackground('#FFE082');  // Yellow for new
    statusCell.setFontWeight('bold');
}

// ============================================
// EMAIL NOTIFICATION (Optional)
// ============================================
function sendEmailNotification(data) {
    // CHANGE THIS to your email address
    const adminEmail = 'your-email@example.com';

    // Don't send if email not configured
    if (adminEmail === 'your-email@example.com') {
        return;
    }

    const subject = `🔔 New Contact Form: ${data.name}`;

    const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5;">
      <div style="background: linear-gradient(135deg, #C86FFF 0%, #8B5CF6 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Name:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Company:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Phone:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Subject:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.subject}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Newsletter:</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.newsletter ? '✅ Yes' : '❌ No'}</td>
          </tr>
        </table>
        
        <h3 style="color: #333; margin-top: 30px; margin-bottom: 10px;">Message:</h3>
        <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #C86FFF; border-radius: 4px;">
          ${data.message}
        </div>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
          Submitted on ${new Date().toLocaleString()}
        </p>
      </div>
    </div>
  `;

    // Send the email
    MailApp.sendEmail({
        to: adminEmail,
        subject: subject,
        htmlBody: htmlBody
    });
}

// ============================================
// TEST FUNCTION - Run this to test the script
// ============================================
function testSubmission() {
    const testData = {
        postData: {
            contents: JSON.stringify({
                name: 'Test User',
                email: 'test@example.com',
                company: 'Test Company Inc.',
                phone: '+1 (555) 123-4567',
                subject: 'general',
                message: 'This is a test message to verify the Google Apps Script is working correctly.',
                newsletter: true
            })
        }
    };

    const result = doPost(testData);
    Logger.log(result.getContent());

    // Check your sheet - you should see a new row!
}

// ============================================
// UTILITY: Clear all data (use with caution!)
// ============================================
function clearAllData() {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
        'Clear All Data',
        'Are you sure you want to delete all submissions? This cannot be undone!',
        ui.ButtonSet.YES_NO
    );

    if (response === ui.Button.YES) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        sheet.clear();
        createHeaders(sheet);
        ui.alert('All data cleared. Headers recreated.');
    }
}

// ============================================
// UTILITY: Export to CSV
// ============================================
function exportToCSV() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    let csv = '';
    data.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    Logger.log('CSV Data:');
    Logger.log(csv);

    return csv;
}
