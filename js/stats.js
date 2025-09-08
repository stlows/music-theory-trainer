function addResult(result) {
  const stats = JSON.parse(localStorage.getItem("stats")) || []
  stats.push({ ...result, date: new Date().valueOf() })
  localStorage.setItem("stats", JSON.stringify(stats))
  printStats()
}

function clearStats() {
  localStorage.setItem("stats", JSON.stringify([]))
  const fakeStats = [
    { objective: 60, hit: 59, key: "C", success: false },
    { objective: 60, hit: 60, key: "C", success: true },
    { objective: 60, hit: 60, key: "C", success: true },
    { objective: 61, hit: 60, key: "A", success: false },
    { objective: 61, hit: 61, key: "A", success: true },
    { objective: 60, hit: 61, key: "C", success: false },
  ]
  localStorage.setItem("pianoStats", JSON.stringify(fakeStats))
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

function addPianoStats(objective, hit, key) {
  const stats = JSON.parse(localStorage.getItem("pianoStats")) || []
  stats.push({ objective, key, hit, success: objective === hit, date: new Date().valueOf() })
  localStorage.setItem("pianoStats", JSON.stringify(stats))
}

const detailNotes = []
function addNoteDetail(tableContainer, note, stats, key) {
  if (detailNotes.indexOf(note) > -1) {
    detailNotes.splice(detailNotes.indexOf(note), 1)
  } else {
    detailNotes.push(note)
  }
  refreshNoteDetail(tableContainer, stats, key)
}

function refreshNoteDetail(tableContainer, stats, key) {
  tableContainer.innerHTML = ""
  for (const detail of detailNotes) {
    let tried = getStatsCount(stats, detail, "all", "all", key)
    let succeed = getStatsCount(stats, detail, "all", true, key)
    let text = `${detail}: ${succeed}/${tried}`
    if (tried > 0) {
      text += ` (${Math.round(succeed / tried * 100)}%)`
    }
    tableContainer.appendChild(p(text))
  }
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
  let piano = createPiano({ min: "C2", max: "B7", onKeyClicked: (note) => addNoteDetail(tableContainer, note, stats, key) })
  refreshNoteDetail(tableContainer, stats, key)
  let i = 24
  for (const octave of [2, 3, 4, 5, 6, 7, 8]) {
    for (const noteName of ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]) {
      let tried = getStatsCount(stats, i, "all", "all", key)
      let succeed = getStatsCount(stats, i, "all", true, key)
      if (tried > 0) {
        piano.fillKey(noteName + octave, false, getColor(succeed / tried))
      }
      i++
    }
  }
  const container = document.getElementById("pianoStatsContainer")
  container.innerHTML = ""
  container.appendChild(piano._svg)
}

function getColor(successRate) {
  if (successRate < 0.75) {
    return "#ff0000ff"
  }
  if (successRate < 0.80) {
    return "#ff9900ff"
  }
  if (successRate < 0.95) {
    return "#eeff00ff"
  }
  return "#09ff00ff"
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

printKeysFilter()