document.addEventListener('DOMContentLoaded', () => {
    // Countdown Timer
    const targetDate = new Date('2025-12-25T00:00:00Z');
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const timeDiff = targetDate - now;

        if (timeDiff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Tabbed Packages
    const tabButtons = document.querySelectorAll('.tab-button');
    const packageTabs = document.querySelectorAll('.package-tab');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            packageTabs.forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Modal Functionality
    const modal = document.getElementById('momentModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDetails = document.getElementById('modalDetails');
    const closeModal = document.querySelector('.modal-close');

    const momentDetails = {
        'reception': {
            image: 'images/christmas/Christmas Hotel Reception.jpg',
            details: 'Our grand hall, adorned with festive decor, welcomes you in style.'
        },
        'party-night': {
            image: 'images/christmas/Directors Suite Dinner.jpg',
            details: 'Enjoy a glamorous evening with delicious dining and dancing.'
        }
    };

    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const moment = button.getAttribute('data-moment');
            modalTitle.textContent = moment === 'reception' ? 'Festive Reception' : 'Party Night';
            modalImage.src = momentDetails[moment].image;
            modalImage.alt = `${moment === 'reception' ? 'Festive Reception' : 'Party Night'} at Sunday Warwickshire Walton Hall`;
            modalDetails.textContent = momentDetails[moment].details;
            modal.classList.add('active');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Testimonial Carousel
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === index) {
                card.classList.add('active');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
        showTestimonial(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    });

    setInterval(() => {
        currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
        showTestimonial(currentIndex);
    }, 5000);

    // Animation on Scroll
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(element => observer.observe(element));

    // Track PDF Downloads
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', () => {
            const fileName = link.getAttribute('href').split('/').pop();
            gtag('event', 'download', {
                'event_category': 'PDF',
                'event_label': fileName,
                'value': 1
            });
        });
    });

    // Initialize existing scripts
    if (typeof initMagazineCarousels === 'function') {
        initMagazineCarousels();
    }
});
