const gameEl = document.getElementById("game")
//let questionCount = 0

function question() {
  resetLectureQuestion()
  const questionFunc = chooseOne(settings.questions)
  if (window[questionFunc]) {
    let seed = random(2147483647)
    gtag('event', "question", { questionFunc, seed })
    let seededRandom = new SeededRandom(seed)
    try {
      let questionTitle = window[questionFunc](seededRandom)
      addHistory({ questionFunc, questionTitle, seed, date: new Date().valueOf() })
    }
    catch (ex) {
      console.error("Erreur pour la question:")
      console.error(`${questionFunc}(new SeededRandom(${seed}))`)
      console.error(ex)
      gtag('event', "question_error", { questionFunc, seed, ex })
    }
  }
}

function clearGame() {
  gameEl.innerHTML = ""
  resetLectureQuestion()
}

function getRandomRootIndex(seededRandom) {
  const tonic = seededRandom.chooseOne(settings.roots)
  return notes.findIndex((x) => x.root === tonic)
}

function keyIndex(key) {
  return notes.findIndex((x) => x.root === key)
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

function createEarQuestion({ questionText, answerText, playNotes, indices }) {
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

  if (answerText) {
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
  } if (indices) {
    let currentIndex = 0
    let indicesWrapper = div("answer")
    function showNextIndice() {
      if (currentIndex > indices.length) {
        return
      }
      indicesWrapper.innerHTML = ""
      if (currentIndex < indices.length) {
        let indiceText = p(t("indice" + (currentIndex + 1)))
        indicesWrapper.appendChild(indiceText)
      }
      if (currentIndex > 0) {
        indicesWrapper.appendChild(indices[currentIndex - 1])
      }
      currentIndex++
    }
    indicesWrapper.addEventListener("click", showNextIndice)
    showNextIndice()
    questionWrapper.appendChild(indicesWrapper)
  }
  gameEl.prepend(questionWrapper)

  playNotes()
}

function quelleNoteSurManche(seededRandom) {
  const corde = seededRandom.int(7, 1)
  const fret = seededRandom.int(parseInt(settings.frets) + 1, 1)
  let questionTitle = t("whatIsThisNote")
  createGuitarQuestion({
    questionText: questionTitle,
    answerText: printNote(note(corde - 1, fret)),
    notes: [{ corde, fret, color: "#1E90FF", selected: true }],
  })
  return questionTitle
}

function noteSurManche(seededRandom) {
  const noteATrouver = seededRandom.chooseOne(chromatic)
  const notesSurManche = []
  for (let corde = 0; corde < cordes.length; corde++) {
    for (let fret = 0; fret < FRET_COUNT; fret++) {
      const laNote = note(corde, fret)
      if (laNote === noteATrouver) {
        notesSurManche.push({ corde: corde + 1, fret, color: "#1E90FF", selected: true })
      }
    }
  }
  let questionText = `${t("findSome")} ${printNote(noteATrouver)}?`
  createGuitarQuestion({
    questionText,
    notes: notesSurManche,
    delayedNotes: true,
  })

  return questionText
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

function createQuestion({ questionText, answerText, extraInfos, answerNode, light, autoAnswer }) {
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

  if (autoAnswer) {
    answer.click()
  }

  gameEl.prepend(questionWrapper)
  return questionWrapper
}

function intervalle(seededRandom) {
  let key = seededRandom.chooseOne(settings.roots)
  let rootIndex = keyIndex(key)
  const intervalle = chooseOne(Object.keys(notes[rootIndex]))
  //const notesDansIntervalle = gammeChromatic.slice(0, gammeChromatic.indexOf(intervalle) + 1)
  answerNode = div("mw-100")
  answerNode.appendChild(p(printNote(notes[rootIndex][intervalle])))
  if (settings.showNotes === "guitar") {
    let guitarWrapper = createGuitar({ notes: [], fretCount: 13 })
    answerNode.appendChild(guitarWrapper)
    highlightNotes(guitarWrapper, [notes[rootIndex].root, notes[rootIndex][intervalle]], notes[rootIndex].root)
  }
  if (settings.showNotes === "piano") {
    let pianoWrapper = createPiano({ notes: [notes[rootIndex].root, notes[rootIndex][intervalle]] })
    answerNode.appendChild(pianoWrapper._svg)
  }
  let questionText = `${t(intervalle)} ${t("of")} ${printNote(notes[rootIndex].root)} ?`
  createQuestion({
    questionText,
    answerNode,
    //extraInfos: join(notesDansIntervalle.map((x) => printNote(notes[rootIndex][x]))),
  })
  return questionText
}

function chord(seededRandom) {
  let key = seededRandom.chooseOne(settings.roots)
  let noteIndex = keyIndex(key)
  const accordSettingsIndex = seededRandom.int(settings.accords.length)
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
    answerNode.appendChild(pianoWrapper._svg)
  }
  let questionText = t("chord")(printNote(accord.tonique), t(accord.type.name)) + " ?"
  createQuestion({
    questionText,
    answerNode: answerNode,
    extraInfos: join(accords[accordIndex].notes),
  })

  return questionText
}

function gamme(seededRandom) {
  let key = seededRandom.chooseOne(settings.roots)
  let noteIndex = keyIndex(key)
  const randomGammeName = seededRandom.chooseOne(settings.gammes)
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
    answerNode.appendChild(pianoWrapper._svg)
  }
  let questionText = t("gamme")(printNote(gamme.tonique), t(gamme.type.name)) + " ?"

  createQuestion({
    questionText,
    answerNode: answerNode,
    extraInfos: join(gammes[gammeIndex].notes),
  })

  return questionText
}

