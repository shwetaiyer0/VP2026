
// Slider
const slides = document.querySelector('.slides');
const slideElements = document.querySelectorAll('.slide');
const slideCount = slideElements.length;
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
  if (window.innerWidth <= 767) {
    const slideWidth = slideElements[0].offsetWidth;
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
  } else {
    slides.style.transform = `translateX(-${index * 100}%)`;
  }

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

window.addEventListener('resize', updateSlider);

startAutoSlide();
updateSlider();

// Speaker slider
if (window.innerWidth <= 767) {
  const slider = document.querySelector('.articles-slider');
  const slides = document.querySelectorAll('.article-slide');
  const prevBtn = document.querySelector('.article-prev');
  const nextBtn = document.querySelector('.article-next');
  let currentIndex = 0;
  const totalSlides = slides.length;
  const visibleCards = 2;
  const maxIndex = totalSlides - visibleCards;

  function updateArticleSlider() {

    const slideWidth = slides[0].offsetWidth + 14;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateArticleSlider();
    }
  });

  prevBtn.addEventListener('click', () => {

    if (currentIndex > 0) {
      currentIndex--;
      updateArticleSlider();
    }

  });

}

// YouTube
// var popup = document.getElementById('videoPopup');
// var iframe = document.getElementById('youtubeVideo');
// var closeButton = document.getElementById('closeButton');
// var playButton = document.getElementById('playButton');

// playButton.addEventListener('click', function() {
//     var videoURL = playButton.getAttribute('data-video') + "?autoplay=1";
//     iframe.src = videoURL;
//     popup.style.display = 'flex';
// });

// closeButton.addEventListener('click', function() {
//     popup.style.display = 'none';
//     iframe.src = ""; // stop video
// });

// window.addEventListener('click', function(event) {
//     if (event.target === popup) {
//         popup.style.display = 'none';
//         iframe.src = "";
//     }
// });


