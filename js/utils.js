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

function flipArray(arr){
  return arr.slice().reverse()
}

function sum(array){
  return array.reduce((a, b) => a + b, 0)
}

function cumulativeDistribution(splitCount, dy){
  if(dy > 1/ splitCount){
    throw new Error(`dy ${dy} too big for the given splitCount ${splitCount}.`)
  }
  let n = (splitCount - 1) * splitCount / 2
  let h = 1 /(splitCount - n * dy)
  let density = []
  let sum = 0
  for(let i = 0; i < splitCount; i++){
    let prorata = 1- i * dy
    sum += h * prorata
    density.push(sum)
  }
  return density
}


/**
 * Build a mean-reverting cumulative distribution over discrete values [-maxGap..maxGap].
 *
 * @param {number} maxGap            - The symmetric range limit (e.g. 2 -> values: -2,-1,0,1,2).
 * @param {number} currentValue      - The current position; clamped and rounded to the grid.
 * @param {Object} [opts]
 * @param {number} [opts.centralRate=0.4]     - Strength of pull toward 0 (scales with |currentValue|).
 * @param {number} [opts.directionalRate=0.8] - Bias opposite the current sign (mean reversion direction).
 * @param {number} [opts.power=2]             - Centralization exponent (2 = quadratic; larger => stronger center pull).
 * @returns {{values:number[], probs:number[], cdf:number[]}}
 *          values: the discrete support, probs: normalized probabilities, cdf: cumulative distribution
 */
function buildMeanRevertingCDF(maxGap, currentValue, opts = {}) {
  const {
    centralRate = 0.4,
    directionalRate = 0.8,
    power = 2,
  } = opts;

  // Validate and construct the discrete support
  const m = Math.max(0, Math.floor(Number(maxGap)));
  if (!Number.isFinite(m) || m < 0) {
    throw new Error("maxGap must be a finite non-negative integer.");
  }
  const values = Array.from({ length: 2 * m + 1 }, (_, i) => i - m); // [-m..m]

  // Clamp and snap current to the grid for consistent behavior
  const c = Math.max(-m, Math.min(m, Math.round(Number(currentValue) || 0)));
  const absC = Math.abs(c);

  // Score model (log-weights):
  //   score(v) = - [ centralRate * |c| * |v|^power + directionalRate * c * v ]
  // - The first term concentrates mass toward 0; it grows with |c| (farther current => stronger pull).
  // - The second term penalizes values with the same sign as current (push back toward opposite sign).
  const scores = values.map((v) => {
    const dist0 = Math.abs(v);
    const centralTerm = centralRate * absC * Math.pow(dist0, power);
    const directionalTerm = directionalRate * c * v;
    return - (centralTerm + directionalTerm);
  });

  // Numerically stable exponentiation
  const maxScore = Math.max(...scores);
  const weights = scores.map(s => Math.exp(s - maxScore));

  const total = weights.reduce((acc, w) => acc + w, 0);
  if (!isFinite(total) || total <= 0) {
    throw new Error("Invalid weight total; check inputs or parameters.");
  }

  // Normalize to probabilities
  const probs = weights.map(w => w / total);

  // Build cumulative distribution (ascending order of 'values')
  const cdf = [];
  let cum = 0;
  for (let i = 0; i < probs.length; i++) {
    cum += probs[i];
    cdf.push(cum);
  }
  // Guard: exact 1 at the end (avoid floating-point drift)
  cdf[cdf.length - 1] = 1;

  return { values, probs, cdf };
}
``
