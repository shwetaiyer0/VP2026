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