document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Fade Out
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => preloader.style.display = 'none', 1000);
            }, 800);
        });
    }

    // 2. Business Status Engine
    updateBusinessStatus();
    
    // 3. Setup Layout Features
    setupHeaderScroll();
    setupRevealAnimation();
    setupFAQ();
    setupSmoothScrolling();
    setupLightbox();
});

/**
 * Updates the 'Open/Closed' status message
 */
function updateBusinessStatus() {
    const text = document.querySelector('.status-text');
    if (!text) return;

    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const indiaTime = new Date(utcTime + (3600000 * 5.5));
    
    const hours = indiaTime.getHours();
    const isOpen = hours >= 9 && hours < 21;

    text.innerText = isOpen ? 'Studio is Open' : 'Studio is Closed';
    text.style.color = isOpen ? '#22c55e' : '#ef4444';
}

/**
 * FAQ Accordion Engine - Independent Toggle
 */
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            // Toggle ONLY the clicked item
            item.classList.toggle('active');
        });
    });
}

/**
 * Gallery Lightbox Engine
 */
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    const lightboxImg = lightbox.querySelector('img');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });
}

/**
 * Intersection Observer for Reveal Animations
 */
function setupRevealAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/**
 * Header Scroll Polish
 */
function setupHeaderScroll() {
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Premium Smooth Scrolling for Anchor Links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
