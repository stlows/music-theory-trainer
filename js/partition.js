function partitionNoteEl(note) {
  const noteEl = div("partitionNote")
  const y = 20
  const x = 0
  noteEl.style.transform = `translateX(${x}px) translateY(${y}px)`
  return noteEl
}

function createPartition({ notes = [] }) {
  const wrapper = div("partitionWrapper")
  const partition = div("partition")

  const clef = div("clef")
  partition.appendChild(clef)

  const signature = div("signature")
  partition.appendChild(signature)

  for (let i = 0; i < 5; i++) {
    let lineEl = div("line")
    partition.appendChild(lineEl)
  }

  wrapper.appendChild(partition)

  addNotesToPartition(wrapper, notes)

  return wrapper
}

function addNotesToPartition(wrapper, notes) {
  const guitar = wrapper.querySelector(".partition")
  for (let i = 0; i < notes.length; i++) {
    guitar.appendChild(partitionNoteEl(notes[i]))
  }
}