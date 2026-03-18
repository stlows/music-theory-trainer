const FRET_COUNT = 12;

const wordLetter = { C: "Do", D: "Ré", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Si" };

const notes = [
  {
    root: "C",
    m2: "D♭",
    M2: "D",
    m3: "E♭",
    M3: "E",
    P4: "F",
    A4: "F♯",
    d5: "G♭",
    P5: "G",
    A5: "G♯",
    m6: "A♭",
    M6: "A",
    d7: "B♭♭",
    m7: "B♭",
    M7: "B",
    P8: "C",
    m9: "D♭",
    M9: "D",
    s9: "D♯",
    P11: "F",
    A11: "F♯",
    m13: "A♭",
    M13: "A",
  },
  {
    root: "D",
    m2: "E♭",
    M2: "E",
    m3: "F",
    M3: "F♯",
    P4: "G",
    A4: "G♯",
    d5: "A♭",
    P5: "A",
    A5: "A♯",
    m6: "B♭",
    M6: "B",
    d7: "C♭",
    m7: "C",
    M7: "C♯",
    P8: "D",
    m9: "E♭",
    M9: "E",
    s9: "E♯",
    P11: "G",
    A11: "G♯",
    m13: "B♭",
    M13: "B",
  },
  {
    root: "E",
    m2: "F",
    M2: "F♯",
    m3: "G",
    M3: "G♯",
    P4: "A",
    A4: "A♯",
    d5: "B♭",
    P5: "B",
    A5: "B♯",
    m6: "C",
    M6: "C♯",
    d7: "D♭",
    m7: "D",
    M7: "D♯",
    P8: "E",
    m9: "F",
    M9: "F♯",
    s9: "F♯♯",
    P11: "A",
    A11: "A♯",
    m13: "C",
    M13: "C♯",
  },
  {
    root: "F",
    m2: "G♭",
    M2: "G",
    m3: "A♭",
    M3: "A",
    P4: "B♭",
    A4: "B",
    d5: "C♭",
    P5: "C",
    A5: "C♯",
    m6: "D♭",
    M6: "D",
    d7: "E♭♭",
    m7: "E♭",
    M7: "E",
    P8: "F",
    m9: "G♭",
    M9: "G",
    s9: "G♯",
    P11: "B♭",
    A11: "B",
    m13: "D♭",
    M13: "D",
  },
  {
    root: "G",
    m2: "A♭",
    M2: "A",
    m3: "B♭",
    M3: "B",
    P4: "C",
    A4: "C♯",
    d5: "D♭",
    P5: "D",
    A5: "D♯",
    m6: "E♭",
    M6: "E",
    d7: "F♭",
    m7: "F",
    M7: "F♯",
    P8: "G",
    m9: "A♭",
    M9: "A",
    s9: "A♯",
    P11: "C",
    A11: "C♯",
    m13: "E♭",
    M13: "E",
  },
  {
    root: "A",
    m2: "B♭",
    M2: "B",
    m3: "C",
    M3: "C♯",
    P4: "D",
    A4: "D♯",
    d5: "E♭",
    P5: "E",
    A5: "E♯",
    m6: "F",
    M6: "F♯",
    d7: "G♭",
    m7: "G",
    M7: "G♯",
    P8: "A",
    m9: "B♭",
    M9: "B",
    s9: "B♯",
    P11: "D",
    A11: "D♯",
    m13: "F",
    M13: "F♯",
  },
  {
    root: "B",
    m2: "C",
    M2: "C♯",
    m3: "D",
    M3: "D♯",
    P4: "E",
    A4: "E♯",
    d5: "F",
    P5: "F♯",
    A5: "F♯♯",
    m6: "G",
    M6: "G♯",
    d7: "A♭",
    m7: "A",
    M7: "A♯",
    P8: "B",
    m9: "C",
    M9: "C♯",
    s9: "C♯♯",
    P11: "E",
    A11: "E♯",
    m13: "G",
    M13: "G♯",
  },
  {
    root: "C♯",
    m2: "D",
    M2: "D♯",
    m3: "E",
    M3: "E♯",
    P4: "F♯",
    A4: "F♯♯",
    d5: "G",
    P5: "G♯",
    A5: "G♯♯",
    m6: "A",
    M6: "A♯",
    d7: "B♭",
    m7: "B",
    M7: "B♯",
    P8: "C♯",
    m9: "D",
    M9: "D♯",
    s9: "D♯♯",
    P11: "F♯",
    A11: "F♯♯",
    m13: "A",
    M13: "A♯",
  },
  {
    root: "D♯",
    m2: "E",
    M2: "E♯",
    m3: "F♯",
    M3: "F♯♯",
    P4: "G♯",
    A4: "G♯♯",
    d5: "A",
    P5: "A♯",
    A5: "A♯♯",
    m6: "B",
    M6: "B♯",
    d7: "C",
    m7: "C♯",
    M7: "C♯♯",
    P8: "D♯",
    m9: "E",
    M9: "E♯",
    s9: "E♯♯",
    P11: "G♯",
    A11: "G♯♯",
    m13: "B",
    M13: "B♯",
  },
  {
    root: "F♯",
    m2: "G",
    M2: "G♯",
    m3: "A",
    M3: "A♯",
    P4: "B",
    A4: "B♯",
    d5: "C",
    P5: "C♯",
    A5: "C♯♯",
    m6: "D",
    M6: "D♯",
    d7: "E♭",
    m7: "E",
    M7: "E♯",
    P8: "F♯",
    m9: "G",
    M9: "G♯",
    s9: "G♯♯",
    P11: "B",
    A11: "B♯",
    m13: "D",
    M13: "D♯",
  },
  {
    root: "G♯",
    m2: "A",
    M2: "A♯",
    m3: "B",
    M3: "B♯",
    P4: "C♯",
    A4: "C♯♯",
    d5: "D",
    P5: "D♯",
    A5: "D♯♯",
    m6: "E",
    M6: "E♯",
    d7: "F",
    m7: "F♯",
    M7: "F♯♯",
    P8: "G♯",
    m9: "A",
    M9: "A♯",
    s9: "A♯♯",
    P11: "C♯",
    A11: "C♯♯",
    m13: "E",
    M13: "E♯",
  },
  {
    root: "A♯",
    m2: "B",
    M2: "B♯",
    m3: "C♯",
    M3: "C♯♯",
    P4: "D♯",
    A4: "D♯♯",
    d5: "E",
    P5: "E♯",
    A5: "E♯♯",
    m6: "F♯",
    M6: "F♯♯",
    d7: "G",
    m7: "G♯",
    M7: "G♯♯",
    P8: "A♯",
    m9: "B",
    M9: "B♯",
    s9: "B♯♯",
    P11: "D♯",
    A11: "D♯♯",
    m13: "F♯",
    M13: "F♯♯",
  },
  {
    root: "C♭",
    m2: "D♭♭",
    M2: "D♭",
    m3: "E♭♭",
    M3: "E♭",
    P4: "F♭",
    A4: "F",
    d5: "G♭♭",
    P5: "G♭",
    A5: "G",
    m6: "A♭♭",
    M6: "A♭",
    d7: "A♭",
    m7: "B♭♭",
    M7: "B♭",
    P8: "C♭",
    m9: "D♭♭",
    M9: "D♭",
    s9: "D",
    P11: "F♭",
    A11: "F",
    m13: "A♭♭",
    M13: "A♭",
  },
  {
    root: "D♭",
    m2: "E♭♭",
    M2: "E♭",
    m3: "F♭",
    M3: "F",
    P4: "G♭",
    A4: "G",
    d5: "A♭♭",
    P5: "A♭",
    A5: "A",
    m6: "B♭♭",
    M6: "B♭",
    d7: "C♭♭",
    m7: "C♭",
    M7: "C",
    P8: "D♭",
    m9: "E♭♭",
    M9: "E♭",
    s9: "E",
    P11: "G♭",
    A11: "G",
    m13: "B♭♭",
    M13: "B♭",
  },
  {
    root: "E♭",
    m2: "F♭",
    M2: "F",
    m3: "G♭",
    M3: "G",
    P4: "A♭",
    A4: "A",
    d5: "B♭♭",
    P5: "B♭",
    A5: "B",
    m6: "C♭",
    M6: "C",
    d7: "D♭♭",
    m7: "D♭",
    M7: "D",
    P8: "E♭",
    m9: "F♭",
    M9: "F",
    s9: "F♯",
    P11: "A♭",
    A11: "A",
    m13: "C♭",
    M13: "C",
  },
  {
    root: "F♭",
    m2: "G♭♭",
    M2: "G♭",
    m3: "A♭♭",
    M3: "A♭",
    P4: "B♭♭",
    A4: "B♭",
    d5: "C♭♭",
    P5: "C♭",
    A5: "C",
    m6: "D♭♭",
    M6: "D♭",
    d7: "D♭",
    m7: "E♭♭",
    M7: "E♭",
    P8: "F♭",
    m9: "G♭♭",
    M9: "G♭",
    s9: "G",
    P11: "B♭♭",
    A11: "B♭",
    m13: "D♭♭",
    M13: "D♭",
  },
  {
    root: "G♭",
    m2: "A♭♭",
    M2: "A♭",
    m3: "B♭♭",
    M3: "B♭",
    P4: "C♭",
    A4: "C",
    d5: "D♭♭",
    P5: "D♭",
    A5: "D",
    m6: "E♭♭",
    M6: "E♭",
    d7: "F♭♭",
    m7: "F♭",
    M7: "F",
    P8: "G♭",
    m9: "A♭♭",
    M9: "A♭",
    s9: "A",
    P11: "C♭",
    A11: "C",
    m13: "E♭♭",
    M13: "E♭",
  },
  {
    root: "A♭",
    m2: "B♭♭",
    M2: "B♭",
    m3: "C♭",
    M3: "C",
    P4: "D♭",
    A4: "D",
    d5: "E♭♭",
    P5: "E♭",
    A5: "E",
    m6: "F♭",
    M6: "F",
    d7: "G♭♭",
    m7: "G♭",
    M7: "G",
    P8: "A♭",
    m9: "B♭♭",
    M9: "B♭",
    s9: "B",
    P11: "D♭",
    A11: "D",
    m13: "F♭",
    M13: "F",
  },
  {
    root: "B♭",
    m2: "C♭",
    M2: "C",
    m3: "D♭",
    M3: "D",
    P4: "E♭",
    A4: "E",
    d5: "F♭",
    P5: "F",
    A5: "F♯",
    m6: "G♭",
    M6: "G",
    d7: "A♭♭",
    m7: "A♭",
    M7: "A",
    P8: "B♭",
    m9: "C♭",
    M9: "C",
    s9: "C♯",
    P11: "E♭",
    A11: "E",
    m13: "G♭",
    M13: "G",
  },
];

const accords = [
  { name: "majeur", notes: ["root", "M3", "P5"], symbol: "" },
  { name: "mineur", notes: ["root", "m3", "P5"], symbol: "m" },

  { name: "dim", notes: ["root", "m3", "d5"], symbol: "°" },
  { name: "aug", notes: ["root", "M3", "A5"], symbol: "+" },

  { name: "sus2", notes: ["root", "M2", "P5"], symbol: "sus2" },
  { name: "sus4", notes: ["root", "P4", "P5"], symbol: "sus4" },

  { name: "6", notes: ["root", "M3", "P5", "M6"], symbol: "6" },
  { name: "chord_m6", notes: ["root", "m3", "P5", "M6"], symbol: "m6" },

  { name: "maj7", notes: ["root", "M3", "P5", "M7"], symbol: "maj7" },
  { name: "chord_m7", notes: ["root", "m3", "P5", "m7"], symbol: "m7" },
  { name: "7", notes: ["root", "M3", "P5", "m7"], symbol: "7" },
  { name: "m(maj7)", notes: ["root", "m3", "P5", "M7"], symbol: "m(maj7)" },

  { name: "dim7", notes: ["root", "m3", "d5", "d7"], symbol: "°7" },
  { name: "m7b5", notes: ["root", "m3", "d5", "m7"], symbol: "⌀7" },
  { name: "add9", notes: ["root", "M3", "P5", "M9"], symbol: "add9" },
  { name: "9", notes: ["root", "M3", "P5", "m7", "M9"], symbol: "9" },
  { name: "chord_m9", notes: ["root", "m3", "P5", "m7", "M9"], symbol: "m9" },
  { name: "maj9", notes: ["root", "M3", "P5", "M7", "M9"], symbol: "maj9" },
  { name: "6/9", notes: ["root", "M3", "P5", "M6", "M9"], symbol: "6/9" },

  { name: "7sus4", notes: ["root", "P4", "P5", "m7"], symbol: "7sus4" },
  { name: "7♯5", notes: ["root", "M3", "A5", "m7"], symbol: "7♯5" },
  { name: "7♭5", notes: ["root", "M3", "d5", "m7"], symbol: "7♭5" },
  { name: "7♯9", notes: ["root", "M3", "P5", "m7", "s9"], symbol: "7♯9" },
  { name: "7♭9", notes: ["root", "M3", "P5", "m7", "m9"], symbol: "7♭9" },

  { name: "11", notes: ["root", "M3", "P5", "m7", "M9", "P11"], symbol: "11" },
  { name: "m11", notes: ["root", "m3", "P5", "m7", "M9", "P11"], symbol: "m11" },
  { name: "7♯11", notes: ["root", "M3", "P5", "m7", "M9", "A11"], symbol: "7♯11" },

  { name: "13", notes: ["root", "M3", "P5", "m7", "M9", "P11", "M13"], symbol: "13" },
  { name: "chord_m13", notes: ["root", "m3", "P5", "m7", "M9", "P11", "M13"], symbol: "m13" },
];

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
  {
    // Major
    name: "ionian",
    notes: ["root", "M2", "M3", "P4", "P5", "M6", "M7"],
    fingers: [{ root: "C", RH: [1, 2, 3, 1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 4, 5], LH: [5, 4, 3, 2, 1, 3, 2, 1, 4, 3, 2, 1] }],
  },
  { name: "dorian", notes: ["root", "M2", "m3", "P4", "P5", "M6", "m7"] },
  { name: "phrygian", notes: ["root", "m2", "m3", "P4", "P5", "m6", "m7"] },
  { name: "lydian", notes: ["root", "M2", "M3", "d5", "P5", "M6", "M7"] },
  { name: "mixolydian", notes: ["root", "M2", "M3", "P4", "P5", "M6", "m7"] },
  { name: "aeolian", notes: ["root", "M2", "m3", "P4", "P5", "m6", "m7"] }, // Natural Minor
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
  { name: "chromatic", notes: ["root", "m2", "M2", "m3", "M3", "P4", "d5", "P5", "m6", "M6", "m7", "M7"] },
];

