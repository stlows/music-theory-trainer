const settingsPresets = {
  piano: {
    beginner: {
      notation: "letter",
      tempo: 60,
      repeats: 2,
      frets: 7,
      progressionChords: "C",
      plingAtFirstTempo: true,
      accords: ["majeur", "mineur"],
      gammes: ["ionian"],
      lang: "en",
      roots: ["C", "G", "D", "F"],
      questions: ["intervalle", "gamme", "chord", "relativeKey"],
      timerInSeconds: 0,
      autoSelectBadAfterTimer: "true",
      instruments: "piano",
      showNotes: "piano",
      continuousReading: "non",
      clefs: ["treble", "bass"],
      octavesDifficulty: "easy",
      afficherCorrection: "false",
      pianoRythm: ["2-Eights", "Quarter", "Rest Eight"],
      melodyMaxGapInDegrees: 2,
      melodyDegreeLimitHigh: 6,
      melodyDegreeLimitLow: -3,
      melodyAccidentals: "none", // none, some, lot
    },
    intermediate: {
      notation: "letter",
      tempo: 80,
      repeats: 3,
      frets: 7,
      progressionChords: "G",
      plingAtFirstTempo: false,
      accords: ["majeur", "mineur", "7", "maj7", "chord_m7", "dim", "aug", "sus2", "sus4"],
      gammes: ["ionian", "minorPentatonic", "majorPentatonic"],
      lang: "en",
      roots: enharmonicKeys,
      questions: [
        "intervalle",
        "gamme",
        "chord",
        "chordChange",
        "chordsInKey",
        "nthNoteInKey",
        "chordsInProgression",
        "relativeKey",
      ],
      timerInSeconds: 0,
      autoSelectBadAfterTimer: "true",
      instruments: "piano",
      showNotes: "piano_staff",
      continuousReading: "non",
      octavesDifficulty: "medium",
      clefs: ["treble", "bass"],
      afficherCorrection: "false",
      pianoRythm: possibleTiming.map((x) => x.name).filter((x) => !x.includes("Rest")),
      melodyMaxGapInDegrees: 3,
      melodyDegreeLimitHigh: 8,
      melodyDegreeLimitLow: -3,
      melodyAccidentals: "none", // none, some, lot
    },
    advanced: {
      notation: "letter",
      tempo: 120,
      repeats: 4,
      frets: 7,
      progressionChords: "Dm",
      plingAtFirstTempo: false,
      accords: [...accords.map((x) => x.name)],
      gammes: [...gammes.map((x) => x.name)],
      lang: "fr",
      roots: enharmonicKeys,
      questions: [
        "intervalle",
        "gamme",
        "chord",
        "chordChange",
        "chordsInKey",
        "nthNoteInKey",
        "chordsInProgression",
        "relativeKey",
        "chordSimilarities",
        "pratiquezLecturePiano",
        "melodyByEar",
        "pianoRythm",
      ],
      timerInSeconds: 0,
      autoSelectBadAfterTimer: "false",
      instruments: "piano",
      showNotes: "piano_staff",
      continuousReading: "non",
      clefs: ["treble", "bass"],
      octavesDifficulty: "hard",
      afficherCorrection: "false",
      pianoRythm: possibleTiming.map((x) => x.name),
      melodyDegreeLimitHigh: 10,
      melodyDegreeLimitLow: -4,
      melodyAccidentals: "none", // none, some, lot
    },
  },
  guitar: {
    beginner: {
      notation: "letter",
      tempo: 60,
      repeats: 2,
      progressionChords: "C",
      plingAtFirstTempo: true,
      accords: ["majeur", "mineur"],
      gammes: ["minorPentatonic", "blues"],
      lang: "en",
      roots: ["C", "G", "D", "A", "E"],
      questions: ["intervalle", "gamme", "chord", "relativeKey", "quelleNoteSurManche"],
      frets: 5,
      timerInSeconds: 0,
      autoSelectBadAfterTimer: "true",
      instruments: "guitar",
      showNotes: "guitar",
      continuousReading: "non",
      clefs: ["treble", "bass"],
      octavesDifficulty: "easy",
      afficherCorrection: "false",
      pianoRythm: ["2-Eights", "Quarter", "Rest Eight"],
      melodyMaxGapInDegrees: 2,
      melodyDegreeLimitHigh: 6,
      melodyDegreeLimitLow: -3,
      melodyAccidentals: "none", // none, some, lot
    },
    intermediate: {
      notation: "letter",
      tempo: 80,
      repeats: 4,
      progressionChords: "C",
      plingAtFirstTempo: false,
      accords: ["majeur", "mineur", "7", "chord_m7"],
      gammes: ["ionian", "minorPentatonic", "majorPentatonic", "blues"],
      lang: "en",
      roots: ["C", "G", "D", "A", "F", "E", "B"],
      questions: [
        "intervalle",
        "gamme",
        "chord",
        "chordChange",
        "chordsInKey",
        "nthNoteInKey",
        "chordsInProgression",
        "relativeKey",
        "quelleNoteSurManche",
        "noteSurManche",
        "strummingQuestion",
        "pianoRythm",
      ],
      frets: 7,
      timerInSeconds: 0,
      autoSelectBadAfterTimer: "true",
      instruments: "guitar",
      showNotes: "guitar",
      continuousReading: "non",
      clefs: ["treble", "bass"],
      octavesDifficulty: "medium",
      afficherCorrection: "false",
      pianoRythm: possibleTiming.map((x) => x.name).filter((x) => !x.includes("Rest") && !x.includes("Triplet")),
      melodyMaxGapInDegrees: 3,
      melodyDegreeLimitHigh: 8,
      melodyDegreeLimitLow: -3,
      melodyAccidentals: "none", // none, some, lot
    },
    advanced: {
      notation: "letter",
      tempo: 100,
      repeats: 4,
      progressionChords: "C",
      plingAtFirstTempo: false,
      accords: [...accords.map((x) => x.name)],
      gammes: [...gammes.map((x) => x.name)],
      lang: "fr",
      roots: enharmonicKeys,
      questions: [
        "intervalle",
        "gamme",
        "chord",
        "chordsInKey",
        "nthNoteInKey",
        "chordsInProgression",
        "relativeKey",
        "quelleNoteSurManche",
        "noteSurManche",
        "strummingQuestion",
        "pianoRythm",
      ],
      frets: 12,
      timerInSeconds: 0,
      autoSelectBadAfterTimer: "false",
      instruments: "guitar",
      showNotes: "guitar",
      continuousReading: "non",
      clefs: ["treble", "bass"],
      octavesDifficulty: "hard",
      afficherCorrection: "false",
      pianoRythm: possibleTiming.map((x) => x.name).filter((x) => !x.includes("Triplet")),
      melodyMaxGapInDegrees: 4,
      melodyDegreeLimitHigh: 10,
      melodyDegreeLimitLow: -4,
      melodyAccidentals: "none", // none, some, lot
    },
  },
};


