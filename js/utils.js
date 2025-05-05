function random(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}

function chooseOne(list) {
  return list[random(list.length)]
}

function rotateArray(arr, times) {
  const len = arr.length
  const shift = times % len
  return arr.slice(shift).concat(arr.slice(0, shift))
}