const gammesFingers = {
  ionian: [{ root: "C", fingers: [1, 2, 3, 1, 2, 3, 4] }],
};

const gammeChromatic = gammes.find((x) => x.name === "chromatic").notes;
const naturals = ["C", "D", "E", "F", "G", "A", "B"];
const intervals = gammeChromatic.concat(["P8"]);
const accordsManches = {
  majeur: {
    C: [
      { corde: 5, fret: 0 },
      { corde: 4, fret: 3 },
      { corde: 3, fret: 2 },
      { corde: 2, fret: 0 },
      { corde: 1, fret: 1 },
    ],
    D: [
      { corde: 4, fret: 0 },
      { corde: 3, fret: 2 },
      { corde: 2, fret: 3 },
      { corde: 1, fret: 2 },
    ],
    E: [
      { corde: 6, fret: 0 },
      { corde: 5, fret: 2 },
      { corde: 4, fret: 2 },
      { corde: 3, fret: 1 },
      { corde: 2, fret: 0 },
      { corde: 1, fret: 0 },
    ],
    F: [
      { barre: [1, 6], fret: 1 },
      { corde: 5, fret: 3 },
      { corde: 4, fret: 3 },
      { corde: 3, fret: 2 },
    ],
    G: [
      { corde: 6, fret: 3 },
      { corde: 5, fret: 2 },
      { corde: 4, fret: 0 },
      { corde: 3, fret: 0 },
      { corde: 2, fret: 3 },
      { corde: 1, fret: 3 },
    ],
    A: [
      { corde: 5, fret: 0 },
      { corde: 4, fret: 2 },
      { corde: 3, fret: 2 },
      { corde: 2, fret: 2 },
      { corde: 1, fret: 0 },
    ],
    B: [
      { barre: [1, 5], fret: 2 },
      { corde: 4, fret: 4 },
      { corde: 3, fret: 4 },
      { corde: 2, fret: 4 },
    ],
  },
  mineur: {
    C: [
      { barre: [1, 5], fret: 3 },
      { corde: 4, fret: 5 },
      { corde: 3, fret: 5 },
      { corde: 2, fret: 4 },
    ],
    D: [
      { corde: 4, fret: 0 },
      { corde: 3, fret: 2 },
      { corde: 2, fret: 3 },
      { corde: 1, fret: 1 },
    ],
    E: [
      { corde: 6, fret: 0 },
      { corde: 5, fret: 2 },
      { corde: 4, fret: 2 },
      { corde: 3, fret: 0 },
      { corde: 2, fret: 0 },
      { corde: 1, fret: 0 },
    ],
    F: [
      { barre: [1, 6], fret: 1 },
      { corde: 5, fret: 3 },
      { corde: 4, fret: 3 },
    ],
    G: [
      { corde: 6, fret: 3 },
      { corde: 5, fret: 1 },
      { corde: 4, fret: 0 },
      { corde: 3, fret: 0 },
      { corde: 2, fret: 3 },
      { corde: 1, fret: 3 },
    ],
    A: [
      { corde: 5, fret: 0 },
      { corde: 4, fret: 2 },
      { corde: 3, fret: 2 },
      { corde: 2, fret: 1 },
      { corde: 1, fret: 0 },
    ],
    B: [
      { barre: [1, 5], fret: 2 },
      { corde: 4, fret: 4 },
      { corde: 3, fret: 4 },
      { corde: 2, fret: 3 },
    ],
  },
  7: {},
  maj7: {},
  m7: {},
  "m(maj7)": {},
  add9: {},
  add4: {},
  sus2: {},
  sus4: {},
};

