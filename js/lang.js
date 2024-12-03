const res = {
  settings: { fr: "Param", en: "Settings" },
  title: {
    fr: "Théorie musique et pratique (Guitare)",
    en: "Music theory and training (Guitar)",
  },
  retour: { fr: "Retour", en: "Back" },
  notation: { fr: "Notation", en: "Notation" },
  maximalFret: { fr: "Fret maximale demandée", en: "Maximal fret asked" },
  chordsAsked: { fr: "Accords demandés", en: "Asked chords" },
  scalesAsked: { fr: "Gammes demandées", en: "Asked scales" },
  tempo: { fr: "Tempo", en: "Tempo" },
  repetition: { fr: "Répétition chaque mesure", en: "Each bar repetition" },
  chordProgression: {
    fr: "Progression accords joués",
    en: "Chord progression played",
  },
  documentation: { fr: "Doc", en: "Doc" },
  chords: { fr: "Accords", en: "Chords" },
  patterns: { fr: "Patterns", en: "Patterns" },
  gammes: { fr: "Gammes", en: "Scales" },
  intervalles: { fr: "Intervalles", en: "Intervals" },
  questionsAsked: { fr: "Catégories de questions", en: "Questions asked" },
  intervalleDescription: { fr: "Intervalles", en: "Intervals" },
  gammeDescription: { fr: "Notes d'une gamme", en: "Notes in a scale" },
  chordDescription: { fr: "Notes d'un accord", en: "Notes in a chord" },
  quelleNoteSurMancheDescription: {
    fr: "Quelle est cette note ?",
    en: "What's this note ?",
  },
  noteSurMancheDescription: { fr: "Trouvez des ...", en: "Find some ..." },
  chordsInKeyDescription: { fr: "Accords d'une clé", en: "Chords in a key" },
  nthNoteInKeyDescription: { fr: "Degré dans une clé", en: "Degree in a key" },
  chordsInProgressionDescription: {
    fr: "Progression dans une clé",
    en: "Progression in a key",
  },
  relativeKeyDescription: { fr: "Clé relative", en: "Relative key" },
  strummingQuestionDescription: {
    fr: "Pratiquez le rythme",
    en: "Rythm practice",
  },
  question: { fr: "Nouvelle question", en: "New question" },
  questionSub: {
    fr: "Choisir les types de question posées dans Param",
    en: "Change question types in Settings",
  },
  strumming: { fr: "Strumming", en: "Strumming" },
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
  mineurMelodiqueAsc: {
    fr: "Mineure mélodique ascendante",
    en: "Ascending melodic minor",
  },
  mineurMelodiqueDesc: {
    fr: "Mineure mélodique déscendante",
    en: "Descending melodic minor",
  },
  majorPentatonic: { fr: "Pentatonique majeure", en: "Major pentatonic" },
  minorPentatonic: { fr: "Pentatonique mineure", en: "Minor pentatonic" },
  chromatic: { fr: "Chromatique", en: "Chromatic" },
  gamme: {
    fr: (tonique, name) => `Gamme ${name} de ${tonique}`,
    en: (tonique, name) => `${name} scale of ${tonique}`,
  },
  chord: {
    fr: (tonique, name) => `Accord de ${tonique} ${name}`,
    en: (tonique, name) => `${tonique} ${name} chord`,
  },
  whatIsThisNote: { fr: "Quelle est cette note?", en: "What is this note?" },
  findSome: { fr: "Trouvez des", en: "Find some" },
  clickForAnswer: { fr: "Cliquez pour la réponse", en: "Click for answer" },
  halfTone: { fr: "demi-ton", en: "half-tone" },
  tempo: {
    fr: (bpm, repeats, chords) => `${bpm}bpm, ${repeats}x chaque - ${chords}`,
    en: (bpm, repeats, chords) => `${bpm}bpm, ${repeats}x each - ${chords}`,
  },
  of: { fr: "de", en: "of" },
  fifths: { fr: "Circle of fifths", en: "Circle of fifths" },
  fifthsSub: {
    fr: "Apprendre les accords d'une clé",
    en: "Know chords in keys",
  },
  chordsInTheKey: {
    fr: (key) => `Quels sont les accords de la clé de ${key} ?`,
    en: (key) => `In the key of ${key}, what are the chords ?`,
  },
  nthNoteInKey: {
    fr: (key, roman) => `Quel est l'accord ${roman} dans la clé de ${key} ?`,
    en: (key, roman) => `In the key of ${key}, what is the ${roman} chord ?`,
  },
  relativeKey: {
    fr: (key) => `Quelle est la clé relative mineure de ${key} ?`,
    en: (key) => `What is the relative minor of ${key}?`,
  },
  chordsInProgression: {
    fr: (key, progression) => `Quels sont les accords de la progression ${progression} en ${key} ?`,
    en: (key, progression) => `What are the chords in a ${progression} progression in ${key}?`,
  },
  clickToStart: { fr: "Cliquez pour commencer", en: "Click to start" },
  clickToPause: { fr: "Cliquez pour faire pause", en: "Click to pause" },
  sound: { fr: "Son", en: "Sound" },
  root: { fr: "Unison", en: "Unison" },
  m2: { fr: "Seconde mineure", en: "Minor second" },
  M2: { fr: "Seconde majeure", en: "Major second" },
  m3: { fr: "Tierce mineure", en: "Minor third" },
  M3: { fr: "Tierce majeure", en: "Major third" },
  P4: { fr: "Quarte juste", en: "Perfect fourth" },
  d5: { fr: "Quinte diminuée", en: "Diminished fifth" },
  P5: { fr: "Quinte juste", en: "Perfect fifth" },
  m6: { fr: "Sixte mineure", en: "Minor sixth" },
  M6: { fr: "Sixte majeure", en: "Major sixth" },
  m7: { fr: "Septième mineure", en: "Minor seventh" },
  M7: { fr: "Septième majeure", en: "Major seventh" },
  P8: { fr: "Octave", en: "Octave" },
  rootsAsked: { fr: "Tonique demandée", en: "Roots asked" },
  rythmCategory: { fr: "Strumming", en: "Strumming" },
  rootsExplanation: {
    fr: "Les toniques entourées sont utilisés pour les questions de clé",
    en: "Roots with borders are user in quetsion using keys",
  },
  subtitle: { fr: "Bienvenue ! Utilisez ce site pour apprendre et tester vos connaissances en théorie musicale pour la guitare. Vous pouvez personnaliser les questions et leur niveau de difficulté dans vos paramètres. Vous pouvez ajouter l'application à votre téléphone pour usage hors-ligne.", en: "Welcome! Use this site to learn and test your knowledge of music theory for guitar. You can customize the questions and their difficulty level in your settings. You can add the app to your phone for offline usage." },
  footer: {
    fr: "Créé par <a href='https://vbeaulieu.com'>Vincent Beaulieu</a>. N'hésitez pas à me contacter par email pour partager vos commentaires, expériences d'utilisation et idées !<br>Le code se retrouve sur <a href='https://github.com/stlows/music-theory-trainer'>github</a>. Commentaires peuvent être fait sur ce <a href='https://www.reddit.com/r/guitarlessons/comments/1edhugu/app_to_test_your_music_theory_skills/'>post reddit</a>.<br/><a href='#' onclick='event.preventDefault();toggleWelcome()'>Message de bienvenue</a>",
    en: "Created by <a href='https://vbeaulieu.com'>Vincent Beaulieu</a>. Feel free to contact me via email to share your feedback, usage experiences, and ideas ! <br>Code is on <a href='https://github.com/stlows/music-theory-trainer'>github</a>. Feedback can be made on this <a href='https://www.reddit.com/r/guitarlessons/comments/1edhugu/app_to_test_your_music_theory_skills/'>reddit post</a>. <br><a href='#' onclick='event.preventDefault();toggleWelcome()'>Welcome message</a>"
  },
  stats: { fr: "Stats", en: "Stats" },
  clearStats: { fr: "Écraser les statistiques", en: "Clear stats" },
  questionsCount: { fr: "Nombre de résultats", en: "Results count" },
  succesCount: { fr: "Nombre de succès", en: "Success count" },
  succesRatio: { fr: "Pourcentage de succès", en: "Success percentage" },
  timedQuestionCategory: { fr: "Questions chronométrées", en: "Timed questions" },
  autoBad: { fr: "Échec automatique de la question après délai expiré", en: "Fail question automatically after delay" },
  aucun: { fr: "Aucun", en: "None" },
  oui: { fr: "Oui", en: "Yes" },
  non: { fr: "Non", en: "No" },
  replay: { fr: "Rejouer", en: "Replay" },
  whatIsThisInterval: { fr: "Quel est cet intervalle ?", en: "What is this interval ?" },
  intervalByEarDescription: { fr: "Pratiquez vos intervalles à l'oreille", en: "Interval ear training" },
  instrument: { fr: "Instrument (Pratique à l'oreille)", en: "Instrument (Ear training)" },
  guitar: { fr: "Guitare acoustique", en: "Acoustic guitar" },
  piano: { fr: "Piano", en: "Grand piano" },
  selectAll: { fr: "Tout", en: "All" },
  unselectAll: { fr: "Aucun", en: "None" },
  playSomethingDescription: { fr: "Jouez quelque chose !", en: "Play something !" },
  hopeYouGotIt: { fr: "J'espère que tu l'as eu !", en: " Hope you got it" },
  playThisTitle: { fr: "Joue ceci:", en: "Play this:" },
  noteOnString: {
    fr: (note, string) => `Un ${note} sur la corde ${string}`,
    en: (note, string) => `A ${note} on the ${string} string`,
  },
  shape: { fr: "Forme", en: "Shape" },
  playChord: {
    fr: (root, chordType, shape) => `Un ${root}${chordType} en utilsant la "${shape} shape"`,
    en: (root, chordType, shape) => `A ${root}${chordType} using the ${shape} shape `,
  },
  playinterval: {
    fr: (root, interval, string) => `${interval} de ${root} en partant de la corde ${string}`,
    en: (root, interval, string) => `${interval} from ${root} starting on the ${string} string `,
  },
  playScale: {
    fr: (root, gamme) => `Une gamme ${gamme} de ${root}`,
    en: (root, gamme) => `A ${gamme} scale of ${root}`,
  },
  diveIn: { fr: "Allez !", en: "Dive in !" }
}

function t(key) {
  if (!res[key] || !res[key][settings.lang]) {
    return `${key}`
  }
  return res[key][settings.lang]
}

function trad() {
  document.querySelectorAll("[data-t]").forEach((x) => {
    if (x.dataset.html === "true") {
      x.innerHTML = t(x.dataset.t)
    } else {
      x.innerText = t(x.dataset.t)
    }
  })
  printAllAccords()
  window.scrollTo(0, 0)
}
