/**
 * Lazy Loading Implementation
 * This script handles lazy loading of images for better performance
 */
document.addEventListener("DOMContentLoaded", () => {
  // Select all images with lazy-load class
  const lazyImages = document.querySelectorAll(".lazy-load")

  // Check if IntersectionObserver is supported
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // If image is in viewport
          if (entry.isIntersecting) {
            const img = entry.target
            // Set the src attribute to load the image
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute("data-src")
            }
            // Remove lazy-load class
            img.classList.remove("lazy-load")
            // Stop observing the image
            imageObserver.unobserve(img)
          }
        })
      },
      {
        rootMargin: "50px 0px", // Load images 50px before they appear in viewport
        threshold: 0.01, // Trigger when at least 1% of the image is visible
      },
    )

    // Observe each lazy image
    lazyImages.forEach((img) => {
      // If image has src attribute, set data-src to src and replace src with placeholder
      if (img.src && !img.dataset.src) {
        img.dataset.src = img.src
      }
      imageObserver.observe(img)
    })
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    let lazyLoadThrottleTimeout

    function lazyLoad() {
      if (lazyLoadThrottleTimeout) {
        clearTimeout(lazyLoadThrottleTimeout)
      }

      lazyLoadThrottleTimeout = setTimeout(() => {
        const scrollTop = window.pageYOffset

        lazyImages.forEach((img) => {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.removeAttribute("data-src")
            }
            img.classList.remove("lazy-load")
          }
        })

        if (lazyImages.length == 0) {
          document.removeEventListener("scroll", lazyLoad)
          window.removeEventListener("resize", lazyLoad)
          window.removeEventListener("orientationChange", lazyLoad)
        }
      }, 20)
    }

    // Add event listeners for scroll, resize, and orientation change
    document.addEventListener("scroll", lazyLoad)
    window.addEventListener("resize", lazyLoad)
    window.addEventListener("orientationChange", lazyLoad)

    // Initial load
    lazyLoad()
  }
})