function saveCurrentSettings() {
  let settingName = prompt(t("settingNamePlaceholder"))
  if (settingName) {
    saveSettings(settingName, settings)
  }
  else {
    alert(t("invalidSettingName"))
  }
}

function saveSettings(settingName, settings) {
  if (settingName) {
    const savedSettings = JSON.parse(localStorage.getItem("savedSettings")) || []
    savedSettings.push({ name: settingName, settings: settings })
    localStorage.setItem("savedSettings", JSON.stringify(savedSettings))
    notify(t("settingsSaved"), "success")
    renderSavedSettings()
  }
  else {
    return;
  }
}

function renderSavedSettings() {
  const savedSettings = JSON.parse(localStorage.getItem("savedSettings")) || []
  const container = document.getElementById("savedSettingsContainer")
  container.innerHTML = ""
  if (savedSettings.length === 0) {
    let pEl = document.createElement("p")
    pEl.innerText = t("noSavedSettings")
    container.appendChild(pEl)
    return
  }
  for (const { name, settings } of savedSettings) {
    let li = document.createElement("li")
    li.style = "display: flex; justify-content: space-between; align-items: center; gap: 1em"
    let link = document.createElement("a")
    link.href = "#"
    link.innerText = name
    link.addEventListener("click", (a) => {
      a.preventDefault()
      presetSetting(settings)
    })
    li.appendChild(link)

    let actions = div()
    actions.style = "font-size: 0.8em; color: var(--text-secondary)"

    let shareLink = document.createElement("a")
    shareLink.href = "#"
    shareLink.innerText = t("share")
    shareLink.addEventListener("click", (a) => {
      a.preventDefault()
      let settingName = prompt(t("settingNamePlaceholder"), name)
      if (settingName) {
        const shareableSettings = { name: settingName, settings: settings }
        const shareableString = encodeSettings(shareableSettings)
        navigator.clipboard.writeText(window.location.href + "?settings=" + shareableString).then(() => {
          notify(t("settingsCopiedToClipboard"), "success")
        })
      }
    })
    actions.appendChild(shareLink)
    actions.appendChild(document.createTextNode(" | "))
    let deleteLink = document.createElement("a")
    deleteLink.href = "#"
    deleteLink.innerText = t("delete")
    deleteLink.addEventListener("click", (a) => {
      a.preventDefault()
      if (!confirm(t("deleteConfirmation"))) {
        return
      }
      savedSettings.splice(savedSettings.indexOf(settings), 1)
      localStorage.setItem("savedSettings", JSON.stringify(savedSettings))
      renderSavedSettings()
    })
    actions.appendChild(deleteLink)

    li.appendChild(actions)

    container.appendChild(li)
  }
}


