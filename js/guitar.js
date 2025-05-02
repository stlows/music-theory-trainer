const FRET_SIZE = 50
const STRING_GAP = 35
const TOP_GAP = 20
const NOTE_WIDTH = 25
const INDICATOR_SIZE = 5
const LEFT_GAP = 50
const STRING_WIDTH = 1
const FRET_WIDTH = 1
const NUT_WIDTH = 3
const WIDTH = FRET_SIZE * 12 + LEFT_GAP
const HEIGHT = 5 * STRING_GAP + TOP_GAP * 2

function noteEl(note) {
  if (note.barre) {
    const barreEl = div("note")
    const y = STRING_GAP * (note.barre[0] - 1)
    const x = note.fret === 0 ? -NOTE_WIDTH / 2 : FRET_SIZE * (note.fret - 1)
    barreEl.style.transform = `translateX(${x}px) translateY(${y}px)`
    barreEl.style.height = (note.barre[1] - note.barre[0] + 1) * 20 + "px"
    return barreEl
  } else {
    const y = TOP_GAP + STRING_GAP * (note.corde - 1) - NOTE_WIDTH / 2
    const x = LEFT_GAP + note.fret * FRET_SIZE - NOTE_WIDTH / 2 - (note.fret === 0 ? 0 : FRET_SIZE / 2)
    let noteEl = rect(NOTE_WIDTH, x, y, note.color)
    noteEl.classList.add("note")
    if (note.selected) {
      noteEl.classList.add("highlight")
    }
    let textEl = text(x + NOTE_WIDTH / 2, y + NOTE_WIDTH / 2, note.text, "black")
    noteEl.addEventListener("click", (e) => {
      e.target.classList.toggle("highlight")
    })
    return { noteEl, textEl }
  }
}

function highlightNote(guitar, _note, color, fretCount, selected) {
  for (let corde = 1; corde <= 6; corde++) {
    for (let fret = 0; fret < fretCount; fret++) {
      if (notesEqual(_note, note(corde - 1, fret))) {
        addNotesToGuitar(guitar, [{ corde, fret, color, text: _note, selected }])
      }
    }
  }
}

const colors = [
  "#1E90FF", // Vibrant Blue (Standout color)
  "#FFF9C4", // Light Yellow
  "#FFEB3B", // Yellow
  "#FFDA44", // Light Gold
  "#FFD54F", // Amber
  "#FFB74D", // Light Orange
  "#FFCC80", // Peach
  "#FFEB8A", // Pale Yellow
  "#FFE082", // Light Mustard
  "#FFCA28", // Vivid Amber
  "#FF9800", // Deep Amber
  "#FF7043", // Light Coral
]
function highlightNotes(guitar, notes, root) {
  if (notes.length > 12) {
    console.error("Not possible")
  }
  for (let i = 0; i < notes.length; i++) {
    highlightNote(guitar, notes[i], colors[i], 14, notes[i] === root)
  }
}

function indicator(fretNumber) {
  let x = LEFT_GAP + fretNumber * FRET_SIZE - FRET_SIZE / 2
  let y = HEIGHT / 2
  return circle(INDICATOR_SIZE, x, y, "white")
}

function doubleIndicator(fretNumber) {
  const first = div("indicator")
  const y = TOP_GAP + 1.5 * STRING_GAP - INDICATOR_SIZE / 2
  const x = FRET_SIZE * (fretNumber - 1) + FRET_SIZE / 2 - INDICATOR_SIZE / 2
  first.style.transform = `translateX(${x}px) translateY(${y}px)`

  const second = div("indicator")
  const secondY = TOP_GAP + 3.5 * STRING_GAP - INDICATOR_SIZE / 2
  const secondX = FRET_SIZE * (fretNumber - 1) + FRET_SIZE / 2 - INDICATOR_SIZE / 2
  second.style.transform = `translateX(${secondX}px) translateY(${secondY}px)`
  return { first, second }
}

function createGuitar({ notes = [], fretCount }) {
  const wrapper = svg(WIDTH, HEIGHT)

  for (let i = 0; i < cordes.length; i++) {
    let stringY = TOP_GAP + i * STRING_GAP
    let cordeEl = line(LEFT_GAP, WIDTH, stringY, stringY, "white", STRING_WIDTH)
    let cordeName = text(LEFT_GAP / 2, stringY, cordes[i].root, "white")
    wrapper.appendChild(cordeEl)
    wrapper.appendChild(cordeName)
  }

  for (let i = 1; i < fretCount; i++) {
    let fretX = LEFT_GAP + i * FRET_SIZE
    let fretEl = line(fretX, fretX, TOP_GAP, HEIGHT - TOP_GAP, "white", FRET_WIDTH)
    wrapper.appendChild(fretEl)
  }

  let nutX = LEFT_GAP
  let nut = line(nutX, nutX, TOP_GAP, HEIGHT - TOP_GAP, "white", NUT_WIDTH)
  wrapper.appendChild(nut)

  const indicators = [3, 5, 7, 9]
  for (let i = 0; i < indicators.length; i++) {
    if (fretCount >= indicators[i]) {
      wrapper.appendChild(indicator(indicators[i]))
    }
  }

  if (fretCount >= 12) {
    let x = LEFT_GAP + 12 * FRET_SIZE - FRET_SIZE / 2
    let y = HEIGHT / 2
    wrapper.appendChild(circle(INDICATOR_SIZE, x, y - STRING_GAP, "white"))
    wrapper.appendChild(circle(INDICATOR_SIZE, x, y + STRING_GAP, "white"))
  }

  addNotesToGuitar(wrapper, notes)

  return wrapper
}

function addNotesToGuitar(wrapper, notes) {
  for (let i = 0; i < notes.length; i++) {
    let note = noteEl(notes[i])
    wrapper.appendChild(note.noteEl)
    wrapper.appendChild(note.textEl)
  }
}
