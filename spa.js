document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.display = 'none';
  });

  // Modal Functionality
  const modal = document.getElementById('facilityModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDetails = document.getElementById('modalDetails');
  const closeModal = document.querySelector('.modal-close');

  const facilityDetails = {
    'FitnessStudio': {
      details: 'Stay active with our modern fitness equipment in a serene setting, designed for the modern traveler.'
    },
    'IndoorPool': {
      details: 'Take a refreshing dip in our indoor pool with stunning views of the picturesque Warwickshire gardens.'
    },
    'SaunaSteam': {
      details: 'Unwind in our soothing sauna and steam room, perfect for ultimate relaxation in a tranquil environment.'
    }
  };

  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const facility = button.getAttribute('data-facility');
      modalTitle.textContent = facilityDetails[facility].title || facility.replace(/([A-Z])/g, ' $1').trim();
      modalDetails.textContent = facilityDetails[facility].details;
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

  // Treatment Toggle Functionality
  const detailsToggles = document.querySelectorAll('.details-toggle');
  detailsToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const details = toggle.nextElementSibling;
      const isActive = toggle.classList.contains('active');

      if (!isActive) {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        details.classList.add('active');
      } else {
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        details.classList.remove('active');
      }
    });
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

  // Auto-advance carousel
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
});