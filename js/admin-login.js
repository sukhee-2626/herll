// ===================================
// ADMIN LOGIN FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simple authentication (username: admin, password: 1234567890)
            if (username === 'admin' && password === '1234567890') {
                // Store authentication
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUsername', username);
                localStorage.setItem('adminLoginTime', new Date().toISOString());

                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            } else {
                showNotification('Invalid username or password', 'error');
            }
        });
    }
});

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'hsl(120, 60%, 50%)' : type === 'error' ? 'hsl(0, 60%, 50%)' : 'hsl(240, 60%, 50%)'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
