/**
 * Gallery Component
 * Handles gallery grid and modal functionality
 */
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item")
  const modal = document.getElementById("gallery-modal")
  const modalImage = document.getElementById("modal-image")
  const closeModal = document.querySelector(".close-modal")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")
  let currentIndex = 0

  if (!galleryItems.length || !modal || !modalImage) return

  // Add captions to gallery items
  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img")
    if (img) {
      const caption = document.createElement("div")
      caption.className = "gallery-item-caption"

      // Get alt text for caption
      const altText = img.alt || `Image ${index + 1}`
      const captionTitle = altText.split(" ").slice(0, 2).join(" ")
      const captionDesc = altText.split(" ").slice(2).join(" ")

      caption.innerHTML = `
        <h4>${captionTitle}</h4>
        <p>${captionDesc}</p>
      `

      item.appendChild(caption)
    }
  })

  // Open modal when gallery item is clicked
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentIndex = index
      openModal(this)
    })
  })

  // Open modal and show image
  function openModal(item) {
    const img = item.querySelector("img")
    if (!img) return

    // Get image source and alt text
    const imgSrc = img.src
    const imgAlt = img.alt || `Image ${currentIndex + 1}`

    // Set modal image
    modalImage.src = imgSrc
    modalImage.alt = imgAlt

    // Add caption to modal
    let modalCaption = modal.querySelector(".modal-caption")
    if (!modalCaption) {
      modalCaption = document.createElement("div")
      modalCaption.className = "modal-caption"
      modal.querySelector(".modal-content").appendChild(modalCaption)
    }
    modalCaption.textContent = imgAlt

    // Show modal with fade-in animation
    modal.style.display = "flex"
    document.body.style.overflow = "hidden"

    setTimeout(() => {
      modal.classList.add("show")
      modalImage.classList.add("show")
    }, 10)
  }

  // Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      closeModalWithAnimation()
    })
  }

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalWithAnimation()
    }
  })

  // Close modal with animation
  function closeModalWithAnimation() {
    modalImage.classList.remove("show")
    modal.classList.remove("show")

    setTimeout(() => {
      modal.style.display = "none"
      document.body.style.overflow = ""
    }, 300)
  }

  // Navigate to previous image
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      navigateGallery("prev")
    })
  }

  // Navigate to next image
  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      navigateGallery("next")
    })
  }

  // Gallery navigation
  function navigateGallery(direction) {
    modalImage.classList.remove("show")

    setTimeout(() => {
      if (direction === "prev") {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
      } else {
        currentIndex = (currentIndex + 1) % galleryItems.length
      }

      const img = galleryItems[currentIndex].querySelector("img")
      if (img) {
        modalImage.src = img.src
        modalImage.alt = img.alt || `Image ${currentIndex + 1}`

        // Update caption
        const modalCaption = modal.querySelector(".modal-caption")
        if (modalCaption) {
          modalCaption.textContent = img.alt || `Image ${currentIndex + 1}`
        }
      }

      setTimeout(() => {
        modalImage.classList.add("show")
      }, 10)
    }, 300)
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        navigateGallery("prev")
      } else if (e.key === "ArrowRight") {
        navigateGallery("next")
      } else if (e.key === "Escape") {
        closeModalWithAnimation()
      }
    }
  })

  // Preload adjacent images for smoother navigation
  function preloadAdjacentImages(index) {
    const totalItems = galleryItems.length

    // Preload next image
    const nextIndex = (index + 1) % totalItems
    const nextImg = galleryItems[nextIndex].querySelector("img")
    if (nextImg && nextImg.src) {
      const preloadNext = new Image()
      preloadNext.src = nextImg.src
    }

    // Preload previous image
    const prevIndex = (index - 1 + totalItems) % totalItems
    const prevImg = galleryItems[prevIndex].querySelector("img")
    if (prevImg && prevImg.src) {
      const preloadPrev = new Image()
      preloadPrev.src = prevImg.src
    }
  }

  // Preload images when hovering over gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener("mouseenter", () => {
      preloadAdjacentImages(index)
    })
  })
}

// Make function globally available
window.initGallery = initGallery

