const patterns = [
  { name: "Pattern #1", pattern: "d d d d " },
  { name: "Pattern #2", pattern: "dudududu" },
  { name: "Pattern #3", pattern: "d dud du" },
  { name: "Pattern #4", pattern: "d d dudu" },
  { name: "Pattern #5", pattern: "d dududu" },
  { name: "Pattern #6", pattern: "d d dud " },
  { name: "Pattern #7", pattern: "dud dud " },
  { name: "Pattern #8", pattern: "d du ud " },
  { name: "Pattern #10", pattern: "d du udu" },
  { name: "Pattern #11", pattern: "xuxuxuxu" },
  { name: "Pattern #12", pattern: "duxuduxu" },
  { name: "Pattern #13", pattern: "d duxudu" },
  { name: "Pattern #14", pattern: "du ud du" },
  { name: "Pattern #15", pattern: "duxuxudu" },
  { name: "Pattern #16", pattern: "dudu udu" },
  { name: "Pattern #17", pattern: "duxuxuxu" },
  { name: "Pattern #18", pattern: "d d xuxu" },
  { name: "Pattern #19", pattern: "d d xudu" },
  { name: "Pattern #20", pattern: "d d  udu" },
]

function formatStroke(stroke) {
  if (stroke === "d") {
    return "↓"
  }
  if (stroke === "u") {
    return "↑"
  }
  if (stroke === " ") {
    return ""
  }
  if (stroke === "x") {
    return "X"
  }
}
function formatTempo(i, stroke) {
  if (stroke === " ") {
    return ""
  }
  if (stroke === "x") {
    return "X"
  }
  if (i % 2 === 0) {
    return (i / 2) + 1
  }
  return " et "
}
function createPattern(pattern, chord) {
  const patternEl = table("strumming")
  patternEl.appendChild(caption(pattern.name + " en " + chord))
  const split = pattern.pattern.split("")
  const strokes = tr("strokes")
  const tempo = tr("tempo")
  for (let i = 0; i < split.length; i++) {
    strokes.appendChild(td(formatStroke(split[i])))
    tempo.appendChild(td(formatTempo(i, split[i])))
  }
  patternEl.appendChild(strokes)
  patternEl.appendChild(tempo)
  return patternEl
}
function addPatternToPartition(questionEl) {
  const chord = getChord()
  const partitionEl = questionEl.querySelector(".partition")
  const pattern = chooseOne(patterns)
  const patternEl = createPattern(pattern, chord)
  partitionEl.appendChild(patternEl)
  return { pattern, chord }
}
function getChord() {
  if (settings.progressionChords == "Pratique") {
    return chooseOne(possibleProgressionChords)
  }
  return settings.progressionChords
}

const sounds = possibleProgressionChords.map(x => {
  return {
    chord: x,
    up: new Audio(`assets/Acoustic/Acoustic-${x}-Up.mp3`),
    down: new Audio(`assets/Acoustic/Acoustic-${x}-Down.mp3`)
  }
})

function strummingQuestion() {
  const questionWrapper = div("question")
  const partition = div("partition")
  const tempo = t("tempo")(settings.tempo, settings.repeats, settings.progressionChords)
  questionWrapper.appendChild(h4(tempo))

  questionWrapper.appendChild(partition)
  let currentPattern = addPatternToPartition(questionWrapper)
  let nextPattern = addPatternToPartition(questionWrapper)
  const soundEl = h4(`${t("sound")}: 🔊`)
  soundEl.classList.add("soundSetting")
  questionWrapper.appendChild(soundEl)
  let sound = true
  soundEl.addEventListener("click", (e) => {
    e.stopPropagation()
    if (sound) {
      sound = false
      soundEl.innerText = `${t("sound")}: 🔈`
    } else {
      sound = true
      soundEl.innerText = `${t("sound")}: 🔊`
    }
  })

  const instruction = p(t("clickToStart"))
  questionWrapper.appendChild(instruction)
  gameEl.prepend(questionWrapper)
  let status = "pause"
  let currentPartition = 0
  let currentTempo = 0
  let repeatTimes = 0
  let timeoutId, activeStroke, activeTempo
  const slap = new Audio("assets/Acoustic/slap.mp3")
  const pling = new Audio("assets/pling.mp3")
  questionWrapper.addEventListener("click", () => {
    if (status === "pause") {
      timeoutId = setInterval(async () => {
        if (activeStroke) {
          activeStroke.classList.remove("active")
        }
        if (activeTempo) {
          activeTempo.classList.remove("active")
        }
        activeStroke = partition.querySelector(`.strumming:nth-child(${currentPartition + 1}) tr.strokes td:nth-child(${currentTempo + 1})`)
        activeTempo = partition.querySelector(`.strumming:nth-child(${currentPartition + 1}) tr.tempo td:nth-of-type(${currentTempo + 1})`)
        activeStroke.classList.add("active")
        activeTempo.classList.add("active")

        if (sound) {


          if (settings.plingAtFirstTempo && currentTempo === 0) {
            pling.pause()
            pling.currentTime = 0
            pling.play()
          }

          if (currentPattern.pattern.pattern[currentTempo] === "d") {
            const down = sounds.find(x => x.chord === currentPattern.chord).down
            down.pause()
            down.currentTime = 0
            down.play()
          }

          if (currentPattern.pattern.pattern[currentTempo] === "u") {
            const up = sounds.find(x => x.chord === currentPattern.chord).up
            up.pause()
            up.currentTime = 0
            up.play()
          }

          if (currentPattern.pattern.pattern[currentTempo] === "x") {
            slap.pause()
            slap.currentTime = 0
            slap.play()
          }
        }

        currentTempo = (currentTempo + 1) % 8
        repeatTimes++

        if (repeatTimes >= parseInt(settings.repeats) * 8) {
          currentPattern = { ...nextPattern }
          nextPattern = addPatternToPartition(questionWrapper)
          repeatTimes = 0
          currentPartition++
          partition.style.transform = `translateX(${-337 * currentPartition}px)`
        } else {
        }
      }, 30000 / parseFloat(settings.tempo))
      instruction.innerText = t("clickToPause")
      status = "play"
    } else {
      clearInterval(timeoutId)
      instruction.innerText = t("clickToStart")
      status = "pause"
    }
  })
}

function printAllStrumming() {
  const patternsEl = document.getElementById("patterns")
  patternsEl.innerHTML = ""
  for (let patternIndex = 0; patternIndex < patterns.length; patternIndex++) {
    let patternEl = createPattern(patterns[patternIndex], printNote("C"))
    patternsEl.appendChild(patternEl)
  }
}

printAllStrumming()