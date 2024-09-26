// let playlistIdToDelete = null;

// // Attach event listeners for delete buttons
// function attachDeleteEventListeners() {
//   document.querySelectorAll(".deletePlaylistButton").forEach((button) => {
//     button.addEventListener("click", function () {
//       playlistIdToDelete = this.getAttribute("data-playlist-id");
//       toggleModal("deleteConfirmationModal", true);
//     });
//   });
// }

// // Call the function once to attach listeners on page load
// attachDeleteEventListeners();

// document
//   .getElementById("confirmDeleteButton")
//   .addEventListener("click", async function () {
//     if (!playlistIdToDelete) return;

//     try {
//       const response = await fetch(`/playlists/delete/${playlistIdToDelete}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete playlist");
//       }

//       const data = await response.json();

//       showFeedbackModal(
//         "Success",
//         data.message || "Playlist deleted successfully!"
//       );

//       // Refresh the playlist list after deletion
//       await updatePlaylistsAfterDelete();

//       toggleModal("deleteConfirmationModal", false);
//     } catch (error) {
//       console.error("Error deleting playlist:", error);

//       showFeedbackModal(
//         "Error",
//         "Failed to delete playlist. Please try again."
//       );
//     } finally {
//       toggleModal("deleteConfirmationModal", false);
//       playlistIdToDelete = null;
//     }
//   });

// document
//   .getElementById("cancelDeleteButton")
//   .addEventListener("click", function () {
//     toggleModal("deleteConfirmationModal", false);
//     playlistIdToDelete = null;
//   });

// document
//   .getElementById("closeFeedbackButton")
//   .addEventListener("click", function () {
//     toggleModal("feedbackModal", false);
//   });

// function showFeedbackModal(title, message) {
//   document.getElementById("feedbackTitle").textContent = title;
//   document.getElementById("feedbackMessage").textContent = message;
//   toggleModal("feedbackModal", true);
// }

// function toggleModal(modalId, show) {
//   const modal = document.getElementById(modalId);
//   modal.classList.toggle("hidden", !show);
// }

// // Function to update playlist list
// async function updatePlaylistsAfterDelete() {
//   try {
//     const response = await fetch("/playlists", {
//       headers: {
//         "X-Requested-With": "XMLHttpRequest",
//       },
//     });
//     const playlistsHTML = await response.text();

//     // Update the playlist container with new HTML
//     document.querySelector(".playlists-container").innerHTML = playlistsHTML;

//     // Re-attach event listeners for delete buttons after updating the list
//     attachDeleteEventListeners();
//   } catch (error) {
//     console.error("Failed to refresh playlists:", error);
//   }
// }
