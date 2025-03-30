// Gallery Component
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const modal = document.getElementById("gallery-modal")
  const modalImage = document.getElementById("modal-image")
  const closeModal = document.querySelector(".close-modal")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentIndex = 0

  // Open modal when gallery item is clicked
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentIndex = index
      const imgSrc = this.querySelector("img").src
      modalImage.src = imgSrc
      modal.style.display = "flex"
      document.body.style.overflow = "hidden"
    })
  })

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Navigate to previous image
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    modalImage.src = galleryItems[currentIndex].querySelector("img").src
  })

  // Navigate to next image
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryItems.length
    modalImage.src = galleryItems[currentIndex].querySelector("img").src
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        prevBtn.click()
      } else if (e.key === "ArrowRight") {
        nextBtn.click()
      } else if (e.key === "Escape") {
        closeModal.click()
      }
    }
  })
}

