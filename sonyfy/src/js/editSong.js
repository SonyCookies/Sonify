document.addEventListener("DOMContentLoaded", function () {
  const editSongModal = document.getElementById("editSongModal");
  const editSongForm = document.getElementById("editSongForm");
  const closeModalButton = document.getElementById("closeModal");

  function openEditModal(song) {
    document.getElementById("editSongId").value = song.id;
    document.getElementById("editTitle").value = song.title;
    document.getElementById("editArtist").value = song.artist;
    document.getElementById("editAlbum").value = song.album;
    document.getElementById("editGenre").value = song.genre;
    document.getElementById("editReleaseDate").value = song.releaseDate;

    editSongModal.classList.remove("hidden");
  }

  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", function () {
      const songData = JSON.parse(this.getAttribute("data-song"));
      openEditModal(songData);
    });
  });

  closeModalButton.addEventListener("click", function () {
    editSongModal.classList.add("hidden");
  });

  document.getElementById('editSongForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('editSongId').value;
    const title = document.getElementById('editTitle').value;
    const artist = document.getElementById('editArtist').value;
    const album = document.getElementById('editAlbum').value;
    const genre = document.getElementById('editGenre').value;
    const releaseDate = document.getElementById('editReleaseDate').value;

    const songData = { id, title, artist, album, genre, releaseDate };

    try {
      const response = await fetch(`/songs/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(songData),
      });

      const result = await response.json();
      if (response.ok) {
        editSuccessModal.classList.remove("hidden");
        editSongForm.reset();
      } else {
        alert(result.message || 'Failed to update song');
      }
    } catch (error) {
      console.error('Error updating song:', error);
      alert('Error updating song');
    }
  });
});

closeEditSuccessModal.addEventListener("click", () => {
  editSuccessModal.classList.add("hidden");
  window.location.reload(); 
});