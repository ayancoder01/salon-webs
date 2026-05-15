document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');
    const serviceItems = document.querySelectorAll('.service-item');
    const parallaxItems = document.querySelectorAll('[data-scroll-speed]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (cursor && !isTouchDevice) {
        document.addEventListener('mousemove', (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });
    }

    const setNavState = () => {
        if (!nav) {
            return;
        }

        nav.classList.toggle('scrolled', window.scrollY > 24);
    };

    setNavState();
    window.addEventListener('scroll', setNavState, { passive: true });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-inview');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('[data-scroll]').forEach((element) => observer.observe(element));

    if (!prefersReducedMotion && !isTouchDevice && parallaxItems.length > 0) {
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            parallaxItems.forEach((element) => {
                const speed = Number(element.getAttribute('data-scroll-speed')) || 0;
                const yPos = -(scrolled * speed / 10);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        updateParallax();
        window.addEventListener('scroll', updateParallax, { passive: true });
    }

    const closeMenu = () => {
        if (!navToggle || !menuOverlay) {
            return;
        }

        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    };

    navToggle?.addEventListener('click', () => {
        const isActive = navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isActive));
        menuOverlay?.classList.toggle('active', isActive);
        document.body.classList.toggle('menu-open', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';

        if (isActive) {
            menuLinks.forEach((link, index) => {
                link.style.setProperty('--i', index + 1);
            });
        }
    });

    menuLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (!targetElement) {
                return;
            }

            event.preventDefault();
            const navOffset = nav ? nav.offsetHeight + 20 : 80;
            const top = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;

            window.scrollTo({
                top,
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
        });
    });

    if (cursor && !isTouchDevice) {
        serviceItems.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(3.6)';
                cursor.style.background = 'rgba(215, 170, 99, 0.22)';
            });

            item.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'var(--primary)';
            });
        });
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuOverlay?.classList.contains('active')) {
            closeMenu();
        }
    });
});
