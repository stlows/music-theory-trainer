fretboard.setFretWindow({ start: 0, end: 16 });

selectRandomOptions();

document.addEventListener("keyup", (key) => {
  switch (key.code) {
    case "KeyN":
      selectRandomOptions();
      break;
    case "KeyV":
      drawShape();
      break;
    case "KeyB":
      drawNearestShape();
      break;
  }
});
