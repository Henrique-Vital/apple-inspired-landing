// Countdown Component
function initCountdown() {
  const minutesElement = document.getElementById("countdown-minutes")
  const secondsElement = document.getElementById("countdown-seconds")

  let minutes = 15
  let seconds = 0

  function updateCountdown() {
    if (seconds === 0) {
      if (minutes === 0) {
        // Timer finished
        clearInterval(countdownInterval)
        return
      }
      minutes--
      seconds = 59
    } else {
      seconds--
    }

    minutesElement.textContent = minutes.toString().padStart(2, "0")
    secondsElement.textContent = seconds.toString().padStart(2, "0")
  }

  const countdownInterval = setInterval(updateCountdown, 1000)
}

