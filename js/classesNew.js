let classData = [];
let map;
let markers = [];

// 1. Declare initMap globally on window FIRST
window.initMap = function () {
  const mapElement = document.getElementById("map");
  if (mapElement) {
    map = new google.maps.Map(mapElement, {
      center: { lat: 18.5204, lng: 73.8567 },
      zoom: 11
    });
  }

  fetch("/js/classData.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      classData = data;
      populateDropdowns();
      setDropdownsFromURL(); // Sync dropdowns with URL search parameters
      filterClasses(false);  // Filter without overwriting the initial URL
    })
    .catch(err => console.error("Error loading class data:", err));
};

document.addEventListener("DOMContentLoaded", function () {
  const videoPopup = document.getElementById("video-popup");
  const videoFrame = document.getElementById("video-frame");
  const closeBtn = document.querySelector(".close-vid-btn");
  const trigger = document.getElementById("video-trigger");
  const videoUrl = "https://www.youtube.com/embed/aBADWpeitEI?controls=1&autoplay=1";

  if (trigger && videoPopup && videoFrame) {
    trigger.addEventListener("click", () => {
      videoFrame.src = videoUrl;
      videoPopup.style.display = "flex";
    });
  }

  if (closeBtn && videoPopup && videoFrame) {
    closeBtn.addEventListener("click", () => {
      videoPopup.style.display = "none";
      videoFrame.src = "";
    });
  }

  if (videoPopup && videoFrame) {
    videoPopup.addEventListener("click", e => {
      if (e.target === videoPopup) {
        videoPopup.style.display = "none";
        videoFrame.src = "";
      }
    });
  }
});

// Sync dropdown selections from browser URL parameters
function setDropdownsFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const areaParam = urlParams.get("area");
  const dayParam = urlParams.get("day");

  const areaSelect = document.getElementById("areaDropdown");
  const daySelect = document.getElementById("dayDropdown");

  if (areaParam && areaSelect) {
    // Find matching option (case-insensitive)
    const matchingAreaOpt = Array.from(areaSelect.options).find(
      opt => opt.value.toLowerCase() === areaParam.toLowerCase()
    );
    if (matchingAreaOpt) areaSelect.value = matchingAreaOpt.value;
  }

  if (dayParam && daySelect) {
    // Find matching option (case-insensitive)
    const matchingDayOpt = Array.from(daySelect.options).find(
      opt => opt.value.toLowerCase() === dayParam.toLowerCase()
    );
    if (matchingDayOpt) daySelect.value = matchingDayOpt.value;
  }
}

// Update browser address bar without reloading the page
function updateURLParams(area, day) {
  const url = new URL(window.location);

  if (area && area !== "AREA" && area !== "") {
    url.searchParams.set("area", area.toLowerCase());
  } else {
    url.searchParams.delete("area");
  }

  if (day && day !== "DAY OF THE WEEK" && day !== "") {
    url.searchParams.set("day", day.toLowerCase());
  } else {
    url.searchParams.delete("day");
  }

  window.history.pushState({}, "", url);
}

function populateDropdowns() {
  const areaSet = new Set();
  const daySet = new Set();

  classData.forEach(cls => {
    if (cls.area) areaSet.add(cls.area.trim());
    if (cls.day) daySet.add(cls.day.trim().toUpperCase());
  });

  const sortedAreas = Array.from(areaSet).sort((a, b) => a.localeCompare(b));
  populateSelect("areaDropdown", [
    { value: "", text: "AREA" },
    { value: "All", text: "ALL" },
    ...sortedAreas.map(area => ({ value: area, text: area.toUpperCase() }))
  ]);

  const dayOrder = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const availableDays = Array.from(daySet);
  const sortedDays = dayOrder.filter(day => availableDays.includes(day));

  populateSelect("dayDropdown", [
    { value: "", text: "DAY OF THE WEEK" },
    { value: "All", text: "ALL" },
    ...sortedDays.map(day => ({ value: day, text: day }))
  ]);
}

function populateSelect(selectId, items) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = "";
  items.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.text;
    if (index === 0) option.selected = true;
    select.appendChild(option);
  });
}

function filterClasses(shouldUpdateURL = true) {
  const areaSelect = document.getElementById("areaDropdown");
  const daySelect = document.getElementById("dayDropdown");
  const message = document.getElementById("search-message");
  const resultsDiv = document.getElementById("search-results");

  if (!areaSelect || !daySelect) return;

  const rawArea = areaSelect.value.trim();
  const rawDay = daySelect.value.trim().toUpperCase();

  // Update browser URL query parameters when user interacts with dropdowns
  if (shouldUpdateURL) {
    updateURLParams(rawArea, rawDay);
  }

  const isAreaDefault = rawArea === "" || rawArea === "AREA";
  const isDayDefault = rawDay === "" || rawDay === "DAY OF THE WEEK";

  // Clear map markers
  markers.forEach(m => m.setMap(null));
  markers = [];

  // Default state: Show all markers on map, hide search results section
  if (isAreaDefault && isDayDefault) {
    if (map) {
      classData.forEach(cls => {
        const marker = new google.maps.Marker({
          position: { lat: Number(cls.lat), lng: Number(cls.lng) },
          map: map,
          title: cls.text
        });
        markers.push(marker);
      });
    }

    if (resultsDiv) {
      resultsDiv.innerHTML = "";
      resultsDiv.style.display = "none";
    }
    if (message) {
      message.textContent = "";
      message.style.display = "none";
    }
    return;
  }

  // Case-insensitive filtering logic
  let filtered = classData.filter(cls => {
    const clsArea = cls.area ? cls.area.trim().toLowerCase() : "";
    const clsDay = cls.day ? cls.day.trim().toLowerCase() : "";
    
    const targetArea = rawArea.toLowerCase();
    const targetDay = rawDay.toLowerCase();

    const matchesArea = isAreaDefault || targetArea === "all" || clsArea === targetArea;
    const matchesDay = isDayDefault || targetDay === "all" || clsDay === targetDay;

    return matchesArea && matchesDay;
  });

  // Re-center map and add filtered markers
  if (map && filtered.length > 0) {
    map.setCenter({ lat: Number(filtered[0].lat), lng: Number(filtered[0].lng) });
  }

  if (map) {
    filtered.forEach(cls => {
      const marker = new google.maps.Marker({
        position: { lat: Number(cls.lat), lng: Number(cls.lng) },
        map: map,
        title: cls.text
      });
      markers.push(marker);
    });
  }

  // Render search results UI
  if (filtered.length === 0) {
    if (resultsDiv) {
      resultsDiv.innerHTML = "";
      resultsDiv.style.display = "none";
    }
    if (message) {
      message.textContent = "No matches found. Try adjusting your search.";
      message.style.display = "block";
    }
    return;
  }

  if (message) {
    message.textContent = "See below for search results.";
    message.style.display = "block";
  }

  if (resultsDiv) {
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
}