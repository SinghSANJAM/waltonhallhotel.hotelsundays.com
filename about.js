document.addEventListener('DOMContentLoaded', () => {
   

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
  
    // Accordion functionality
    document.querySelectorAll('.accordion-toggle').forEach(toggle => {
      toggle.addEventListener('click', function () {
        const item = this.parentElement;
        const expanded = this.getAttribute('aria-expanded') === 'true';
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-toggle').setAttribute('aria-expanded', 'false');
        });
        if (!expanded) {
          item.classList.add('active');
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  
    // YouTube Video Player
    var player;
    var playBtn = document.getElementById('customPlayBtn');
  
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player('youtubeVideo', {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };
  
    function onPlayerReady(event) {
      playBtn.addEventListener('click', function () {
        playBtn.style.display = 'none';
        player.playVideo();
      });
    }
  
    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        playBtn.style.display = 'block';
      }
    }
  
    // Load YouTube API
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  });