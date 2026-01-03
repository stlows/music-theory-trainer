class SeededRandom {
  constructor(seed) {
    this.seed = seed % 2147483647 // Ensure seed is within a reasonable range
    if (this.seed <= 0) this.seed += 2147483646 // Handle non-positive seeds
  }

  next() {
    this.seed = (this.seed * 16807) % 2147483647 // LCG formula
    return (this.seed - 1) / 2147483646 // Normalize to a value between 0 and 1
  }

  // max exclus, min inclus
  int(max, min = 0) {
    return Math.floor(this.next() * (max - min)) + min
  }

  chooseOne(list) {
    return list[this.int(list.length)]
  }

  chooseOneWithAttraction(list, current)
  {
    if(Math.abs(cumulativeDistribution.at(-1) - 1) > 0.00001){
      throw new Error("Cumulative distribution function must end with 1. Found " + cumulativeDistribution.at(-1) )
    }
    if(cumulativeDistribution.length !== list.length){
      throw new Error("Cumulative distribution function length must match list length.")
    }
    const nextValue = this.next()
    for(let i = 0; i < cumulativeDistribution.length; i++){
      if(nextValue < cumulativeDistribution[i]){
        return list[i]
      }
    }
    throw new Error("Cumulative distribution function over and no value returned.")

  }
}