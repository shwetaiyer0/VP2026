let interaktLoaded = false;

window.addEventListener("DOMContentLoaded", () => {
  if (!interaktLoaded) {
    const script = document.createElement('script');
    script.src = "https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v=" + new Date().getTime();
    script.async = true;
    script.onload = function () {
      if (typeof kiwi !== 'undefined') {
        kiwi.init('', 'LqZ3wb8jrufhhmvQ97PUIhf6aKhGNIGS', {});
        interaktLoaded = true;
      }
    };
    document.head.appendChild(script);
  }
});


// FAQs accordion
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = content.classList.contains('open');

      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        const arrow = h.querySelector('.arrow');
        if (arrow) arrow.src = '/images/new/down.svg';
      });

      if (!isOpen) {
        content.classList.add('open');
        header.classList.add('active');
        const arrow = header.querySelector('.arrow');
        if (arrow) arrow.src = '/images/new/up.svg';
      }
    });
  });
});


//  Hamburger menu - phone view
// function toggleMenu() {
//   var menu = document.getElementById("mobileMenu");
//   var hamburger = document.getElementById("hamburgerIcon");
//   var isVisible = menu.style.display === "flex";
//   menu.style.display = isVisible ? "none" : "flex";
//   hamburger.classList.toggle("hide", !isVisible);

//   if (isVisible) {
//     menu.style.display = 'none';
//     document.body.classList.remove('noscroll');
//   } else {
//     menu.style.display = 'block';
//     document.body.classList.add('noscroll');
//   }
// }

function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const body = document.body;
  const isOpen = menu.style.display === "flex";

  if (isOpen) {
    menu.style.display = "none";
    body.style.overflow = "auto"; 
  } else {
    menu.style.display = "flex";
    body.style.overflow = "hidden"; 
  }
}