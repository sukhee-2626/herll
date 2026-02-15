// Frontend API Integration
const API_BASE_URL = 'http://localhost:3000/api';

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        // Get form data
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            subject: contactForm.querySelectorAll('input[type="text"]')[1].value,
            message: contactForm.querySelector('textarea').value
        };

        try {
            const response = await fetch(`${API_BASE_URL}/contact/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                button.textContent = 'Message Sent! ✓';
                button.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
                contactForm.reset();

                // Show success notification
                showNotification('Thank you! We will get back to you soon.', 'success');
            } else {
                throw new Error(data.message || 'Failed to send message');
            }

        } catch (error) {
            console.error('Contact form error:', error);
            button.textContent = 'Failed to Send ✗';
            button.style.background = 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)';
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 3000);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#11998e' : '#f5576c'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Fetch and display services
async function loadServices() {
    try {
        const response = await fetch(`${API_BASE_URL}/services`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            displayServices(data.data);
        }
    } catch (error) {
        console.error('Failed to load services:', error);
    }
}

function displayServices(services) {
    const servicesGrid = document.querySelector('.services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
            ${service.features && service.features.length > 0 ? `
                <ul class="service-features">
                    ${service.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `).join('');
}

// Load services on page load
if (document.querySelector('.services-grid')) {
    loadServices();
}

// User Authentication
class Auth {
    static getToken() {
        return localStorage.getItem('qlystra_token');
    }

    static setToken(token) {
        localStorage.setItem('qlystra_token', token);
    }

    static removeToken() {
        localStorage.removeItem('qlystra_token');
    }

    static async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.setToken(data.token);
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    static async register(name, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.setToken(data.token);
                return data;
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            throw error;
        }
    }

    static async getCurrentUser() {
        const token = this.getToken();
        if (!token) return null;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            return data.success ? data.user : null;
        } catch (error) {
            return null;
        }
    }

    static logout() {
        this.removeToken();
        window.location.reload();
    }
}

// Make Auth available globally
window.QlystraAuth = Auth;

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .service-features {
        list-style: none;
        padding: 0;
        margin-top: 1rem;
    }
    
    .service-features li {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .service-features li:before {
        content: "✓ ";
        color: #667eea;
        font-weight: bold;
        margin-right: 0.5rem;
    }
`;
document.head.appendChild(style);

console.log('🔌 Qlystra API Integration Loaded');
