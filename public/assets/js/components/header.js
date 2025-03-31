/**
 * Header Component
 * Handles sticky header behavior and mobile menu
 */
function initStickyHeader() {
  const header = document.getElementById("sticky-header")
  const navbarToggler = document.querySelector(".navbar-toggler")
  const navbarCollapse = document.querySelector(".navbar-collapse")

  if (!header) return

  // Sticky header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", function () {
      this.classList.toggle("active")
      navbarCollapse.classList.toggle("show")

      // Prevent body scrolling when menu is open
      if (navbarCollapse.classList.contains("show")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })

    // Add close button to mobile menu
    const closeButton = document.createElement("button")
    closeButton.className = "navbar-close"
    closeButton.innerHTML = "&times;"
    closeButton.setAttribute("aria-label", "Close menu")
    navbarCollapse.prepend(closeButton)

    closeButton.addEventListener("click", () => {
      navbarToggler.classList.remove("active")
      navbarCollapse.classList.remove("show")
      document.body.style.overflow = ""
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        navbarCollapse.classList.contains("show") &&
        !navbarCollapse.contains(event.target) &&
        !navbarToggler.contains(event.target)
      ) {
        navbarToggler.classList.remove("active")
        navbarCollapse.classList.remove("show")
        document.body.style.overflow = ""
      }
    })

    // Close menu when clicking on a link
    const navLinks = navbarCollapse.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbarToggler.classList.remove("active")
        navbarCollapse.classList.remove("show")
        document.body.style.overflow = ""
      })
    })
  }

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })
}

// Make function globally available
window.initStickyHeader = initStickyHeader

