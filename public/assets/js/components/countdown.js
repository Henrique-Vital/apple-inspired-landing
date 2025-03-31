/**
 * Countdown Timer Component
 * Handles countdown functionality for CTA section
 */
function initCountdown() {
  const daysElement = document.getElementById("countdown-days")
  const hoursElement = document.getElementById("countdown-hours")
  const minutesElement = document.getElementById("countdown-minutes")
  const secondsElement = document.getElementById("countdown-seconds")

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return

  // Set countdown time (7 days by default)
  let days = 7
  let hours = 12
  let minutes = 45
  let seconds = 0

  // Check if there's a saved countdown in localStorage
  const savedCountdown = localStorage.getItem("countdown")
  if (savedCountdown) {
    const countdownData = JSON.parse(savedCountdown)
    const now = new Date().getTime()

    // If saved countdown is still valid
    if (countdownData.endTime > now) {
      const timeLeft = Math.floor((countdownData.endTime - now) / 1000)
      days = Math.floor(timeLeft / (24 * 60 * 60))
      hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60))
      minutes = Math.floor((timeLeft % (60 * 60)) / 60)
      seconds = timeLeft % 60
    } else {
      // If countdown expired, reset to default
      resetCountdown()
    }
  } else {
    // If no saved countdown, initialize a new one
    resetCountdown()
  }

  // Update countdown display
  updateCountdownDisplay()

  // Start countdown
  const countdownInterval = setInterval(updateCountdown, 1000)

  function updateCountdown() {
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          if (days === 0) {
            // Timer finished
            clearInterval(countdownInterval)

            // Add expired class to countdown
            const countdownContainer = document.querySelector(".countdown-container")
            if (countdownContainer) {
              countdownContainer.classList.add("expired")
            }

            // Show expired message
            const ctaButton = document.querySelector(".cta-button")
            if (ctaButton) {
              ctaButton.textContent = "OFERTA EXPIRADA"
              ctaButton.classList.add("expired")
            }

            // Remove countdown from localStorage
            localStorage.removeItem("countdown")

            return
          }
          days--
          hours = 23
        } else {
          hours--
        }
        minutes = 59
      } else {
        minutes--
      }
      seconds = 59
    } else {
      seconds--
    }

    // Update display
    updateCountdownDisplay()

    // Save current countdown to localStorage
    saveCountdown()
  }

  function updateCountdownDisplay() {
    daysElement.textContent = days.toString().padStart(2, "0")
    hoursElement.textContent = hours.toString().padStart(2, "0")
    minutesElement.textContent = minutes.toString().padStart(2, "0")
    secondsElement.textContent = seconds.toString().padStart(2, "0")

    // Add pulse animation when time is running low
    if (days === 0 && hours === 0 && minutes === 0 && seconds <= 30) {
      daysElement.classList.add("pulse")
      hoursElement.classList.add("pulse")
      minutesElement.classList.add("pulse")
      secondsElement.classList.add("pulse")
    }
  }

  function saveCountdown() {
    const now = new Date().getTime()
    const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds
    const endTime = now + totalSeconds * 1000

    localStorage.setItem(
      "countdown",
      JSON.stringify({
        endTime: endTime,
      }),
    )
  }

  function resetCountdown() {
    days = 7
    hours = 12
    minutes = 45
    seconds = 0

    const now = new Date().getTime()
    const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds
    const endTime = now + totalSeconds * 1000

    localStorage.setItem(
      "countdown",
      JSON.stringify({
        endTime: endTime,
      }),
    )
  }

  // Add pulse animation style
  const style = document.createElement("style")
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); color: #ff3b30; }
      100% { transform: scale(1); }
    }
    .pulse {
      animation: pulse 1s infinite;
    }
    .countdown-container.expired .countdown-item {
      opacity: 0.5;
    }
    .cta-button.expired {
      background: #ff3b30;
      cursor: not-allowed;
    }
  `
  document.head.appendChild(style)
}

// Make function globally available
window.initCountdown = initCountdown

