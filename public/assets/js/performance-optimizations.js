/**
 * Performance Optimizations
 * This script handles various performance optimizations for the site
 */

// Function to load non-critical resources after page load
function loadDeferredResources() {
  // Load non-critical CSS
  const deferredStylesheets = [
    "assets/css/components/gallery.css",
    "assets/css/components/cta.css",
    "assets/css/components/footer.css",
  ]

  deferredStylesheets.forEach((stylesheet) => {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = stylesheet
    document.head.appendChild(link)
  })

  // Load non-critical scripts
  const deferredScripts = [
    "assets/js/components/gallery.js",
    "assets/js/components/testimonials.js",
    "assets/js/components/countdown.js",
  ]

  deferredScripts.forEach((script) => {
    const scriptEl = document.createElement("script")
    scriptEl.src = script
    document.body.appendChild(scriptEl)
  })
}

// Initialize performance optimizations
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth < 768

  if (isMobile) {
    // For mobile, defer non-critical resources
    // Wait until critical content is loaded
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadDeferredResources)
    } else {
      setTimeout(loadDeferredResources, 2000)
    }
  } else {
    // For desktop, load resources normally but still after DOM is ready
    loadDeferredResources()
  }

  // Lazy load images that are below the fold
  const lazyImages = document.querySelectorAll(".lazy-below-fold")
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.dataset.src
          if (src) {
            img.src = src
            img.removeAttribute("data-src")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    lazyImages.forEach((img) => {
      imageObserver.observe(img)
    })
  }
})

