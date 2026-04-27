const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let index = 0;

function showSlide(idx) {
  const slideWidth = slide[0].clientWidth;
  slides.style.transform = `translateX(${-idx * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
  index = index > 0 ? index - 1 : slide.length - 1;
  showSlide(index);
});

nextButton.addEventListener('click', () => {
  index = index < slide.length - 1 ? index + 1 : 0;
  showSlide(index);
});

setInterval(() => {
  index = index < slide.length - 1 ? index + 1 : 0;
  showSlide(index);
}, 5000);
