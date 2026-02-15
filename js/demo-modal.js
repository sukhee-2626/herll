document.addEventListener('DOMContentLoaded', function () {
    // 1. Define Dummy Demo Data
    const demoData = {
        'Web Platforms': {
            title: 'Enterprise E-Commerce Platform',
            description: 'A scalable, high-performance e-commerce solution handling 50k+ daily users with sub-second load times.',
            image: 'https://via.placeholder.com/600x400/1a1b4b/ffffff?text=Web+Platform+Demo',
            tags: ['React', 'Node.js', 'AWS']
        },
        'Mobile Applications': {
            title: 'Health & Wellness Companion App',
            description: 'Top-rated iOS and Android app with real-time tracking, social features, and offline capability.',
            image: 'https://via.placeholder.com/600x400/1a1b4b/ffffff?text=Mobile+App+Demo',
            tags: ['Flutter', 'Firebase', 'HealthKit']
        },
        'Modern ERP & CRM': {
            title: 'Supply Chain Management ERP',
            description: 'Custom ERP system consolidating inventory, logistics, and vendor management into a single dashboard.',
            image: 'https://via.placeholder.com/600x400/1a1b4b/ffffff?text=ERP+System+Demo',
            tags: ['Python', 'PostgreSQL', 'Docker']
        },
        'Business Analytics': {
            title: 'Executive Financial Dashboard',
            description: 'Interactive analytics suite providing real-time insights into revenue, forecasts, and KPI performance.',
            image: 'https://via.placeholder.com/600x400/1a1b4b/ffffff?text=Analytics+Dashboard+Demo',
            tags: ['PowerBI', 'Tableau', 'BigQuery']
        },
        'Lead Generation': {
            title: 'Automated Sales Funnel Engine',
            description: 'End-to-end lead gen system with automated nurturing sequences and CRM integration.',
            image: 'https://via.placeholder.com/600x400/1a1b4b/ffffff?text=Lead+Gen+Demo',
            tags: ['HubSpot', 'Zapier', 'LinkedIn API']
        }
    };

    // 2. Inject Modal HTML if not present
    if (!document.getElementById('demo-modal')) {
        const modalHTML = `
            <div id="demo-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                <div style="background: white; width: 90%; max-width: 600px; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); transform: scale(0.9); transition: transform 0.3s ease;">
                    <div style="position: relative;">
                        <img id="demo-image" src="" alt="Demo" style="width: 100%; height: 300px; object-fit: cover;">
                        <button id="close-modal" style="position: absolute; top: 15px; right: 15px; background: white; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 18px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">&times;</button>
                    </div>
                    <div style="padding: 30px;">
                        <div style="font-size: 12px; font-weight: 700; color: #667eea; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Our Works Demo</div>
                        <h3 id="demo-title" style="margin: 0 0 10px 0; font-size: 24px; font-weight: 700; color: #1a1b4b; line-height: 1.2;"></h3>
                        <p id="demo-desc" style="color: #4a5568; line-height: 1.6; margin-bottom: 20px; font-size: 16px;"></p>
                        <div id="demo-tags" style="display: flex; gap: 8px; flex-wrap: wrap;"></div>
                        <div style="margin-top: 25px; pt: 20px; border-top: 1px solid #eee;">
                             <a href="#" style="display: inline-block; background: #1a1b4b; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">View Case Study</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // 3. Attach Event Listeners
    const buttons = document.querySelectorAll('.case-card.solutions .pop-btn');
    const modal = document.getElementById('demo-modal');
    const closeBtn = document.getElementById('close-modal');
    const modalContent = modal.querySelector('div[style*="background: white"]');

    function openModal(category) {
        const data = demoData[category] || demoData['Web Platforms']; // Fallback

        document.getElementById('demo-title').textContent = data.title;
        document.getElementById('demo-desc').textContent = data.description;
        document.getElementById('demo-image').src = data.image;

        const tagsContainer = document.getElementById('demo-tags');
        tagsContainer.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            span.style.cssText = 'background: #edf2f7; color: #2d3748; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;';
            tagsContainer.appendChild(span);
        });

        modal.style.display = 'flex';
        // Force reflow
        void modal.offsetWidth;
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }

    function closeModal() {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Identify which card is clicked based on its content
    document.querySelectorAll('.case-card.solutions').forEach(card => {
        const btn = card.querySelector('.pop-btn');
        const titleElement = card.querySelector('.caption > div:last-child'); // e.g., "Web Platforms"

        if (btn && titleElement) {
            const category = titleElement.textContent.trim();

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                openModal(category);
            });

            // Allow clicking whole card too
            card.addEventListener('click', function (e) {
                // If clicked on link, don't double trigger
                if (e.target.closest('a')) return;
                openModal(category);
            });
        }
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
    });

    // Escape key to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});
