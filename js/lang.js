const res = {
  settings: { fr: "Param", en: "Settings" },
  title: { fr: "Théorie musique et pratique (Guitare)", en: "Music theory and training (Guitar)" },
  retour: { fr: "Retour", en: "Back" },
  notation: { fr: "Notation", en: "Notation" },
  maximalFret: { fr: "Fret maximale demandée", en: "Maximal fret asked" },
  chordsAsked: { fr: "Accords demandés", en: "Asked chords" },
  scalesAsked: { fr: "Gammes demandées", en: "Asked scales" },
  tempo: { fr: "Tempo", en: "Tempo" },
  repetition: { fr: "Répétition chaque mesure", en: "Each bar repetition" },
  chordProgression: { fr: "Progression accords joués", en: "Chord progression played" },
  documentation: { fr: "Doc", en: "Doc" },
  chords: { fr: "Accords", en: "Chords" },
  chordsSub: { fr: "Notes d'un accord", en: "Chord notes" },
  patterns: { fr: "Patterns", en: "Patterns" },
  gammes: { fr: "Gammes", en: "Scales" },
  gammesSub: { fr: "Connaitre ses gammes", en: "Know your scales" },
  intervalles: { fr: "Intervalles", en: "Intervals" },
  intervallesSub: { fr: "Apprendre les intervalles", en: "Learn intervals" },
  fretboard: { fr: "Note sur le manche", en: "Fretboard" },
  fretboardSub: { fr: "Connaitre ses notes sur le manche", en: "Know your note on the fretboard" },
  strumming: { fr: "Strumming", en: "Strumming" },
  strummingSub: { fr: "Pratiquez le rythme", en: "Rythm practice" },
  clear: { fr: "Vider", en: "Clear" },
  tonique: { fr: "Tonique", en: "Tonic" },
  minorSecond: { fr: "Seconde mineure", en: "Minor second" },
  majorSecond: { fr: "Seconde majeure", en: "Major second" },
  minorThird: { fr: "Tierce mineure", en: "Minor third" },
  majorThird: { fr: "Tierce majeure", en: "Major third" },
  fourth: { fr: "Quarte (juste)", en: "Perfect fourth" },
  dimFifth: { fr: "Quinte dim", en: "Diminished fifth" },
  fifth: { fr: "Quinte", en: "Perfect fifth" },
  minorSixth: { fr: "Sixte mineure", en: "Minor sixth" },
  majorSixth: { fr: "Sixte majeure", en: "Major sixth" },
  minorSeventh: { fr: "Septième mineure", en: "Minor seventh" },
  majorSeventh: { fr: "Septième majeure", en: "Major seventh" },
  octave: { fr: "Octave", en: "Octave" },
  mot: { fr: "Mot", en: "Word" },
  lettre: { fr: "Lettre", en: "Letter" },
  fr: { fr: "FR", en: "FR" },
  en: { fr: "EN", en: "EN" },
  practice: { fr: "Pratique", en: "Practice" },
  majeur: { fr: "Majeur", en: "Major" },
  mineur: { fr: "Mineur", en: "Minor" },
  mineurNaturelle: { fr: "Mineure naturelle", en: "Natural minor" },
  mineurHarmonique: { fr: "Mineure harmonique", en: "Harmonic minor" },
  mineurMelodiqueAsc: { fr: "Mineure mélodique ascendante", en: "Ascending melodic minor" },
  mineurMelodiqueDesc: { fr: "Mineure mélodique déscendante", en: "Descending melodic minor" },
  gamme: { fr: (tonique, name) => `Gamme ${name} de ${tonique} ?`, en: (tonique, name) => `${name} scale of ${tonique}` },
  chord: { fr: (tonique, name) => `Accord de ${tonique} ${name} ?`, en: (tonique, name) => `${tonique} ${name} chord` },
  whatIsThisNote: { fr: "Quelle est cette note?", en: "What is this note?" },
  findSome: { fr: "Trouvez des", en: "Find some" },
  clickForAnswer: { fr: "Cliquez pour la réponse", en: "Click for answer" },
  halfTone: { fr: "demi-ton", en: "half-tone" },
  tempo: { fr: (bpm, repeats, chords) => `${bpm}bpm, ${repeats}x chaque - ${chords}`, en: (bpm, repeats, chords) => `${bpm}bpm, ${repeats}x each - ${chords}` },
  of: { fr: "de", en: "of" },
  fifths: { fr: "Circle of fifths", en: "Circle of fifths" },
  fifthsSub: { fr: "Apprendre les accords d'une clé", en: "Know chords in keys" },
  chordsInTheKey: { fr: (key) => `Quels sont les accords de la clé de ${key} ?`, en: (key) => `In the key of ${key}, what are the chords ?` },
  nthNoteInKey: { fr: (key, roman) => `Quel est l'accord ${roman} dans la clé de ${key} ?`, en: (key, roman) => `In the key of ${key}, what is the ${roman} chord ?` },
  relativeKey: { fr: (key) => `Quelle est la clé relative mineure de ${key} ?`, en: (key) => `What is the relative minor of ${key}?` },
  chordsInProgression: { fr: (key, progression) => `Quels sont les accords de la progression ${progression} en ${key} ?`, en: (key, progression) => `What are the chords in a ${progression} progression in ${key}?` },
  clickToStart: { fr: "Cliquez pour commencer", en: "Click to start" },
  clickToPause: { fr: "Cliquez pour faire pause", en: "Click to pause" },
  sound: { fr: "Son", en: "Sound" },
}

function t(key) {
  if (!res[key] || !res[key][settings.lang]) {
    return `${key}`
  }
  return res[key][settings.lang]
}

function trad() {
  document.querySelectorAll("[data-t]").forEach(x => {
    x.innerText = t(x.dataset.t)
  })
  printAllAccords()
}
