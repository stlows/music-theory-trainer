const gameEl = document.getElementById("game")

function question() {
  resetLectureQuestion()
  const questionFunc = chooseOne(settings.questions)
  if (window[questionFunc]) {
    window[questionFunc]()
  }
}

function clearGame() {
  gameEl.innerHTML = ""
  resetLectureQuestion()
}

function getRandomRootIndex() {
  const tonic = chooseOne(settings.roots)
  return notes.findIndex((x) => x.root === tonic)
}

function createGuitarQuestion({ questionText = "Test", notes = [], answerText = "", delayedNotes = false }) {
  const questionWrapper = div("question")
  const question = h4(questionText)
  questionWrapper.appendChild(question)

  const guitar = createGuitar({ notes: delayedNotes ? [] : notes, fretCount: FRET_COUNT })
  questionWrapper.appendChild(guitar)

  const timeoutId = addCorrectionAndTimer(questionWrapper, questionWrapper)

  questionWrapper.addEventListener("click", () => {
    if (!questionWrapper.classList.contains("answered")) {
      questionWrapper.classList.add("answered")
      clearInterval(timeoutId)
      question.innerText = questionText + " " + answerText
      if (delayedNotes) {
        addNotesToGuitar(guitar, notes)
      }
    }
  })

  gameEl.prepend(questionWrapper)
}

function createEarQuestion({ questionText, answerText, playNotes }) {
  const questionWrapper = div("question")
  const question = h4(questionText)
  const replay = button(t("replay"))
  replay.classList.add("gameBtn")
  replay.classList.add("small")
  replay.classList.add("mb-small")
  replay.addEventListener("click", playNotes)
  questionWrapper.appendChild(question)
  questionWrapper.appendChild(replay)

  const answer = div("answer")
  answer.innerText = t("clickForAnswer")
  questionWrapper.appendChild(answer)

  const timeoutId = addCorrectionAndTimer(questionWrapper, answer)

  answer.addEventListener("click", (a) => {
    if (!questionWrapper.classList.contains("answered")) {
      a.target.innerText = answerText
      questionWrapper.classList.add("answered")
      clearInterval(timeoutId)
    }
  })
  gameEl.prepend(questionWrapper)

  playNotes()
}

function quelleNoteSurManche() {
  const corde = random(7, 1)
  const fret = random(parseInt(settings.frets) + 1, 1)
  createGuitarQuestion({
    questionText: t("whatIsThisNote"),
    answerText: printNote(note(corde - 1, fret)),
    notes: [{ corde, fret, color: "#1E90FF", selected: true }]
  })
}

function noteSurManche() {
  const noteATrouver = chooseOne(chromatic)
  const notesSurManche = []
  for (let corde = 0; corde < cordes.length; corde++) {
    for (let fret = 0; fret < FRET_COUNT; fret++) {
      const laNote = note(corde, fret)
      if (laNote === noteATrouver) {
        notesSurManche.push({ corde: corde + 1, fret, color: "#1E90FF", selected: true })
      }
    }
  }
  createGuitarQuestion({
    questionText: `${t("findSome")} ${printNote(noteATrouver)}?`,
    notes: notesSurManche,
    delayedNotes: true,
  })
}

function correction() {
  const correctionWrapper = div("correction")
  const buttonGood = button("✅")
  const buttonBad = button("❌")
  correctionWrapper.appendChild(buttonGood)
  correctionWrapper.appendChild(buttonBad)
  buttonGood.addEventListener("click", () => {
    addResult({ succes: true })
    buttonGood.classList.add("selected")
    buttonGood.disabled = true
    buttonBad.disabled = true
  })
  buttonBad.addEventListener("click", () => {
    addResult({ succes: false })
    buttonBad.classList.add("selected")
    buttonGood.disabled = true
    buttonBad.disabled = true
  })
  return { correctionWrapper, buttonBad, buttonGood }
}