const cordes = ["E", "B", "G", "D", "A", "E"].map((x) => notes.find((n) => n.root === x));
const chromatic = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯"];

const enharmonicKeys = ["C", "D", "E", "F", "G", "A", "B", "D♭", "E♭", "F♯", "A♭", "B♭"];

const degreeToNote = ["root", "M2", "M3", "P4", "P5", "M6", "M7"];

function getChordDegree(key, degree) {
  if (degree < 1 || degree > 7) {
    console.error(`Degree ${degree} is not valid`);
  }
  let degreeInterval = gammes.find((g) => g.name === "ionian").notes[degree - 1];

  let root = notes.find((n) => n.root === key)[degreeInterval];

  // 2e, 3e et 6e degré mineurs
  if (degree === 2 || degree === 3 || degree === 6) {
    root += "m";
  }

  // 7e degré diminué
  if (degree === 7) {
    root += "dim";
  }

  return root;
}

function getChordDegrees(key) {
  return [1, 2, 3, 4, 5, 6, 7].map((x) => getChordDegree(key, x));
}
function getRoman(degree) {
  return ["I", "ii", "iii", "IV", "V", "vi", "vii°"][degree - 1];
}

function note(corde, fret) {
  const root = cordes[corde].root;
  const noteIndex = chromatic.indexOf(root);
  return chromatic[(noteIndex + fret) % 12];
}

