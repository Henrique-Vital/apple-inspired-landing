/**
 * Main JavaScript File
 * Optimized for performance
 */
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on the product page or form page
  const productPage = document.getElementById("product-page")
  const leadForm = document.getElementById("lead-form")

  // If product page is visible (e.g., user has already submitted the form)
  if (productPage && !productPage.classList.contains("d-none")) {
    initCriticalComponents()

    // Load non-critical components only when needed
    if ("IntersectionObserver" in window) {
      const sections = document.querySelectorAll("section")
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const sectionId = entry.target.id
              if (sectionId === "gallery" && typeof initGallery === "function") {
                initGallery()
              } else if (sectionId === "cta" && typeof initCountdown === "function") {
                initCountdown()
              }
              sectionObserver.unobserve(entry.target)
            }
          })
        },
        { rootMargin: "100px" },
      )

      sections.forEach((section) => {
        sectionObserver.observe(section)
      })
    }
  }

  // Service Worker Registration for offline functionality
  if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("ServiceWorker registration successful with scope: ", registration.scope)
        })
        .catch((error) => {
          console.log("ServiceWorker registration failed: ", error)
        })
    })
  }
})

/**
 * Initialize only critical components
 */
function initCriticalComponents() {
  // Initialize only the most critical components
  if (typeof initStickyHeader === "function") initStickyHeader()
  if (typeof initHeroCarousel === "function") initHeroCarousel()

  // Add back to top button
  addBackToTopButton()
}

/**
 * Add back to top button
 */
function addBackToTopButton() {
  const footer = document.querySelector(".footer")
  if (!footer) return

  const backToTop = document.createElement("button")
  backToTop.id = "back-to-top"
  backToTop.className = "back-to-top"
  backToTop.setAttribute("aria-label", "Back to top")
  backToTop.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `

  document.body.appendChild(backToTop)

  // Show/hide back to top button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("show")
    } else {
      backToTop.classList.remove("show")
    }
  })

  // Scroll to top when clicked
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

/**
 * Add background elements to sections
 */
function addBackgroundElements() {
  // About section background elements
  const aboutSection = document.querySelector(".about-section")
  if (aboutSection) {
    const bgCircle1 = document.createElement("div")
    bgCircle1.className = "about-bg-circle about-bg-circle-1"
    aboutSection.appendChild(bgCircle1)

    const bgCircle2 = document.createElement("div")
    bgCircle2.className = "about-bg-circle about-bg-circle-2"
    aboutSection.appendChild(bgCircle2)

    const floatingElement1 = document.createElement("div")
    floatingElement1.className = "floating-element floating-element-1"
    aboutSection.appendChild(floatingElement1)

    const floatingElement2 = document.createElement("div")
    floatingElement2.className = "floating-element floating-element-2"
    aboutSection.appendChild(floatingElement2)
  }

  // Testimonials section background pattern
  const testimonialsSection = document.querySelector(".testimonials-section")
  if (testimonialsSection) {
    const bgPattern = document.createElement("div")
    bgPattern.className = "testimonials-bg-pattern"
    testimonialsSection.appendChild(bgPattern)
  }

  // CTA section background elements
  const ctaSection = document.querySelector(".cta-section")
  if (ctaSection) {
    const ctaPattern = document.createElement("div")
    ctaPattern.className = "cta-pattern"
    ctaSection.appendChild(ctaPattern)

    const floatingElement1 = document.createElement("div")
    floatingElement1.className = "cta-floating-element cta-floating-element-1"
    ctaSection.appendChild(floatingElement1)

    const floatingElement2 = document.createElement("div")
    floatingElement2.className = "cta-floating-element cta-floating-element-2"
    ctaSection.appendChild(floatingElement2)
  }

  // Lead form section decoration
  const leadFormSection = document.querySelector(".lead-form-section")
  if (leadFormSection) {
    const decoration = document.createElement("div")
    decoration.className = "lead-form-decoration"
    leadFormSection.appendChild(decoration)
  }
}

// Make functions globally available
window.initCriticalComponents = initCriticalComponents
window.addBackToTopButton = addBackToTopButton

// Declare variables to avoid errors
let initStickyHeader
let initHeroCarousel
let initGallery
let initTestimonialSlider
let initCountdown

