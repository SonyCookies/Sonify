document.addEventListener("DOMContentLoaded", function () {
  const albumCover = document.getElementById("albumCover");
  const songPlayPage = document.getElementById("songPlayPage");

  function applyDominantColor() {
    const colorThief = new ColorThief();

    if (albumCover.complete && colorThief) {
      const dominantColor = colorThief.getColor(albumCover);

      songPlayPage.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
    } else {
      albumCover.addEventListener("load", function () {
        const dominantColor = colorThief.getColor(albumCover);
        songPlayPage.style.backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;
      });
    }
  }

  applyDominantColor();

  const playPauseButton = document.getElementById("playPauseButton");
  let isPlaying = false;

  playPauseButton.addEventListener("click", () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" /></svg>`;
    } else {
      playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-6.12-3.408A1 1 0 007 8.62v6.76a1 1 0 001.632.774l6.12-3.408a1 1 0 000-1.768z" /></svg>`;
    }
  });
});
