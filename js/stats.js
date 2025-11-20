function addResult(result) {
  const stats = JSON.parse(localStorage.getItem("stats")) || []
  stats.push({ ...result, date: new Date().valueOf() })
  localStorage.setItem("stats", JSON.stringify(stats))
  printStats()
}

function clearStats() {
  localStorage.setItem("stats", JSON.stringify([]))
  localStorage.setItem("pianoStats", JSON.stringify([]))
  printStats()
  printPianoStats()
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

function addPianoStats(objective, hit, key, deltaTime) {
  const stats = JSON.parse(localStorage.getItem("pianoStats")) || []
  stats.push({ objective, key, hit, success: objective === hit, date: new Date().valueOf(), deltaTime })
  localStorage.setItem("pianoStats", JSON.stringify(stats))
}


function getStatsCount(stats, objective, hit, success, key) {
  return stats.filter((stat) => {
    if (objective !== "all" && objective !== stat.objective) {
      return false
    }
    if (hit !== "all" && hit !== stat.hit) {
      return false
    }
    if (success !== "all" && success !== stat.success) {
      return false
    }
    if (key !== "all" && key !== stat.key) {
      return false
    }
    return true
  }).length
}

function printPianoStats(key) {
  const stats = JSON.parse(localStorage.getItem("pianoStats")) || []
  const tableContainer = document.getElementById("pianoStatsTableContainer")
  const container = document.getElementById("pianoStatsContainer")
  container.innerHTML = ""
  tableContainer.innerHTML = ""

  if(getStatsCount(stats, "all", "all", "all", key) === 0){
    container.innerHTML = t("noStatsYet")
    return
  }
  const tableElement = table()
  tableElement.style.width = "100%"
  const trHead = tr()
  trHead.appendChild(td(t("note")))
  trHead.appendChild(td(t("successRate")))
  trHead.appendChild(td(t("succeeded")))
  trHead.appendChild(td(t("tried")))
  trHead.appendChild(td(t("averageTime")))
  tableElement.appendChild(trHead)
  let piano = createPiano({ min: "C2", max: "B7" })
  let i = 24
  for (const octave of [2, 3, 4, 5, 6, 7, 8]) {
    for (const noteName of ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]) {
      let tried = getStatsCount(stats, i, "all", "all", key)
      let succeed = getStatsCount(stats, i, "all", true, key)
      if (tried > 0) {
        let avgTime = (stats.filter(s => s.objective === i && s.success && s.deltaTime && (key === "all" || s.key === key)).reduce((a, b) => a + b.deltaTime, 0) / tried).toFixed(2)
        piano.fillKey(noteName + octave, false, getColor(succeed / tried, avgTime))
        const trNote = tr()
        trNote.appendChild(td(`${noteName}${octave - 1} (${i})`))
        trNote.appendChild(td(Math.round(succeed / tried * 100) + "%"))
        trNote.appendChild(td(succeed))
        trNote.appendChild(td(tried))
        trNote.appendChild(td(avgTime > 0 ? avgTime + "s" : "-"))
        trNote.style.backgroundColor = getColor(succeed / tried, avgTime) + "33" // 20% opacity
        tableElement.appendChild(trNote)
      }
      i++
    }
  }
  container.appendChild(piano._svg)
  tableContainer.appendChild(tableElement)
}

const colorsFormats = [
  {successRate: 0.75, color: "#ff0000", avgTime: 3},
  {successRate: 0.80, color: "#ff9900", avgTime: 2.5},
  {successRate: 0.95, color: "#eeff00", avgTime: 2},
  {successRate: 1, color: "#09ff00", avgTime: 0 }
]

function getColor(successRate, avgTime) {
  for (const color of colorsFormats) {
    if (successRate < color.successRate || avgTime > color.avgTime) {
      return color.color
    }
  }
}

function selectKeyFilter(key, keyFilter) {
  for (const keyFilter of Array.from(document.querySelectorAll(".keyFilter"))) {
    keyFilter.classList.remove("active")
  }
  keyFilter.classList.add("active")
  printPianoStats(key)
}
function printKeysFilter() {
  let filters = document.getElementById("keysFilter")
  const allButton = p("All", "keyFilter")
  allButton.id = "allKeysFilter"
  allButton.addEventListener("click", () => {
    selectKeyFilter("all", allButton)
  })
  filters.appendChild(allButton)
  for (const key of notes.map(x => x.root)) {
    const keyFilter = p(key, "keyFilter")
    keyFilter.addEventListener("click", () => {
      selectKeyFilter(key, keyFilter)
    })
    filters.appendChild(keyFilter)
  }
}

function printColorCodes() {
  let container = document.getElementById("colorCodes")
  for (const color of colorsFormats) {
    const colorText = p(t("colorDescription")(color.successRate, color.avgTime), "colorText")
    colorText.style.color = color.color
    container.appendChild(colorText)
  }
}

printKeysFilter()
printColorCodes()