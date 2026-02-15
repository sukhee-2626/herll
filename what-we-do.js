// ===================================
// WHAT WE DO PAGE FUNCTIONALITY
// ===================================

// Toggle service details
function toggleServiceDetails(button) {
    const serviceItem = button.closest('.service-item');
    const details = serviceItem.querySelector('.service-details');
    const isActive = details.classList.contains('active');

    // Close all other service details
    document.querySelectorAll('.service-details.active').forEach(detail => {
        if (detail !== details) {
            detail.classList.remove('active');
            const btn = detail.closest('.service-item').querySelector('.expand-btn');
            btn.classList.remove('active');
            btn.querySelector('span').textContent = 'Show me an example';
        }
    });

    // Toggle current service detail
    if (isActive) {
        details.classList.remove('active');
        button.classList.remove('active');
        button.querySelector('span').textContent = 'Show me an example';
    } else {
        details.classList.add('active');
        button.classList.add('active');
        button.querySelector('span').textContent = 'Hide example';

        // Smooth scroll to the opened section
        setTimeout(() => {
            serviceItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// Category tab switching
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Remove active class from all buttons and contents
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Make service headers clickable
    document.querySelectorAll('.service-header').forEach(header => {
        header.addEventListener('click', (e) => {
            // Only trigger if not clicking the button directly
            if (!e.target.closest('.expand-btn')) {
                const button = header.querySelector('.expand-btn');
                if (button) {
                    toggleServiceDetails(button);
                }
            }
        });
    });
});

console.log('What We Do page loaded successfully');
