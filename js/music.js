const FRET_COUNT = 12

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

// Major (Ionian) – the most common “happy” sounding scale.
// Formula: W W H W W W H

// Natural Minor (Aeolian) – often sounds sad or dark.
// Formula: W H W W H W W

// Dorian – minor mode with a major 6th.
// Formula: W H W W W H W

// Phrygian – minor with a flat 2, exotic/flamenco feel.
// Formula: H W W W H W W

// Lydian – major with a raised 4th, dreamy.
// Formula: W W W H W W H

// Mixolydian – major with a flat 7, bluesy/rocky.
// Formula: W W H W W H W

// Locrian – diminished scale, unstable sound.
// Formula: H W W H W W W
const gammes = [
  // Diatonic Modes (7 modes)
  { name: "ionian", notes: ["root", "M2", "M3", "P4", "P5", "M6", "M7"] },             // Major
  { name: "dorian", notes: ["root", "M2", "m3", "P4", "P5", "M6", "m7"] },
  { name: "phrygian", notes: ["root", "m2", "m3", "P4", "P5", "m6", "m7"] },
  { name: "lydian", notes: ["root", "M2", "M3", "d5", "P5", "M6", "M7"] },
  { name: "mixolydian", notes: ["root", "M2", "M3", "P4", "P5", "M6", "m7"] },
  { name: "aeolian", notes: ["root", "M2", "m3", "P4", "P5", "m6", "m7"] },            // Natural Minor
  { name: "locrian", notes: ["root", "m2", "m3", "P4", "d5", "m6", "m7"] },

  // Harmonic & Melodic Minor
  { name: "harmonicMinor", notes: ["root", "M2", "m3", "P4", "P5", "m6", "M7"] },
  { name: "melodicMinorAsc", notes: ["root", "M2", "m3", "P4", "P5", "M6", "M7"] },
  { name: "melodicMinorDesc", notes: ["root", "m7", "m6", "P5", "P4", "m3", "M2"] },

  // Pentatonic & Blues
  { name: "majorPentatonic", notes: ["root", "M2", "M3", "P5", "M6"] },
  { name: "minorPentatonic", notes: ["root", "m3", "P4", "P5", "m7"] },
  { name: "blues", notes: ["root", "m3", "P4", "d5", "P5", "m7"] },

  // Chromatic
  { name: "chromatic", notes: ["root", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"] }
];

const gammeChromatic = gammes.find(x => x.name === 'chromatic').notes
const naturals = ["C", "D", "E", "F", "G", "A", "B"]
const intervals = gammeChromatic.concat(["P8"])
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
  major: ["F", "C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭"],
  minor: ["Dm", "Am", "Em", "Bm", "F♯m", "C♯m", "G♯m", "D♯m", "B♭m", "Fm", "Cm", "Gm"],
  chords: [
    { type: "major", add: 0, roman: "I" },
    { type: "minor", add: 11, roman: "ii" },
    { type: "minor", add: 1, roman: "iii" },
    { type: "major", add: 11, roman: "IV" },
    { type: "major", add: 1, roman: "V" },
    { type: "minor", add: 0, roman: "vi" }
  ]
}

function getChordDegree(key, degree) {
  if (degree < 1 || degree > 6) {
    console.error(`Degree ${degree} is not valid`)
  }
  let chord = fifths.chords[degree - 1]
  let keyIndex = fifths.major.indexOf(key)
  let degreeIndex = (keyIndex + chord.add) % 12
  return fifths[chord.type][degreeIndex]
}

function getChordDegrees(key) {
  return [1, 2, 3, 4, 5, 6].map((x) => getChordDegree(key, x))
}
function getRoman(degree) {
  return fifths.chords[degree - 1].roman
}

function note(corde, fret) {
  const root = cordes[corde].root
  const noteIndex = chromatic.indexOf(root)
  return chromatic[(noteIndex + fret) % 12]
}

function notesEqual(note1, note2) {
  return noteId(note1) === noteId(note2)
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

function getNotes(rootIndex, from, to) {

}

function getDistance(root, note) {
  note = replaceFlatForSharp(note)
  root = replaceFlatForSharp(root)
  const rootIndex = chromatic.indexOf(root)
  const noteIndex = chromatic.indexOf(note)
  const result = noteIndex - rootIndex

  return result < 0 ? result + 12 : result
}

function noteId(note) {
  let base = "A.BC.D.EF.G.".indexOf(note[0])
  note.split("").forEach(n => {
    if (n === "♭") {
      base--
    }
    if (n === "♯") {
      base++
    }
  })
  return (base + 12) % 12
}

function replaceFlatForSharp(note) {
  switch (note) {
    case "A♭":
      return "G♯"
    case "A♭♭":
      return "G"
    case "B♭":
      return "A♯"
    case "B♭♭":
      return "A"
    case "C♭":
      return "B"
    case "C♭♭":
      return "A♯"
    case "D♭":
      return "C♯"
    case "D♭♭":
      return "C"
    case "E♭":
      return "D♯"
    case "E♭♭":
      return "D"
    case "F♭":
      return "E"
    case "F♭♭":
      return "D♯"
    case "G♭":
      return "F♯"
    case "G♭♭":
      return "F"
    default:
      return note
  }
}


const intervalManche = {
  'root': { deltaCorde: 0, deltaFret: 0 },
  'm2': { deltaCorde: 1, deltaFret: -4 },
  'M2': { deltaCorde: 1, deltaFret: -3 },
  'm3': { deltaCorde: 1, deltaFret: -2 },
  'M3': { deltaCorde: 1, deltaFret: -1 },
  'P4': { deltaCorde: 1, deltaFret: 0 },
  'd5': { deltaCorde: 1, deltaFret: 1 },
  'P5': { deltaCorde: 1, deltaFret: 2 },
  'm6': { deltaCorde: 1, deltaFret: 3 },
  'M6': { deltaCorde: 2, deltaFret: -1 },
  'm7': { deltaCorde: 2, deltaFret: 0 },
  'M7': { deltaCorde: 2, deltaFret: 1 },
  "P8": { deltaCorde: 2, deltaFret: 2 }
}
function getIntervalleSurManche(intervalle, string, fret) {
  console.log(intervalle, string, fret)
  const guitar = emptyGuitarSvg(fret, [{ isRoot: true }])
  return { svg: guitar, details }
}


const keySignatureMap = {
  "C": [],
  "G": ["F"],
  "D": ["F", "C"],
  "A": ["F", "C", "G"],
  "E": ["F", "C", "G", "D"],
  "B": ["F", "C", "G", "D", "A"],
  "F♯": ["F", "C", "G", "D", "A", "E"],
  "C♯": ["F", "C", "G", "D", "A", "E", "B"],
  "F": ["B♭"],
  "B♭": ["B♭", "E♭"],
  "E♭": ["B♭", "E♭", "A♭"],
  "A♭": ["B♭", "E♭", "A♭", "D♭"],
  "D♭": ["B♭", "E♭", "A♭", "D♭", "G♭"],
  "G♭": ["B♭", "E♭", "A♭", "D♭", "G♭", "C♭"],
  "C♭": ["B♭", "E♭", "A♭", "D♭", "G♭", "C♭", "F♭"]
};