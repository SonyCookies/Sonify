const deleteButtons = document.querySelectorAll(".deleteSongButton");
const deleteConfirmationModal = document.getElementById(
  "deleteConfirmationModal"
);
const confirmDeleteButton = document.getElementById("confirmDelete");
const cancelDeleteButton = document.getElementById("cancelDelete");

let songIdToDelete;

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    songIdToDelete = button.getAttribute("data-song-id");
    deleteConfirmationModal.classList.remove("hidden");
  });
});

cancelDeleteButton.addEventListener("click", () => {
  deleteConfirmationModal.classList.add("hidden");
});

confirmDeleteButton.addEventListener("click", () => {
  fetch(`/songs/delete/${songIdToDelete}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        deleteConfirmationModal.classList.add("hidden");
        window.location.reload();
      } else {
        console.error("Failed to delete song");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
