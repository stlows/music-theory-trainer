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

function addCorrectionAndTimer(questionWrapper, answer) {
  const { correctionWrapper, buttonBad } = correction()
  questionWrapper.appendChild(correctionWrapper)

  if (settings.timerInSeconds > 0) {
    questionWrapper.classList.add("timed")
    questionWrapper.style.setProperty("--question-timer", settings.timerInSeconds + "s")
    const timeoutId = setTimeout(() => {
      answer.click()
      if (settings.autoSelectBadAfterTimer === 'true') {
        buttonBad.click()
      }
    }, settings.timerInSeconds * 1000)
    return timeoutId
  }

}

function createQuestion({ questionText, answerText, extraInfos }) {
  const questionWrapper = div("question")
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
      a.target.innerText = answerText
      questionWrapper.classList.add("answered")
      clearInterval(timeoutId)
    }
  })



  gameEl.prepend(questionWrapper)
}

function intervalle() {
  const rootIndex = getRandomRootIndex()
  const intervalle = chooseOne(Object.keys(notes[0]))
  const notesDansIntervalle = gammeChromatic.slice(0, gammeChromatic.indexOf(intervalle) + 1)
  createQuestion({
    questionText: `${t(intervalle)} ${t('of')} ${printNote(notes[rootIndex].root)} ?`,
    answerText: printNote(notes[rootIndex][intervalle]),
    extraInfos: join(notesDansIntervalle.map(x => printNote(notes[rootIndex][x])))
  })
}

function chord() {
  const noteIndex = getRandomRootIndex()
  const accordSettingsIndex = random(settings.accords.length)
  const accordIndex = accords.findIndex(x => x.name === settings.accords[accordSettingsIndex])
  const accord = getAccord(noteIndex, accordIndex)
  createQuestion({
    questionText: t("chord")(printNote(accord.tonique), t(accord.type.name)) + " ?",
    answerText: join(accord.notes),
    extraInfos: join(accords[accordIndex].notes)
  })
}

function gamme() {
  const noteIndex = getRandomRootIndex()
  const randomGammeName = chooseOne(settings.gammes)
  const gammeIndex = gammes.findIndex(x => x.name === randomGammeName)
  const gamme = getGamme(noteIndex, gammeIndex)
  createQuestion({
    questionText: t("gamme")(printNote(gamme.tonique), t(gamme.type.name)) + " ?",
    answerText: join(gamme.notes),
    extraInfos: join(gammes[gammeIndex].notes)
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
    answerText: join(fifths.chords.map(x => `${fifths[x.type][keyIndex + x.add]}`))
  })
}

function nthNoteInKey() {
  const key = getCircleOfFifthsKey()
  const keyIndex = fifths.major.indexOf(key)
  const chordIndex = random(fifths.chords.length)
  const chord = fifths.chords[chordIndex]
  createQuestion({
    questionText: t("nthNoteInKey")(key, chord.roman),
    answerText: fifths[chord.type][keyIndex + chord.add],
    extraInfos: join(fifths.chords.map(x => `${fifths[x.type][keyIndex + x.add]}`))
  })
}

function chordsInProgression() {
  const key = getCircleOfFifthsKey()
  const keyIndex = fifths.major.indexOf(key)
  const chords = [...fifths.chords].sort((a, b) => { return Math.random() - 0.5 }).slice(0, 4)
  const progression = chords.map(x => x.roman).join(" - ")
  createQuestion({
    questionText: t("chordsInProgression")(key, progression),
    answerText: join(chords.map(x => fifths[x.type][keyIndex + x.add])),
    extraInfos: join(fifths.chords.map(x => `${fifths[x.type][keyIndex + x.add]}`))
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

function intervalByEar() {
  const startIndex = 20
  const endIndex = 40
  const maxInterval = 12
  const bassIndex = random(endIndex + 1, startIndex)
  const interval = random(maxInterval + 1)
  createEarQuestion({
    questionText: t("whatIsThisInterval"),
    answerText: `${t(Object.keys(notes[0])[interval])} - Basse: ${printNote(allNotes[bassIndex])} - High note: ${printNote(allNotes[bassIndex + interval])} `,
    playNotes: () => playNotes(bassIndex, interval)
  })
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
      wrapper.appendChild(p(join(gamme.notes.map(x => printNote(x)))))
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