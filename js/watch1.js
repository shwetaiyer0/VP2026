function countdownTimer(targetDate) {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownContainer = document.getElementById('countdownTimer');
    let interval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(interval);
            if (countdownContainer) {
                countdownContainer.style.display = 'none';
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    interval = setInterval(updateCountdown, 1000);
}

// 29 July 2026, 7:00 PM IST → 1:30 PM UTC
const targetDate = new Date(Date.UTC(2026, 6, 29, 13, 30, 0)).getTime();
countdownTimer(targetDate);

document.addEventListener('DOMContentLoaded', function () {
    const now = new Date().getTime();
    const targetDate = new Date(Date.UTC(2026, 6, 29, 13, 30, 0)).getTime();

    if (now >= targetDate) {
        var elements = document.getElementsByClassName('hide');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    }

    const popup = document.getElementById("videoPopup-va");
    const openBtn = document.getElementById("openVideo-va");
    const closeBtn = document.getElementById("closeButton-va");
    const iframe = document.getElementById("youtubeVideo-va");
    const videoURL = "https://www.youtube.com/embed/RZMBD-oJyuY?autoplay=1&controls=1";

    if (!popup || !openBtn || !closeBtn || !iframe) return;

    openBtn.onclick = function () {
        popup.style.display = "block";
        iframe.src = videoURL;
    };

    closeBtn.onclick = function () {
        popup.style.display = "none";
        iframe.src = "";
    };

    window.onclick = function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
            iframe.src = "";
        }
    };
});
