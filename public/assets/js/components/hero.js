// Hero Carousel Component
function initHeroCarousel() {
  const carousel = document.getElementById("hero-carousel")
  const carouselItems = carousel.querySelectorAll(".carousel-item")
  const thumbnails = document.querySelectorAll(".thumbnail")

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const slideIndex = Number.parseInt(this.getAttribute("data-slide"))

      // Remove active class from all thumbnails and add to clicked one
      thumbnails.forEach((thumb) => thumb.classList.remove("active"))
      this.classList.add("active")

      // Hide all slides and show the selected one
      carouselItems.forEach((item) => item.classList.remove("active"))
      carouselItems[slideIndex].classList.add("active")
    })
  })
}

