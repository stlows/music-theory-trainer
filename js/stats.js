function addResult(result) {
  const stats = JSON.parse(localStorage.getItem("stats")) || []
  stats.push({ ...result, date: new Date().valueOf() })
  localStorage.setItem("stats", JSON.stringify(stats))
  printStats()
}

function clearStats() {
  localStorage.setItem("stats", JSON.stringify([]))
  printStats()
}

function printStats() {
  const stats = JSON.parse(localStorage.getItem("stats")) || []
  const statsContainer = document.getElementById("statsContainer")
  statsContainer.innerHTML = ""
  const count = stats.length
  statsContainer.appendChild(stat(t("questionsCount"), count))
  const succes = stats.filter(s => s.succes).length
  statsContainer.appendChild(stat(t("succesCount"), succes))
  const ratio = stats.length > 0 ? Math.round(succes / count * 100) : ""
  statsContainer.appendChild(stat(t("succesRatio"), ratio + "%"))
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