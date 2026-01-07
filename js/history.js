function clearHistory() {
  localStorage.setItem("history", JSON.stringify([]))
  renderHistory()
}

function addHistory(questionInfo) {
  const history = JSON.parse(localStorage.getItem("history")) || []
  history.push(questionInfo)
  localStorage.setItem("history", JSON.stringify(history))
  renderHistory()
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || []
  const historyContainer = document.getElementById("historyContainer")
  historyContainer.innerHTML = ""
  if (history.length === 0) {
    historyContainer.appendChild(p(t("noHistory")))
    return
  }
  for (const { questionFunc, questionTitle, key, seed, date } of history) {
    let liEl = document.createElement("li")
    liEl.classList.add("mb-small")
    let questionText = document.createElement("a")
    questionText.href = "#"
    questionText.innerText = (key ? `[${key}] ` : "") + questionTitle || questionFunc
    questionText.addEventListener("click", (a) => {
      a.preventDefault()
      toggleActive("history")
      let seededRandom = new SeededRandom(seed)
      try {
        window[questionFunc](seededRandom)
      }
      catch (ex) {
        console.error("Erreur pour la question:")
        console.error(`${questionFunc}(new SeededRandom(${seed}))`)
        console.error(ex)
        gtag('event', "question_error", { questionFunc, seed, ex })
      }

    })
    liEl.appendChild(questionText)
    liEl.style = "display: flex; justify-content: space-between"
    if (date) {
      let dateEl = document.createElement("span")
      dateEl.innerText = new Date(date).toLocaleString()
      liEl.appendChild(dateEl)
    }

    historyContainer.prepend(liEl)
  }
}

renderHistory()