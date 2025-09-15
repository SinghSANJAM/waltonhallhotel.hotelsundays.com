document.addEventListener('DOMContentLoaded', () => {
  // Modal Functionality
  const modal = document.getElementById('roomModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDetails = document.getElementById('modalDetails');
  const closeModal = document.querySelector('.modal-close');

  const roomDetails = {
    'classic-double': {
      title: 'Classic Double',
      details: '150 sqft | 1 Double Bed<br>Enjoy a comfortable stay with free WiFi, private bathroom, TV, tea/coffee maker, bath or shower, hairdryer, and no smoking.'
    },
    'classic-twin': {
      title: 'Classic Twin',
      details: '150 sqft | 2 Single Beds<br>Perfect for friends or family, featuring free WiFi, private bathroom, TV, tea/coffee maker, safety deposit box, desk, and no smoking.'
    },
    'superior-double': {
      title: 'Superior Double',
      details: '161 sqft | 1 Double Bed<br>Spacious comfort with free WiFi, private bathroom, flat-screen TV, tea/coffee maker, bathrobe, slippers, and no smoking.'
    },
    'superior-twin': {
      title: 'Superior Twin',
      details: '161 sqft | 2 Single Beds<br>Elevated luxury with free WiFi, private bathroom, flat-screen TV, tea/coffee maker, bath & shower, and no smoking.'
    },
    'suite': {
      title: 'Suite',
      details: '215 sqft | 1 King Bed<br>Ultimate indulgence with free WiFi, private bathroom, flat-screen TV, tea/coffee maker, living area, satellite channels, bathrobe, slippers, and no smoking.'
    },
    'one-bedroom-apartment': {
      title: 'One-Bedroom Apartment',
      details: '194 sqft | 1 Double Bed<br>Spacious living with free WiFi, private bathroom, flat-screen TV, tea/coffee maker, heating, and no smoking.'
    },
    'two-bedroom-apartment': {
      title: 'Two-Bedroom Apartment',
      details: '215 sqft | 2 Double Beds<br>Perfect for families, featuring free WiFi, private bathroom, flat-screen TV, tea/coffee maker, living room, satellite channels, seating area, electric kettle, and no smoking.'
    }
  };

  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
      const room = button.getAttribute('data-room');
      modalTitle.textContent = roomDetails[room].title;
      modalDetails.innerHTML = roomDetails[room].details;
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

  // Filter Functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const roomCards = document.querySelectorAll('.room-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      roomCards.forEach(card => {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

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