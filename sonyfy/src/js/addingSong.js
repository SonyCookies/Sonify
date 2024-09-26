const addSongButton = document.getElementById("addSongButton");
const addSongModal = document.getElementById("addSongModal");
const closeModalButton = document.getElementById("closeModalButton");
const addSongForm = document.getElementById("addSongForm");

addSongButton.addEventListener("click", () => {
  addSongModal.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  addSongModal.classList.add("hidden");
});

addSongForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(addSongForm);

  fetch("/songs/add", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        addSongModal.classList.add("hidden");
        addSongForm.reset();

        successModal.classList.remove("hidden");
      } else {
        console.error("Failed to add song");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

closeSuccessModal.addEventListener("click", () => {
  successModal.classList.add("hidden");
  window.location.reload();
});
