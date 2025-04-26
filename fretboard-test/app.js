selectRandomOptions();

document.addEventListener("keyup", (key) => {
  switch (key.code) {
    case "Space":
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
