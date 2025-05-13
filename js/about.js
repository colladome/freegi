document.addEventListener('DOMContentLoaded', () => {
    // ... (Hero load animations and Mobile Nav Toggle code remains the same) ...

    // --- Screenshot Slider Logic ---
    const slider = document.querySelector('.screenshot-slider');
    const slides = Array.from(document.querySelectorAll('.screenshot-slider .slide'));
    const nextButton = document.querySelector('.slider-nav.next');
    const prevButton = document.querySelector('.slider-nav.prev');
    const sliderContainer = document.querySelector('.slider-container'); // Get the container

    if (slider && slides.length > 0 && nextButton && prevButton && sliderContainer) {
        let currentIndex = 0;
        let slideGap = 0; // To be calculated

        function calculateDimensions() {
            if (slides.length > 0) {
                const sliderComputedStyle = window.getComputedStyle(slider);
                slideGap = parseFloat(sliderComputedStyle.gap) || 0;
            }
        }

        function getSlidesPerPage() {
            if (slides.length === 0 || !slides[0]) return 1; // Safety check

            const containerInnerWidth = sliderContainer.clientWidth - (parseFloat(window.getComputedStyle(sliderContainer).paddingLeft) + parseFloat(window.getComputedStyle(sliderContainer).paddingRight));
            const slideOuterWidth = slides[0].offsetWidth + slideGap;

            if (slideOuterWidth > 0) {
                // Calculate how many full slides can fit
                let count = 0;
                let currentWidth = 0;
                for(let i = 0; i < slides.length; i++) {
                    currentWidth += slides[i].offsetWidth;
                    if (i > 0) currentWidth += slideGap;
                    if (currentWidth <= containerInnerWidth) {
                        count++;
                    } else {
                        break;
                    }
                }
                return Math.max(1, count); // Ensure at least 1
            }
            // Fallback based on viewport (less accurate but better than nothing)
            if (window.innerWidth <= 768) return 1;
            // if (window.innerWidth <= 992) return 2; // Example, might not fit 2 of 290px
            return 3; // Default desktop assumption
        }


        function updateSliderPosition() {
            if (slides.length === 0 || !slides[0]) return; // Safety check

            calculateDimensions(); // Recalculate gap just in case it's dynamic (though unlikely here)

            // Calculate the offset: sum of widths of preceding slides + sum of preceding gaps
            let offset = 0;
            for (let i = 0; i < currentIndex; i++) {
                offset += slides[i].offsetWidth + slideGap;
            }
            slider.style.transform = `translateX(-${offset}px)`;

            // Disable/enable nav buttons
            prevButton.disabled = currentIndex === 0;

            const slidesPerPage = getSlidesPerPage();
            // The last possible starting index to show 'slidesPerPage' full slides
            const maxStartIndex = slides.length - slidesPerPage;
            nextButton.disabled = currentIndex >= maxStartIndex;

            // If slidesPerPage is 0 (e.g., container too small for even one slide width), disable next
            if (slidesPerPage === 0 && slides.length > 0) {
                 nextButton.disabled = true;
            }
        }


        nextButton.addEventListener('click', () => {
            const slidesPerPage = getSlidesPerPage();
            if (currentIndex < slides.length - slidesPerPage) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        // Initial setup
        calculateDimensions();
        updateSliderPosition();

        // Recalculate on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                calculateDimensions();
                // Adjust currentIndex if it becomes out of bounds
                const slidesPerPage = getSlidesPerPage();
                const maxStartIndex = Math.max(0, slides.length - slidesPerPage);
                if (currentIndex > maxStartIndex) {
                    currentIndex = maxStartIndex;
                }
                updateSliderPosition();
            }, 250); // Debounce resize
        });
    }

    // --- Intersection Observer for Scroll Animations (remains the same) ---
    // ... (Intersection Observer code) ...
});


//faq
document.addEventListener('DOMContentLoaded', () => {
    // ... (All previous JS code: Hero, Mobile Nav, Slider, Intersection Observer) ...

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        if (questionButton && answerDiv) {
            questionButton.addEventListener('click', () => {
                const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

                // Close all other FAQ items (optional, for single open item behavior)
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
                //          otherItem.querySelector('.faq-answer').style.paddingTop = '0';
                //          otherItem.querySelector('.faq-answer').style.paddingBottom = '0';
                //     }
                // });

                questionButton.setAttribute('aria-expanded', !isExpanded);
                if (!isExpanded) {
                    // Expand
                    answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
                    // answerDiv.style.paddingTop = '0'; // Set in p styling
                    // answerDiv.style.paddingBottom = '20px'; // Set in p styling
                } else {
                    // Collapse
                    answerDiv.style.maxHeight = null;
                    // answerDiv.style.paddingTop = '0';
                    // answerDiv.style.paddingBottom = '0';
                }
            });
        }
    });
});

//footer


document.addEventListener('DOMContentLoaded', () => {
    // ... (All previous JS code) ...

    // --- Update Copyright Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});