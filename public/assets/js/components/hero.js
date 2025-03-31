/**
 * Hero Carousel Component
 * Optimized for performance
 */
function initHeroCarousel() {
  const carousel = document.getElementById("hero-carousel")
  const carouselItems = carousel?.querySelectorAll(".carousel-item")
  const thumbnails = document.querySelectorAll(".thumbnail")

  if (!carousel || !carouselItems || carouselItems.length === 0) return

  let currentIndex = 0
  let interval
  const autoPlayDelay = 5000 // 5 seconds

  // Initialize carousel
  function showSlide(index) {
    // Hide all slides
    carouselItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Show selected slide
    carouselItems[index].classList.add("active")

    // Update thumbnails
    if (thumbnails && thumbnails.length > 0) {
      thumbnails.forEach((thumb) => {
        thumb.classList.remove("active")
      })
      thumbnails[index].classList.add("active")
    }

    // Update current index
    currentIndex = index

    // Preload next slide image if it's a lazy-loaded image
    const nextIndex = (index + 1) % carouselItems.length
    const nextSlideImg = carouselItems[nextIndex].querySelector("img.lazy-below-fold")
    if (nextSlideImg && nextSlideImg.dataset.src) {
      nextSlideImg.src = nextSlideImg.dataset.src
      nextSlideImg.removeAttribute("data-src")
    }
  }

  // Next slide
  function nextSlide() {
    let nextIndex = currentIndex + 1
    if (nextIndex >= carouselItems.length) {
      nextIndex = 0
    }
    showSlide(nextIndex)
  }

  // Previous slide
  function prevSlide() {
    let prevIndex = currentIndex - 1
    if (prevIndex < 0) {
      prevIndex = carouselItems.length - 1
    }
    showSlide(prevIndex)
  }

  // Start autoplay
  function startAutoplay() {
    interval = setInterval(nextSlide, autoPlayDelay)
  }

  // Stop autoplay
  function stopAutoplay() {
    clearInterval(interval)
  }

  // Initialize first slide
  showSlide(0)

  // Start autoplay
  startAutoplay()

  // Thumbnail click event
  if (thumbnails && thumbnails.length > 0) {
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        stopAutoplay()
        showSlide(index)
        startAutoplay()
      })
    })
  }

  // Add swipe functionality for mobile
  let touchStartX = 0
  let touchEndX = 0

  carousel.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX
      stopAutoplay()
    },
    { passive: true },
  )

  carousel.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
      startAutoplay()
    },
    { passive: true },
  )

  function handleSwipe() {
    const swipeThreshold = 50
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, go to next slide
      nextSlide()
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, go to previous slide
      prevSlide()
    }
  }

  // Pause autoplay when hovering over carousel
  carousel.addEventListener("mouseenter", stopAutoplay)
  carousel.addEventListener("mouseleave", startAutoplay)

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      stopAutoplay()
      prevSlide()
      startAutoplay()
    } else if (e.key === "ArrowRight") {
      stopAutoplay()
      nextSlide()
      startAutoplay()
    }
  })

  // Add scroll indicator
  const heroSection = document.querySelector(".hero-section")
  if (heroSection) {
    const scrollIndicator = document.createElement("div")
    scrollIndicator.className = "scroll-indicator"
    scrollIndicator.innerHTML = `
      <span>Scroll</span>
      <div class="scroll-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <polyline points="7 13 12 18 17 13"></polyline>
        </svg>
      </div>
    `
    heroSection.appendChild(scrollIndicator)

    // Hide scroll indicator when scrolling down
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0"
      } else {
        scrollIndicator.style.opacity = "1"
      }
    })
  }
}

// Make function globally available
window.initHeroCarousel = initHeroCarousel

