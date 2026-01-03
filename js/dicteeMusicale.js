const possibleBeat = {
  2: [[2], [1, 1], [0.5, 0.5, 1], [1, 0.5, 0.5]],

  3: [[3], [1, 1, 1], [1, 2], [2, 1], [0.5, 0.5, 2], [2, 0.5, 0.5], [0.5, 0.5, 1, 1], [1, 0.5, 0.5, 1], [1, 1, 0.5, 0.5]],

  4: [
    [4],
    [1, 1, 1, 1],
    [2, 2],
    [3, 1],
    [1, 3],
    [1, 1, 2],
    [2, 1, 1],
    [1, 2, 1],

    [0.5, 0.5, 1, 1, 1],
    [1, 0.5, 0.5, 1, 1],
    [1, 1, 0.5, 0.5, 1],
    [1, 1, 1, 0.5, 0.5],

    [0.5, 0.5, 0.5, 0.5, 1, 1],
    [1, 0.5, 0.5, 0.5, 0.5, 1],
    [1, 1, 0.5, 0.5, 0.5, 0.5],
    [1, 0.5, 0.5, 1, 0.5, 1, 0.5],

    // [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
  ],
}
function degreesGapToMidiOffset(startDegree, gapInDegrees) {
  // degrés de la gamme majeure (Do)
  const scaleSemitones = [0, 2, 4, 5, 7, 9, 11]

  const startIndex = ((startDegree % 7) + 7) % 7
  const targetDegree = startDegree + gapInDegrees
  const targetIndex = ((targetDegree % 7) + 7) % 7

  const octaveShift = Math.floor(targetDegree / 7) - Math.floor(startDegree / 7)

  return scaleSemitones[targetIndex] - scaleSemitones[startIndex] + octaveShift * 12
}

const keyOffset = { C: 0, "D♭": 1, D: 2, "E♭": 3, E: 4, F: 5, "F♯": 6, G: 7, "A♭": -4, A: -3, B: -1, "B♭": -2 }
function generateMeasure(seeded, startDegree, startMidi, beatCount, measure, key) {
  let rythm = seeded.chooseOne(possibleBeat[beatCount])
  let melodyNotes = []
  let maxGap = settings.melodyMaxGapInDegrees || 2
  let currentDegree = startDegree
  let currentMidi = startMidi
  for (let i = 0; i < rythm.length; i++) {
    let gap = 0
    if (currentDegree < (settings.melodyDegreeLimitLow || -3)) {
      gap = seeded.int(maxGap + 1, 0)
    } else if (currentDegree > (settings.melodyDegreeLimitHigh || 7)) {
      gap = seeded.int(0, -maxGap)
    } else {
      gap = seeded.int(maxGap + 1, -maxGap)
    }
    let midiOffset = degreesGapToMidiOffset(currentDegree, gap)

    currentDegree += gap
    currentMidi += midiOffset

    let accidentalRandom = seeded.next()
    let signature = keySignatureMap[key]
    let abcAlteration = ""
    let isSharp = false
    let isFlat = false
    let abcBaseNote = midiToAbc(currentMidi, key)
    if ((settings.melodyAccidentals === "some" && accidentalRandom < 1 / 8) || settings.melodyAccidentals === "lots" && accidentalRandom < 1 / 5) {
      let naturalNote = abcBaseNote[0]
      isSharp = seeded.next() < 0.5
      isFlat = !isSharp
      if (isSharp) {
        currentMidi += 1
        if (signature.includes(naturalNote)) {
          // Déjà sharp, donc, double sharp
          abcAlteration = "^^"
        } else if (signature.includes(naturalNote + "♭")) {
          // Déjà flat, donc, naturel
          abcAlteration = "="
        } else {
          abcAlteration = "^"
        }
      } else {
        currentMidi -= 1
        if (signature.includes(naturalNote + "♭")) {
          // Déjà flat, donc, double flat
          abcAlteration = "__"
        } else if (signature.includes(naturalNote)) {
          // Déjà sharp, donc, naturel
          abcAlteration = "="
        } else {
          abcAlteration = "_"
        }
      }
    }

    melodyNotes.push({
      noteStr: abcAlteration + abcBaseNote + rythm[i] * 4,
      degree: currentDegree,
      midi: currentMidi,
      lastDegree: currentDegree - gap,
      tempo: rythm[i],
      measure,
      isSharp,
      isFlat
    })

    // Reset le midi sans l'altération
    if (isSharp) {
      currentMidi -= 1
    } else if (isFlat) {
      currentMidi += 1
    }


  }
  return melodyNotes
}

let dicteePlaying = false
async function playMeasures(start, end, melodyNotes) {
  while (dicteePlaying) {
    await playPianoNotes(
      melodyNotes.filter((x) => x.measure >= start && x.measure <= end),
      60,
      (kickBefore = 2)
    )
  }
}

