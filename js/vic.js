// YouTube
var popup = document.getElementById('videoPopup');
var iframe = document.getElementById('youtubeVideo');
var closeButton = document.getElementById('closeButton');
var playButton = document.querySelector('.playButton');

playButton.addEventListener('click', function() {
    popup.style.display = 'block';
    iframe.src += "&autoplay=1";
});

closeButton.addEventListener('click', function() {
    popup.style.display = 'none';
    iframe.src = iframe.src.replace("&autoplay=1", "");
});

window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
        iframe.src = iframe.src.replace("&autoplay=1", "");
    }
});
function getScrollAmount() {
    var desktopScrollAmount;
    if (window.innerWidth >= 768 && window.innerWidth <= 1290) {
        desktopScrollAmount = 290;
    } else if (window.innerWidth > 1290 && window.innerWidth <= 1440) {
        desktopScrollAmount = 320;
    } else {
        desktopScrollAmount = 290; // Default or handle other cases
    }
    return desktopScrollAmount;
}
let currentScrollPosition = 0;

function scrollSlider(direction) {
    const slider = document.querySelector('.slides');
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const scrollAmount = getScrollAmount();

    currentScrollPosition += direction * scrollAmount;

    if (currentScrollPosition <= 0) {
        currentScrollPosition = 0;
        document.querySelector('#prev_desktop').style.display = 'none';
    } else {
        document.querySelector('#prev_desktop').style.display = 'block';
    }

    if (currentScrollPosition >= maxScroll) {
        currentScrollPosition = maxScroll;
        document.querySelector('#next_desktop').style.display = 'none';
    } else {
        document.querySelector('#next_desktop').style.display = 'block';
    }

    slider.style.transform = `translateX(-${currentScrollPosition}px)`;
}
// Mobile slider
let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.slides_mob');
    const totalSlides = document.querySelectorAll('.slide_mob').length;
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    const translateX = -currentIndex * 100;
    slides.style.transform = `translateX(${translateX}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.prev_mob').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.prev_mob').addEventListener('click', () => moveSlide(1));
});