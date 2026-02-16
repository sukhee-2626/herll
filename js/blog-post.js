// ===================================
// BLOG POST PAGE FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Get slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = 'blog.html';
        return;
    }

    // Find the post
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) {
        window.location.href = 'blog.html';
        return;
    }

    // Load post content
    loadPost(post);
    loadRelatedPosts(post);
});

function loadPost(post) {
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Update page title and meta
    document.getElementById('pageTitle').textContent = `${post.title} | Qlystra Technologies`;
    document.getElementById('pageDescription').content = post.excerpt;

    // Update post header
    document.getElementById('postCategory').textContent = post.category;
    document.getElementById('postCategory').style.background = post.categoryColor;
    document.getElementById('postDate').textContent = date;
    document.getElementById('postReadTime').textContent = post.readTime;
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postExcerpt').textContent = post.excerpt;
    document.getElementById('authorName').textContent = post.author;
    document.getElementById('authorRole').textContent = post.authorRole;

    // Update featured image
    const featuredImage = document.getElementById('postFeaturedImage');
    featuredImage.innerHTML = `
        <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${post.categoryColor} 0%, ${post.categoryColor} 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 6rem; font-weight: 700;">
            ${post.title.charAt(0)}
        </div>
    `;

    // Update content
    document.getElementById('postContent').innerHTML = post.content;

    // Update tags
    const tagsContainer = document.getElementById('postTags');
    tagsContainer.innerHTML = post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
}

function loadRelatedPosts(currentPost) {
    // Find related posts (same category, excluding current post)
    const related = blogPosts
        .filter(post => post.category === currentPost.category && post.id !== currentPost.id)
        .slice(0, 3);

    // If not enough in same category, add random posts
    if (related.length < 3) {
        const others = blogPosts
            .filter(post => post.id !== currentPost.id && !related.includes(post))
            .slice(0, 3 - related.length);
        related.push(...others);
    }

    const relatedContainer = document.getElementById('relatedPosts');
    relatedContainer.innerHTML = related.map(post => createRelatedCard(post)).join('');
}

function createRelatedCard(post) {
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <div class="blog-card" onclick="navigateToPost('${post.slug}')">
            <div class="blog-card-image">
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, ${post.categoryColor} 0%, ${post.categoryColor} 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 3rem; font-weight: 700;">
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

function navigateToPost(slug) {
    window.location.href = `blog-post.html?slug=${slug}`;
}

// Social sharing functions
function shareOnTwitter() {
    const url = window.location.href;
    const text = document.getElementById('postTitle').textContent;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'error');
    });
}

// Notification function
if (typeof showNotification === 'undefined') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
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
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }
}
