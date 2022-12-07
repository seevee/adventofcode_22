import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')

type TheirChar = 'A' | 'B' | 'C'
type OurChar = 'X' | 'Y' | 'Z'
type InputChar = TheirChar | OurChar
type RoundTuple = [TheirChar, OurChar]

const formattedInput: RoundTuple[] = file
  .split('\n')
  .filter(Boolean)
  .map(r => r.split(' ') as RoundTuple)

const rpsMap1: Record<InputChar, number> = {
  // theirs
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  // ours
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
}

const roundResult = (theirs: number, ours: number): [number, number] => {
  let t = theirs
  let o = ours
  const diff = theirs - ours
  if ([-1, 2].includes(diff)) {
    o += 6
  } else if ([1, -2].includes(diff)) {
    t += 6
  } else {
    t += 3
    o += 3
  }
  return [t, o]
}

const results = formattedInput.reduce((acc, round) => roundResult(
  rpsMap1[round[0]],
  rpsMap1[round[1]]
).map((n, i) => n + acc[i]), [0, 0])

// Part 1 Answer
console.log(results[1])

const rpsMap: Record<InputChar, number> = {
  // theirs, zero-indexed for modulo 3 in getChoice
  A: 0, // rock
  B: 1, // paper
  C: 2, // scissors
  // ours - theirs result
  X: 2, // lose
  Y: 0, // draw
  Z: 1, // win
}

const getChoice = (theirs: TheirChar, result: OurChar): number => {
  return (rpsMap[theirs] + rpsMap[result]) % 3 + 1
}

const results2 = formattedInput.reduce((acc, round) => roundResult(
  rpsMap[round[0]] + 1,
  getChoice(...round)
).map((n, i) => n + acc[i]), [0, 0])

// Part 2 Answer
console.log(results2[1])
