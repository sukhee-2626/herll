// ===================================
// ADMIN DASHBOARD FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    loadDashboardStats();
    loadRecentActivity();
});

function loadDashboardStats() {
    // Load blog count
    if (typeof blogPosts !== 'undefined') {
        document.getElementById('totalBlogs').textContent = blogPosts.length;
    }

    // Load contact count
    const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    document.getElementById('totalContacts').textContent = contacts.length;

    // Load last activity
    const loginTime = localStorage.getItem('adminLoginTime');
    if (loginTime) {
        const date = new Date(loginTime);
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        document.getElementById('recentActivity').textContent = isToday ? 'Today' : date.toLocaleDateString();
    }
}

function loadRecentActivity() {
    const activityList = document.getElementById('activityList');
    const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');

    // Add recent contacts to activity
    const recentContacts = contacts.slice(-3).reverse();

    recentContacts.forEach(contact => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <div class="activity-info">
                <p><strong>New contact from ${contact.name}</strong></p>
                <span>${formatDate(contact.date)}</span>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString();
}
