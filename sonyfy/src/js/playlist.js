// Function to toggle modal visibility
function toggleModal(modalId, show) {
  const modal = document.getElementById(modalId);
  modal.classList.toggle("hidden", !show);
}

// Function to show feedback modal
function showFeedbackModal(title, message) {
  document.getElementById("feedbackTitle").textContent = title;
  document.getElementById("feedbackMessage").textContent = message;
  toggleModal("feedbackModal", true);
}

// Function to update the playlist list
async function updatePlaylists() {
  try {
    const response = await fetch("/playlists", {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
    const playlistsHTML = await response.text();
    document.querySelector(".playlists-container").innerHTML = playlistsHTML;
    attachButtonEventListeners(); // Re-attach event listeners after updating the list
  } catch (error) {
    console.error("Failed to refresh playlists:", error);
  }
}

// Function to attach event listeners to all relevant buttons
function attachButtonEventListeners() {
  // Attach event listeners for delete buttons
  document.querySelectorAll(".deletePlaylistButton").forEach((button) => {
    button.addEventListener("click", function () {
      playlistIdToDelete = this.getAttribute("data-playlist-id");
      toggleModal("deleteConfirmationModal", true);
    });
  });

  // Attach event listeners for view buttons
  document.querySelectorAll(".viewPlaylistButton").forEach((button) => {
    button.addEventListener("click", function () {
      const playlistId = this.getAttribute("data-playlist-id");
      viewPlaylist(playlistId);
    });
  });

  // Attach event listener for create playlist button
  document
    .getElementById("createPlaylistButton")
    .addEventListener("click", () => {
      toggleModal("createPlaylistModal", true); // Show create playlist modal
    });
}

// Function to view a playlist
function viewPlaylist(playlistId) {
  window.location.href = `/playlists/view/${playlistId}`;
}

// Creating a new playlist
document.getElementById("createPlaylistForm").onsubmit = async function (
  event
) {
  event.preventDefault(); // Prevent default form submission

  const playlistName = document.getElementById("playlistName").value;

  try {
    const response = await fetch("/playlists/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playlistName }),
    });

    if (!response.ok) throw new Error("Failed to create playlist");

    const data = await response.json();
    console.log(data.message);

    toggleModal("successModal", true);
    toggleModal("createPlaylistModal", false);
    await updatePlaylists(); // Refresh the playlist list without reloading the page
  } catch (error) {
    console.error(error);
    alert("An error occurred while creating the playlist.");
  }
};

// Event listeners for modal close buttons
document
  .getElementById("closeSuccessModalButton")
  .addEventListener("click", () => {
    toggleModal("successModal", false);
    toggleModal("createPlaylistModal", false);
  });

document
  .getElementById("closeCreatePlaylistModalButton")
  .addEventListener("click", () => {
    toggleModal("createPlaylistModal", false);
  });

// Confirm delete button functionality
document
  .getElementById("confirmDeleteButton")
  .addEventListener("click", async function () {
    if (!playlistIdToDelete) return;

    try {
      const response = await fetch(`/playlists/delete/${playlistIdToDelete}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete playlist");

      const data = await response.json();
      showFeedbackModal(
        "Success",
        data.message || "Playlist deleted successfully!"
      );
      await updatePlaylists(); // Refresh playlist after deletion
    } catch (error) {
      console.error("Error deleting playlist:", error);
      showFeedbackModal(
        "Error",
        "Failed to delete playlist. Please try again."
      );
    } finally {
      toggleModal("deleteConfirmationModal", false);
      playlistIdToDelete = null;
    }
  });

// Close buttons for other modals
document.getElementById("cancelDeleteButton").addEventListener("click", () => {
  toggleModal("deleteConfirmationModal", false);
  playlistIdToDelete = null;
});

document.getElementById("closeFeedbackButton").addEventListener("click", () => {
  toggleModal("feedbackModal", false);
});

// Initial setup
attachButtonEventListeners();
