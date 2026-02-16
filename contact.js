// ===================================
// CONTACT FORM FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                newsletter: formData.get('newsletter') === 'on'
            };

            try {
                // Add timestamp
                const submissionData = {
                    ...data,
                    timestamp: new Date().toISOString(),
                    date: new Date().toLocaleString()
                };

                // Store in localStorage for admin dashboard
                const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                contacts.push(submissionData);
                localStorage.setItem('contactSubmissions', JSON.stringify(contacts));

                // Submit to Google Sheets
                // Replace this URL with your Google Apps Script Web App URL
                const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpzwAqElerDwETuIKgSYIxsCckvwJ_xwwH0HbYcn8d9O7hvULde9sBnCQ5LAtq16bnAw/exec';

                if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                    try {
                        await fetch(GOOGLE_SCRIPT_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(submissionData)
                        });
                    } catch (sheetError) {
                        console.warn('Google Sheets submission failed, but data is saved locally:', sheetError);
                    }
                }

                // Show success notification
                showNotification('Thank you for reaching out! We\'ll get back to you within 24 hours.', 'success');

                // Reset form
                contactForm.reset();

                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

            } catch (error) {
                console.error('Error submitting form:', error);
                showNotification('Sorry, there was an error sending your message. Please try again or email us directly.', 'error');

                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });

        // Real-time validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                validateField(field);
            });

            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    validateField(field);
                }
            });
        });
    }
});

// Field validation
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = 'hsl(0, 60%, 50%)';

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.cssText = `
            color: hsl(0, 60%, 50%);
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        field.parentElement.appendChild(errorDiv);
    } else {
        field.classList.remove('error');
        field.style.borderColor = '';
    }

    return isValid;
}

// Notification function (if not already defined in script.js)
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'hsl(120, 60%, 50%)' : type === 'error' ? 'hsl(0, 60%, 50%)' : 'hsl(240, 60%, 50%)'};
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

console.log('Contact page loaded successfully');
