/**
 * Load navbar and footer components dynamically
 */
(function () {
    'use strict';

    // Function to load HTML content
    async function loadComponent(elementId, filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to load ${filePath}`);
            }
            const html = await response.text();
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = html;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error loading component:', error);
            return false;
        }
    }

    // Function to set active navigation link
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('data-page');
            const href = link.getAttribute('href');

            // Check if current page matches
            if (href === currentPage ||
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index')) {
                link.classList.add('active');
            }

            // Special handling for subpages
            if (linkPage && currentPage.includes(linkPage)) {
                link.classList.add('active');
            }
        });
    }

    // Function to handle navbar scroll effect
    function initNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    }

    // Function to initialize hamburger menu
    function initHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function () {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const links = navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });
        }
    }

    // Load components when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    async function init() {
        // Load navbar
        const navbarLoaded = await loadComponent('navbar-placeholder', 'includes/navbar.html');

        // Load footer
        const footerLoaded = await loadComponent('footer-placeholder', 'includes/footer.html');

        // Initialize after components are loaded
        if (navbarLoaded) {
            setActiveNavLink();
            initHamburgerMenu();
            initNavbarScroll();
        }
    }
})();
