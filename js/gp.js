
// Slider
const slides = document.querySelector('.slides');
const slideCount = document.querySelectorAll('.slide').length;
const dotsContainer = document.querySelector('.dots');

let index = 0;
let autoSlide;

for (let i = 0; i < slideCount; i++) {
  const dot = document.createElement('div');
  dot.classList.add('dot');

  if (i === 0) {
    dot.classList.add('active');
  }

  dot.addEventListener('click', () => {
    index = i;
    updateSlider();
    restartAutoSlide();
  });

  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    index++;

    if (index >= slideCount) {
      index = 0;
    }

    updateSlider();
  }, 3000); 
}
function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}
startAutoSlide();

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


