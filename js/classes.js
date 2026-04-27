let classData = [];
let map;
let markers = [];

document.addEventListener("DOMContentLoaded", function () {
  const videoPopup = document.getElementById("video-popup");
  const videoFrame = document.getElementById("video-frame");
  const closeBtn = document.querySelector(".close-vid-btn");
  const trigger = document.getElementById("video-trigger");
  const videoUrl = "https://www.youtube.com/embed/aBADWpeitEI?controls=1&autoplay=1";

  if (trigger) {
    trigger.addEventListener("click", () => {
      videoFrame.src = videoUrl;
      videoPopup.style.display = "flex";
    });
  }

  closeBtn.addEventListener("click", () => {
    videoPopup.style.display = "none";
    videoFrame.src = "";
  });

  videoPopup.addEventListener("click", e => {
    if (e.target === videoPopup) {
      videoPopup.style.display = "none";
      videoFrame.src = "";
    }
  });
});

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 18.5204, lng: 73.8567 },
    zoom: 11
  });

  fetch("js/classData.json")
    .then(res => res.json())
    .then(data => {
      classData = data;
      populateDropdowns();
      filterClasses();
    });
}

function populateDropdowns() {
  const areaSet = new Set();
  const daySet = new Set();

  classData.forEach(cls => {
    areaSet.add(cls.area);
    daySet.add(cls.day);
  });

  populateSelect("areaDropdown", ["AREA", "ALL", ...Array.from(areaSet).sort()]);
  const dayOrder = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const availableDays = Array.from(daySet).filter(day => dayOrder.includes(day));
  const sortedDays = dayOrder.filter(day => availableDays.includes(day));
  populateSelect("dayDropdown", ["DAY OF THE WEEK", "ALL", ...sortedDays]);
}

function populateSelect(selectId, items) {
  const select = document.getElementById(selectId);
  select.innerHTML = "";
  items.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    if (index === 0) option.selected = true;
    select.appendChild(option);
  });
}

function filterClasses() {
  let area = document.getElementById("areaDropdown").value;
  let day = document.getElementById("dayDropdown").value;
  const message = document.getElementById("search-message");
  const resultsDiv = document.getElementById("search-results");

  const isAreaDefault = area === "AREA";
  const isDayDefault = day === "DAY OF THE WEEK";

  markers.forEach(m => m.setMap(null));
  markers = [];

  let filtered = [];

  if (isAreaDefault && isDayDefault) {
    classData.forEach(cls => {
      const marker = new google.maps.Marker({
        position: { lat: cls.lat, lng: cls.lng },
        map: map,
        title: cls.text
      });
      markers.push(marker);
    });
    resultsDiv.innerHTML = "";
    resultsDiv.style.display = "none";
    message.textContent = "";
    message.style.display = "none";
    return;
  }

  if (
    (area === "ALL" && day === "ALL") ||
    (area === "ALL" && isDayDefault) ||
    (isAreaDefault && day === "ALL")
  ) {
    filtered = classData;
  } else if ((area === "ALL" || isAreaDefault) && day !== "ALL" && !isDayDefault) {
    filtered = classData.filter(cls => cls.day === day);
  } else if (area !== "ALL" && !isAreaDefault && (day === "ALL" || isDayDefault)) {
    filtered = classData.filter(cls => cls.area === area);
  } else if (area !== "ALL" && !isAreaDefault && day !== "ALL" && !isDayDefault) {
    filtered = classData.filter(cls => cls.area === area && cls.day === day);
  }

  if (filtered.length > 0) {
    map.setCenter({ lat: filtered[0].lat, lng: filtered[0].lng });
  }

  filtered.forEach(cls => {
    const marker = new google.maps.Marker({
      position: { lat: cls.lat, lng: cls.lng },
      map: map,
      title: cls.text
    });
    markers.push(marker);
  });

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "";
    resultsDiv.style.display = "none";
    message.textContent = "No matches found. Try adjusting your search.";
    message.style.display = "block";
    return;
  }

  message.textContent = "See below for search results.";
  message.style.display = "block";
  resultsDiv.style.display = "block";
  resultsDiv.innerHTML = `
    <h1>View Search Results</h1>
    <div class="results-grid">
      ${filtered.map((cls, idx) => `
        <div class="class-card" style="background-color: ${idx % 2 === 0 ? "rgba(40, 40, 40, 0.1)" : "rgba(234, 218, 197, 0.5)"};">
          <h3>${cls.text}</h3>
          <h2>${cls.day} | ${cls.time}</h2>
          <p>${cls.location}</p>
          <p class="contact">${cls.contact}</p>
          ${cls.youth ? `<h2 class="youth-badge">Youth Class</h2>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

window.initMap = initMap;