function getRandomEnharmonicKey(seededRandom) {
  return seededRandom.chooseOne(settings.roots.filter((x) => enharmonicKeys.indexOf(x) > -1))
}

function chordsInKey(seededRandom) {
  let key = seededRandom.chooseOne(settings.roots)
  let questionText = t("chordsInTheKey")(key)
  createQuestion({
    questionText,
    answerText: join(getChordDegrees(key)),
  })
  return questionText
}

function nthNoteInKey(seededRandom) {
  let key = seededRandom.chooseOne(settings.roots)
  const degree = seededRandom.int(6, 1)
  let questionText = t("nthNoteInKey")(key, getRoman(degree))
  createQuestion({
    questionText,
    answerText: getChordDegree(key, degree),
    extraInfos: join(getChordDegrees(key)),
  })
  return questionText
}

function chordsInProgression(seededRandom) {
  let key = seededRandom.chooseOne(settings.roots)
  const chords = [1, 2, 3, 4, 5, 6]
    .sort((a, b) => {
      return seededRandom.next() - 0.5
    })
    .slice(0, 4)
  const progression = join(chords.map(getRoman))
  let questionText = t("chordsInProgression")(key, progression)
  createQuestion({
    questionText,
    answerText: join(chords.map((x) => getChordDegree(key, x))),
    extraInfos: join(getChordDegrees(key)),
  })
  return questionText
}

function relativeKey(seededRandom) {
  let key = seededRandom.chooseOne(settings.roots)
  let questionText = t("relativeKey")(key)
  createQuestion({
    questionText,
    answerText: getChordDegree(key, 6),
  })
  return questionText
}

function intervalByEar(seededRandom) {
  const startIndex = 20
  const endIndex = 40
  const maxInterval = 12
  const bassIndex = seededRandom.int(endIndex + 1, startIndex)
  const interval = seededRandom.int(maxInterval + 1)
  let questionText = t("whatIsThisInterval")
  createEarQuestion({
    questionText,
    answerText: `${t(Object.keys(notes[0])[interval])} - Basse: ${printNote(allNotes[bassIndex])} - High note: ${printNote(
      allNotes[bassIndex + interval]
    )} `,
    playNotes: () => playNotes(bassIndex, interval),
  })
  return questionText
}

function chordSimilarities(seededRandom) {
  const accord1 = getRandomChord(seededRandom)
  const accord2 = getRandomChord(seededRandom)
  const notes1 = [...accord1.notes]
  const notes2 = [...accord2.notes]

  let answerDiv = div()
  for (let i = 0; i < notes1.length; i++) {
    const rotated = rotateArray(notes1, i)
    answerDiv.appendChild(p(join(rotated) + " | " + join(alignNotes(notes2, rotated)), "mb-small"))
  }

  let questionText = t("chord")(printNote(accord1.tonique), t(accord1.type.name)) + " - " + t("chord")(printNote(accord2.tonique), t(accord2.type.name))
  createQuestion({
    questionText,
    answerNode: answerDiv,
  })
  return questionText
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

function getRandomChord(seededRandom) {
  const noteIndex = getRandomRootIndex(seededRandom)
  const accordSettingsIndex = seededRandom.int(settings.accords.length)
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
    const audio = new Audio(instruments.piano[noteFormat])
    audio.play()
  }
}

