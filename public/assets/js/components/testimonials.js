/**
 * Testimonials Component
 * Handles testimonial slider functionality
 */
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider")
  const slides = document.querySelectorAll(".testimonial-slide")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")
  const pagination = document.querySelector(".testimonial-pagination")

  if (!slider || !slides.length) return

  let currentSlide = 0
  let startX,
    moveX,
    initialPosition,
    isDragging = false
  let autoplayInterval
  const autoplayDelay = 6000 // 6 seconds

  // Create pagination dots
  if (pagination) {
    pagination.innerHTML = ""
    slides.forEach((_, index) => {
      const dot = document.createElement("div")
      dot.classList.add("pagination-dot")
      if (index === 0) dot.classList.add("active")
      dot.addEventListener("click", () => goToSlide(index))
      pagination.appendChild(dot)
    })
  }

  // Update pagination
  function updatePagination() {
    const dots = document.querySelectorAll(".pagination-dot")
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  // Go to specific slide
  function goToSlide(index) {
    currentSlide = index
    slider.style.transform = `translateX(-${currentSlide * 100}%)`
    updatePagination()
    resetAutoplay()
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    goToSlide(currentSlide)
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    goToSlide(currentSlide)
  }

  // Set up autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, autoplayDelay)
  }

  // Reset autoplay timer
  function resetAutoplay() {
    clearInterval(autoplayInterval)
    startAutoplay()
  }

  // Initialize autoplay
  startAutoplay()

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide()
    })
  }

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide()
    })
  }

  // Touch and mouse events for manual sliding
  slider.addEventListener("mousedown", dragStart)
  slider.addEventListener("touchstart", dragStart, { passive: true })
  slider.addEventListener("mousemove", drag)
  slider.addEventListener("touchmove", drag, { passive: false })
  slider.addEventListener("mouseup", dragEnd)
  slider.addEventListener("touchend", dragEnd)
  slider.addEventListener("mouseleave", dragEnd)

  function dragStart(e) {
    isDragging = true
    startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX
    initialPosition = -currentSlide * 100
    slider.style.transition = "none"

    // Pause autoplay during drag
    clearInterval(autoplayInterval)
  }

  function drag(e) {
    if (!isDragging) return

    // Prevent default only for mouse events to avoid scroll blocking on touch
    if (e.type.includes("mouse")) {
      e.preventDefault()
    }

    moveX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX
    const diff = ((moveX - startX) / slider.offsetWidth) * 100
    slider.style.transform = `translateX(${initialPosition + diff}%)`
  }

  function dragEnd() {
    if (!isDragging) return
    isDragging = false
    slider.style.transition = "transform 0.5s ease"

    if (!moveX) {
      // If no movement, reset to current slide
      goToSlide(currentSlide)
      return
    }

    const movedBy = ((moveX - startX) / slider.offsetWidth) * 100

    if (movedBy < -10 && currentSlide < slides.length - 1) {
      currentSlide++
    } else if (movedBy > 10 && currentSlide > 0) {
      currentSlide--
    }

    goToSlide(currentSlide)

    // Restart autoplay
    startAutoplay()
  }

  // Pause autoplay on hover
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoplayInterval)
  })

  slider.addEventListener("mouseleave", () => {
    startAutoplay()
  })

  // Add animation to testimonial content on hover
  slides.forEach((slide) => {
    const content = slide.querySelector(".testimonial-content")
    if (content) {
      content.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)"
        this.style.boxShadow = "var(--shadow-lg)"
      })

      content.addEventListener("mouseleave", function () {
        this.style.transform = ""
        this.style.boxShadow = ""
      })
    }
  })
}

// Make function globally available
window.initTestimonialSlider = initTestimonialSlider