function addCorrectionAndTimer(questionWrapper, answer) {
  if (notesToBePlayed.length === 0 && settings.afficherCorrection === "false") {
    return 0
  }
  const { correctionWrapper, buttonBad } = correction()
  questionWrapper.appendChild(correctionWrapper)

  if (settings.timerInSeconds > 0) {
    questionWrapper.classList.add("timed")
    questionWrapper.style.setProperty("--question-timer", settings.timerInSeconds + "s")
    const timeoutId = setTimeout(() => {
      answer.click()
      if (settings.autoSelectBadAfterTimer === "true") {
        buttonBad.click()
      }
    }, settings.timerInSeconds * 1000)
    return timeoutId
  }
}

function createQuestion({ questionText, answerText, extraInfos, answerNode, light }) {
  const questionWrapper = div("question")
  if (light) {
    questionWrapper.classList.add("light")
  }
  const question = h4(questionText)
  questionWrapper.appendChild(question)

  const answer = div("answer")
  answer.innerText = t("clickForAnswer")

  questionWrapper.appendChild(answer)

  if (extraInfos) {
    const extrInfosEl = div("extraInfos")
    extrInfosEl.innerText = t(extraInfos)
    questionWrapper.appendChild(extrInfosEl)
  }

  const timeoutId = addCorrectionAndTimer(questionWrapper, answer)

  answer.addEventListener("click", (a) => {
    if (!questionWrapper.classList.contains("answered")) {
      if (answerNode) {
        a.target.innerHTML = ""
        a.target.appendChild(answerNode)
      } else {
        a.target.innerText = answerText
      }
      questionWrapper.classList.add("answered")
      clearInterval(timeoutId)
    }
  })
  gameEl.prepend(questionWrapper)
  return questionWrapper
}

function intervalle() {
  const rootIndex = getRandomRootIndex()
  const intervalle = chooseOne(Object.keys(notes[0]))
  const notesDansIntervalle = gammeChromatic.slice(0, gammeChromatic.indexOf(intervalle) + 1)
  answerNode = div("mw-100")
  answerNode.appendChild(p(printNote(notes[rootIndex][intervalle])))
  if (settings.showNotes === 'guitar') {
    let guitarWrapper = createGuitar({ notes: [], fretCount: 13 })
    answerNode.appendChild(guitarWrapper)
    highlightNotes(guitarWrapper, [notes[rootIndex].root, notes[rootIndex][intervalle]], notes[rootIndex].root)
  }
  if (settings.showNotes === "piano") {
    let pianoWrapper = createPiano({ notes: [notes[rootIndex].root, notes[rootIndex][intervalle]] })
    answerNode.appendChild(pianoWrapper)
  }
  createQuestion({
    questionText: `${t(intervalle)} ${t("of")} ${printNote(notes[rootIndex].root)} ?`,
    answerNode,
    extraInfos: join(notesDansIntervalle.map((x) => printNote(notes[rootIndex][x]))),
  })
}

function chord() {
  const noteIndex = getRandomRootIndex()
  const accordSettingsIndex = random(settings.accords.length)
  const accordIndex = accords.findIndex((x) => x.name === settings.accords[accordSettingsIndex])
  const accord = getAccord(noteIndex, accordIndex)
  answerNode = div("mw-100")
  answerNode.appendChild(p(join(accord.notes)))
  if (settings.showNotes === "guitar") {
    let guitarWrapper = createGuitar({ notes: [], fretCount: 13 })
    answerNode.appendChild(guitarWrapper)
    highlightNotes(guitarWrapper, accord.notes, accord.tonique)
  }
  if (settings.showNotes === "piano") {
    let pianoWrapper = createPiano({ notes: accord.notes })
    answerNode.appendChild(pianoWrapper)
  }
  createQuestion({
    questionText: t("chord")(printNote(accord.tonique), t(accord.type.name)) + " ?",
    answerNode: answerNode,
    extraInfos: join(accords[accordIndex].notes),
  })
}

