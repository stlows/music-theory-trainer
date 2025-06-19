const practiceTimersEl = document.getElementById("practiceTimers")
let timerId = undefined
let timers = div("timers")
let timerEl = document.getElementById("timer")
let timerWrapperEl = document.getElementById("timerWrapper")
for (const timeInMinutes of [5, 15, 30, 60]) {
  let timerPreset = document.createElement("button")
  timerPreset.classList.add("gameBtn")
  timerPreset.innerHTML = timeInMinutes + " min"
  timerPreset.onclick = () => {
    cancelTimer()
    timerWrapperEl.style.display = "block"
    let totalTimeInMs = timeInMinutes * 60 * 1000
    let timeLeftInMs = totalTimeInMs
    let deltaTime = 1000
    updateTimer(timeLeftInMs, totalTimeInMs)
    timerId = setInterval(() => {
      updateTimer(timeLeftInMs, totalTimeInMs)
      timeLeftInMs -= deltaTime
      if (timeLeftInMs < 0) {
        cancelTimer()
      }
    }, deltaTime)
    toggleSettings()
    question()
  }
  timers.appendChild(timerPreset)
}
function updateTimer(timeLeftInMs, totalTimeInMs) {
  timerEl.style.width = (timeLeftInMs / totalTimeInMs * 100) + "%"
  timerEl.innerText = formatTime(timeLeftInMs)
}
practiceTimersEl.appendChild(timers)

function formatTime(timeInMs) {
  let minutes = Math.floor(timeInMs / 60000)
  let seconds = Math.floor((timeInMs % 60000) / 1000)
  return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
}
let cancelButton = document.createElement("a")
cancelButton.href = "#"
cancelButton.dataset.t = "cancelTimer"
cancelButton.innerText = t("cancelTimer")
cancelButton.onclick = cancelTimer

function cancelTimer() {
  clearInterval(timerId)
  timerWrapperEl.style.display = "none"
  updateTimer(0, 1)
}

practiceTimersEl.appendChild(cancelButton)