function notesEqual(note1, note2) {
  return noteId(note1) === noteId(note2);
}

function getGamme(noteIndex, gammeIndex) {
  const gamme = { type: gammes[gammeIndex], notes: [], tonique: notes[noteIndex].root };
  for (let i = 0; i < gamme.type.notes.length; i++) {
    gamme.notes.push(notes[noteIndex][gamme.type.notes[i]]);
  }
  return gamme;
}

function getAccord(noteIndex, accordIndex) {
  const accord = { type: accords[accordIndex], notes: [], tonique: notes[noteIndex].root };
  for (let i = 0; i < accord.type.notes.length; i++) {
    accord.notes.push(notes[noteIndex][accord.type.notes[i]]);
  }
  return accord;
}

function printNote(note) {
  note = note.replace("b", "♭");
  if (settings.notation === "word") {
    const regex = /^([A-G])([♯♭]*?)([1-9]*)$/;
    const match = note.match(regex);

    if (!match) {
      return "Unknown note";
    }

    const baseNote = match[1];
    const alterations = match[2] || "";
    const octave = match[3] || "";

    const solfegeBase = wordLetter[baseNote];
    return solfegeBase + alterations + octave;
  }

  return note;
}

function join(arr, sep = " - ") {
  return arr.join(sep);
}

