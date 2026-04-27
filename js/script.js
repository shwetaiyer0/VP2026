document.getElementById('play-button').addEventListener('click', function() {
    var videoId = 'bccJIWBgj7w'; 
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', true);

    var videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; 
    videoContainer.appendChild(iframe);

    document.getElementById('play-button').style.display = 'none'; 
    document.getElementById('close-button').style.display = 'block'; 
});

document.getElementById('close-button').addEventListener('click', function() {
    var videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; 

    document.getElementById('play-button').style.display = 'block'; 
    document.getElementById('close-button').style.display = 'none'; 
});

// document.addEventListener('scroll', function() {
//     const button = document.getElementById('fixedButton');
//     const targetDiv = document.querySelector('.reg-form');
//     const targetRect = targetDiv.getBoundingClientRect();
//     const buttonRect = button.getBoundingClientRect();

//     if (buttonRect.bottom > targetRect.top && buttonRect.top < targetRect.bottom) {
//         button.style.opacity = '0';
//     } else {
//         button.style.opacity = '1';
//     }


// document.addEventListener('scroll', function() {
//     const button = document.getElementById('fixedButton_mob');
//     const targetDiv = document.querySelector('.reg-form');
//     const targetRect = targetDiv.getBoundingClientRect();
//     const buttonRect = button.getBoundingClientRect();

//     if (buttonRect.bottom > targetRect.top && buttonRect.top < targetRect.bottom) {
//         button.style.opacity = '0';
//     } else {
//         button.style.opacity = '1';
//     }
// });