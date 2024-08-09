let settings = {
  notation: "letter",
  frets: 6,
  tempo: 100,
  repeats: 2,
  progressionChords: "D",
  plingAtFirstTempo: false,
  accords: ["majeur", "mineur", "7"],
  gammes: ["majeur", "mineurNaturelle"],
  lang: "fr",
  theme: "dark",
  roots: ["C", "D", "G", "A"],
  questions: ["intervalle", "gamme", "chord", "quelleNoteSurManche", "noteSurManche"],
  timerInSeconds: 0,
  autoSelectBadAfterTimer: 'true',
  instruments: "guitar"
}

const possibleProgressionChords = ["A", "Am", "C", "D", "Dm", "E", "Em", "F", "G"]
const possibleQuestions = [
  { func: "intervalle", t: "intervalles" },
  { func: "gamme", t: "gammes" },
  { func: "chord", t: "chords" },
  { func: "quelleNoteSurManche", t: "whatIsThisNote" },
  { func: "noteSurManche", t: "findSome" },
  { func: "chordsInKey", t: "chordsInTheKey" },
  { func: "nthNoteInKey", t: "nthNoteInKey" },
  { func: "chordsInProgression", t: "chordsInProgression" },
  { func: "relativeKey", t: "relativeKey" },
  { func: "strummingQuestion", t: "strummingQuestion" },
  { func: "intervalByEar", t: "intervalByEar" }
]

function toggleActive(id) {
  document.getElementById(id).classList.toggle("active")
}
function toggleSettings() {
  toggleActive("settings")
}

function toggleDocumentation() {
  toggleActive("documentation")
}

function toggleStats() {
  toggleActive("stats")
}

function toggleWelcome() {
  toggleActive("welcome")
}

function setDefaultOption(optionKey, isToggle = false) {
  setOption(optionKey, settings[optionKey], isToggle)
}

function setOption(optionKey, value, isToggle) {
  if (isToggle) {
    // état initial
    if (typeof value === "object") {
      for (let i = 0; i < value.length; i++) {
        const element = document.querySelector(`.settingBtn.${optionKey}[data-value='${value[i]}']`)
        element.classList.add("active")
      }
      return
    }
    const element = document.querySelector(`.settingBtn.${optionKey}[data-value='${value}']`)
    element.classList.toggle("active")
    const indexOfValue = settings[optionKey].indexOf(value)
    if (indexOfValue === -1) {
      settings[optionKey].push(value)
    } else {
      settings[optionKey].splice(indexOfValue, 1)
    }

    if (settings[optionKey].length === 0) {
      // On choisit le premier
      const element = document.querySelector(`.settingBtn.${optionKey}:first-child`)
      element.classList.toggle("active")
      settings[optionKey].push(element.dataset.value)
    }
  } else {
    const elements = Array.from(document.querySelectorAll(`.settingBtn.${optionKey}`))
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active")
      if (elements[i].dataset.value == value) {
        elements[i].classList.add("active")
      }
    }

    settings[optionKey] = isNaN(value) ? value : Number(value)
    if (optionKey === "notation") {
      printAllGammes()
      printAllAccords()
      //printAllIntervalles();
    }
    if (optionKey === "lang") {
      trad()
    }
  }
  persistSettings()
}

function createOptionbutton(optionKey, value, isToggle = false, btnKey = "", className = "", description = "") {
  const button = document.createElement("button")
  button.dataset.value = value
  button.classList.add("settingBtn")
  button.classList.add(optionKey)
  if (className) {
    button.classList.add(className)
  }

  if (btnKey) {
    button.innerText = t(btnKey)
    button.dataset.t = btnKey
  } else {
    button.innerText = value
  }
  button.addEventListener("click", (e) => {
    setOption(optionKey, e.target.dataset.value, isToggle)
  })
  return button
}

function clickOnElements(selector) {
  const elements = document.querySelectorAll(selector)
  for (const element of elements) {
    element.click()
  }
}
function selectAllSetting(event, settingKey) {
  event.preventDefault()
  clickOnElements(`.settingBtn.${settingKey}:not(.active)`)
  if (settingKey === 'questions') {
    clickOnElements(`.settingBtn.${settingKey}[data-value=strummingQuestion]`)
  }
}
function unselectAllSetting(event, settingKey) {
  event.preventDefault()
  clickOnElements(`.settingBtn.${settingKey}.active`)
}

function createTempoOptions() {
  const tempos = [40, 60, 80, 100, 110, 120, 135, 150, 180]
  for (let i = 0; i < tempos.length; i++) {
    const button = createOptionbutton("tempo", tempos[i])
    document.getElementById("tempos").appendChild(button)
  }
  setDefaultOption("tempo")
}

