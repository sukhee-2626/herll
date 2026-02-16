// ===================================
// ADMIN BLOG MANAGEMENT
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    loadBlogs();
    setupFilters();
});

function loadBlogs() {
    const tableBody = document.getElementById('blogsTableBody');
    const searchInput = document.getElementById('searchBlogs');
    const categoryFilter = document.getElementById('categoryFilter');

    let filteredBlogs = [...blogPosts];

    // Apply filters
    if (searchInput && searchInput.value) {
        const query = searchInput.value.toLowerCase();
        filteredBlogs = filteredBlogs.filter(blog =>
            blog.title.toLowerCase().includes(query) ||
            blog.author.toLowerCase().includes(query) ||
            blog.excerpt.toLowerCase().includes(query)
        );
    }

    if (categoryFilter && categoryFilter.value !== 'all') {
        filteredBlogs = filteredBlogs.filter(blog => blog.category === categoryFilter.value);
    }

    // Render table
    tableBody.innerHTML = filteredBlogs.map(blog => `
        <tr>
            <td>
                <strong>${blog.title}</strong>
                <br>
                <small style="color: hsl(240, 5%, 60%);">${blog.excerpt.substring(0, 60)}...</small>
            </td>
            <td>
                <span class="category-badge" style="background: ${blog.categoryColor};">
                    ${blog.category}
                </span>
            </td>
            <td>${blog.author}</td>
            <td>${formatDate(blog.date)}</td>
            <td>
                <span class="status-badge ${blog.featured ? 'published' : 'draft'}">
                    ${blog.featured ? 'Featured' : 'Published'}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="action-icon-btn" onclick="viewBlog('${blog.slug}')" title="View">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="action-icon-btn" onclick="editBlog(${blog.id})" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function setupFilters() {
    const searchInput = document.getElementById('searchBlogs');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', loadBlogs);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadBlogs);
    }
}

function viewBlog(slug) {
    window.open(`../blog-post.html?slug=${slug}`, '_blank');
}

function editBlog(id) {
    alert('Edit functionality coming soon! Blog ID: ' + id);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
