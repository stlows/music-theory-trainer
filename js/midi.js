let MIDI_ACCESS = null

function initMIDI() {
  if (!MIDI_ACCESS && navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess()
      .then(onMIDISuccess, onMIDIFailure)
  } else {
    notify("Web MIDI is not supported in this browser.", "error")
  }
}

function onMIDISuccess(_midiAccess) {
  MIDI_ACCESS = _midiAccess
  for (let input of MIDI_ACCESS.inputs.values()) {
    input.onmidimessage = handleMIDIMessage
  }

  // Listen for new devices
  MIDI_ACCESS.onstatechange = (event) => {
    notify("New device connected.")
    if (event.port.type === "input" && event.port.state === "connected") {
      event.port.onmidimessage = handleMIDIMessage
    }
  }

  notify("MIDI access enabled.")
}

function onMIDIFailure() {
  notify("Failed to access MIDI devices.", "error")
}

initMIDI()