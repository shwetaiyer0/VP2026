document.addEventListener('DOMContentLoaded', function() {
  const regForm = document.getElementById('reg-form');
  const button = document.querySelector('.attend-link');

  function toggleButton() {
    const formTop = regForm.offsetTop;
    const formBottom = formTop + regForm.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight / 2; 

    if (scrollY >= formTop && scrollY <= formBottom) {
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    } else {
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
    }
  }

  window.addEventListener('scroll', toggleButton);
  toggleButton();
});

// YouTube
var popup = document.getElementById('videoPopup');
var iframe = document.getElementById('youtubeVideo');
var closeButton = document.getElementById('closeButton');
var playButton = document.getElementById('playButton');

playButton.addEventListener('click', function() {
    var videoURL = playButton.getAttribute('data-video') + "?autoplay=1";
    iframe.src = videoURL;
    popup.style.display = 'flex';
});

closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
    iframe.src = ""; // stop video
});

window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
        iframe.src = "";
    }
});