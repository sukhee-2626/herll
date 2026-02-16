// ===================================
// ADMIN CONTACT FORMS MANAGEMENT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
    setupFilters();
});

function loadContacts() {
    const tableBody = document.getElementById('contactsTableBody');
    const emptyState = document.getElementById('emptyState');
    const searchInput = document.getElementById('searchContacts');
    const subjectFilter = document.getElementById('subjectFilter');

    // Get contacts from localStorage
    let contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');

    // Apply filters
    if (searchInput && searchInput.value) {
        const query = searchInput.value.toLowerCase();
        contacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(query) ||
            contact.email.toLowerCase().includes(query) ||
            contact.company.toLowerCase().includes(query) ||
            contact.message.toLowerCase().includes(query)
        );
    }

    if (subjectFilter && subjectFilter.value !== 'all') {
        contacts = contacts.filter(contact => contact.subject === subjectFilter.value);
    }

    // Show/hide empty state
    if (contacts.length === 0) {
        tableBody.innerHTML = '';
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');

        // Render table
        tableBody.innerHTML = contacts.map((contact, index) => `
            <tr>
                <td><strong>${contact.name}</strong></td>
                <td>${contact.email}</td>
                <td>${contact.company || '-'}</td>
                <td>
                    <span class="status-badge published">
                        ${formatSubject(contact.subject)}
                    </span>
                </td>
                <td>${formatDate(contact.date)}</td>
                <td>
                    <div class="table-actions">
                        <button class="action-icon-btn" onclick="viewContact(${index})" title="View Details">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                                <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </button>
                        <button class="action-icon-btn delete" onclick="deleteContact(${index})" title="Delete">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5H21M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
}

function setupFilters() {
    const searchInput = document.getElementById('searchContacts');
    const subjectFilter = document.getElementById('subjectFilter');

    if (searchInput) {
        searchInput.addEventListener('input', loadContacts);
    }

    if (subjectFilter) {
        subjectFilter.addEventListener('change', loadContacts);
    }
}

function viewContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const contact = contacts[index];

    if (!contact) return;

    const modal = document.getElementById('contactModal');
    const detailsContainer = document.getElementById('contactDetails');

    detailsContainer.innerHTML = `
        <div class="detail-row">
            <label>Name</label>
            <p>${contact.name}</p>
        </div>
        <div class="detail-row">
            <label>Email</label>
            <p><a href="mailto:${contact.email}" style="color: hsl(240, 100%, 60%);">${contact.email}</a></p>
        </div>
        <div class="detail-row">
            <label>Company</label>
            <p>${contact.company || 'Not provided'}</p>
        </div>
        <div class="detail-row">
            <label>Phone</label>
            <p>${contact.phone || 'Not provided'}</p>
        </div>
        <div class="detail-row">
            <label>Subject</label>
            <p>${formatSubject(contact.subject)}</p>
        </div>
        <div class="detail-row">
            <label>Message</label>
            <p>${contact.message}</p>
        </div>
        <div class="detail-row">
            <label>Newsletter Subscription</label>
            <p>${contact.newsletter ? 'Yes' : 'No'}</p>
        </div>
        <div class="detail-row">
            <label>Submitted</label>
            <p>${formatDate(contact.date)}</p>
        </div>
    `;

    modal.classList.add('show');
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('show');
}

function deleteContact(index) {
    if (!confirm('Are you sure you want to delete this contact submission?')) {
        return;
    }

    const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    contacts.splice(index, 1);
    localStorage.setItem('contactSubmissions', JSON.stringify(contacts));

    loadContacts();
    showNotification('Contact deleted successfully', 'success');
}

function clearAllContacts() {
    if (!confirm('Are you sure you want to delete ALL contact submissions? This action cannot be undone.')) {
        return;
    }

    localStorage.setItem('contactSubmissions', '[]');
    loadContacts();
    showNotification('All contacts cleared', 'success');
}

function formatSubject(subject) {
    const subjects = {
        'general': 'General Inquiry',
        'services': 'Services Information',
        'partnership': 'Partnership Opportunity',
        'support': 'Technical Support',
        'careers': 'Careers'
    };
    return subjects[subject] || subject;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

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
    `;

    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactModal();
    }
});
