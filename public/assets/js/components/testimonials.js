// Testimonials Component
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-slider")
  const slides = document.querySelectorAll(".testimonial-slide")
  const prevBtn = document.querySelector(".testimonial-prev")
  const nextBtn = document.querySelector(".testimonial-next")
  const pagination = document.querySelector(".testimonial-pagination")

  let currentSlide = 0
  let startX,
    moveX,
    initialPosition,
    isDragging = false

  // Create pagination dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("pagination-dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(index))
    pagination.appendChild(dot)
  })

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
  }

  // Next slide
  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length
    goToSlide(currentSlide)
  })

  // Previous slide
  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length
    goToSlide(currentSlide)
  })

  // Touch and mouse events for manual sliding
  slider.addEventListener("mousedown", dragStart)
  slider.addEventListener("touchstart", dragStart)
  slider.addEventListener("mousemove", drag)
  slider.addEventListener("touchmove", drag)
  slider.addEventListener("mouseup", dragEnd)
  slider.addEventListener("touchend", dragEnd)
  slider.addEventListener("mouseleave", dragEnd)

  function dragStart(e) {
    isDragging = true
    startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX
    initialPosition = -currentSlide * 100
    slider.style.transition = "none"
  }

  function drag(e) {
    if (!isDragging) return
    e.preventDefault()
    moveX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX
    const diff = ((moveX - startX) / slider.offsetWidth) * 100
    slider.style.transform = `translateX(${initialPosition + diff}%)`
  }

  function dragEnd() {
    if (!isDragging) return
    isDragging = false
    slider.style.transition = "transform 0.5s ease"

    const movedBy = ((moveX - startX) / slider.offsetWidth) * 100

    if (movedBy < -10 && currentSlide < slides.length - 1) {
      currentSlide++
    } else if (movedBy > 10 && currentSlide > 0) {
      currentSlide--
    }

    goToSlide(currentSlide)
  }
}

