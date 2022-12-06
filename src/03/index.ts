import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')
const fileInput: string[][] = file.split('\n').filter(str => !!str).map(s => s.split(''))

type RucksackCompartments = [string[], string[]]
type GroupRucksacks = [string[], string[], string[]]

const charPriority = (char: string): number => {
  const charCode: number = char.charCodeAt(0)
  return charCode > 96 ? charCode - 96 : charCode - 38
}

const uniqueCompartments = (rucksack: string[]): RucksackCompartments => {
  const halfway = Math.ceil(rucksack.length / 2)
  return [
    [...new Set(rucksack.slice(0, halfway))],
    [...new Set(rucksack.slice(halfway, rucksack.length))]
  ]
}

const sharedChar = (rucksacks: RucksackCompartments | GroupRucksacks): string => {
  for (const char of rucksacks[0]) {
    if (rucksacks.slice(1).every(rucksack => rucksack.includes(char)))
      return char
  }
  return ''
}

// Part 1 Answer
console.log(fileInput.reduce((acc, rucksack) => {
  return acc + charPriority(sharedChar(uniqueCompartments(rucksack)))
}, 0))

// Part 2 Answer
console.log(fileInput.reduce((acc, _, i) => {
  if (i % 3 != 0)
    return acc
  return acc + charPriority(sharedChar(fileInput.slice(i, i + 3) as GroupRucksacks))
}, 0))
