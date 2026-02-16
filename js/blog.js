// ===================================
// BLOG LISTING PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const featuredGrid = document.getElementById('featuredGrid');
    const postsGrid = document.getElementById('postsGrid');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');
    const newsletterForm = document.getElementById('newsletterForm');

    let currentFilter = 'all';
    let searchQuery = '';

    // Load blog posts
    function loadBlogPosts() {
        const featured = blogPosts.filter(post => post.featured);
        const all = blogPosts;

        // Load featured posts
        if (featuredGrid) {
            featuredGrid.innerHTML = featured.map(post => createBlogCard(post, true)).join('');
        }

        // Load all posts
        filterAndDisplayPosts();
    }

    // Create blog card HTML
    function createBlogCard(post, isFeatured = false) {
        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="blog-card ${isFeatured ? 'featured' : ''}" onclick="navigateToPost('${post.slug}')">
                <div class="blog-card-image">
                    <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${post.categoryColor} 0%, ${adjustColor(post.categoryColor, -20)} 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: 700;">
                        ${post.title.charAt(0)}
                    </div>
                    <div class="blog-card-category" style="background: ${post.categoryColor};">
                        ${post.category}
                    </div>
                </div>
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span>${date}</span>
                        <span>•</span>
                        <span>${post.readTime}</span>
                    </div>
                    <h3 class="blog-card-title">${post.title}</h3>
                    <p class="blog-card-excerpt">${post.excerpt}</p>
                    <div class="blog-card-footer">
                        <div class="blog-card-author">
                            <div class="author-avatar-small">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <span class="author-name-small">${post.author}</span>
                        </div>
                        <div class="read-more">
                            Read More
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Filter and display posts
    function filterAndDisplayPosts() {
        let filtered = blogPosts;

        // Apply category filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(post => post.category === currentFilter);
        }

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Display results
        if (filtered.length === 0) {
            postsGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            postsGrid.style.display = 'grid';
            noResults.style.display = 'none';
            postsGrid.innerHTML = filtered.map(post => createBlogCard(post)).join('');
        }
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndDisplayPosts();
        });
    }

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            filterAndDisplayPosts();
        });
    });

    // Newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;

            // Show success message
            showNotification('Thank you for subscribing! Check your email for confirmation.', 'success');
            newsletterForm.reset();
        });
    }

    // Initialize
    loadBlogPosts();
});

// Navigate to blog post
function navigateToPost(slug) {
    window.location.href = `blog-post.html?slug=${slug}`;
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    // Simple color adjustment (this is a basic implementation)
    return color;
}

// Notification function (if not already defined)
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
