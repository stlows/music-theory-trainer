const gameEl = document.getElementById("game")

function question() {
  const questionFunc = chooseOne(settings.questions)
  if (window[questionFunc]) {
    window[questionFunc]()
  }
}

function getRandomRootIndex() {
  const tonic = chooseOne(settings.roots)
  return notes.findIndex(x => x.root === tonic)
}

function createGuitarQuestion({ questionText = "Test", notes = [], answerText = "", delayedNotes = false }) {
  const questionWrapper = div("question")
  const question = h4(questionText)
  questionWrapper.appendChild(question)

  const guitar = createGuitar({ notes: delayedNotes ? [] : notes, fretCount: FRET_COUNT })
  questionWrapper.appendChild(guitar)
  questionWrapper.addEventListener("click", () => {
    questionWrapper.classList.add("answered")
    question.innerText = questionText + " " + answerText
    if (delayedNotes) {
      addNotesToGuitar(guitar, notes)
    }
  })
  questionWrapper.appendChild(correction())
  gameEl.prepend(questionWrapper)

}

function quelleNoteSurManche() {
  const corde = random(7, 1)
  const fret = random(parseInt(settings.frets) + 1, 1)
  createGuitarQuestion({
    questionText: t("whatIsThisNote"),
    answerText: printNote(note(corde - 1, fret)),
    notes: [{ corde, fret }]
  })
}

function noteSurManche() {
  const noteATrouver = chooseOne(chromatic)
  const notesSurManche = []
  for (let corde = 0; corde < cordes.length; corde++) {
    for (let fret = 0; fret < FRET_COUNT; fret++) {
      const laNote = note(corde, fret)
      if (laNote === noteATrouver) {
        notesSurManche.push({ corde: corde + 1, fret })
      }
    }
  }
  createGuitarQuestion({
    questionText: `${t('findSome')} ${printNote(noteATrouver)}?`,
    notes: notesSurManche,
    delayedNotes: true
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

function createQuestion({ questionText, answerText }) {
  const questionWrapper = div("question")
  const question = h4(questionText)
  questionWrapper.appendChild(question)

  const answer = div("answer")
  answer.addEventListener("click", (a) => {
    a.target.innerText = answerText
    questionWrapper.classList.add("answered")
  })
  answer.innerText = t("clickForAnswer")
  questionWrapper.appendChild(answer)

  const { correctionWrapper, buttonBad } = correction()
  questionWrapper.appendChild(correctionWrapper)

  if (settings.timerInSeconds > 0) {
    questionWrapper.classList.add("timed")
    questionWrapper.style.setProperty("--question-timer", settings.timerInSeconds + "s")
    setTimeout(() => {
      answer.click()
      if (settings.autoSelectBadAfterTimer === 'true') {
        buttonBad.click()
      }
    }, settings.timerInSeconds * 1000)
  }
  gameEl.prepend(questionWrapper)
}

function intervalle() {
  const rootIndex = getRandomRootIndex()
  const intervalle = chooseOne(Object.keys(notes[0]))
  createQuestion({
    questionText: `${t(intervalle)} ${t('of')} ${printNote(notes[rootIndex].root)} ?`,
    answerText: printNote(notes[rootIndex][intervalle])
  })
}

function chord() {
  const noteIndex = getRandomRootIndex()
  const accordSettingsIndex = random(settings.accords.length)
  const accordIndex = accords.findIndex(x => x.name === settings.accords[accordSettingsIndex])
  const accord = getAccord(noteIndex, accordIndex)
  createQuestion({
    questionText: t("chord")(printNote(accord.tonique), t(accord.type.name)) + " ?",
    answerText: join(accord.notes)
  })
}

function gamme() {
  const noteIndex = getRandomRootIndex()
  const randomGammeName = chooseOne(settings.gammes)
  const gammeIndex = gammes.findIndex(x => x.name === randomGammeName)
  const gamme = getGamme(noteIndex, gammeIndex)
  createQuestion({
    questionText: t("gamme")(printNote(gamme.tonique), t(gamme.type.name)) + " ?",
    answerText: join(gamme.notes)
  })
}

function getCircleOfFifthsKey() {
  return chooseOne(settings.roots.filter(x => fifths.major.indexOf(x) > -1))
}

function chordsInKey() {
  const key = getCircleOfFifthsKey()
  const keyIndex = fifths.major.indexOf(key)
  createQuestion({
    questionText: t("chordsInTheKey")(key),
    answerText: fifths.chords.map(x => `${fifths[x.type][keyIndex + x.add]}`).join(" - ")
  })
}

function nthNoteInKey() {
  const key = getCircleOfFifthsKey()
  const keyIndex = fifths.major.indexOf(key)
  const chordIndex = random(fifths.chords.length)
  const chord = fifths.chords[chordIndex]
  createQuestion({
    questionText: t("nthNoteInKey")(key, chord.roman),
    answerText: fifths[chord.type][keyIndex + chord.add]
  })
}

function chordsInProgression() {
  const key = getCircleOfFifthsKey()
  const keyIndex = fifths.major.indexOf(key)
  const chords = [...fifths.chords].sort((a, b) => { return Math.random() - 0.5 }).slice(0, 4)
  const progression = chords.map(x => x.roman).join(" - ")
  createQuestion({
    questionText: t("chordsInProgression")(key, progression),
    answerText: chords.map(x => fifths[x.type][keyIndex + x.add]).join(" - ")
  })
}

function relativeKey() {
  const key = getCircleOfFifthsKey()
  const keyIndex = fifths.major.indexOf(key)
  createQuestion({
    questionText: t("relativeKey")(key),
    answerText: fifths.minor[keyIndex]
  })
}

function printAllGammes() {
  const gammesEl = document.getElementById("gammes")
  gammesEl.innerHTML = ""
  for (let gammeIndex = 0; gammeIndex < gammes.length; gammeIndex++) {
    let gammeEl = div("mb")
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      let wrapper = div("gamme")
      let gamme = getGamme(noteIndex, gammeIndex)
      const gammeTitle = h5(t("gamme")(printNote(notes[noteIndex].root), t(gamme.type.name)))
      wrapper.appendChild(gammeTitle)
      wrapper.appendChild(p(join(gamme.notes)))
      gammeEl.appendChild(wrapper)
    }
    gammesEl.appendChild(gammeEl)
  }
}

function printAllAccords() {
  const accordsEl = document.getElementById("accords")
  accordsEl.innerHTML = ""
  const filters = []
  for (let accordIndex = 0; accordIndex < accords.length; accordIndex++) {
    let accordEl = div("mb")
    accordEl.appendChild(h4(accords[accordIndex].title))
    accordEl.appendChild(p(getDescriptionAccord(accordIndex), "mb-small"))
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      let wrapper = div("accord")
      let accord = getAccord(noteIndex, accordIndex)
      const accordTitle = h5(t("chord")(printNote(notes[noteIndex].root), t(accord.type.name)))
      wrapper.appendChild(accordTitle)
      wrapper.appendChild(p(join(accord.notes)))
      accordEl.appendChild(wrapper)
      const accordTypesGuitare = accordsManches[accord.type.name]
      if (accordTypesGuitare) {
        const accordNotesGuitare = accordTypesGuitare[notes[noteIndex].letter]
        if (accordNotesGuitare) {
          const guitare = createGuitar({ notes: accordNotesGuitare })
          wrapper.appendChild(guitare)
        }
      }
    }
    accordsEl.appendChild(accordEl)
    accordsEl.appendChild(hr())
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