const possibleTiming = [
  { name: "Quarter", notation: "G4", text: "#" },
  { name: "2-Eights", notation: "G2G2", text: "# &" },
  { name: "4-Sixteenths", notation: "GGGG", text: "# e & a" },
  { name: "Eight 2-Sixteenths", notation: "G2GG", text: "# & a" },
  { name: "Sixteenth-Eight-Sixteenth", notation: "GG2G", text: "# e a" },
  { name: "2-sixteenths Eight", notation: "GGG2", text: "# e &" },
  { name: "Triplet", notation: "(3G2G2G2", text: "# tri plet" },
  { name: "Dotted-Eight Sixteenth", notation: "G3G", text: "# a" },
  { name: "Sixteenth Dotted-Eight", notation: "GG3", text: "# e" },
  { name: "Rest Eight", notation: "z2G2", text: "&" },
  { name: "Rest 2-Sixteenths", notation: "z2GG", text: "& a" },
  { name: "Rest 3-Sixteenths", notation: "zGGG", text: "e & a" },
  { name: "Rest Sixteenth Eight", notation: "zGG2", text: "e &" },
  { name: "Rest Sixteenth", notation: "z3G", text: "a" },
  { name: "Rest Dotted Eight", notation: "zG3", text: "e" },
  { name: "Rest Eight-Sixteenth", notation: "zG2G", text: "e a" },
  { name: "Rest Triplet", notation: "(3z2G2G2", text: "tri plet" },
]

function pianoRythm() {
  let el = div()
  let staffDiv = div()
  let staffwidth = document.getElementById("game").scrollWidth - 50
  let scale = window.innerWidth > 700 ? 1.5 : 1
  let measures = []
  for (let measure = 0; measure < 1; measure++) {
    let notes = []
    for (let beat = 0; beat < 4; beat++) {
      notes.push(chooseOne(possibleTiming.filter(x => settings.pianoRythm.includes(x.name))))
    }
    measures.push(notes)
  }
  let abcString = `
X: 1
M: 4/4
L: 1/16
K: C
|:${measures.map(m => m.map(x => x.notation).join(" ")).join("|")}:|
w:${measures.map(m => m.map((x, index) => x.text.replace("#", index + 1)).join(" ")).join("|")}
`
  let staff = ABCJS.renderAbc(staffDiv, abcString, { scale, staffwidth, paddingLeft: 0, paddingRight: 0 })
  let beats = []
  let tripletMultiplier = 1
  let count = 0
  let beat = []

  for (let note of staff[0].lines[0].staff[0].voices[0].filter(x => x.type !== "bar_left_repeat" && x.type !== "bar_right_repeat")) {
    if (note.tripletMultiplier) {
      tripletMultiplier = note.tripletMultiplier
    }
    count = count + (note.duration * tripletMultiplier)
    beat.push(note)
    if (count == 0.25) {
      beats.push(beat)
      count = 0
      beat = []
    }
    if (note.endTriplet) {
      tripletMultiplier = 1
    }
  }
  el.appendChild(staffDiv)

  let question = createQuestion({
    light: true,
    questionText: t("pianoRythm"),
    answerNode: el,
  })
  question.querySelector(".answer").style.paddingLeft = 0
  question.querySelector(".answer").style.paddingRight = 0
  question.querySelector(".answer").click()

  const metronomeEl = h4()
  updateMetronomeText(metronomeEl)
  metronomeEl.classList.add("soundSetting")
  metronomeEl.classList.add("light")
  metronomeEl.addEventListener("click", (e) => {
    e.stopPropagation()
    if (metronomePlaying) {
      stopMetronome()
    } else {
      startMetronome((beat) => {
        for (let division of beats[(beat + 3) % 4]) {
          for (let elem of division.abselem.elemset) {
            elem.style.fill = "currentColor"
          }
        }
        for (let division of beats[beat]) {
          for (let elem of division.abselem.elemset) {
            elem.style.fill = "#c90000"
          }
        }
      })
    }
    updateMetronomeText(metronomeEl)
  })

  addMetronomeControl(-10, question, metronomeEl)
  addMetronomeControl(-1, question, metronomeEl)
  question.appendChild(metronomeEl)
  addMetronomeControl(1, question, metronomeEl)
  addMetronomeControl(10, question, metronomeEl)

}

function addMetronomeControl(delta, question, metronomeEl) {
  const control = h4((delta > 0 ? "+" : "") + delta.toString())
  control.classList.add("soundSetting")
  control.classList.add("light")
  control.addEventListener("click", () => { setMetronomeTempo(metronomeTempo + delta); updateMetronomeText(metronomeEl) })
  question.appendChild(control)
}

function updateMetronomeText(metronomeEl) {
  if (metronomePlaying) {
    metronomeEl.innerText = `${t("metronome")} (${metronomeTempo}bpm): 🔊`
  } else {
    metronomeEl.innerText = `${t("metronome")} (${metronomeTempo}bpm): 🔈`
  }

}