function staff(key, notes, clef = "treble", countPerMeasure = 4) {
    const el = div()
    let notesString = ""
    for(let group = 0; group < notes.length / countPerMeasure; group++){
        for (let i = 0; i < countPerMeasure; i++) {
            notesString += getAbcNote(notes[group * countPerMeasure + i])
        }
        notesString += "|"
    }
    key = key.replace("♯", "#").replace("♭", "b")
    let abcString = `X:1\nM:${countPerMeasure}/4\nL:1/4\nK:${key} clef=${clef}\n${notesString}\n`;
    ABCJS.renderAbc(el, abcString, {scale: 1.4, selectTypes: [], add_classes: true, staffwidth: 600})
    return el
}

function getAbcNote(note) {
    let prefix = "";
    if (note.note.includes("♭")) prefix = "_";
    else if (note.note.includes("♯")) prefix = "^";

    let baseNote = note.note.replace(/[^A-G]/g, "");
    let abcNote = baseNote;

    if (note.octave > 0) {
        abcNote = baseNote.toLowerCase() + "'".repeat(note.octave);
    } else if (note.octave < 0) {
        abcNote = baseNote + ",".repeat(-note.octave);
    }

    return prefix + abcNote;
}