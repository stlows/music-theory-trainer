function noteToId(string, fret) {
  if (fret === 0) {
    return `o-s${string - 1}`;
  }
  return `f${fret - 1}-s${string - 1}`;
}

function getColor(note) {
  switch (note) {
    case "R":
      return "red";
    case "P5":
      return "blue";
    default:
      return "blue";
  }
}

function getScale(name) {
  return scales.find((x) => x.name === name);
}

function getShape(scale, shape) {
  return scale.shapes.find((x) => x.shape === shape);
}

const notes = [["E"], ["F"], ["F#", "Gb"], ["G"], ["G#", "Ab"], ["A"], ["A#", "Bb"], ["B"], ["C"], ["C#", "Db"], ["D"], ["D#", "Eb"]];

function getTransposition(shape, note) {
  let transposition = notes.findIndex((group) => group.includes(note));
  let fretGap = getFretGap(shape.notes, transposition);

  if (fretGap.end > 16 || fretGap.start >= 12) {
    transposition -= 12;
    fretGap.start -= 12;
    fretGap.end -= 12;
  }
  return { transposition, fretGap };
}

function getFretGap(notes, tranposition) {
  let start = 99;
  let end = -1;

  for (note of notes) {
    for ({ fret } of note.frets) {
      start = Math.min(start, fret + tranposition);
      end = Math.max(end, fret + tranposition);
    }
  }
  return { start, end };
}

function drawNotes(notes, tranposition, fretboard) {
  for (note of notes) {
    for (fret of note.frets) {
      let id = noteToId(note.string, fret.fret + tranposition);
      let element = document.getElementById(id);
      let color = getColor(fret.note);
      fretboard.updateNote(element, { color, visibility: "visible" });
    }
  }
}

function selectRandomOptions() {
  fretboard.reset();
  resetHints();
  const selects = ["shape", "key", "scale"];

  selects.forEach((id) => {
    const select = document.getElementById(id);
    const options = select.options;
    const randomIndex = Math.floor(Math.random() * options.length);
    select.selectedIndex = randomIndex;
  });

  const nearFret = document.getElementById("nearFret");
  nearFret.value = Math.floor(Math.random() * 12);
}

function drawShape() {
  let scale = document.getElementById("scale").value;
  let shape = document.getElementById("shape").value;
  let fretGap = draw(scale, shape);
  setFretHint(fretGap);
}

function draw(scaleKey, shapeKey) {
  fretboard.reset();
  resetHints();
  let key = document.getElementById("key").value;

  let scale = getScale(scaleKey);
  let shape = getShape(scale, shapeKey, key);

  let { transposition, fretGap } = getTransposition(shape, key);
  drawNotes(shape.notes, transposition, fretboard);

  return fretGap;
}

function nearestShape(fret, key, scaleKey) {
  let scale = getScale(scaleKey);
  console.log(scale);
  for (shape of scale.shapes) {
    let { fretGap } = getTransposition(shape, key);
    if (fret >= fretGap.start && fret <= fretGap.end) {
      return shape.shape;
    }
  }

  return null;
}

function drawNearestShape() {
  let scale = document.getElementById("scale").value;
  let fret = document.getElementById("nearFret").value;
  let key = document.getElementById("key").value;
  let shape = nearestShape(fret, key, scale);
  draw(scale, shape);
  setShapeHint(shape);
}

function toggleEnharmonic() {
  fretboard.toggleEnharmonic();
}

function resetHints() {
  document.getElementById("shapeHint").innerHTML = "";
  document.getElementById("fretHint").innerHTML = "";
}

function setFretHint(fretGap) {
  document.getElementById("fretHint").innerHTML = `Between fret ${fretGap.start} and ${fretGap.end}`;
}

function setShapeHint(shape) {
  document.getElementById("shapeHint").innerHTML = `Shape ${shape}`;
}
