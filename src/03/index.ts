import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')

const formattedInput: string[][] = file.split('\n').filter(str => !!str).map(s => s.split(''))

const charPriority = (char: string): number => {
  const charCode: number = char.charCodeAt(0)
  return charCode > 96 ? charCode - 96 : charCode - 38
}

type RucksackCompartments = [string[], string[]]

const uniqueCompartments = (rucksack: string[]): RucksackCompartments => {
  const halfway = Math.ceil(rucksack.length / 2)
  return [
    [...new Set(rucksack.slice(0, halfway))],
    [...new Set(rucksack.slice(halfway, rucksack.length))]
  ]
}

const sharedChar = (rucksack: RucksackCompartments): string => {
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

type GroupRucksacks = [string[], string[], string[]]

const groupSharedChar = (group: GroupRucksacks): string => {
  for (const i in group[0]) {
    if ([group[1], group[2]].every(rucksack => rucksack.includes(group[0][i])))
      return group[0][i]
  }
  return ''
}

// Part 2 Answer
console.log(formattedInput.reduce((acc, _, i) => {
  if (i % 3 != 0)
    return acc
  return acc + charPriority(groupSharedChar(formattedInput.slice(i, i + 3) as GroupRucksacks))
}, 0))
