document.querySelectorAll(".addToPlaylistButton").forEach((button) => {
  button.addEventListener("click", function () {
    const songId = this.getAttribute("data-song-id");
    document.getElementById("songId").value = songId;

    document.getElementById("playlistModal").classList.remove("hidden");
  });
});

document
  .getElementById("cancelModalButton")
  .addEventListener("click", function () {
    document.getElementById("playlistModal").classList.add("hidden");
  });
