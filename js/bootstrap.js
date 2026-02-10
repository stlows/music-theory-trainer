checkSettingsInUrl()
checkQuestionInUrl()


function checkSettingsInUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("settings")) {
    try {
      console.log("Settings found in URL, loading...")
      const decodedSettings = decodeSettings(urlParams.get("settings"))
      if (decodedSettings && decodedSettings.settings) {
        const savedSettings = JSON.parse(localStorage.getItem("savedSettings")) || []
        let newName = `[${t("importedFromUrl")}] ${decodedSettings.name}`
        console.log(newName, savedSettings.map(s => s.name))
        if (savedSettings.some(s => s.name === newName)) {
          if (!confirm(t("settingsNameConflict"))) {
            return
          }
        }
        saveSettings(newName, decodedSettings.settings)
        notify(t("settingsLoadedFromUrl"), "success")
        removeSettingsFromUrl()
        presetSetting(settings)
      }
    }
    catch (e) {
      console.error("Error decoding settings from URL:", e)
    }
  }
}

function removeSettingsFromUrl() {
  const url = new URL(window.location);
  url.searchParams.delete("settings");
  url.searchParams.delete("question");
  url.searchParams.delete("seed");
  window.history.replaceState({}, document.title, url.toString());
}


function checkQuestionInUrl() {
  const url = new URL(window.location);
  const questionFunc = url.searchParams.get("question");
  const seedParam = url.searchParams.get("seed");
  if (window[questionFunc]) {
    let seededRandom = new SeededRandom(seedParam);
    window[questionFunc](seededRandom)
    removeSettingsFromUrl()
  }
}