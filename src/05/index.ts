import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')
const fileInput: string[] = file.split('\n')

type CrateStacks = string[][]
type CrateMove = [number, number, number]

// rows 1-8 are initial crate stacks
const crateStacks: CrateStacks = fileInput.slice(0,8).reduce((acc, row) => {
  row.split('').forEach((char, i) => {
    if (i % 4 === 1 && char !== ' ') {
      acc[Math.floor(i / 4)].unshift(char)
    }
  })
  return acc
}, Array.from(Array(9), () => [] as string[]))

// rows 11+ are moves
const crateMoves: CrateMove[] = fileInput.slice(10).reduce((acc, row) => {
  const m = row.match(/\d+/g)
  if (m && m.length === 3)
    acc.push(m.map(Number) as CrateMove)
  return acc
}, [] as CrateMove[])

// apply CrateMover 9000 move operations to stacks
const partOneCrateStacks: CrateStacks = crateMoves.reduce((acc, move) => {
  for (let i = 0; i < move[0]; i++) {
    acc[move[2] - 1].push(acc[move[1] - 1].pop() as string)
  }
  return acc
}, crateStacks.map(s => [...s]))

// Part 1 Answer
console.log(partOneCrateStacks.map(x => x.slice(-1)).join(''))

// apply CrateMover 9001 move operations to stacks
const partTwoCrateStacks: CrateStacks = crateMoves.reduce((acc, move) => {
  acc[move[2] - 1].push(...acc[move[1] - 1].splice(-move[0]))
  return acc
}, crateStacks.map(s => [...s]))

// Part 2 Answer
console.log(partTwoCrateStacks.map(x => x.slice(-1)).join(''))