function gamme() {
  const noteIndex = getRandomRootIndex()
  const randomGammeName = chooseOne(settings.gammes)
  const gammeIndex = gammes.findIndex((x) => x.name === randomGammeName)
  const gamme = getGamme(noteIndex, gammeIndex)
  answerNode = div("mw-100")
  answerNode.appendChild(p(join(gamme.notes)))
  if (settings.showNotes === "guitar") {
    let guitarWrapper = createGuitar({ notes: [], fretCount: 13 })
    answerNode.appendChild(guitarWrapper)
    highlightNotes(guitarWrapper, gamme.notes, gamme.tonique)
  }
  if (settings.showNotes === "piano") {
    let pianoWrapper = createPiano({ notes: gamme.notes }, true)
    answerNode.appendChild(pianoWrapper)
  }
  createQuestion({
    questionText: t("gamme")(printNote(gamme.tonique), t(gamme.type.name)) + " ?",
    answerNode: answerNode,
    extraInfos: join(gammes[gammeIndex].notes),
  })
}

function getCircleOfFifthsKey() {
  return chooseOne(settings.roots.filter((x) => fifths.major.indexOf(x) > -1))
}

function chordsInKey() {
  const key = getCircleOfFifthsKey()
  createQuestion({
    questionText: t("chordsInTheKey")(key),
    answerText: join(getChordDegrees(key)),
  })
}

function nthNoteInKey() {
  const key = getCircleOfFifthsKey()
  const degree = random(6, 1)
  createQuestion({
    questionText: t("nthNoteInKey")(key, getRoman(degree)),
    answerText: getChordDegree(key, degree),
    extraInfos: join(getChordDegrees(key)),
  })
}

function chordsInProgression() {
  const key = getCircleOfFifthsKey()
  const chords = [1, 2, 3, 4, 5, 6].sort((a, b) => { return Math.random() - 0.5 }).slice(0, 4)
  const progression = join(chords.map(getRoman))
  createQuestion({
    questionText: t("chordsInProgression")(key, progression),
    answerText: join(chords.map((x) => getChordDegree(key, x))),
    extraInfos: join(getChordDegrees(key)),
  })
}

function relativeKey() {
  const key = getCircleOfFifthsKey()
  const keyIndex = fifths.major.indexOf(key)
  createQuestion({
    questionText: t("relativeKey")(key),
    answerText: fifths.minor[keyIndex],
  })
}

function intervalByEar() {
  const startIndex = 20
  const endIndex = 40
  const maxInterval = 12
  const bassIndex = random(endIndex + 1, startIndex)
  const interval = random(maxInterval + 1)
  createEarQuestion({
    questionText: t("whatIsThisInterval"),
    answerText: `${t(Object.keys(notes[0])[interval])} - Basse: ${printNote(allNotes[bassIndex])} - High note: ${printNote(
      allNotes[bassIndex + interval]
    )} `,
    playNotes: () => playNotes(bassIndex, interval),
  })
}


function chordSimilarities() {
  const accord1 = getRandomChord()
  const accord2 = getRandomChord()
  const notes1 = [...accord1.notes]
  const notes2 = [...accord2.notes]

  let answerDiv = div()
  for (let i = 0; i < notes1.length; i++) {
    const rotated = rotateArray(notes1, i)
    answerDiv.appendChild(p(join(rotated) + " | " + join(alignNotes(notes2, rotated)), "mb-small"))
  }

  createQuestion({
    questionText: t("chord")(printNote(accord1.tonique), t(accord1.type.name)) + " - " + t("chord")(printNote(accord2.tonique), t(accord2.type.name)),
    answerNode: answerDiv
  })
}

