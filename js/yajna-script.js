
// Slider
var slides = document.querySelector('.slides');
var slide = document.querySelector('.slide');
var slideCount = document.querySelectorAll('.slide').length;
var visibleSlides = 3;
var gap = 1; 
let index = 0;

function updateSlider() {
  var movePercent = index * (100 / visibleSlides + gap / visibleSlides);
  slides.style.transform = `translateX(-${movePercent}%)`;
}

document.querySelector('.next').onclick = () => {
  if (index < slideCount - visibleSlides) {
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
  visibleSlides = window.innerWidth <= 844 ? 1 : 3;
  if (index > slideCount - visibleSlides) index = slideCount - visibleSlides;
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


