function autoCorrelate(buffer, sampleRate) {
  const SIZE = buffer.length
  let rms = 0

  for (let i = 0; i < SIZE; i++) {
    const val = buffer[i]
    rms += val * val
  }
  rms = Math.sqrt(rms / SIZE)

  if (rms < 0.01) {
    return -1 // too quiet
  }

  let r1 = 0
  let r2 = SIZE - 1
  let threshold = 0.2

  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i
      break
    }
  }

  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i
      break
    }
  }

  buffer = buffer.slice(r1, r2)
  const newSize = buffer.length

  const c = new Array(newSize).fill(0)

  for (let i = 0; i < newSize; i++) {
    for (let j = 0; j < newSize - i; j++) {
      c[i] = c[i] + buffer[j] * buffer[j + i]
    }
  }

  let d = 0
  while (c[d] > c[d + 1]) d++

  let maxval = -1, maxpos = -1
  for (let i = d; i < newSize; i++) {
    if (c[i] > maxval) {
      maxval = c[i]
      maxpos = i
    }
  }

  let T0 = maxpos

  const x1 = c[T0 - 1]
  const x2 = c[T0]
  const x3 = c[T0 + 1]
  const a = (x1 + x3 - 2 * x2) / 2
  const b = (x3 - x1) / 2

  if (a) T0 = T0 - b / (2 * a)

  return sampleRate / T0
}

let lastPitch = null
let lastPitchTime = 0

function detectPitch() {
  if (!isDetecting) return

  analyser.getFloatTimeDomainData(dataArray)
  const pitch = autoCorrelate(dataArray, audioContext.sampleRate)

  const now = performance.now()

  if (pitch !== -1) {
    lastPitch = pitch
    lastPitchTime = now
    pitchDisplay.textContent = `Pitch: ${pitch.toFixed(2)} Hz (${hzToNote(pitch, false).note})`
  } else if (lastPitch) {
    pitchDisplay.textContent = `Pitch: ${lastPitch.toFixed(2)} Hz (${hzToNote(lastPitch, false).note})`
  } else {
    pitchDisplay.textContent = "Pitch: -- Hz"
  }

  rafId = requestAnimationFrame(detectPitch)
}



const holdBtn = document.getElementById("holdBtn")
const pitchDisplay = document.getElementById("pitch")

let audioContext = null
let analyser = null
let microphone = null
let dataArray = null
let rafId = null
let isDetecting = false

// Initialize audio once
async function initAudio() {
  if (audioContext) return

  audioContext = new (window.AudioContext || window.webkitAudioContext)()

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  microphone = audioContext.createMediaStreamSource(stream)

  analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048

  microphone.connect(analyser)
  dataArray = new Float32Array(analyser.fftSize)
}

async function startDetection() {
  if (isDetecting) return

  await initAudio()

  // resume context if suspended
  if (audioContext.state === "suspended") {
    await audioContext.resume()
  }

  isDetecting = true
  detectPitch()
}

function stopDetection() {
  isDetecting = false

  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  pitchDisplay.textContent = "Pitch: -- Hz"
}

holdBtn.addEventListener("pointerdown", startDetection)
holdBtn.addEventListener("pointerup", stopDetection)
holdBtn.addEventListener("pointerleave", stopDetection)
holdBtn.addEventListener("pointercancel", stopDetection)

function hzToNote(freq, useFlat) {
  if (!freq || freq <= 0) return null

  // MIDI note number
  const midi = 69 + 12 * Math.log2(freq / 440)

  const roundedMidi = Math.round(midi)

  // Note name
  const noteNames = useFlat ?
    ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"] :
    ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

  const noteIndex = roundedMidi % 12
  const octave = Math.floor(roundedMidi / 12) - 1

  const noteName = noteNames[noteIndex] + octave

  // cents difference
  const cents = Math.round((midi - roundedMidi) * 100)

  return {
    note: noteName,
    midi: roundedMidi,
    cents: cents
  }
}