function alignNotes(arr1, arr2) {
  let bestScore = Infinity
  let bestAlignment = arr1

  for (let i = 0; i < arr1.length; i++) {
    const rotated = rotateArray(arr1, i)
    let score = 0

    for (let j = 0; j < Math.min(rotated.length, arr2.length); j++) {
      let currentScore = getDistance(rotated[j], arr2[j])
      currentScore = currentScore > 6 ? Math.abs(currentScore - 12) : currentScore
      score += currentScore
    }

    if (score < bestScore) {
      bestScore = score
      bestAlignment = rotated
    }
  }

  return bestAlignment
}

function getRandomChord() {
  const noteIndex = getRandomRootIndex()
  const accordSettingsIndex = random(settings.accords.length)
  const accordIndex = accords.findIndex((x) => x.name === settings.accords[accordSettingsIndex])
  const accord = getAccord(noteIndex, accordIndex)
  return accord
}

function playNotes(bassIndex, interval) {
  const highNoteIndex = bassIndex + interval
  const audio1 = new Audio(instruments[settings.instruments][allNotes[bassIndex]])
  const audio2 = new Audio(instruments[settings.instruments][allNotes[highNoteIndex]])
  console.log("Played " + bassIndex + " on " + settings.instruments)
  audio1.play()
  audio1.addEventListener("ended", () => {
    audio2.play()
    console.log("Played " + highNoteIndex + " on " + settings.instruments)
  })
}

function playPianoNote(note) {
  const noteFormat = allNotes[note - 21]
  if (noteFormat) {
    console.log(noteFormat)
    const audio = new Audio(instruments.piano[noteFormat])
    audio.play()
  }

}

function printAllGammes() {
  const gammesEl = document.getElementById("gammes")
  gammesEl.innerHTML = ""
  for (let gammeIndex = 0; gammeIndex < gammes.length; gammeIndex++) {
    let { detailsEl, summary } = details()
    summary.innerText = t(gammes[gammeIndex].name)
    detailsEl.appendChild(p(join(gammes[gammeIndex].notes), "mb-small"))
    detailsEl.appendChild(p(getDescriptionGamme(gammeIndex), "mb-small"))
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      let wrapper = div("gamme")
      let gamme = getGamme(noteIndex, gammeIndex)
      const gammeTitle = h5(t("gamme")(printNote(notes[noteIndex].root), t(gamme.type.name)))
      wrapper.appendChild(gammeTitle)
      wrapper.appendChild(p(join(gamme.notes.map((x) => printNote(x)))))
      detailsEl.appendChild(wrapper)
    }
    gammesEl.appendChild(detailsEl)
  }
}

function printAllAccords() {
  const accordsEl = document.getElementById("accords")
  accordsEl.innerHTML = ""
  for (let accordIndex = 0; accordIndex < accords.length; accordIndex++) {
    let { detailsEl, summary } = details()
    summary.innerText = t(accords[accordIndex].title)
    detailsEl.appendChild(p(join(accords[accordIndex].notes), "mb-small"))
    detailsEl.appendChild(p(getDescriptionAccord(accordIndex), "mb-small"))
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      let wrapper = div("accord")
      let accord = getAccord(noteIndex, accordIndex)
      const accordTitle = h5(t("chord")(printNote(notes[noteIndex].root), t(accord.type.name)))
      wrapper.appendChild(accordTitle)
      wrapper.appendChild(p(join(accord.notes)))
      detailsEl.appendChild(wrapper)
      const accordTypesGuitare = accordsManches[accord.type.name]
      if (accordTypesGuitare) {
        const accordNotesGuitare = accordTypesGuitare[notes[noteIndex].letter]
        if (accordNotesGuitare) {
          const guitare = createGuitar({ notes: accordNotesGuitare })
          wrapper.appendChild(guitare)
        }
      }
    }
    accordsEl.appendChild(detailsEl)
  }
}

