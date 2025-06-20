const kickdrum = new Audio(`assets/kick-drum.mp3`)

let metronomeId = undefined
let metronomeTempo = 80
let metronomePlaying = false
let beat = 0

function setMetronomeTempo(newTempo) {
  metronomeTempo = newTempo
}

function toggleMetronome() {
  if (metronomePlaying) {
    stopMetronome()
  } else {
    startMetronome()
  }
}
function stopMetronome() {
  clearInterval(metronomeId)
  metronomePlaying = false
  beat = 0
}
function startMetronome(callbackEachBeat = undefined) {
  stopMetronome()
  metronomeId = setInterval(() => {
    kickdrum.pause()
    kickdrum.currentTime = 0
    kickdrum.play()
    if (callbackEachBeat) {
      callbackEachBeat(beat)
    }
    beat = (beat + 1) % 4
  }, 60000 / metronomeTempo)
  metronomePlaying = true
}