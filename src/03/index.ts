import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')

const formattedInput: string[][] = file.split('\n').filter(str => !!str).map(s => s.split(''))

const charPriority = (char: string): number => {
  const charCode: number = char.charCodeAt(0)
  return charCode > 96 ? charCode - 96 : charCode - 38
}

const uniqueCompartments = (rucksack: string[]): [string[], string[]] => {
  const halfway = Math.ceil(rucksack.length / 2)
  return [
    [...new Set(rucksack.slice(0, halfway))],
    [...new Set(rucksack.slice(halfway, rucksack.length))]
  ]
}

const sharedChar = (rucksack: [string[], string[]]): string => {
  for (const i in rucksack[0]) {
    if (rucksack[1].includes(rucksack[0][i]))
      return rucksack[0][i]
  }
  return ''
}

// Part 1 Answer
console.log(formattedInput.reduce((acc, rucksack) => {
  return acc + charPriority(sharedChar(uniqueCompartments(rucksack)))
}, 0))
