const possibleProgressionChords = ["A", "Am", "C", "D", "Dm", "E", "Em", "F", "G"]
const possibleQuestions = [
  { func: "intervalle", t: "intervalles" },
  { func: "gamme", t: "gammes" },
  { func: "chord", t: "chords" },
  { func: "chordsInKey", t: "chordsInTheKey" },
  { func: "nthNoteInKey", t: "nthNoteInKey" },
  { func: "chordsInProgression", t: "chordsInProgression" },
  { func: "relativeKey", t: "relativeKey" },
  { func: "quelleNoteSurManche", t: "whatIsThisNote" },
  { func: "noteSurManche", t: "findSome" },
  { func: "strummingQuestion", t: "strummingQuestion" },
  { func: "intervalByEar", t: "intervalByEar" },
  { func: "melodyByEar", t: "melodyByEar" },
  { func: "chordSimilarities", t: "chordSimilarities" },
  { func: "pratiquezLecturePiano", t: "pratiquezLecturePiano" },
  { func: "hanonExercise", t: "hanonExercise" },
  { func: "pianoRythm", t: "pianoRythm" },
]