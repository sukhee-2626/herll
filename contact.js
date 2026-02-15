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

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                console.log('Form submitted:', data);

                // Show success notification
                showNotification('Thank you for reaching out! We\'ll get back to you within 24 hours.', 'success');

                // Reset form
                contactForm.reset();

                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                // Optional: Redirect to thank you page
                // window.location.href = 'thank-you.html';
            }, 1500);
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
