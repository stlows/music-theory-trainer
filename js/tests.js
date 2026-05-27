function tests(questions, count, seed) {
  seed = seed || random(2147483647)
  let seededRandom = new SeededRandom(seed)
  let noErrors = 0
  let errors = []
  let testedQuestions = []
  for (q of questions) {
    for (let i = 0; i < count; i++) {
      try {
        testedQuestions.push({ ...window[q](seededRandom), q })
        clearGame()
        noErrors++
      } catch (ex) {
        errors.push({ question: q, seed: seededRandom, error: ex })
      }
    }
  }

  console.log(`Tests completed with seed ${seed}. ${noErrors} questions passed without errors, ${errors.length} failed.`)
  if (errors.length > 0) {
    console.log(errors)
  }
  console.table(testedQuestions)
}

function testSample(count) {
  enabledNotifications = false

  const currentKeys = settings.roots
  const currentChords = settings.accords
  const currentGammes = settings.gammes
  const continuousQuestions = settings.continuousQuestions
  const tts = settings.ttsQuestion
  const timer = settings.timerInSeconds

  settings.roots = enharmonicKeys
  settings.accords = [...accords.map((x) => x.name)]
  settings.gammes = [...gammes.map((x) => x.name)]
  settings.continuousQuestions = "false"
  settings.ttsQuestion = "false"
  settings.timerInSeconds = 0

  tests(possibleQuestions.map(x => x.func).filter(x => x !== "intervalByEar"), count)

  enabledNotifications = true

  const pianoSimulationEl = document.getElementById("pianoSimulation")
  pianoSimulationEl.innerHTML = ""

  settings.roots = currentKeys
  settings.accords = currentChords
  settings.gammes = currentGammes
  settings.continuousQuestions = continuousQuestions
  settings.ttsQuestion = tts
  settings.timerInSeconds = timer
}
