document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    document.documentElement.classList.add('motion-ready');

    const revealTargets = Array.from(document.querySelectorAll('.reveal'));
    revealTargets.forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 320)}ms`);
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.18,
            rootMargin: '0px 0px -10% 0px'
        }
    );

    revealTargets.forEach((element) => revealObserver.observe(element));
});
