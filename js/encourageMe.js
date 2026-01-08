let questionCount = 0
function encourageMe() {
  let seed = random(2147483647);
  let seededRandom = new SeededRandom(seed);
  let encouragement = seededRandom.int(6, 1) // 1 à 5
  let encouragementText = p(t("encouragementText_" + encouragement))
  encouragementText.style.marginBottom = "1em"
  let encouragementPaiement = p(t("encouragementPaiement"))
  let answerDiv = div("")
  answerDiv.appendChild(encouragementText)
  answerDiv.appendChild(encouragementPaiement)
  let question = createQuestion({
    questionText: t("encouragementTitle"),
    answerNode: answerDiv,
  })
  question.querySelector(".answer").click()
  questionCount = 0
}