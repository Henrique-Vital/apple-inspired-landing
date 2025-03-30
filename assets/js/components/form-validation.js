// Form Validation
document.addEventListener("DOMContentLoaded", () => {
  // Form validation and submission
  const leadForm = document.getElementById("lead-form")
  const productPage = document.getElementById("product-page")
  const leadFormContainer = document.getElementById("lead-form-container")
  const userName = document.getElementById("user-name")

  // Phone mask
  const phoneInput = document.getElementById("phone")
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 11) value = value.slice(0, 11)

    let formattedValue = ""
    if (value.length > 0) formattedValue = "(" + value.slice(0, 2)
    if (value.length > 2) formattedValue += ") " + value.slice(2, 7)
    if (value.length > 7) formattedValue += "-" + value.slice(7, 11)

    e.target.value = formattedValue
  })

  // Email validation
  function isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  // Form submission
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")

    let isValid = true

    // Validate name
    if (nameInput.value.trim() === "") {
      nameInput.classList.add("is-invalid")
      isValid = false
    } else {
      nameInput.classList.remove("is-invalid")
    }

    // Validate email
    if (!isValidEmail(emailInput.value)) {
      emailInput.classList.add("is-invalid")
      isValid = false
    } else {
      emailInput.classList.remove("is-invalid")
    }

    // Validate phone
    if (phoneInput.value.length < 14) {
      phoneInput.classList.add("is-invalid")
      isValid = false
    } else {
      phoneInput.classList.remove("is-invalid")
    }

    if (isValid) {
      // Set user name in welcome message
      userName.textContent = nameInput.value.split(" ")[0]

      // Hide form and show product page
      leadFormContainer.style.display = "none"
      productPage.classList.remove("d-none")

      // Initialize all product page components
      // These functions will be called from main.js
    }
  })
})