async function playPianoNotes(notes, bpm = 60) {
  const beatDuration = 60000 / bpm // ms per beat
  const fadeTime = beatDuration / 5
  let currentAudio = null

  for (let i = 0; i < notes.length; i++) {
    // Stop & fade out previous note if needed
    if (currentAudio) {
      await fadeOutAndStop(currentAudio, fadeTime)
    }

    // Play the new note
    const noteFormat = allNotes[notes[i].midi - 21]
    if (noteFormat) {
      currentAudio = new Audio(instruments.piano[noteFormat])
      currentAudio.volume = 1
      currentAudio.play()
    }

    // Wait (beat duration - fadeTime) before starting fade
    const playTime = Math.max(beatDuration * (notes[i].tempo || 1) - fadeTime, 0)
    await new Promise(r => setTimeout(r, playTime))

    // Start fading out while beat still runs
    if (currentAudio) {
      await fadeOutAndStop(currentAudio, fadeTime)
      currentAudio = null
    }
  }
}

async function fadeOutAndStop(audio, fadeTime) {
  const steps = 20
  const stepTime = fadeTime / steps

  for (let i = 0; i < steps; i++) {
    audio.volume = 1 - i / steps
    await new Promise(r => setTimeout(r, stepTime))
  }

  audio.pause()
  audio.currentTime = 0
}