function getDescriptionAccord(accordIndex) {
  return join(accords[accordIndex].notes.map((i) => t(i)));
}

function getDescriptionGamme(gammeIndex) {
  return join(gammes[gammeIndex].notes.map((i) => t(i)));
}

function getDistance(root, note) {
  note = replaceFlatForSharp(note);
  root = replaceFlatForSharp(root);
  const rootIndex = chromatic.indexOf(root);
  const noteIndex = chromatic.indexOf(note);
  const result = noteIndex - rootIndex;

  return result < 0 ? result + 12 : result;
}

function noteId(note) {
  let base = "A.BC.D.EF.G.".indexOf(note[0]);
  note.split("").forEach((n) => {
    if (n === "♭") {
      base--;
    }
    if (n === "♯") {
      base++;
    }
  });
  return (base + 12) % 12;
}

function replaceFlatForSharp(note) {
  switch (note) {
    case "A♭":
      return "G♯";
    case "A♭♭":
      return "G";
    case "B♭":
      return "A♯";
    case "B♭♭":
      return "A";
    case "C♭":
      return "B";
    case "C♭♭":
      return "A♯";
    case "D♭":
      return "C♯";
    case "D♭♭":
      return "C";
    case "E♭":
      return "D♯";
    case "E♭♭":
      return "D";
    case "F♭":
      return "E";
    case "F♭♭":
      return "D♯";
    case "G♭":
      return "F♯";
    case "G♭♭":
      return "F";
    default:
      return note;
  }
}

