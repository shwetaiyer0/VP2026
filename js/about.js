document.addEventListener("DOMContentLoaded", function () {
  const videoPopup = document.getElementById("video-popup");
  const videoFrame = document.getElementById("video-frame");
  const closeBtn = document.querySelector(".close-vid-btn");

  const videoMap = {
    "swa-vid": "https://www.youtube.com/embed/g2agjA3JXks?controls=1&autoplay=1",
    "slrji-vid": "https://www.youtube.com/embed/2zyM_hmGwUE?controls=1&autoplay=1",
  };

  Object.keys(videoMap).forEach(id => {
    const trigger = document.getElementById(id);
    if (trigger) {
      trigger.addEventListener("click", () => {
        videoFrame.src = videoMap[id];
        videoPopup.style.display = "flex";
      });
    }
  });

  closeBtn.addEventListener("click", () => {
    videoPopup.style.display = "none";
    videoFrame.src = "";
  });

  videoPopup.addEventListener("click", (e) => {
    if (e.target === videoPopup) {
      videoPopup.style.display = "none";
      videoFrame.src = "";
    }
  });
});

// const track = document.getElementById("sliderTrack");
// const images = Array.from(track.children);
// let visibleCount = window.innerWidth <= 768 ? 3 : 6;
// let startIndex = 0;

// function updateSlider() {
//   const imgWidth = images[0].getBoundingClientRect().width + 55;
//   const maxIndex = images.length - visibleCount;

//   if (startIndex < 0) startIndex = 0;
//   if (startIndex > maxIndex) startIndex = maxIndex;

//   track.style.transform = `translateX(-${startIndex * imgWidth}px)`;
// }

// function slide(direction) {
//   startIndex += direction;
//   updateSlider();
// }
// window.addEventListener("resize", updateSlider);
// updateSlider();

const track = document.getElementById("sliderTrack");
const images = Array.from(track.children);
let visibleCount = window.innerWidth <= 768 ? 3 : 6;
let startIndex = 0;

function getImgWidth() {
  return images[0].offsetWidth + parseInt(getComputedStyle(images[0]).marginRight || 0);
}
function updateVisibleCount() {
  visibleCount = window.innerWidth <= 768 ? 3 : 6;
}
function updateSlider() {
  updateVisibleCount();
  const imgWidth = getImgWidth();
  const maxIndex = Math.max(0, images.length - visibleCount);

  if (startIndex < 0) startIndex = 0;
  if (startIndex > maxIndex) startIndex = maxIndex;

  track.style.transform = `translateX(-${startIndex * imgWidth}px)`;
}
function slide(direction) {
  updateVisibleCount();
  const maxIndex = Math.max(0, images.length - visibleCount);
  startIndex += direction;

  if (startIndex < 0) startIndex = 0;
  if (startIndex > maxIndex) startIndex = maxIndex;

  updateSlider();
}

window.addEventListener("resize", updateSlider);
updateSlider();


