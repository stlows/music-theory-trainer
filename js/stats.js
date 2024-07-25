function addResult(result) {
  const stats = JSON.parse(localStorage.getItem("stats")) || []
  stats.push({ ...result, date: new Date().valueOf() })
  localStorage.setItem("stats", JSON.stringify(stats))
  printStats()
}

function clearStats() {
  localStorage.setItem("stats", JSON.stringify([]))
}

function printStats() {
  const stats = JSON.parse(localStorage.getItem("stats")) || []
  const statsContainer = document.getElementById("statsContainer")
  statsContainer.innerHTML = ""
  statsContainer.appendChild(stat(t("questionsCount"), stats.length))
  statsContainer.appendChild(stat(t("succesCount"), stats.filter(s => s.succes).length))
  statsContainer.appendChild(stat(t("succesRatio"), stats.filter(s => s.succes).length / stats.length * 100 + "%"))
}

function stat(title, number) {
  let stat = div("stat")
  let statTitle = h4(title)
  stat.appendChild(statTitle)

  let statNumber = div("statNumber")
  statNumber.innerText = number
  stat.appendChild(statNumber)
  return stat
}
printStats()