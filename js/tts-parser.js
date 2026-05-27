function noteToSpeech(note, lang = 'fr') {

  const base = note[0]

  let result = wordLetter[base]

  if (!result) return note

  if (note.includes('♯♯') || note.includes('##') || note.includes('♭♭') || note.includes('bb')) {
    result += ' double '
  }

  if (note.includes('♯') || note.includes('#')) {
    result += ' dièse'
  }

  if (note.includes('♭') || note.includes('b')) {
    result += ' bémol'
  }

  if (note.includes('m')) {
    result += " mineur"
  }

  return result
}

function romanToSpeech(roman) {
  return {
    "I": "un",
    "ii": "deux",
    "iii": "trois",
    "IV": "quatre",
    "V": "cinq",
    "vi": "six"
  }[roman]
}