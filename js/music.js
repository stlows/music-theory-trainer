const FRET_COUNT = 9

const wordLetter = { C: "Do", D: "Ré", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si" }

const notes = [
  { root: "C", m2: "D♭", M2: "D", m3: "E♭", M3: "E", P4: "F", d5: "G♭", P5: "G", m6: "A♭", M6: "A", m7: "B♭", M7: "B", P8: "C" },
  { root: "D", m2: "E♭", M2: "E", m3: "F", M3: "F♯", P4: "G", d5: "A♭", P5: "A", m6: "B♭", M6: "B", m7: "C", M7: "C♯", P8: "D" },
  { root: "E", m2: "F", M2: "F♯", m3: "G", M3: "G♯", P4: "A", d5: "B♭", P5: "B", m6: "C", M6: "C♯", m7: "D", M7: "D♯", P8: "E" },
  { root: "F", m2: "G♭", M2: "G", m3: "A♭", M3: "A", P4: "B♭", d5: "C♭", P5: "C", m6: "D♭", M6: "D", m7: "E♭", M7: "E", P8: "F" },
  { root: "G", m2: "A♭", M2: "A", m3: "B♭", M3: "B", P4: "C", d5: "D♭", P5: "D", m6: "E♭", M6: "E", m7: "F", M7: "F♯", P8: "G" },
  { root: "A", m2: "B♭", M2: "B", m3: "C", M3: "C♯", P4: "D", d5: "E♭", P5: "E", m6: "F", M6: "F♯", m7: "G", M7: "G♯", P8: "A" },
  { root: "B", m2: "C", M2: "C♯", m3: "D", M3: "D♯", P4: "E", d5: "F", P5: "F♯", m6: "G", M6: "G♯", m7: "A", M7: "A♯", P8: "B" },
  { root: "C♯", m2: "D", M2: "D♯", m3: "E", M3: "E♯", P4: "F♯", d5: "G", P5: "G♯", m6: "A", M6: "A♯", m7: "B", M7: "B♯", P8: "C♯" },
  { root: "D♯", m2: "E", M2: "E♯", m3: "F♯", M3: "F♯♯", P4: "G♯", d5: "A", P5: "A♯", m6: "B", M6: "B♯", m7: "C♯", M7: "C♯♯", P8: "D♯" },
  { root: "F♯", m2: "G", M2: "G♯", m3: "A", M3: "A♯", P4: "B", d5: "C", P5: "C♯", m6: "D", M6: "D♯", m7: "E", M7: "E♯", P8: "F♯" },
  { root: "G♯", m2: "A", M2: "A♯", m3: "B", M3: "B♯", P4: "C♯", d5: "D", P5: "D♯", m6: "E", M6: "E♯", m7: "F♯", M7: "F♯♯", P8: "G♯" },
  { root: "A♯", m2: "B", M2: "B♯", m3: "C♯", M3: "C♯♯", P4: "D♯", d5: "E", P5: "E♯", m6: "F♯", M6: "F♯♯", m7: "G♯", M7: "G♯♯", P8: "A♯" },
  { root: "C♭", m2: "D♭♭", M2: "D♭", m3: "E♭♭", M3: "E♭", P4: "F♭", d5: "G♭♭", P5: "G♭", m6: "A♭♭", M6: "A♭", m7: "B♭♭", M7: "B♭", P8: "C♭" },
  { root: "D♭", m2: "E♭♭", M2: "E♭", m3: "F♭", M3: "F", P4: "G♭", d5: "A♭♭", P5: "A♭", m6: "B♭♭", M6: "B♭", m7: "C♭", M7: "C", P8: "D♭" },
  { root: "E♭", m2: "F♭", M2: "F", m3: "G♭", M3: "G", P4: "A♭", d5: "B♭♭", P5: "B♭", m6: "C♭", M6: "C", m7: "D♭", M7: "D", P8: "E♭" },
  { root: "F♭", m2: "G♭♭", M2: "G♭", m3: "A♭♭", M3: "A♭", P4: "B♭♭", d5: "C♭♭", P5: "C♭", m6: "D♭♭", M6: "D♭", m7: "E♭♭", M7: "E♭", P8: "F♭" },
  { root: "G♭", m2: "A♭♭", M2: "A♭", m3: "B♭♭", M3: "B♭", P4: "C♭", d5: "D♭♭", P5: "D♭", m6: "E♭♭", M6: "E♭", m7: "F♭", M7: "F", P8: "G♭" },
  { root: "A♭", m2: "B♭♭", M2: "B♭", m3: "C♭", M3: "C", P4: "D♭", d5: "E♭♭", P5: "E♭", m6: "F♭", M6: "F", m7: "G♭", M7: "G", P8: "A♭" },
  { root: "B♭", m2: "C♭", M2: "C", m3: "D♭", M3: "D", P4: "E♭", d5: "F♭", P5: "F", m6: "G♭", M6: "G", m7: "A♭", M7: "A", P8: "B♭" },
]

const accords = [
  { name: "majeur", notes: ["root", "M3", "P5"], title: "Majeur" },
  { name: "mineur", notes: ["root", "m3", "P5"], title: "Mineur" },
  { name: "7", notes: ["root", "M3", "P5", "m7"], title: "7e" },
  { name: "maj7", notes: ["root", "M3", "P5", "M7"], title: "Majeur 7e" },
  { name: "m7", notes: ["root", "m3", "P5", "m7"], title: "7e mineur" },
  { name: "m(maj7)", notes: ["root", "m3", "P5", "M7"], title: "Majeur 7e mineur" },
  { name: "add9", notes: ["root", "M2", "M3", "P5"], title: "Additionné 9" },
  { name: "add4", notes: ["root", "M3", "P4", "P5"], title: "Additionné 4" },
  { name: "sus2", notes: ["root", "M2", "P5"], title: "Suspendu 2" },
  { name: "sus4", notes: ["root", "P4", "P5"], title: "Suspendu 4" },
  { name: "dim", notes: ["root", "m3", "d5"], title: "Diminué" },
]

const gammes = [
  { name: "majeur", notes: ["root", "M2", "M3", "P4", "P5", "M6", "M7"] },
  { name: "mineurNaturelle", notes: ["root", "M2", "m3", "P4", "P5", "m6", "m7"] },
  { name: "mineurHarmonique", notes: ["root", "M2", "m3", "P4", "P5", "m6", "M7"] },
  { name: "mineurMelodiqueAsc", notes: ["root", "M2", "m3", "P4", "P5", "M6", "M7"] },
  { name: "mineurMelodiqueDesc", notes: ["root", "m7", "m6", "P5", "P4", "m3", "M2"] },
  { name: "majorPentatonic", notes: ["root", "M2", "M3", "P5", "M6"] },
  { name: "minorPentatonic", notes: ["root", "m3", "P4", "P5", "m7"] },
  { name: "chromatic", notes: ["root", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"] }
]

const accordsManches = {
  majeur: {
    C: [{ corde: 5, fret: 0 }, { corde: 4, fret: 3 }, { corde: 3, fret: 2 }, { corde: 2, fret: 0 }, { corde: 1, fret: 1 }],
    D: [{ corde: 4, fret: 0 }, { corde: 3, fret: 2 }, { corde: 2, fret: 3 }, { corde: 1, fret: 2 }],
    E: [{ corde: 6, fret: 0 }, { corde: 5, fret: 2 }, { corde: 4, fret: 2 }, { corde: 3, fret: 1 }, { corde: 2, fret: 0 }, { corde: 1, fret: 0 }],
    F: [{ barre: [1, 6], fret: 1 }, { corde: 5, fret: 3 }, { corde: 4, fret: 3 }, { corde: 3, fret: 2 }],
    G: [{ corde: 6, fret: 3 }, { corde: 5, fret: 2 }, { corde: 4, fret: 0 }, { corde: 3, fret: 0 }, { corde: 2, fret: 3 }, { corde: 1, fret: 3 }],
    A: [{ corde: 5, fret: 0 }, { corde: 4, fret: 2 }, { corde: 3, fret: 2 }, { corde: 2, fret: 2 }, { corde: 1, fret: 0 }],
    B: [{ barre: [1, 5], fret: 2 }, { corde: 4, fret: 4 }, { corde: 3, fret: 4 }, { corde: 2, fret: 4 }],
  },
  mineur: {
    C: [{ barre: [1, 5], fret: 3 }, { corde: 4, fret: 5 }, { corde: 3, fret: 5 }, { corde: 2, fret: 4 }],
    D: [{ corde: 4, fret: 0 }, { corde: 3, fret: 2 }, { corde: 2, fret: 3 }, { corde: 1, fret: 1 }],
    E: [{ corde: 6, fret: 0 }, { corde: 5, fret: 2 }, { corde: 4, fret: 2 }, { corde: 3, fret: 0 }, { corde: 2, fret: 0 }, { corde: 1, fret: 0 }],
    F: [{ barre: [1, 6], fret: 1 }, { corde: 5, fret: 3 }, { corde: 4, fret: 3 }],
    G: [{ corde: 6, fret: 3 }, { corde: 5, fret: 1 }, { corde: 4, fret: 0 }, { corde: 3, fret: 0 }, { corde: 2, fret: 3 }, { corde: 1, fret: 3 }],
    A: [{ corde: 5, fret: 0 }, { corde: 4, fret: 2 }, { corde: 3, fret: 2 }, { corde: 2, fret: 1 }, { corde: 1, fret: 0 }],
    B: [{ barre: [1, 5], fret: 2 }, { corde: 4, fret: 4 }, { corde: 3, fret: 4 }, { corde: 2, fret: 3 }],
  },
  "7": {

  },
  "maj7": {

  },
  "m7": {

  },
  "m(maj7)": {

  },
  "add9": {

  },
  "add4": {

  },
  "sus2": {

  },
  "sus4": {

  }
}

const cordes = ["E", "B", "G", "D", "A", "E"].map(x => notes.find(n => n.root === x))
const chromatic = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯"]

const fifths = {
  major: ["F", "C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭", "F", "C"],
  minor: ["Dm", "Am", "Em", "Bm", "F♯m", "C♯m", "G♯m", "D♯m", "B♭m", "Fm", "Cm", "Gm", "Dm", "Am"],
  chords: [{ type: "major", add: 0, roman: "I" }, { type: "minor", add: -1, roman: "ii" }, { type: "minor", add: 1, roman: "iii" }, { type: "major", add: -1, roman: "IV" }, { type: "major", add: 1, roman: "V" }, { type: "minor", add: 0, roman: "vi" }]
}

function note(corde, fret) {
  const root = cordes[corde].root
  const noteIndex = chromatic.indexOf(root)
  return chromatic[(noteIndex + fret) % 12]
}

function getGamme(noteIndex, gammeIndex) {
  const gamme = { type: gammes[gammeIndex], notes: [], tonique: notes[noteIndex].root }
  for (let i = 0; i < gamme.type.notes.length; i++) {
    gamme.notes.push(notes[noteIndex][gamme.type.notes[i]])
  }
  return gamme
}

function getAccord(noteIndex, accordIndex) {
  const accord = { type: accords[accordIndex], notes: [], tonique: notes[noteIndex].root }
  for (let i = 0; i < accord.type.notes.length; i++) {
    accord.notes.push(notes[noteIndex][accord.type.notes[i]])
  }
  return accord
}

// note: C
function printNote(note) {
  note = note.replace("b", "♭")
  if (settings.notation === "word") {
    const regex = /^([A-G])([♯♭]*?)([1-9]*)$/
    const match = note.match(regex)

    if (!match) {
      return 'Unknown note'
    }

    const baseNote = match[1]
    const alterations = match[2] || ''
    const octave = match[3] || ''

    const solfegeBase = wordLetter[baseNote]
    return solfegeBase + alterations + octave
  }

  return note

}

function join(arr, sep = " - ") {
  return arr.join(sep)
}

function getDescriptionAccord(accordIndex) {
  return join(accords[accordIndex].notes.map(i => t(i)))
}

function getDescriptionGamme(gammeIndex) {
  return join(gammes[gammeIndex].notes.map(i => t(i)))
}