function printAllGammes() {
  const gammesEl = document.getElementById("gammes")
  gammesEl.innerHTML = ""

  const gammeSelector = div("flex")
  const gammeSelect = select([...new Set(gammes.map((g) => { return { value: g.name, label: t(g.name) } }))], { id: "gammeSelect", style: "margin-right: 10px;" })
  const keySelect = select([...new Set(notes.map(n => n.root))], { id: "keyGammeSelect" })
  const gammeSelectorResult = div("")
  gammeSelectorResult.id = "gammeSelectorResult"

  function updateGammeDisplay() {
    const selectedGamme = document.getElementById("gammeSelect").value
    const selectedKey = document.getElementById("keyGammeSelect").value
    let wrapper = div("gamme")
    let keyIndex = notes.findIndex(n => n.root === selectedKey)
    let gammeIndex = gammes.findIndex(g => g.name === selectedGamme)
    let gamme = getGamme(keyIndex, gammeIndex)
    const gammeTitle = h5(t("gamme")(printNote(notes[keyIndex].root), t(gamme.type.name)))
    wrapper.appendChild(gammeTitle)
    wrapper.appendChild(p(join(gamme.notes.map((x) => printNote(x)))))
    gammeSelectorResult.innerHTML = ""
    gammeSelectorResult.appendChild(wrapper)
  }
  gammeSelect.addEventListener("change", updateGammeDisplay)
  keySelect.addEventListener("change", updateGammeDisplay)

  gammeSelector.appendChild(gammeSelect)
  gammeSelector.appendChild(keySelect)
  gammesEl.appendChild(gammeSelector)
  gammesEl.appendChild(gammeSelectorResult)
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
  const accordSelector = div("flex")
  const accordSelect = select([...new Set(accords.map((a) => { return { value: a.name, label: t(a.name) } }))], { id: "accordSelect" })
  const keySelect = select([...new Set(notes.map(n => n.root))], { id: "keyAccordSelect", style: "margin-right: 10px;" })
  const accordSelectorResult = div("")
  accordSelectorResult.id = "accordSelectorResult"

  function updateAccordDisplay() {
    const selectedChord = document.getElementById("accordSelect").value
    const selectedKey = document.getElementById("keyAccordSelect").value
    let wrapper = div("accord")
    let keyIndex = notes.findIndex(n => n.root === selectedKey)
    let chordIndex = accords.findIndex(a => a.name === selectedChord)
    let chord = getAccord(keyIndex, chordIndex)
    const chordTitle = h5(t("chord")(printNote(notes[keyIndex].root), t(chord.type.name)))
    wrapper.appendChild(chordTitle)
    wrapper.appendChild(p(join(chord.notes.map((x) => printNote(x)))))
    accordSelectorResult.innerHTML = ""
    accordSelectorResult.appendChild(wrapper)
  }
  accordSelect.addEventListener("change", updateAccordDisplay)
  keySelect.addEventListener("change", updateAccordDisplay)

  accordSelector.appendChild(keySelect)
  accordSelector.appendChild(accordSelect)
  accordsEl.appendChild(accordSelector)
  accordsEl.appendChild(accordSelectorResult)

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
let lastKeyHitSuccess = undefined
const midiPianoNotes = [19, 21, 23, 24, 26, 28, 29, 31, 33, 35, 36, 38, 40, 41, 43, 45, 47, 48, 50, 52, 53, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83, 84, 86, 88, 89, 91, 93, 95, 96, 98, 100, 101, 103]
const midiNaturals = ["C", "C", "D", "D", "E", "F", "F", "G", "G", "A", "A", "B"]
function notesSample(start, end) {
  return midiPianoNotes.filter(n => n >= start && n <= end)
}

let octavesDifficuly = { easy: { treble: [60, 72], bass: [48, 60] }, medium: { treble: [55, 81], bass: [43, 62] }, hard: { treble: [53, 88], bass: [35, 64] } }


function resetLectureQuestion() {
  currentNoteIndexToBePlayed = -1
  currentLectureQuestionEl = undefined
  notesToBePlayed = []
  currentKey = ""
  lastKeyHitSuccess = undefined
}

function pratiquezLecturePiano(seededRandom, key) {
  resetLectureQuestion()
  if (!key) {
    currentKey = getRandomEnharmonicKey(seededRandom)
  } else {
    currentKey = key
  }
  let notes = []
  let numberOfNotes = screen.width < 700 ? 4 : 12
  let countPerMeasure = 4

  // currentKey = "F♯"
  let trebleNotes = notesSample(octavesDifficuly[settings.octavesDifficulty].treble[0], octavesDifficuly[settings.octavesDifficulty].treble[1])
  let bassNotes = notesSample(octavesDifficuly[settings.octavesDifficulty].bass[0], octavesDifficuly[settings.octavesDifficulty].bass[1])
  for (let i = 0; i < numberOfNotes; i++) {

    let clef = seededRandom.chooseOne(settings.clefs)
    //let midi = chooseOne(octavesDifficuly.hard.bass)
    let midi = seededRandom.chooseOne(clef == "treble" ? trebleNotes : bassNotes)
    let octave = Math.floor(midi / 12) - 5
    let note = midiNaturals[midi % 12]
    notes.push({ note, clef, octave, midi: noteToMidiNumber(note, octave, currentKey) })
  }

  notesToBePlayed = [...notes]

  let el = div()
  let staffDiv = staff(currentKey, notes, countPerMeasure)

  el.appendChild(staffDiv)

  if (MIDI_ACCESS && MIDI_ACCESS.inputs.size === 0) {
    notify("No MIDI controller found, showing a fake piano.")
    spawnPiano()
  }

  currentNoteIndexToBePlayed = 0

  let questionText = t("pratiquezLecturePiano")(numberOfNotes, printNote(currentKey))
  currentLectureQuestionEl = createQuestion({
    light: true,
    questionText,
    answerNode: el,
  })

  currentLectureQuestionEl.querySelector(".answer").click()

  updateCorrectionButton(1)
  updateCorrectionButton(2)
  return questionText
}

function updateCorrectionButton(n) {
  let button = currentLectureQuestionEl.querySelector(`.correction button:nth-child(${n})`)
  button.innerText = 0
  button.dataset.count = 0
  button.style.color = `var(--barColor${n})`
  button.style.cursor = "default"
  button.disabled = true
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
  let keyboard = createPiano({
    min: minPiano,
    max: maxPiano,
    onKeyClicked: (note) => {
      simulateNote(note)
    },
  })

  const pianoSimulationEl = document.getElementById("pianoSimulation")
  pianoSimulationEl.innerHTML = ""
  pianoSimulationEl.appendChild(keyboard._svg)

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
    data: [144, noteNumber, 127], // 144 = Note On, velocity 127
  }
  handleMIDIMessage(fakeMessage)
}

function hanonExercise(seededRandom) {
  const exercise = seededRandom.chooseOne(hanonExercises)
  const rootIndex = getRandomRootIndex(seededRandom)
  const key = notes[rootIndex].root.replace("♯", "#").replace("♭", "b")

  let staffDiv = hanonStaff(key, exercise)

  let questionText = t("hanonExerciseQuestion")(exercise.name, printNote(key))
  let question = createQuestion({
    light: true,
    questionText,
    answerNode: staffDiv
  })
  question.querySelector(".answer").click()
  return questionText
}

