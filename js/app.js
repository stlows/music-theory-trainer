const gameEl = document.getElementById("game")

function getRandomNaturalNoteIndex() {
  const tonic = chooseOne(naturalNotes)
  return notes.findIndex(x => x.letter === tonic.letter)
}

function createGuitarQuestion({ questionText = "Test", notes = [], answerText = "", delayedNotes = false }) {
  const questionWrapper = div("question")
  const question = h4(questionText)
  questionWrapper.appendChild(question)

  const guitar = createGuitar({ notes: delayedNotes ? [] : notes, fretCount: FRET_COUNT })
  questionWrapper.appendChild(guitar)
  questionWrapper.addEventListener("click", () => {
    question.innerText = questionText + " " + answerText
    if (delayedNotes) {
      addNotesToGuitar(guitar, notes)
    }
  })
  gameEl.prepend(questionWrapper)
}

function quelleNoteSurManche() {
  const corde = random(7, 1)
  const fret = random(parseInt(settings.frets) + 1, 1)
  createGuitarQuestion({
    questionText: t("whatIsThisNote"),
    answerText: note({ corde: corde - 1, fret })[settings.notation],
    notes: [{ corde, fret }]
  })
}

function questionFretboard() {
  if (Math.random() < 0.5) {
    return quelleNoteSurManche()
  }
  return noteSurManche()
}

function noteSurManche() {
  const noteIndex = random(12)
  const noteATrouver = notes[noteIndex]
  const notesSurManche = []
  for (let corde = 0; corde < cordes.length; corde++) {
    for (let fret = 0; fret < FRET_COUNT; fret++) {
      const laNote = note({ corde: corde, fret })
      if (laNote.letter === noteATrouver.letter) {
        notesSurManche.push({ corde: corde + 1, fret })
      }
    }
  }
  createGuitarQuestion({
    questionText: `${t('findSome')} ${noteATrouver[settings.notation]}?`,
    notes: notesSurManche,
    delayedNotes: true
  })
}

function createQuestion({ questionText, answerText }) {
  const questionWrapper = div("question")
  const question = h4(questionText)
  questionWrapper.appendChild(question)
  const answer = div("answer")
  answer.addEventListener("click", (a) => {
    a.target.innerText = answerText
  })
  answer.innerText = t("clickForAnswer")
  questionWrapper.appendChild(answer)
  gameEl.prepend(questionWrapper)
}

function whichNote() {
  const noteIndex = random(12)
  const tonique = notes[noteIndex]
  const intervalleIndex = random(12, 1)
  const intervalle = intervalles[intervalleIndex]
  createQuestion({
    questionText: `${t(intervalle)} (${intervalleIndex} ${t('halfTone')}${intervalleIndex > 1 ? 's' : ''}) ${t('of')} ${tonique[settings.notation]} ?`,
    answerText: notes[(noteIndex + intervalleIndex) % 12][settings.notation]
  })
}

function chord() {
  const noteIndex = getRandomNaturalNoteIndex()
  const accordSettingsIndex = random(settings.accords.length)
  const accordIndex = accords.findIndex(x => x.name === settings.accords[accordSettingsIndex])
  const accord = getAccord(noteIndex, accordIndex)
  createQuestion({
    questionText: t("chord")(accord.tonique[settings.notation], t(accord.type.name)) + " ?",
    answerText: notesString(accord.notes)
  })
}

function gamme() {
  const noteIndex = getRandomNaturalNoteIndex()
  const randomGammeName = chooseOne(settings.gammes)
  const gammeIndex = gammes.findIndex(x => x.name === randomGammeName)
  const gamme = getGamme(noteIndex, gammeIndex)
  createQuestion({
    questionText: t("gamme")(gamme.tonique[settings.notation], t(gamme.type.name)) + " ?",
    answerText: notesString(gamme.notes)
  })
}

function circleOrFifths() {
  const rnd = Math.random()
  const keyIndex = random(13, 1)
  let questionText, answerText
  const key = fifths.major[keyIndex]
  if (rnd < 0.3) {
    // Chords in the Key
    questionText = t("chordsInTheKey")(key)
    answerText = fifths.chords.map(x => `${fifths[x.type][keyIndex + x.add]}`).join(" - ")
  } else if (rnd < 0.6) {
    // nth in the key
    const chordIndex = random(fifths.chords.length)
    const chord = fifths.chords[chordIndex]
    questionText = t("nthNoteInKey")(key, chord.roman)
    answerText = fifths[chord.type][keyIndex + chord.add]
  }
  else if (rnd < 0.9) {
    // chords in progression
    const chords = [...fifths.chords].sort((a, b) => { return Math.random() - 0.5 }).slice(0, 4)
    const progression = chords.map(x => x.roman).join(" - ")
    questionText = t("chordsInProgression")(key, progression)
    answerText = chords.map(x => fifths[x.type][keyIndex + x.add]).join(" - ")
  } else {
    // Relative key
    questionText = t("relativeKey")(key)
    answerText = fifths.minor[keyIndex]
  }

  createQuestion({
    questionText,
    answerText
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
      const gammeTitle = h5(t("gamme")(notes[noteIndex][settings.notation], t(gamme.type.name)))
      wrapper.appendChild(gammeTitle)
      wrapper.appendChild(p(notesString(gamme.notes)))
      gammeEl.appendChild(wrapper)
    }
    gammesEl.appendChild(gammeEl)
  }
}

function printAllAccords() {
  const accordsEl = document.getElementById("accords")
  accordsEl.innerHTML = ""
  for (let accordIndex = 0; accordIndex < accords.length; accordIndex++) {
    let accordEl = div("mb")
    accordEl.appendChild(h4(accords[accordIndex].title))
    accordEl.appendChild(p(getDescriptionAccord(accordIndex), "mb-small"))
    for (let noteIndex = 0; noteIndex < notes.length; noteIndex++) {
      let wrapper = div("accord")
      let accord = getAccord(noteIndex, accordIndex)
      const accordTitle = h5(t("chord")(notes[noteIndex][settings.notation], t(accord.type.name)))
      wrapper.appendChild(accordTitle)
      wrapper.appendChild(p(notesString(accord.notes)))
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