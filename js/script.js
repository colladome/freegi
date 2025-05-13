document.addEventListener('DOMContentLoaded', () => {

    // --- Load Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-load');

    // Use setTimeout to trigger animations shortly after load
    setTimeout(() => {
        animatedElements.forEach((el, index) => {
            // Add a small base delay + any specific delay class calculation
            // Note: CSS handles the actual delay amounts via .delay-N classes
             el.classList.add('visible');
        });
    }, 100); // 100ms delay

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body; // To prevent scrolling when nav is open

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNavToggle.classList.toggle('active');
            mainNav.classList.toggle('active');

            // Optional: Prevent body scroll when mobile nav is open
            if (mainNav.classList.contains('active')) {
                 body.style.overflow = 'hidden';
            } else {
                 body.style.overflow = ''; // Revert to default
            }
        });

        // Optional: Close nav when a link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }

});




document.addEventListener('DOMContentLoaded', () => {

    // --- Load Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-load');
    setTimeout(() => {
        animatedElements.forEach((el, index) => {
             el.classList.add('visible');
        });
    }, 100); // 100ms delay

    // --- Mobile Navigation Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNavToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });

        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        });
    }
});