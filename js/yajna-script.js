
// Slider
var slides = document.querySelector('.slides');
var slide = document.querySelector('.slide');
var slideCount = document.querySelectorAll('.slide').length;
var visibleSlides = 1;
var gap = 0; 
let index = 0;

function updateSlider() {
  var movePercent = index * 100;
  slides.style.transform = `translateX(-${movePercent}%)`;
}

document.querySelector('.next').onclick = () => {
  if (index < slideCount - 1) {
    index++;
    updateSlider();
  }
};

document.querySelector('.prev').onclick = () => {
  if (index > 0) {
    index--;
    updateSlider();
  }
};

window.addEventListener('resize', () => {
  visibleSlides = 1;
  if (index > slideCount - 1) index = slideCount - 1;
  updateSlider();
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


