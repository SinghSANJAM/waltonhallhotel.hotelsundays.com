document.addEventListener('DOMContentLoaded', () => {
  // Modal Functionality
  const modal = document.getElementById('roomModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDetails = document.getElementById('modalDetails');
  const closeModal = document.querySelector('.modal-close');

  const roomDetails = {
    'Courtyard Suite': {
      details: 'The stunning Courtyard Suite on the ground floor is perfect for grand wedding receptions, accommodating up to 400 guests in a banquet setup or 600 in a theatre style.'
    },
    'Moncrieff Suite': {
      details: 'Located on the first floor, Moncrieff Suite is ideal for intimate ceremonies or receptions, with a capacity of up to 120 in a banquet setup.'
    }
  };

  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const room = button.getAttribute('data-room');
      modalTitle.textContent = room;
      modalDetails.textContent = roomDetails[room].details;
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

  // Gallery Modal Functionality
  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImage = document.getElementById('galleryModalImage');
  const galleryModalCaption = document.getElementById('galleryModalCaption');
  const galleryCloseModal = document.querySelector('.gallery-modal-close');

  document.querySelectorAll('.gallery-zoom').forEach(button => {
    button.addEventListener('click', () => {
      const galleryItem = button.closest('.gallery-item');
      const img = galleryItem.querySelector('.gallery-image');
      galleryModalImage.src = img.src;
      galleryModalImage.alt = img.alt;
      galleryModalCaption.textContent = img.alt;
      galleryModal.classList.add('active');
    });
  });

  galleryCloseModal.addEventListener('click', () => {
    galleryModal.classList.remove('active');
  });

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      galleryModal.classList.remove('active');
    }
  });

  // Package Toggle Functionality
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