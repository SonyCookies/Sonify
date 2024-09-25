// Function to toggle modal visibility
function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  modal.classList.toggle('hidden', !show);
}

// Event listener for the create playlist button
document.getElementById('createPlaylistButton').addEventListener('click', () => {
  toggleModal('createPlaylistModal', true);
});

// Handle form submission
document.getElementById("createPlaylistForm").onsubmit = async function (event) {
  event.preventDefault(); // Prevent default form submission

  const playlistName = document.getElementById("playlistName").value;

  try {
    const response = await fetch("/playlists/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playlistName }),
    });

    if (!response.ok) {
      throw new Error("Failed to create playlist");
    }

    const data = await response.json();
    console.log(data.message); // Optional: Log the success message
    toggleModal('successModal', true); // Show success modal
    toggleModal('createPlaylistModal', false); // Close create playlist modal
  } catch (error) {
    console.error(error);
    alert("An error occurred while creating the playlist."); // Optional: Handle errors
  }
};

// Close the success modal and also close create playlist modal
document.getElementById('closeSuccessModalButton').addEventListener('click', () => {
  toggleModal('successModal', false); // Close success modal
  toggleModal('createPlaylistModal', false); // Also close create playlist modal
});

// Close button for create playlist modal
document.getElementById('closeCreatePlaylistModalButton').addEventListener('click', () => {
  toggleModal('createPlaylistModal', false); // Close create playlist modal
});


function viewPlaylist(playlistId) {
  window.location.href = `/playlists/${playlistId}`;
}