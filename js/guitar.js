function noteEl(note) {
  if (note.barre) {
    const barreEl = div("note")
    const y = 20 * (note.barre[0] - 1)
    const x = note.fret === 0 ? -12 : 5 + 30 * (note.fret - 1)
    barreEl.style.transform = `translateX(${x}px) translateY(${y}px)`
    barreEl.style.height = (note.barre[1] - note.barre[0] + 1) * 20 + "px"
    return barreEl
  } else {
    const noteEl = div("note")
    const y = 20 * (note.corde - 1)
    const x = note.fret === 0 ? -12 : 5 + 30 * (note.fret - 1)
    noteEl.style.transform = `translateX(${x}px) translateY(${y}px)`
    noteEl.style.backgroundColor = note.color
    if (note.text) {
      noteEl.innerText = note.text
      noteEl.style.color = note.textColor
    }
    noteEl.addEventListener("click", (e) => {
      e.target.classList.toggle("highlight")
    })
    return noteEl
  }
}

function highlightNote(guitar, _note, color, textColor, fretCount) {
  for (let corde = 1; corde <= 6; corde++) {
    for (let fret = 0; fret < fretCount; fret++) {
      if (notesEqual(_note, note(corde - 1, fret))) {
        addNotesToGuitar(guitar, [{ corde, fret, color, text: _note, textColor }])
      }
    }
  }
}

const colors = [
  "#1E90FF",  // Vibrant Blue (Standout color)
  "#FFF9C4",  // Light Yellow
  "#FFEB3B",  // Yellow
  "#FFDA44",  // Light Gold
  "#FFD54F",  // Amber
  "#FFB74D",  // Light Orange
  "#FFCC80",  // Peach
  "#FFEB8A",  // Pale Yellow
  "#FFE082",  // Light Mustard
  "#FFCA28",  // Vivid Amber
  "#FF9800",  // Deep Amber
  "#FF7043"   // Light Coral
]
function highlightNotes(guitar, notes) {
  if (notes.length > 12) {
    console.error("Not possible")
  }
  for (let i = 0; i < notes.length; i++) {
    highlightNote(guitar, notes[i], colors[i], "black", 14)
  }
}

function indicator(fretNumber) {
  const noteEl = div("indicator")
  const y = 56
  const x = 10 + 30 * (fretNumber - 1)
  noteEl.style.transform = `translateX(${x}px) translateY(${y}px)`
  return noteEl
}

function doubleIndicator(fretNumber) {
  const first = div("indicator")
  const y = 36
  const x = 10 + 30 * (fretNumber - 1)
  first.style.transform = `translateX(${x}px) translateY(${y}px)`

  const second = div("indicator")
  const secondY = 76
  const secondX = 10 + 30 * (fretNumber - 1)
  second.style.transform = `translateX(${secondX}px) translateY(${secondY}px)`
  return { first, second }
}

function createGuitar({ notes = [], fretCount }) {
  const wrapper = div("guitarWrapper")
  const guitar = div("guitar")

  guitar.style.width = (fretCount) * 30 + "px"

  for (const corde of cordes) {
    let cordeEl = div("corde")
    let cordeNameEl = span(corde.root)
    cordeEl.appendChild(cordeNameEl)
    guitar.appendChild(cordeEl)
  }

  const frets = div("frets")
  for (let i = 1; i < fretCount; i++) {
    frets.appendChild(div("fret"))
  }

  const indicators = [5, 7, 9]
  for (let i = 0; i < indicators.length; i++) {
    if (fretCount >= indicators[i]) {
      guitar.appendChild(indicator(indicators[i]))
    }
  }

  if (fretCount >= 12) {
    guitar.appendChild(doubleIndicator(12).first)
    guitar.appendChild(doubleIndicator(12).second)
  }

  guitar.appendChild(frets)
  wrapper.appendChild(guitar)

  addNotesToGuitar(wrapper, notes)

  return wrapper
}

function addNotesToGuitar(wrapper, notes) {
  const guitar = wrapper.querySelector(".guitar")
  for (let i = 0; i < notes.length; i++) {
    guitar.appendChild(noteEl(notes[i]))
  }
}