document.addEventListener('DOMContentLoaded', () => {
  // Table Filtering
  const roomTypeFilter = document.getElementById('roomTypeFilter');
  const locationFilter = document.getElementById('floorFilter');
  const tableRows = document.querySelectorAll('.meeting-table tbody tr');

  function filterTable() {
    const roomType = roomTypeFilter.value;
    const location = locationFilter.value;

    tableRows.forEach(row => {
      const rowRoomType = row.getAttribute('data-room-type');
      const rowLocation = row.getAttribute('data-floor');
      const matchesRoomType = roomType === 'all' || rowRoomType.includes(roomType);
      const matchesLocation = location === 'all' || rowLocation === location;

      row.style.display = matchesRoomType && matchesLocation ? '' : 'none';
    });
  }

  roomTypeFilter.addEventListener('change', filterTable);
  locationFilter.addEventListener('change', filterTable);

  // Modal Functionality
  const modal = document.getElementById('roomModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDetails = document.getElementById('modalDetails');
  const closeModal = document.querySelector('.modal-close');

  const roomDetails = {
    'Ash': {
      details: 'Located on the ground floor of the Modern Hotel, ideal for small meetings with a capacity of up to 28 in theatre style.'
    },
    'Avoncliffe': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight and air conditioning, suitable for up to 16 in boardroom setup.'
    },
    'Badgworth': {
      details: 'Located on the ground floor of the 16th Century Hall, with natural daylight, accommodating up to 30 in theatre style.'
    },
    'Beech': {
      details: 'On the ground floor of the Modern Hotel, with natural daylight and a TV screen, perfect for up to 28 in theatre style.'
    },
    'Cedar': {
      details: 'Located on the first floor of the Modern Hotel, with natural daylight, suitable for up to 26 in theatre style.'
    },
    'Chestnut': {
      details: 'On the ground floor of the Modern Hotel, with natural daylight, ideal for up to 30 in theatre style or 27 for dinner.'
    },
    'Courtyard Suite': {
      details: 'In the 16th Century Hall, with natural daylight and two 10ft screens, perfect for large events up to 220 in theatre style.'
    },
    'D\'Eivile': {
      details: 'On the first floor of the 16th Century Hall, with natural daylight, suitable for up to 30 in theatre style.'
    },
    'Directors Suite': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight, ideal for intimate meetings or dinners up to 14.'
    },
    'Holly': {
      details: 'On the ground floor of the Modern Hotel, perfect for small meetings with a capacity of up to 6 in theatre style.'
    },
    'Indore': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight, suitable for up to 30 in theatre style or 28 for dinner.'
    },
    'Massingham': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight, ideal for small meetings up to 15 in theatre style.'
    },
    'Moncreiffe Restaurant': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight and air conditioning, perfect for large events up to 150 in theatre style.'
    },
    'Mordaunt': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight, suitable for up to 60 in theatre style or 48 for dinner.'
    },
    'Oak': {
      details: 'On the ground floor of the Modern Hotel, with a TV screen, ideal for up to 24 in theatre style or 26 for dinner.'
    },
    'Pine': {
      details: 'On the first floor of the Modern Hotel, with natural daylight, suitable for up to 24 in theatre style or 26 for dinner.'
    },
    'Poplar': {
      details: 'On the first floor of the Modern Hotel, with natural daylight and a TV screen, perfect for up to 50 in theatre style or 35 for dinner.'
    },
    'Rowan': {
      details: 'On the first floor of the Modern Hotel, with natural daylight, suitable for up to 30 in theatre style or 27 for dinner.'
    },
    'Silverton': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight, ideal for up to 20 in theatre style.'
    },
    'Sycamore': {
      details: 'On the first floor of the Modern Hotel, with natural daylight and a TV screen, perfect for up to 50 in theatre style or 50 for dinner.'
    },
    'Wicken': {
      details: 'On the ground floor of the 16th Century Hall, with natural daylight, ideal for small meetings up to 10 in theatre style.'
    },
    'Willow': {
      details: 'On the ground floor of the Modern Hotel, with natural daylight and a TV screen, suitable for up to 30 in theatre style or 27 for dinner.'
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

  // Package Toggle Functionality
  const detailsToggles = document.querySelectorAll('.details-toggle');
  detailsToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const details = toggle.nextElementSibling;
      const isActive = toggle.classList.contains('active');

      // Close all toggles
      detailsToggles.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('active');
      });

      // Open current toggle
      if (!isActive) {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        details.classList.add('active');
      }
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