const intervalManche = {
  root: { deltaCorde: 0, deltaFret: 0 },
  m2: { deltaCorde: 1, deltaFret: -4 },
  M2: { deltaCorde: 1, deltaFret: -3 },
  m3: { deltaCorde: 1, deltaFret: -2 },
  M3: { deltaCorde: 1, deltaFret: -1 },
  P4: { deltaCorde: 1, deltaFret: 0 },
  d5: { deltaCorde: 1, deltaFret: 1 },
  P5: { deltaCorde: 1, deltaFret: 2 },
  m6: { deltaCorde: 1, deltaFret: 3 },
  M6: { deltaCorde: 2, deltaFret: -1 },
  m7: { deltaCorde: 2, deltaFret: 0 },
  M7: { deltaCorde: 2, deltaFret: 1 },
  P8: { deltaCorde: 2, deltaFret: 2 },
};
function getIntervalleSurManche(intervalle, string, fret) {
  const guitar = emptyGuitarSvg(fret, [{ isRoot: true }]);
  return { svg: guitar, details };
}

const keySignatureMap = {
  C: [],
  G: ["F"],
  D: ["F", "C"],
  A: ["F", "C", "G"],
  E: ["F", "C", "G", "D"],
  B: ["F", "C", "G", "D", "A"],
  "F♯": ["F", "C", "G", "D", "A", "E"],
  "C♯": ["F", "C", "G", "D", "A", "E", "B"],
  F: ["B♭"],
  "B♭": ["B♭", "E♭"],
  "E♭": ["B♭", "E♭", "A♭"],
  "A♭": ["B♭", "E♭", "A♭", "D♭"],
  "D♭": ["B♭", "E♭", "A♭", "D♭", "G♭"],
  "G♭": ["B♭", "E♭", "A♭", "D♭", "G♭", "C♭"],
  "C♭": ["B♭", "E♭", "A♭", "D♭", "G♭", "C♭", "F♭"],
};

const scaleNotes = ["A", "B", "C", "D", "E", "F", "G"];
function degreeToNoteWithOctave(degree, baseOctave = 4) {
  const octave = Math.floor(degree / 7) + baseOctave;
  const note = scaleNotes[(degree + 7) % 7];
  if (octave < baseOctave) return note + ",".repeat(baseOctave - octave);
  if (octave > baseOctave) return note + "'".repeat(octave - baseOctave);
  return note;
}

// Ne prend pas en compte les shraps/flats, prend pour acquis que la notes est un degré de la gamme majeure
function midiToAbc(midi, key, baseOctave = 4) {
  const pitchClass = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;

  let abcNote = "";
  if (key === "F" || key.includes("♭")) {
    abcNote = midiNaturalsFlats[pitchClass];
  } else {
    abcNote = midiNaturals[pitchClass];
  }

  // Octaves ABC
  if (octave > baseOctave) {
    abcNote = abcNote + "'".repeat(octave - baseOctave);
  } else if (octave < baseOctave) {
    abcNote += ",".repeat(baseOctave - octave);
  }

  return abcNote;
}
