document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const playPauseButton = document.getElementById("playPauseButton");
  const progressBar = document.getElementById("progressBar");
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");

  const songId = "<%= song._id %>";
  let isPlaying = false;

  const savedSongId = localStorage.getItem("currentSongId");
  const savedIsPlaying = localStorage.getItem("isPlaying");

  if (savedSongId === songId && savedIsPlaying === "true") {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    isPlaying = true;
  } else {
    localStorage.setItem("currentSongId", songId);
    localStorage.setItem("isPlaying", "false");
    localStorage.setItem("currentTime", "0");
  }

  audioPlayer.addEventListener("loadeddata", () => {
    if (audioPlayer.paused) {
      updatePlayPauseButton();
    } else {
      isPlaying = true;
      updatePlayPauseButton();
    }
  });

  function updatePlayPauseButton() {
    playPauseButton.innerHTML = isPlaying
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6" /></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-6.12-3.408A1 1 0 007 8.62v6.76a1 1 0 001.632.774l6.12-3.408a1 1 0 000-1.768z" /></svg>`;
  }

  playPauseButton.addEventListener("click", () => {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseButton();
    localStorage.setItem("isPlaying", isPlaying);
  });

  audioPlayer.addEventListener("timeupdate", () => {
    localStorage.setItem("currentTime", audioPlayer.currentTime);
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
  });

  audioPlayer.addEventListener("loadedmetadata", () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
  });

  progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
  });

  audioPlayer.addEventListener("ended", () => {
    localStorage.removeItem("currentSongId");
    localStorage.removeItem("isPlaying");
    localStorage.removeItem("currentTime");
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }
});
