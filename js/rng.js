class SeededRandom {
  constructor(seed) {
    this.seed = seed % 2147483647; // Ensure seed is within a reasonable range
    if (this.seed <= 0) this.seed += 2147483646; // Handle non-positive seeds
  }

  next() {
    this.seed = (this.seed * 16807) % 2147483647; // LCG formula
    return (this.seed - 1) / 2147483646; // Normalize to a value between 0 and 1
  }

  int(max, min = 0) {
    return Math.floor(this.next() * (max - min)) + min
 }

 chooseOne(list) {
  return list[this.int(list.length)]
}
}