function createTimerOptions() {
  const timers = [5, 10, 20, 30, 60]
  const button = createOptionbutton("timerInSeconds", 0, false, "aucun")
  document.getElementById("timers").appendChild(button)
  for (let i = 0; i < timers.length; i++) {
    const button = createOptionbutton("timerInSeconds", timers[i])
    document.getElementById("timers").appendChild(button)
  }
  setDefaultOption("timerInSeconds")
}

function createTimerAutoBadOptions() {
  const buttonTrue = createOptionbutton("autoSelectBadAfterTimer", 'true', false, "oui")
  document.getElementById("autoBad").appendChild(buttonTrue)
  const buttonFalse = createOptionbutton("autoSelectBadAfterTimer", 'false', false, "non")
  document.getElementById("autoBad").appendChild(buttonFalse)

  setDefaultOption("autoSelectBadAfterTimer")
}
function createFretOptions() {
  for (let i = 0; i < 8; i++) {
    const button = createOptionbutton("frets", i + 1)
    document.getElementById("frets").appendChild(button)
  }
  setDefaultOption("frets")
}

function createRepetitionOptions() {
  for (let i = 0; i < 4; i++) {
    const button = createOptionbutton("repeats", i + 1)
    document.getElementById("repeats").appendChild(button)
  }
  setDefaultOption("repeats")
}

function createAccordsOptions() {
  for (let i = 0; i < accords.length; i++) {
    const button = createOptionbutton("accords", accords[i].name, true, accords[i].name)
    document.getElementById("accordsSettings").appendChild(button)
  }
  setDefaultOption("accords", true)
}

function createScalesOptions() {
  for (let i = 0; i < gammes.length; i++) {
    const button = createOptionbutton("gammes", gammes[i].name, true, gammes[i].name)
    document.getElementById("scalesSettings").appendChild(button)
  }
  setDefaultOption("gammes", true)
}

function createRootsOptions() {
  for (let i = 0; i < notes.map((n) => n.root).length; i++) {
    const button = createOptionbutton(
      "roots",
      notes[i].root,
      true,
      printNote(notes[i].root),
      fifths.major.includes(notes[i].root) ? "highlight" : ""
    )
    document.getElementById("rootsSettings").appendChild(button)
  }
  setDefaultOption("roots", true)
}

function createQuestionsOptions() {
  for (let i = 0; i < possibleQuestions.length; i++) {
    const button = createOptionbutton("questions", possibleQuestions[i].func, true, possibleQuestions[i].func + "Description")
    document.getElementById("questionsSettings").appendChild(button)
  }
  setDefaultOption("questions", true)
}

function createChordProgressionOptions() {
  const button = createOptionbutton("progressionChords", "Pratique", false, "practice")
  document.getElementById("progressionChords").appendChild(button)

  for (let i = 0; i < possibleProgressionChords.length; i++) {
    const button = createOptionbutton("progressionChords", possibleProgressionChords[i])
    document.getElementById("progressionChords").appendChild(button)
  }

  setDefaultOption("progressionChords")
}

function createNotationOptions() {
  const buttonMot = createOptionbutton("notation", "word", false, "mot")
  document.getElementById("notations").appendChild(buttonMot)
  const buttonLetter = createOptionbutton("notation", "letter", false, "lettre")
  document.getElementById("notations").appendChild(buttonLetter)
  setDefaultOption("notation")
}

function createInstrumentOptions() {
  for (const instrumentKey in instruments) {
    const button = createOptionbutton("instruments", instrumentKey, false, instrumentKey)
    document.getElementById("instruments").appendChild(button)
  }
  setDefaultOption("instruments")
}

function createLanguesOptions() {
  const fr = createOptionbutton("lang", "fr", false, "fr")
  document.getElementById("lang").appendChild(fr)
  const en = createOptionbutton("lang", "en", false, "en")
  document.getElementById("lang").appendChild(en)
  setDefaultOption("lang")
}

function loadSettings() {
  const currentSettings = JSON.parse(localStorage.getItem("settings")) || {}
  for (const key in settings) {
    if (settings.hasOwnProperty(key)) {
      if (!(key in currentSettings) || typeof currentSettings[key] !== typeof settings[key]) {
        currentSettings[key] = settings[key]
      }
    }
  }
  localStorage.setItem("settings", JSON.stringify(currentSettings))
  readSettings()
}

function persistSettings() {
  localStorage.setItem("settings", JSON.stringify(settings))
}
function readSettings() {
  settings = JSON.parse(localStorage.getItem("settings"))
}

loadSettings()
createTempoOptions()
createRepetitionOptions()
createFretOptions()
createNotationOptions()
createAccordsOptions()
createScalesOptions()
createChordProgressionOptions()
createRootsOptions()
createQuestionsOptions()
createLanguesOptions()
createTimerOptions()
createTimerAutoBadOptions()
createInstrumentOptions()
