document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const bookingModal = document.getElementById('booking-modal');
    const closeModal = document.getElementById('close-modal');
    const bookBtns = document.querySelectorAll('.nav-cta .btn, .mobile-menu .btn, .hero-btns .btn-accent');

    // Initialize Hero Swiper
    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // Logic to reset animations if needed, but handled by CSS .swiper-slide-active
            }
        }
    });

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // Booking Modal
    bookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.getAttribute('href').startsWith('#') || btn.tagName === 'BUTTON' || btn.classList.contains('btn-accent')) {
                // If it's the "Book Now" button, show modal
                if (btn.textContent.trim() === 'BOOK NOW') {
                    e.preventDefault();
                    bookingModal.classList.add('active');
                }
            }
        });
    });

    closeModal.addEventListener('click', () => {
        bookingModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
        }
    });

    // Booking Form Submit
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your appointment request has been sent. We will contact you shortly.');
            bookingModal.classList.remove('active');
            bookingForm.reset();
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about-text, .about-image, .pricing-category, .pricing-image, .section-header').forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });
});
