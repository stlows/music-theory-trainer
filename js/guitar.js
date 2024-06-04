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
    return noteEl
  }
}

function indicator(fretNumber) {
  const noteEl = div("indicator")
  const y = 56
  const x = 10 + 30 * (fretNumber - 1)
  noteEl.style.transform = `translateX(${x}px) translateY(${y}px)`
  return noteEl
}

function createGuitar({ notes = [], fretCount }) {
  const wrapper = div("guitarWrapper")
  const guitar = div("guitar")

  for (const corde of cordes) {
    let cordeEl = div("corde")
    let cordeNameEl = span(corde[settings.notation])
    cordeEl.appendChild(cordeNameEl)
    guitar.appendChild(cordeEl)
  }

  const frets = div("frets")
  for (let i = 0; i < fretCount; i++) {
    frets.appendChild(div("fret"))
  }

  const indicators = [5, 7, 9]
  for (let i = 0; i < indicators.length; i++) {
    guitar.appendChild(indicator(indicators[i]))
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