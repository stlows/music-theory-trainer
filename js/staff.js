function staff(key, notes, countPerMeasure = 4, beat = 4) {
  const el = div()
  let trebleNotes = ""
  let bassNotes = ""
  let notesParBeat = beat / 4

  for (let group = 0; group < notes.length / countPerMeasure / notesParBeat; group++) {
    for (let i = 0; i < countPerMeasure * notesParBeat; i++) {
      const note = notes[group * countPerMeasure * notesParBeat + i]
      const abcNote = getAbcNote(note)
      if (note.clef === "treble") {
        trebleNotes += abcNote
        bassNotes += "z"
      } else if (note.clef === "bass") {
        bassNotes += abcNote
        trebleNotes += "z"
      }
    }
    trebleNotes += "|"
    bassNotes += "|"
  }

  key = key.replace("♯", "#").replace("♭", "b")

  let abcString = `
X:1
M:${countPerMeasure}/4
L:1/${beat}
K:${key}
%%%score (T B)
V: T clef=treble
V: B clef=bass
V: T
${trebleNotes}
V: B
${bassNotes}
    `

  abcString = abcString.replace(/z{2,}/g, match => {
    return 'z' + match.length
  })

  let staffwidth = Math.min(screen.width * 0.65, 600)
  let x = ABCJS.renderAbc(el, abcString, { scale: 1.4, selectTypes: [], add_classes: true, staffwidth })
  let trebles = x[0].lines[0].staff[0].voices[0].filter(x => x.el_type === "note" && x.pitches)
  let bass = x[0].lines[0].staff[1].voices[0].filter(x => x.el_type === "note" && x.pitches)
  let trebleIndex = 0
  let bassIndex = 0
  for (let i = 0; i < notesToBePlayed.length; i++) {
    if (notesToBePlayed[i].clef === "treble") {
      notesToBePlayed[i].element = trebles[trebleIndex++].abselem.elemset[0]
    }
    if (notesToBePlayed[i].clef === "bass") {
      notesToBePlayed[i].element = bass[bassIndex++].abselem.elemset[0]
    }
  }

  return el
}

function getAbcNote(note) {
  let prefix = ""
  if (note.note.includes("♭♭")) prefix = "__"
  else if (note.note.includes("♯♯")) prefix = "^^"
  else if (note.note.includes("♯")) prefix = "^"
  else if (note.note.includes("♭")) prefix = "_"

  // Strip accidental symbol to get base note (A-G)
  let baseNote = note.note.replace(/[^A-G]/g, "").toUpperCase()

  if (note.octave > 0) {
    baseNote = baseNote + "'".repeat(note.octave)
  } else if (note.octave < 0) {
    baseNote = baseNote + ",".repeat(-note.octave)
  }

  return prefix + baseNote
}

function hanonStaff(key, hanonExercice) {

  const el = div()
  const hanonABC = generateHanonABC({
    key,
    barsPerLine: 2,
    lastAscending: 6,
    lastDescending: 0,
    ...hanonExercice,
  })

  let staffwidth = Math.min(screen.width * 0.65, 600)
  ABCJS.renderAbc(el, hanonABC, { scale: 1.4, selectTypes: [], add_classes: false, staffwidth })
  return el
}

function notesToString(notes, notesPerBar, barsPerLine) {
  let str = ''
  for (let i = 0; i < notes.length; i++) {
    str += notes[i] + ''
    if ((i + 1) % (notesPerBar / 2) === 0) str = str.trim() + ' '
    if ((i + 1) % notesPerBar === 0) str = str.trim() + ' | '
    if ((i + 1) % (notesPerBar * barsPerLine) === 0) str += '\n'
  }
  return str.trim()
}

function simpleNotesStaff(notes, stacked = false, forceOctaveBreaks = []) {
  let order = "CDEFGAB"
  const header = `
    X:1
    M:4/4
    L:1/4
    K:C
    `;
  let notesStr = ""
  let octave = 0
  for (let i = 0; i < notes.length; i++) {
    if (i > 0 && order.indexOf(notes[i][0]) < order.indexOf(notes[i - 1][0])) {
      octave += 1
    }
    if (forceOctaveBreaks.includes(i)) {
      octave += 1
    }
    notesStr += getAbcNote({ note: notes[i], octave })
  }
  const staffDiv = div();

  let staffwidth = Math.min(screen.width * 0.65, 600);
  let melodyStr = header + (stacked ? "[" : "") + notesStr + (stacked ? "]" : "");
  //console.log(melodyStr)
  ABCJS.renderAbc(staffDiv, melodyStr, { scale: 1.4, selectTypes: [], add_classes: false, staffwidth });
  return staffDiv;
}