function printAllIntervalles() {
  const intervalles = document.getElementById("intervalles")
  intervalles.innerHTML = ""
  for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
    const tableEl = table("intervalle")
    const rowNotes = tr()
    const rowIndex = tr()
    rowNotes.appendChild(td("Note"))
    rowIndex.appendChild(td("Int."))
    for (let i = 0; i < 12; i++) {
      rowNotes.appendChild(td(notes[(noteIndex + i) % 12][settings.notation]))
      rowIndex.appendChild(td(i))
    }
    tableEl.appendChild(rowNotes)
    tableEl.appendChild(rowIndex)
    intervalles.appendChild(tableEl)
  }
}

let currentNoteIndexToBePlayed = -1
let currentLectureQuestionEl = undefined
let notesToBePlayed = []
let currentKey = ""

function resetLectureQuestion() {
  currentNoteIndexToBePlayed = -1
  currentLectureQuestionEl = undefined
  notesToBePlayed = []
  currentKey = ""
}

function pratiquezLecturePiano(key) {
  resetLectureQuestion()
  if (!key) {
    currentKey = getCircleOfFifthsKey()
  } else {
    currentKey = key
  }
  let notes = []
  let numberOfNotes = screen.width < 700 ? 4 : 8
  let countPerMeasure = 4

  // currentKey = "F♯"

  for (let i = 0; i < numberOfNotes; i++) {
    let octave = parseInt(chooseOne(settings.octaves))
    let clef = chooseOne(settings.clefs)
    let note = chooseOne(naturals)

    // clef = "bass"
    // note = "E"
    // octave = -1
    if (clef === "treble" && naturals.indexOf(note) < naturals.indexOf("A")) {
      octave++
    }
    if (clef === "bass") {
      octave--
    }
    if (clef === "bass" && naturals.indexOf(note) >= naturals.indexOf("A")) {
      octave--
    }

    notes.push({ note, clef, octave, midi: noteToMidiNumber(note, octave, currentKey) })
  }

  notesToBePlayed = [...notes]

  let el = div()
  let staffDiv = staff(currentKey, notes, countPerMeasure)

  el.appendChild(staffDiv)

  if (MIDI_ACCESS && MIDI_ACCESS.inputs.size === 0 && document.getElementById("pianoSimulation").innerHTML === "") {
    notify("No MIDI controller found, spawning a fake piano.")
    spawnPiano()
  }

  currentNoteIndexToBePlayed = 0

  currentLectureQuestionEl = createQuestion({
    light: true,
    questionText: t("pratiquezLecturePiano")(numberOfNotes, printNote(currentKey)),
    answerNode: el,
  })

  currentLectureQuestionEl.querySelector(".answer").click()

  let goodButton = currentLectureQuestionEl.querySelector(".correction button:nth-child(1)")
  goodButton.innerText = 0
  goodButton.dataset.count = 0
  goodButton.style.color = "var(--barColor1)"
  goodButton.style.cursor = "default"
  goodButton.disabled = true

  let badButton = currentLectureQuestionEl.querySelector(".correction button:nth-child(2)")
  badButton.innerText = 0
  badButton.dataset.count = 0
  badButton.style.color = "var(--barColor2)"
  badButton.style.cursor = "default"
  badButton.disabled = true
}

function getPianoRange(notesArray) {
  if (!notesArray.length) return null

  let min = notesArray[0].midi
  let max = notesArray[0].midi

  for (let note of notesArray) {
    if (note.midi < min) min = note.midi
    if (note.midi > max) max = note.midi
  }

  let minPiano = "A2"
  if (min >= 36) minPiano = "C3"
  if (min >= 48) minPiano = "C4"

  let maxPiano = "G7"
  if (max <= "83") maxPiano = "B6"
  if (max <= "71") maxPiano = "B5"

  return { minPiano, maxPiano }
}

