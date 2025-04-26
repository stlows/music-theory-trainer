function noteToId(string, fret)
{
    if(fret === 0)
    {
        return `o-s${string-1}`
    }
    return `f${fret - 1}-s${string - 1}`
}


function getColor(note){
    switch (note) {
        case "R":
            return "red"
        case "P5":
            return "blue"    
        default:
            return "blue";
    }
}

function getScale(name){
    return scales.find(x => x.name === name)
}

function getShape(scale, shape){
    return scale.shapes.find(x => x.shape === shape)
}

const notes = [["E"],["F"],["F#", "Gb"],["G"],["G#", "Ab"],["A"],["A#","Bb"],["B"],["C"],["C#","Db"],["D"],["D#","Eb"]]

function getTransposition(shape, note)
{
    let transposition = notes.findIndex(group => group.includes(note));
    let fretGap = getFretGap(shape.notes, transposition)
    
    return fixTransposition(transposition, fretGap)
}

function fixTransposition(tranposition, fretGap)
{
    let MAX_FRET_SCALE = 16
    let MAX_FRET_CHORD = 12
    if(fretGap.end > MAX_FRET_SCALE || fretGap.start >= MAX_FRET_CHORD)
    {
        return tranposition - 12
    }
    return tranposition
}

function getFretGap(notes, tranposition)
{
    let start = 99
    let end = -1

    for(note of notes)
    {
        for({ fret } of note.frets){
            start = Math.min(start, fret + tranposition)
            end =  Math.max(end, fret + tranposition)
        }
    }
    return {start, end}
}

function drawNotes(notes, tranposition, fretboard)
{
    for(note of notes)
    {
        for(fret of note.frets)
        {
            let id = noteToId(note.string, fret.fret + tranposition)
            let element = document.getElementById(id)
            let color = getColor(fret.note)
            fretboard.updateNote(element, {color, visibility: "visible"})
        }
    }
}

function selectRandomOptions() {
    fretboard.reset()
    const selects = ["shape", "key", "scale"];
  
    selects.forEach(id => {
      const select = document.getElementById(id);
      const options = select.options;
      const randomIndex = Math.floor(Math.random() * options.length);
      select.selectedIndex = randomIndex;
    });
}

function selectRandomNearFret() {
    fretboard.reset()
  
      const nearFret = document.getElementById("nearFret");
      nearFret.value = Math.floor(Math.random() * 14);;
}
  
function draw(){
    fretboard.reset()
    let scale = getScale(document.getElementById("scale").value)
    let shape = getShape(scale, document.getElementById("shape").value)
    let key = document.getElementById("key").value

    if(key.includes("b")){
        fretboard.state.enharmonic = 1
    }else{
        fretboard.state.enharmonic = 0
    }
    let transposition = getTransposition(shape, key)
    fretboard.setFretWindow({ start: 0, end: 16 });
    drawNotes(shape.notes, transposition, fretboard)
}

function getClosestShape(fret, key, type)
{
    let scale = getScale(type)
    for(shape of scale.shapes)
    {
        let fretGap = getFretGap(shape.notes, getTransposition(shape, key))
        if(fret >= fretGap.start && fret <= fretGap.end){
            return shape
        }
    }

    return null
    
}

function nearestShape(){
    let scale = document.getElementById("scale").value
    let key = document.getElementById("key").value
    let fret = document.getElementById("nearFret").value
    console.log(getClosestShape(fret, key, scale))
}