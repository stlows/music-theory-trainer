function testAll() {
  tests(possibleQuestions.map(x => x.func).filter(x => x !== "intervalByEar" && x !== "melodyByEar"), notes.map(x => x.root))
}