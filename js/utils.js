function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}

function chooseOne(list) {
  return list[random(list.length)]
}