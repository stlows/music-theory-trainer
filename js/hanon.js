const hanonExercises =
    [
        {
            name: "1",
            ascendingPattern: [0,2,3,4,5,4,3,2],
            descendingPattern: [5,3,2,1,0,1,2,3],
        },

        {
            name: "2",
            ascendingPattern: [0,2,5,4, 3,4,3,2],
            descendingPattern: [5,2,0,1, 2,1,2,3],
        },

         {
            name: "3",
            ascendingPattern: [0,2,5,4, 3,2,1,2],
            descendingPattern: [5,2,0,1, 2,3,2,1],
        }
    ]

// Map degree to note in uppercase, with octave modifiers
const scaleNotes = ['C','D','E','F','G','A','B'];
// Add parameters for fingerings
function generateHanonABC({
  key = 'C',
  ascendingPattern = [0,2,3,4,5,4,3,2],
  lastAscending = 1,
  descendingPattern = [5,3,2,1,0,1,2,3],
  lastDescending = 0,
  barsPerLine = 4,
  notesPerBar = 8,
  L = '1/16',
  baseOctaveRH = 4,
  baseOctaveLH = 3,
  fingersRHAsc = [],   // array of finger numbers for RH ascending
  fingersRHDesc = [],  // RH descending
  fingersLHAsc = [],   // LH ascending
  fingersLHDesc = [],   // LH descending
  completeScale = false
}) {
  let rhDegrees = [];
  let lhDegrees = [];
  let rhFingers = [];
  let lhFingers = [];

  // Ascending
  const startingDegree = scaleNotes.indexOf(key[0].toUpperCase());
  let currentDegree = startingDegree;

  function pushPattern(pattern, fingersRH, fingersLH, degree){
    pattern.forEach((step, i) => {
        rhDegrees.push(degree + step);
        rhFingers.push(fingersRH[i % fingersRH.length] || ''); // repeat pattern if shorter
        lhDegrees.push(degree + step - 7);
        lhFingers.push(fingersLH[i % fingersLH.length] || '');
        });
  }

  if(completeScale){
    while (currentDegree <= lastAscending + startingDegree) {
        pushPattern(ascendingPattern, fingersRHAsc, fingersLHAsc, currentDegree);
        currentDegree +=  1;
    }
    currentDegree--;
    while (currentDegree >= lastDescending + startingDegree) {
        pushPattern(descendingPattern, fingersRHDesc, fingersLHDesc, currentDegree);
        currentDegree -= 1;
    }
  }else {
    pushPattern(ascendingPattern, fingersRHAsc, fingersLHAsc, startingDegree);
    pushPattern(ascendingPattern, fingersRHAsc, fingersLHAsc, startingDegree + lastAscending);
    pushPattern(descendingPattern, fingersRHDesc, fingersLHDesc, startingDegree + lastAscending);
    pushPattern(descendingPattern, fingersRHDesc, fingersLHDesc, startingDegree + lastDescending);
  }
    

  function degreeToNoteWithOctave(degree, baseOctave = 4) {
    const octave = Math.floor(degree / 7) + baseOctave;
    const note = scaleNotes[(degree + 7) % 7];
    if (octave < baseOctave) return note + ','.repeat(baseOctave - octave);
    if (octave > baseOctave) return note + "'".repeat(octave - baseOctave);
    return note;
  }

  const rhNotes = rhDegrees.map((d,i) => {
    const fing = rhFingers[i] ? `!${rhFingers[i]}!` : '';
    return fing + degreeToNoteWithOctave(d, baseOctaveRH);
  });
  const lhNotes = lhDegrees.map((d,i) => {
    const fing = lhFingers[i] ? `!${lhFingers[i]}!` : '';
    return fing + degreeToNoteWithOctave(d, baseOctaveLH);
  });

  function notesToString(notes) {
    let str = '';
    for (let i = 0; i < notes.length; i++) {
      str += notes[i] + '';
      if ((i+1) % (notesPerBar / 2) === 0) str = str.trim() + ' ';
      if ((i+1) % notesPerBar === 0) str = str.trim() + ' | ';
      if ((i+1) % (notesPerBar*barsPerLine) === 0) str += '\n';
    }
    return str.trim();
  }

  const rhStr = notesToString(rhNotes);
  const lhStr = notesToString(lhNotes);

  const header = `
X:1
T:Hanon Exercise
M:2/4
L:${L}
K:${key}
V:RH clef=treble
V:LH clef=bass
`;

  return header + 'V:RH\n' + rhStr + '\nV:LH\n' + lhStr;
}