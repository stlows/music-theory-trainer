const FRET_COUNT = 9

const notes = [
  { letter: "C", word: "Do", base: "C", natural: true, alt: { word: "Si♯", letter: "B♯", base: "B" } },
  { letter: "C♯", word: "Do♯", base: "C", natural: false, alt: { word: "Ré♭", letter: "D♭", base: "D" } },
  { letter: "D", word: "Ré", base: "D", natural: true },
  { letter: "D♯", word: "Ré♯", base: "D", natural: false, alt: { word: "Mi♭", letter: "E♭" } },
  { letter: "E", word: "Mi", base: "E", natural: true, alt: { word: "Fa♭", letter: "F♭" } },
  { letter: "F", word: "Fa", base: "F", natural: true, alt: { word: "Mi♯", letter: "E♯", base: "E" } },
  { letter: "F♯", word: "Fa♯", base: "F", natural: false, alt: { word: "Sol♭", letter: "G♭" } },
  { letter: "G", word: "Sol", base: "G", natural: true },
  { letter: "G♯", word: "Sol♯", base: "G", natural: false, alt: { word: "La♭", letter: "A♭" } },
  { letter: "A", word: "La", base: "A", natural: true },
  { letter: "A♯", word: "La♯", base: "A", natural: false, alt: { word: "Si♭", letter: "B♭" } },
  { letter: "B", word: "Si", base: "B", natural: true, alt: { word: "Do♭", letter: "C♭" } },
]
const naturalNotes = notes.filter(x => x.natural)

const intervalles = ["tonique", "minorSecond", "majorSecond", "minorThird", "majorThird", "fourth", "dimFifth", "fifth", "minorSixth", "majorSixth", "minorSeventh", "majorSeventh", "octave"]

const accords = [
  { name: "majeur", notes: [0, 4, 7], title: "Majeur" },
  { name: "mineur", notes: [0, 3, 7], title: "Mineur" },
  { name: "7", notes: [0, 4, 7, 10], title: "7e" },
  { name: "maj7", notes: [0, 4, 7, 11], title: "Majeur 7e" },
  { name: "m7", notes: [0, 3, 7, 10], title: "7e mineur" },
  { name: "m(maj7)", notes: [0, 3, 7, 11], title: "Majeur 7e mineur" },
  { name: "add9", notes: [0, 2, 4, 7], title: "Additionné 9" },
  { name: "add4", notes: [0, 4, 5, 7], title: "Additionné 4" },
  { name: "sus2", notes: [0, 2, 7], title: "Suspendu 2" },
  { name: "sus4", notes: [0, 5, 7], title: "Suspendu 4" },
]

const gammes = [
  { name: "majeur", notes: [0, 2, 4, 5, 7, 9, 11] },
  { name: "mineurNaturelle", notes: [0, 2, 3, 5, 7, 8, 10] },
  { name: "mineurHarmonique", notes: [0, 2, 3, 5, 7, 8, 11] },
  { name: "mineurMelodiqueAsc", notes: [0, 2, 3, 5, 7, 9, 11] },
  { name: "mineurMelodiqueDesc", notes: [0, 2, 4, 5, 7, 9, 10] },
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

const cordes = ["E", "B", "G", "D", "A", "E"].map(x => notes.find(n => n.letter === x))

const fifths = {
  major: ["F", "C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭", "F", "C"],
  minor: ["Dm", "Am", "Em", "Bm", "F♯m", "C♯m", "G♯m", "D♯m", "B♭m", "Fm", "Cm", "Gm", "Dm", "Am"],
  chords: [{ type: "major", add: 0, roman: "I" }, { type: "minor", add: -1, roman: "ii" }, { type: "minor", add: 1, roman: "iii" }, { type: "major", add: -1, roman: "IV" }, { type: "major", add: 1, roman: "V" }, { type: "minor", add: 0, roman: "vi" }]
}
function note(note) {
  const corde = cordes[note.corde]
  const noteIndex = notes.indexOf(corde)
  return notes[(noteIndex + note.fret) % 12]
}

function getGamme(noteIndex, gammeIndex) {
  const gamme = { type: gammes[gammeIndex], notes: [], tonique: notes[noteIndex] }
  for (let i = 0; i < gamme.type.notes.length; i++) {
    gamme.notes.push(notes[(noteIndex + gamme.type.notes[i]) % 12])
  }
  return gamme
}

function getAccord(noteIndex, accordIndex) {
  const accord = { type: accords[accordIndex], notes: [], tonique: notes[noteIndex] }
  for (let i = 0; i < accord.type.notes.length; i++) {
    accord.notes.push(notes[(noteIndex + accord.type.notes[i]) % 12])
  }
  return accord
}

function notesString(notes, sep = " - ") {
  let usedBase = []
  let result = ""
  for (let i = 0; i < notes.length; i++) {
    const note = (usedBase.some(x => x === notes[i].base) ? notes[i].alt : notes[i]) || notes[i]
    result += `${note[settings.notation]}${i === notes.length - 1 ? '' : sep}`
    usedBase.push(notes[i].base)
  }
  return result
}

function getDescriptionAccord(accordIndex) {
  return accords[accordIndex].notes.map(i => t(intervalles[i])).join(" - ")
}