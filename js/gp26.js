// YouTube
document.querySelectorAll('.video-container').forEach(container => {
  container.addEventListener('click', function () {

    if (this.querySelector('iframe')) return;

    const videoId = this.dataset.video;

    this.innerHTML = `
        <iframe
            src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
        </iframe>
    `;
  });
});

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