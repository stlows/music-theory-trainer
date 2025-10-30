function tests(questions, count, seed) {
  seed = seed || random(2147483647)
  let seededRandom = new SeededRandom(seed)
  let noErrors = 0;
  let errors = [];
  for (q of questions) {
    for (let i = 0; i < count; i++) {
      try {
        window[q](seededRandom)
        clearGame()
        noErrors++
      } catch (ex) {
        errors.push({ question: q, seed: seededRandom.seed, error: ex })
      }
    }
  }
  console.log(`Tests completed with seed ${seed}. ${noErrors} questions passed without errors, ${errors.length} failed.`)
  if(errors.length > 0) {
    console.log(errors)
  }
}

function testSample(count) {
  tests(possibleQuestions.map(x => x.func).filter(x => x !== "intervalByEar" && x !== "melodyByEar"), count)
}