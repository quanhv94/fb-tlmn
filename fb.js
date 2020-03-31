var goFS = document.createElement("div");
goFS.innerHTML = 'Full screen';
goFS.style.position = 'fixed';
goFS.style.top = 0;
goFS.style.left = 0;
goFS.style.zIndex = 1000;
goFS.style.padding = '10px';
goFS.style.background = '#fff';
goFS.style.opacity = 1;

goFS.addEventListener("click", function () {
  document.webkitCancelFullScreen();
  iframe.webkitRequestFullscreen();
}, false);
var inter = setInterval(() => {
  iframe = document.querySelector('iframe');
  if (iframe) {
    document.body.appendChild(goFS);
    clearInterval(inter)
  }
}, 500);