function noteToMidiNumber(note, octave, key = "C") {
  const sharpMap = { C: 0, "C♯": 1, D: 2, "D♯": 3, E: 4, "E♯": 5, F: 5, "F♯": 6, G: 7, "G♯": 8, A: 9, "A♯": 10, B: 11, "B♯": 12 }
  const flatMap = { "C♭": -1, C: 0, "D♭": 1, D: 2, "E♭": 3, E: 4, "F♭": 4, F: 5, "G♭": 6, G: 7, "A♭": 8, A: 9, "B♭": 10, B: 11 }

  // Determine if this key uses flats or sharps
  const useSharps = !key.includes("b") && !key.includes("♭") && key !== "F"
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
    let currentKeyHitSuccess = new Date().valueOf()
    if (lastKeyHitSuccess) {
      let deltaTime = (currentKeyHitSuccess - lastKeyHitSuccess) / 1000
      addPianoStats(notesToBePlayed[currentNoteIndexToBePlayed].midi, playedMidiNote, currentKey, deltaTime)
    } else {
      addPianoStats(notesToBePlayed[currentNoteIndexToBePlayed].midi, playedMidiNote, currentKey)
    }
    lastKeyHitSuccess = currentKeyHitSuccess
    log("Note is correct")
    addGoodNote()
    noteEl.classList.add("correct")
    currentNoteIndexToBePlayed++
    if (currentNoteIndexToBePlayed >= notesToBePlayed.length) {
      if (settings.continuousReading === "sameClef") {
        pratiquezLecturePiano(seededRandom, currentKey)
        return
      }
      if (settings.continuousReading === "differentClef") {
        pratiquezLecturePiano(seededRandom)
        return
      }
      resetLectureQuestion()
    }
  } else {
    addPianoStats(notesToBePlayed[currentNoteIndexToBePlayed].midi, playedMidiNote, currentKey)
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

function melodyByEar(seededRandom) {
  // constants, load from settings later
  const intervals = settings.melodyTrainingScale == "melodyScaleMajor" ? [-12, -10, -8, -7, -5, -3, -1, 0, 2, 4, 5, 7, 9, 11, 12] : [-12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let maxGap = settings.melodyTrainingScale == "melodyScaleMajor" ? 5 : 9
  const numberOfNotes = settings.melodyTrainingNotesCount || 4
  const bpm = 120
  let key = seededRandom.chooseOne([55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65])
  let middleIndex = intervals.indexOf(0)
  let lastNote = key
  let notes = [{ midi: lastNote }]
  let possible = intervals.slice(middleIndex - maxGap, middleIndex + maxGap + 1)
  for (let i = 0; i < numberOfNotes - 1; i++) {
    let interval = seededRandom.chooseOne(possible)
    lastNote += interval
    notes.push({ midi: lastNote })
  }
  // for test only
  // notes = popularRiffs.iCanBuyMyselfFlowers // for test only
  const midiSet = Array.from(new Set(notes.map(n => n.midi)))
  let minMidi = Math.min(...midiSet)
  let maxMidi = Math.max(...midiSet)
  let min = allNotes[minMidi - seededRandom.int(10, 5)]
  let max = allNotes[maxMidi + seededRandom.int(10, 5)]
  let indice1 = createPiano({ notes: [allNotes[notes[0].midi]], min, max }, false, true)._svg
  let indice2 = createPiano({ notes: midiSet.map(x => allNotes[x]), min, max }, false, true)._svg
  let indice3 = p(join(notes.map(x => allNotes[x.midi].slice(0, -1))))
  let questionText = t("whatIsThisMelody")
  createEarQuestion({
    questionText,
    indices: [indice1, indice2, indice3],
    playNotes: () => playPianoNotes(notes, bpm),
  })

  playPianoNotes(notes, bpm)
  return questionText
}

function log(msg, type = "success") {
  const params = new URLSearchParams(window.location.search)
  const isDebug = params.get("debug") === "true"
  if (isDebug) {
    notify(msg, type)
  }
}

const popularRiffs = {
  iCanBuyMyselfFlowers: [{ midi: 64, tempo: 0.5 }, { midi: 64, tempo: 0.5 }, { midi: 64, tempo: 0.5 }, { midi: 62, tempo: 0.5 }, { midi: 60, tempo: 0.5 }, { midi: 64, tempo: 0.5 }, { midi: 65, tempo: 2 }],
  pourUnInstant: [{ midi: 69, tempo: 2 }, { midi: 67, tempo: 0.5 }, { midi: 69 }, { midi: 65 }, { midi: 65 }, { midi: 67 }, { midi: 69, tempo: 0.5 }, { midi: 67, tempo: 3.5 }, { midi: 69, tempo: 0.5 }, { midi: 67, tempo: 3.5 }]
}