function spawnPiano() {
  let { minPiano, maxPiano } = getPianoRange(notesToBePlayed)
  let keyboard = createPiano({ min: minPiano, max: maxPiano, onKeyClicked: (note) => { simulateNote(note) } })

  const pianoSimulationEl = document.getElementById("pianoSimulation")
  pianoSimulationEl.innerHTML = ""
  pianoSimulationEl.appendChild(keyboard)

  const divHide = div("mb-small")
  const hide = a("hidePiano")
  divHide.appendChild(hide)
  divHide.classList.add("right")
  hide.innerText = t("hidePiano")
  hide.addEventListener("click", () => {
    pianoSimulationEl.innerHTML = ""
  })

  pianoSimulationEl.appendChild(divHide)

}

function simulateNote(noteNumber) {
  const fakeMessage = {
    data: [144, noteNumber, 127] // 144 = Note On, velocity 127
  }
  handleMIDIMessage(fakeMessage)
}

function noteToMidiNumber(note, octave, key = "C") {
  const sharpMap = { "C": 0, "C♯": 1, "D": 2, "D♯": 3, "E": 4, "E♯": 5, "F": 5, "F♯": 6, "G": 7, "G♯": 8, "A": 9, "A♯": 10, "B": 11, "B♯": 12 }
  const flatMap = { "C♭": -1, "C": 0, "D♭": 1, "D": 2, "E♭": 3, "E": 4, "F♭": 4, "F": 5, "G♭": 6, "G": 7, "A♭": 8, "A": 9, "B♭": 10, "B": 11 }

  // Determine if this key uses flats or sharps
  const useSharps = !key.includes("b") && !key.includes("♭")
  const signature = keySignatureMap[key] || []

  let actualNote = note

  // Apply key signature
  if (useSharps && signature.includes(note)) {
    actualNote = note + "♯"
  } else if (!useSharps && signature.includes(note + "♭")) {
    actualNote = note + "♭"
  }

  // Look up in correct map
  const semitone = useSharps ? sharpMap[actualNote] : flatMap[actualNote]

  if (semitone == null) {
    throw new Error(`Invalid or unhandled note: ${note} in key ${key}`)
  }

  return (octave + 5) * 12 + semitone
}

function handleMIDIMessage({ data }) {
  if (!currentLectureQuestionEl) {
    return
  }

  const [status, noteNumber, velocity] = data

  log(`Note number ${noteNumber} pressed`, "error")

  // Only respond to Note On with velocity > 0
  if (status === 144 && velocity > 0) {
    checkNote(noteNumber)
  }
}

function checkNote(playedMidiNote) {
  const isCorrect = playedMidiNote === notesToBePlayed[currentNoteIndexToBePlayed].midi
  let noteEl = notesToBePlayed[currentNoteIndexToBePlayed].element
  if (isCorrect) {
    log("Note is correct")
    addGoodNote()
    noteEl.classList.add("correct")
    currentNoteIndexToBePlayed++
    if (currentNoteIndexToBePlayed >= notesToBePlayed.length) {
      if (settings.continuousReading === "sameClef") {
        pratiquezLecturePiano(currentKey)
        return
      }
      if (settings.continuousReading === "differentClef") {
        pratiquezLecturePiano()
        return
      }
      resetLectureQuestion()

    }
  } else {
    log("Note is incorrect", "error")
    noteEl.classList.add("incorrect")
    setTimeout(() => {
      noteEl.classList.remove("incorrect")
    }, 300)
    addBadNote()
  }
}

function addGoodNote() {
  let goodButton = currentLectureQuestionEl.querySelector(".correction button:nth-child(1)")
  goodButton.innerText = ++goodButton.dataset.count
}

function addBadNote() {
  let badButton = currentLectureQuestionEl.querySelector(".correction button:nth-child(2)")
  badButton.innerText = ++badButton.dataset.count
}

function log(msg, type = "success") {
  const params = new URLSearchParams(window.location.search)
  const isDebug = params.get("debug") === "true"
  if (isDebug) {
    notify(msg, type)
  }
}


