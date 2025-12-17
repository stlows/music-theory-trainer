let defaultSettings = { ...settingsPresets.piano.intermediate }

let settings = { ...defaultSettings }

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
function toggleDontShowWelcome(e) {
  localStorage.setItem("dontShowWelcomeMessage", e.checked)
}
function checkDontShowWelcome() {
  if (localStorage.getItem("dontShowWelcomeMessage") === "true") {
    toggleWelcome()
    document.getElementById("dontShowWelcome").checked = true
  }
}
checkDontShowWelcome()

function setDefaultOption(optionKey, isToggle = false) {
  setOption(optionKey, settings[optionKey], isToggle)
}

function setOption(optionKey, value, isToggle) {
  if (isToggle) {
    // état initial
    if (typeof value === "object") {
      for (let i = 0; i < value.length; i++) {
        const element = document.querySelector(`.settingBtn.${optionKey}[data-value='${value[i]}']`)
        if (element) {
          element.classList.add("active")
        } else {
          console.warn(`can't find option button for ${value[i]} of ${optionKey}`)
        }
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
  // if (settingKey === 'questions') {
  //   clickOnElements(`.settingBtn.${settingKey}[data-value=strummingQuestion]`)
  // }
}

function selectEnharmonic(event) {
  event.preventDefault()
  unselectAllSetting(event, "roots")
  const enharmonicRoots = enharmonicKeys.filter((r) => !settings.roots.includes(r))
  for (const root of enharmonicRoots) {
    const element = document.querySelector(`.settingBtn.roots[data-value='${root}']`)
    if (element) {
      element.click()
    }
  }
}

function unselectAllSetting(event, settingKey) {
  event.preventDefault()
  clickOnElements(`.settingBtn.${settingKey}.active`)
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

function createRootsOptions() {
  for (let i = 0; i < notes.map((n) => n.root).length; i++) {
    const button = createOptionbutton(
      "roots",
      notes[i].root,
      true,
      printNote(notes[i].root),
      enharmonicKeys.includes(notes[i].root) ? "highlight" : ""
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

function createOptions(list, settingKey, isToggle = false, elementId = "") {
  elementId = elementId || settingKey
  for (let i = 0; i < list.length; i++) {
    const button = createOptionbutton(settingKey, list[i], isToggle, list[i])
    document.getElementById(elementId).appendChild(button)
  }
  setDefaultOption(settingKey, isToggle)
}

function createOuiNonOptions(settingKey, elementId) {
  elementId = elementId || settingKey
  const buttonTrue = createOptionbutton(settingKey, "true", false, "oui")
  document.getElementById(elementId).appendChild(buttonTrue)
  const buttonFalse = createOptionbutton(settingKey, "false", false, "non")
  document.getElementById(elementId).appendChild(buttonFalse)

  setDefaultOption(settingKey)
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

function resetDefaultSettings() {
  presetSetting(defaultSettings)
}

function presetSetting(newSettings) {
  let lang = settings.lang
  localStorage.setItem("settings", JSON.stringify({ ...newSettings, lang }))
  location.reload()
}

function persistSettings() {
  localStorage.setItem("settings", JSON.stringify(settings))
}
function readSettings() {
  settings = JSON.parse(localStorage.getItem("settings"))
}

loadSettings()
createRootsOptions()
createQuestionsOptions()
createTimerOptions()
createOuiNonOptions("afficherCorrection")
createOuiNonOptions("autoSelectBadAfterTimer", "autoBad")
createOptions([40, 60, 80, 100, 110, 120, 135, 150, 180], "tempo", false)
createOptions([1, 2, 3, 4], "repeats", false)
createOptions([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "frets", false)
createOptions(["word", "letter"], "notation", false)
createOptions(
  accords.map((x) => x.name),
  "accords",
  true,
  "accordsSettings"
)
createOptions(
  gammes.map((x) => x.name),
  "gammes",
  true,
  "gammesSettings"
)
createOptions(
  possibleTiming.map((x) => x.name),
  "pianoRythm",
  true
)
createOptions(["practice", ...possibleProgressionChords], "progressionChords", false)
createOptions(["fr", "en"], "lang", false)
createOptions(["guitar", "piano"], "instruments", false)
createOptions(["none", "piano", "guitar"], "showNotes", false)
createOptions(["non", "sameClef", "differentClef"], "continuousReading", false)
//createOptions(["4/4", "2/4","3/4","6/4"], "timeSignatures", true)
createOptions(["treble", "bass"], "clefs", true)
createOptions(["easy", "medium", "hard"], "octavesDifficulty", false)
createOptions([1,2, 3,4,5,6], "melodyMaxGapInDegrees", false);
createOptions([6,8,10,15], "melodyDegreeLimitHigh", false);
createOptions([-3,-4,-5,-6], "melodyDegreeLimitLow", false);
createOptions(["none","some","lots"], "melodyAccidentals", false);
// createOptions([4, 6, 8, 12], "melodyTrainingNotesCount", false);

function encodeSettings(settings) {
  return btoa(JSON.stringify(settings).replaceAll("♭", "!b!").replaceAll("♯", "!s!"))
}

function decodeSettings(encodedSettings) {
  return JSON.parse(atob(encodedSettings).replaceAll("!b!", "♭").replaceAll("!s!", "♯"))
}
