document.addEventListener("DOMContentLoaded", () => {
  const playSongButtons = document.querySelectorAll(".playSongButton");

  playSongButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const songId = button.getAttribute("data-song-id");
      window.location.href = `/songs/play/${songId}`;
    });
  });
});
