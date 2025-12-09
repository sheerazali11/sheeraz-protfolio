document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Intersection Observer for Fade-In Animation
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.2, // Start animation when 20% of the element is visible
        rootMargin: "0px 0px -100px 0px" // Adjust for earlier triggering
    };

    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // If you want the animation to reset when scrolling away, keep this:
                // entry.target.classList.remove('appear'); 
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 3. Simple Header Class Change on Scroll (Optional but Pro-Look)
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'var(--color-dark)'; // Solid dark on scroll
        } else {
            header.style.backgroundColor = 'rgba(18, 18, 18, 0.95)'; // Semi-transparent at top
        }
    });
});