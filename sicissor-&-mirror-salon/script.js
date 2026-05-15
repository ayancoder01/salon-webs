(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {

        // --- 1. Hero Image Parallax ---
        // Creates a smooth parallax effect on the images in the right column
        const parallaxImages = document.querySelectorAll('.parallax-img');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            parallaxImages.forEach(img => {
                // Get the parent container's position
                const rect = img.parentElement.getBoundingClientRect();
                
                // Only animate if the image container is in the viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Calculate a subtle offset based on scroll position
                    const offset = (rect.top - window.innerHeight / 2) * 0.15;
                    img.style.transform = `translateY(${offset}px)`;
                }
            });

            // Masonry parallax
            const col1 = document.querySelector('.g-col-1');
            const col2 = document.querySelector('.g-col-2');
            
            if(col1 && col2) {
                const galleryRect = document.querySelector('.scattered-gallery').getBoundingClientRect();
                if(galleryRect.top < window.innerHeight && galleryRect.bottom > 0) {
                    col1.style.transform = `translateY(${galleryRect.top * 0.1}px)`;
                    col2.style.transform = `translateY(${galleryRect.top * 0.25}px)`; // Moves faster
                }
            }
        });

        // --- 2. Interactive Services Hover ---
        // Changes the background image of the section when hovering over a service
        const serviceItems = document.querySelectorAll('.service-accordion li');
        const serviceBg = document.getElementById('service-bg');

        if (serviceItems.length > 0 && serviceBg) {
            
            // Preload images to prevent flicker
            serviceItems.forEach(item => {
                const imgUrl = item.getAttribute('data-img');
                if (imgUrl) {
                    const img = new Image();
                    img.src = imgUrl;
                }
            });

            serviceItems.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    const imgUrl = item.getAttribute('data-img');
                    if (imgUrl) {
                        serviceBg.style.backgroundImage = `url('${imgUrl}')`;
                        serviceBg.style.opacity = '1';
                    }
                });

                item.addEventListener('mouseleave', () => {
                    serviceBg.style.opacity = '0';
                });
            });
        }
        
    });
})();
