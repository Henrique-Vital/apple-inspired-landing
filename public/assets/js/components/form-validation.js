/**
 * Form Validation
 * Optimized for performance
 */
document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const leadForm = document.getElementById("lead-form")
  const productPage = document.getElementById("product-page")
  const leadFormContainer = document.getElementById("lead-form-container")
  const userName = document.getElementById("user-name")

  if (!leadForm) return

  // Phone mask
  const phoneInput = document.getElementById("phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length > 11) value = value.slice(0, 11)

      let formattedValue = ""
      if (value.length > 0) formattedValue = "(" + value.slice(0, 2)
      if (value.length > 2) formattedValue += ") " + value.slice(2, 7)
      if (value.length > 7) formattedValue += "-" + value.slice(7, 11)

      e.target.value = formattedValue
    })
  }

  // Email validation
  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  // Form submission with animation
  if (leadForm) {
    leadForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const nameInput = document.getElementById("name")
      const emailInput = document.getElementById("email")

      let isValid = true

      // Validate name
      if (!nameInput || nameInput.value.trim() === "") {
        nameInput?.classList.add("is-invalid")
        isValid = false
      } else {
        nameInput.classList.remove("is-invalid")
      }

      // Validate email
      if (!emailInput || !isValidEmail(emailInput.value)) {
        emailInput?.classList.add("is-invalid")
        isValid = false
      } else {
        emailInput.classList.remove("is-invalid")
      }

      // Validate phone
      if (!phoneInput || phoneInput.value.length < 14) {
        phoneInput?.classList.add("is-invalid")
        isValid = false
      } else {
        phoneInput.classList.remove("is-invalid")
      }

      if (isValid) {
        // Show loading state
        const submitButton = leadForm.querySelector('button[type="submit"]')
        if (submitButton) {
          const originalText = submitButton.innerHTML
          submitButton.disabled = true
          submitButton.innerHTML = '<span class="spinner"></span> Processando...'

          // Add spinner styles
          const style = document.createElement("style")
          style.textContent = `
            .spinner {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 2px solid rgba(255,255,255,0.3);
              border-radius: 50%;
              border-top-color: #fff;
              animation: spin 0.8s linear infinite;
              margin-right: 8px;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `
          document.head.appendChild(style)

          // Simulate form submission delay
          setTimeout(() => {
            // Set user name in welcome message
            if (userName && nameInput) {
              userName.textContent = nameInput.value.split(" ")[0]
            }

            // Fade out form container
            if (leadFormContainer) {
              leadFormContainer.style.transition = "opacity 0.5s ease, transform 0.5s ease"
              leadFormContainer.style.opacity = "0"
              leadFormContainer.style.transform = "translateY(-20px)"

              setTimeout(() => {
                // Hide form and show product page
                if (leadFormContainer && productPage) {
                  leadFormContainer.style.display = "none"
                  productPage.classList.remove("d-none")

                  // Fade in product page
                  productPage.style.opacity = "0"
                  productPage.style.transition = "opacity 0.5s ease"

                  setTimeout(() => {
                    productPage.style.opacity = "1"

                    // Initialize critical components first
                    let initCriticalComponents
                    if (typeof initCriticalComponents === "function") {
                      initCriticalComponents()
                    }

                    // Load remaining content dynamically
                    loadRemainingContent()
                  }, 100)
                }
              }, 500)
            }
          }, 1500)
        }
      }
    })
  }

  // Load remaining content dynamically
  function loadRemainingContent() {
    // Load about section
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      fetch("sections/about.html")
        .then((response) => response.text())
        .then((html) => {
          aboutSection.innerHTML = html
          let initAboutSection
          if (typeof initAboutSection === "function") {
            initAboutSection()
          }
        })
        .catch((error) => {
          console.error("Error loading about section:", error)
          // Fallback content
          aboutSection.innerHTML = `
            <div class="container">
              <h2 class="section-title">A LENDA DOS MUSCLE CARS</h2>
              <p class="section-description">
                O Dodge Challenger foi apresentado ao público em uma época que os Muscle Cars estavam em alta nos EUA. 
                Foi lançado em 1970 para competir com o Chevrolet Camaro e o Ford Mustang.
              </p>
            </div>
          `
        })
    }

    // Load other sections as needed
    // This approach reduces initial page load and improves performance
  }

  // Real-time validation feedback
  const formInputs = leadForm.querySelectorAll("input")

  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateInput(this)
    })

    input.addEventListener("input", function () {
      if (this.classList.contains("is-invalid")) {
        validateInput(this)
      }
    })
  })

  function validateInput(input) {
    if (input.id === "name") {
      if (input.value.trim() === "") {
        input.classList.add("is-invalid")
      } else {
        input.classList.remove("is-invalid")
      }
    } else if (input.id === "email") {
      if (!isValidEmail(input.value)) {
        input.classList.add("is-invalid")
      } else {
        input.classList.remove("is-invalid")
      }
    } else if (input.id === "phone") {
      if (input.value.length < 14) {
        input.classList.add("is-invalid")
      } else {
        input.classList.remove("is-invalid")
      }
    }
  }

  // Add floating label animation
  formInputs.forEach((input) => {
    // Initial state check
    if (input.value !== "") {
      input.parentNode.classList.add("has-value")
    }

    // Input event
    input.addEventListener("input", function () {
      if (this.value !== "") {
        this.parentNode.classList.add("has-value")
      } else {
        this.parentNode.classList.remove("has-value")
      }
    })
  })

  // Declare the variables
  let addThemeToggle
  let addBackToTopButton
  let addBackgroundElements
  let initStickyHeader
  let initHeroCarousel
  let initGallery
  let initTestimonialSlider
  let initCountdown

  // Remove unused variables and functions
  delete addThemeToggle
  delete addBackToTopButton
  delete addBackgroundElements
  delete initStickyHeader
  delete initHeroCarousel
  delete initGallery
  delete initTestimonialSlider
  delete initCountdown
})

