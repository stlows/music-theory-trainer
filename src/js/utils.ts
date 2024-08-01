function random(max: number, min: number = 0): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function chooseOne<T>(list: Array<T>): T {
  return list[random(list.length)];
}
