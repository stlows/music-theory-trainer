const possibleBeat = {
  2: [
    [2],
    [1, 1],
    [0.5, 0.5, 1],
    [1, 0.5, 0.5]
  ],

  3: [
    [3],
    [1, 1, 1],
    [1, 2],
    [2, 1],
    [0.5, 0.5, 2],
    [2, 0.5, 0.5],
    [0.5, 0.5, 1, 1],
    [1, 0.5, 0.5, 1],
    [1, 1, 0.5, 0.5]
  ],

  4: [
    [4],
    [1, 1, 1, 1],
    [2, 2],
    [1, 1, 2],
    [2, 1, 1],

    [0.5, 0.5, 1, 1, 1],
    [1, 0.5, 0.5, 1, 1],
    [1, 1, 0.5, 0.5, 1],
    [1, 1, 1, 0.5, 0.5],

    // [0.5, 0.5, 0.5, 0.5, 1, 1],
    // [1, 0.5, 0.5, 0.5, 0.5, 1],

    // [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
  ]
}

const maxGap = 2

let degrees = [-3, -1, 0, 2, 4, 5, 7, 9, 11, 12]
function generateMeasure(seeded, startingNote, beatCount, measure) {
  let rythm = seeded.chooseOne(possibleBeat[beatCount])
  let degreeIndex = degrees.indexOf(startingNote)
  let melodyNotes = []
  let midiBase = 60
  let decalage = degrees.indexOf(0)
  for (let note = 0; note < rythm.length; note++) {
    let deltaIndex = degreeIndex == 0 ? seeded.int(maxGap + 1) : (degreeIndex == degrees.length - 1 ? seeded.int(1, -maxGap) : seeded.int(maxGap + 1, -maxGap))
    let lastDegree = degrees[degreeIndex]
    degreeIndex += deltaIndex
    degreeIndex = Math.max(0, Math.min(degreeIndex, degrees.length - 1))
    melodyNotes.push({
      noteStr: degreeToNoteWithOctave(degreeIndex - decalage) + rythm[note] * 4,
      degree: degrees[degreeIndex],
      degreeIndex,
      lastDegree,
      deltaIndex,
      midi: midiBase + degrees[degreeIndex],
      tempo: rythm[note],
      measure
    })
  }
  return melodyNotes
}

function playMeasures(start, end, melodyNotes) {
  playPianoNotes(melodyNotes.filter(x => x.measure >= start && x.measure <= end))
}

function secretStaffString(measuresToShow, measureCount, melodyNotes, M) {
  let melodyStr = ""
  for (let i = 0; i < measureCount; i++) {
    let measureParam = measuresToShow.find(x => x.measure === i)

    if (!measureParam) {
      melodyStr += "z" + M * 4 + "|"
      continue
    }

    if (measureParam.showAllMeasure) {
      melodyStr += join(melodyNotes.filter(x => x.measure == i).map(x => x.noteStr), "") + "|"
      continue
    }
    else if (measureParam.showFirstNote) {
      let firstNote = melodyNotes.filter(x => x.measure == i)[0]
      melodyStr += firstNote.noteStr + "z" + (M - firstNote.tempo) * 4 + "|"
      continue
    }
    else {
      melodyStr += "z" + M * 4 + "|"
    }
  }
  return melodyStr
}

function dictee(seededRandom, {
  key = "C",
  M = 2,
  measureCount = 4
}) {
  const header = `
X:1
T:${t("dicteeMusicale")}
M:${M}/4
L:1/16
K:${key}
`

  let lastNote = 0
  let melodyNotes = []
  for (let measure = 0; measure < measureCount; measure++) {
    melodyNotes = melodyNotes.concat(generateMeasure(seededRandom, lastNote, M, measure))
    lastNote = melodyNotes[melodyNotes.length - 1].degree
  }

  let measuresParams = []
  for (let i = 0; i < measureCount; i++) {
    measuresParams.push({ measure: i, showAllMeasure: false, showFirstNote: false })
  }
  measuresParams[0].showFirstNote = true
  //console.table(melodyNotes)
  const staffDiv = div()
  const answerDiv = div()

  function renderStaff() {
    let staffwidth = Math.min(screen.width * 0.65, 600)
    let melodyStr = header + secretStaffString(measuresParams, measureCount, melodyNotes, M)
    //console.log(melodyStr)
    ABCJS.renderAbc(staffDiv, melodyStr, { scale: 1.4, selectTypes: [], add_classes: false, staffwidth })
  }

  answerDiv.appendChild(staffDiv)
  let controls = div("dictee-controls")
  answerDiv.appendChild(controls)

  let measureStart = document.createElement("input")
  measureStart.type = "number"
  measureStart.value = 1
  measureStart.style = "background-color: white; color: var(--background-color); margin-right: 10px"
  let measureEnd = document.createElement("input")
  measureEnd.type = "number"
  measureEnd.value = measureCount
  measureEnd.style = "background-color: white; color: var(--background-color); margin-right: 10px"
  controls.appendChild(measureStart)
  controls.appendChild(measureEnd)
  let playButton = document.createElement("button")
  playButton.classList.add("gameBtn")
  playButton.classList.add("small")
  playButton.innerText = t("playBars")
  playButton.addEventListener("click", () => {
    playMeasures(measureStart.value - 1, measureEnd.value - 1, melodyNotes)
  })
  controls.appendChild(playButton)

  for (let i = 0; i < measureCount; i++) {
    let mesureControlsDiv = div("mb-small")
    let firstNote = document.createElement("button")
    firstNote.classList.add("gameBtn")
    firstNote.classList.add("small")
    firstNote.style = "margin-right: 10px"
    let all = document.createElement("button")
    all.classList.add("gameBtn")
    all.classList.add("small")
    let measureParam = measuresParams.find(x => x.measure == i)
    all.innerText = t("fullBar") + (i + 1)
    all.addEventListener("click", () => {
      measureParam.showAllMeasure = !measureParam.showAllMeasure
      renderStaff()
    })

    firstNote.innerText = t("firstNoteForMeasure") + (i + 1)
    firstNote.addEventListener("click", () => {
      measureParam.showFirstNote = !measureParam.showFirstNote
      renderStaff()
    })

    mesureControlsDiv.appendChild(firstNote)
    mesureControlsDiv.appendChild(all)

    controls.appendChild(mesureControlsDiv)
  }


  let questionText = t("dicteeMusicale")
  let question = createQuestion({
    light: true,
    questionText,
    answerNode: answerDiv
  })
  question.querySelector(".answer").click()
  renderStaff()
  return questionText
}

