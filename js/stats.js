function addResult(result) {
  const stats = JSON.parse(localStorage.getItem("stats")) || []
  stats.push({ ...result, date: new Date().valueOf() })
  localStorage.setItem("stats", JSON.stringify(stats))
  printStats()
}

function clearStats() {
  localStorage.setItem("stats", JSON.stringify([]))
  localStorage.setItem("pianoStats", JSON.stringify(emptyPianoStats()))
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

function emptyPianoStats() {
  let result = []
  for (let i = 0; i <= 120; i++) {
    result.push({ success: 0, total: 0, midi: i })
  }
  return result
}

function updatePianoStats(midi, successOrFail) {
  const stats = JSON.parse(localStorage.getItem("pianoStats")) || emptyPianoStats()
  let stat = stats.find(x => x.midi === midi)
  if (successOrFail) {
    stat.success++
  }
  stat.total++
  localStorage.setItem("pianoStats", JSON.stringify(stats))
  printPianoStats()
}

const detailNotes = []
function addNoteDetail(tableContainer, note, stats) {
  if (detailNotes.indexOf(note) > -1) {
    detailNotes.splice(detailNotes.indexOf(note), 1)
  } else {
    detailNotes.push(note)
  }
  tableContainer.innerHTML = ""
  for (const detail of detailNotes) {
    let stat = stats.find(x => x.midi === detail)
    let text = `${detail}: ${stat.success}/${stat.total}`
    if (stat.total > 0) {
      text += ` (${Math.round(stat.success / stat.total * 100)}%)`
    }
    tableContainer.appendChild(p(text))
  }
}

function printPianoStats() {
  const stats = JSON.parse(localStorage.getItem("pianoStats")) || emptyPianoStats()
  const tableContainer = document.getElementById("pianoStatsTableContainer")

  let piano = createPiano({ min: "C2", max: "B7", onKeyClicked: (note) => addNoteDetail(tableContainer, note, stats) })
  let i = 24
  for (const octave of [2, 3, 4, 5, 6, 7, 8]) {
    for (const noteName of ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]) {
      let stat = stats.find(x => x.midi === i)
      if (stat.total > 0) {
        piano.fillKey(noteName + octave, false, getColor(stat.success / stat.total))
      }
      i++
    }
  }
  const container = document.getElementById("pianoStatsContainer")
  container.innerHTML = ""
  container.appendChild(piano._svg)
}

function getColor(successRate) {
  if (successRate < 0.50) {
    return "#ff0000"
  }
  if (successRate < 0.75) {
    return "#ff9900ff"
  }
  if (successRate < 0.90) {
    return "#eeff00ff"
  }
  return "#09ff00ff"
}
printPianoStats()