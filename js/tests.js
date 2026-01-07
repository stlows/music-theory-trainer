function tests(questions, count, seed) {
  seed = seed || random(2147483647)
  let seededRandom = new SeededRandom(seed)
  let noErrors = 0
  let errors = []
  for (q of questions) {
    for (let i = 0; i < count; i++) {
      try {
        let { key, questionText } = window[q](seededRandom)
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
}

function testSample(count) {
  enabledNotifications = false

  const currentKeys = settings.roots
  const currentChords = settings.accords
  const currentGammes = settings.gammes
  settings.roots = enharmonicKeys
  settings.accords = [...accords.map((x) => x.name)]
  settings.gammes = [...gammes.map((x) => x.name)]

  tests(possibleQuestions.map(x => x.func).filter(x => x !== "intervalByEar"), count)

  enabledNotifications = true

  const pianoSimulationEl = document.getElementById("pianoSimulation")
  pianoSimulationEl.innerHTML = ""

  settings.roots = currentKeys
  settings.accords = currentChords
  settings.gammes = currentGammes
}