function secretStaffString(measuresToShow, measureCount, melodyNotes, M) {
  let melodyStr = ""
  for (let i = 0; i < measureCount; i++) {
    let measureParam = measuresToShow.find((x) => x.measure === i)

    if (!measureParam) {
      melodyStr += "z" + M * 4 + "|"
      continue
    }

    if (measureParam.showAllMeasure) {
      melodyStr +=
        join(
          melodyNotes.filter((x) => x.measure == i).map((x) => x.noteStr),
          ""
        ) + "|"
      continue
    } else if (measureParam.showFirstNote) {
      let firstNote = melodyNotes.filter((x) => x.measure == i)[0]
      melodyStr += firstNote.noteStr
      if (firstNote.tempo < M) {
        melodyStr += "z" + (M - firstNote.tempo) * 4
      }
      melodyStr += "|"
      continue
    } else {
      melodyStr += "z" + M * 4 + "|"
    }
  }
  return melodyStr
}

function dictee(seededRandom, { key = "C", M = 2, measureCount = 4 }) {
  const header = `
X:1
M:${M}/4
L:1/16
K:${key.replace("♭", "b").replace("♯", "#")}
`

  let startDegree = 0
  if (keyOffset[key] == undefined) {
    throw new Error(`Cette clé ${key} n'est pas prise en compte pour la dictée.`)
  }
  let startMidi = 60 + keyOffset[key]
  let melodyNotes = []
  for (let measure = 0; measure < measureCount; measure++) {
    melodyNotes.push(...generateMeasure(seededRandom, startDegree, startMidi, M, measure, key))
    startDegree = melodyNotes.at(-1).degree
    startMidi = melodyNotes.at(-1).midi + (melodyNotes.at(-1).isSharp ? -1 : (melodyNotes.at(-1).isFlat ? 1 : 0))
  }

  let measuresParams = []
  for (let i = 0; i < measureCount; i++) {
    measuresParams.push({ measure: i, showAllMeasure: false, showFirstNote: false })
  }
  measuresParams[0].showFirstNote = true
  //console.log(key)
  console.table(melodyNotes)
  //console.log(melodyNotes.map(x => x.degree));
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
  let playStopControls = div("grid")
  playStopControls.style = "display: grid; grid-template-columns: 1fr 1fr 1fr;align-items: center;margin-bottom: 5px"
  answerDiv.appendChild(controls)

  let measureStart = document.createElement("input")
  measureStart.type = "number"
  measureStart.value = 1
  measureStart.style =
    "background-color: white; color: var(--background-color); margin-right: 10px; padding: 0.2em; height: 100%; width: 100%;margin-bottom: 0; text-align: center"
  let measureEnd = document.createElement("input")
  measureEnd.type = "number"
  measureEnd.value = 2
  measureEnd.style =
    "background-color: white; color: var(--background-color); margin-right: 10px; padding: 0.2em; height: 100%;width: 100%;margin-bottom: 0; text-align: center"
  let playButton = document.createElement("button")
  playButton.style = "background-color: white; border: none; font-size: 2em; line-height: 1.2em"
  playButton.classList.add("small")
  playButton.innerText = t("playBars")
  playButton.addEventListener("click", () => {
    if (dicteePlaying) {
      playButton.innerText = t("playBars")
      dicteePlaying = false
    } else {
      playButton.innerText = t("stopBars")
      dicteePlaying = true
      playMeasures(measureStart.value - 1, measureEnd.value - 1, melodyNotes)
    }
  })
  playStopControls.appendChild(measureStart)
  playStopControls.appendChild(playButton)
  playStopControls.appendChild(measureEnd)
  controls.appendChild(playStopControls)

  let barShowControls = div("grid")
  barShowControls.style = "display: grid; gap: 5px; grid-template-columns: 1fr 1fr"
  for (let i = 0; i < measureCount; i++) {
    let firstNote = document.createElement("button")
    firstNote.classList.add("gameBtn")
    firstNote.classList.add("small")
    firstNote.style = "margin-right: 10px"
    let measureParam = measuresParams.find((x) => x.measure == i)
    firstNote.innerText = t("showFirstNote") + (i + 1)
    if (i == 0) {
      firstNote.innerText = t("showFullBar") + (i + 1)
    }
    firstNote.addEventListener("click", () => {
      if (measureParam.showFirstNote) {
        // Toute la mesure est montré, on cache tout
        if (measureParam.showAllMeasure) {
          measureParam.showAllMeasure = false
          measureParam.showFirstNote = false
          firstNote.innerText = t("showFirstNote") + (i + 1)
        }
        // La première note est montré, on dévoile tout
        else {
          measureParam.showAllMeasure = true
          measureParam.showFirstNote = true
          firstNote.innerText = t("hideBar") + (i + 1)
        }
      } else {
        // Aucune note n'est montré, on dévoile la première
        measureParam.showAllMeasure = false
        measureParam.showFirstNote = true
        firstNote.innerText = t("showFullBar") + (i + 1)
      }
      renderStaff()
    })

    barShowControls.appendChild(firstNote)
    //barShowControls.appendChild(all)
  }

  controls.appendChild(barShowControls)

  let questionText = t("dicteeMusicale") + " en " + key
  let question = createQuestion({
    light: true,
    questionText,
    answerNode: answerDiv,
  })
  question.querySelector(".answer").click()
  renderStaff()
  return questionText
}
