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
  const last24h = 24 * 60 * 60 * 1000
  const lastWeek = 7 * 24 * 60 * 60 * 1000
  const lastMonth = 30 * 24 * 60 * 60 * 1000
  renderHistoryToElement(document.getElementById("historyContainer_last24h"), history.filter(h => (Date.now() - h.date) <= last24h))
  renderHistoryToElement(document.getElementById("historyContainer_lastWeek"), history.filter(h => (Date.now() - h.date) <= lastWeek && (Date.now() - h.date) > last24h))
  renderHistoryToElement(document.getElementById("historyContainer_lastMonth"), history.filter(h => (Date.now() - h.date) <= lastMonth && (Date.now() - h.date) > lastWeek))
  renderHistoryToElement(document.getElementById("historyContainer_before"), history.filter(h => (Date.now() - h.date) > lastMonth))
}

function renderHistoryToElement(historyContainer, history) {
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
      dateEl.innerText = formatDateFr(new Date(date))
      liEl.appendChild(dateEl)
    }

    historyContainer.prepend(liEl)
  }
}

function formatDateFr(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0")

  const yyyy = date.getFullYear()
  const MM = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  const HH = pad(date.getHours())
  const mm = pad(date.getMinutes())

  return `${yyyy}-${MM}-${dd} ${HH}h${mm}`
}

renderHistory()