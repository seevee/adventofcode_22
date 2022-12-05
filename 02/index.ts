import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')

const formattedInput: string[][] = file.split('\n').filter(str => !!str).map(r => r.split(' '))

const rpsMap1 = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
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

const results = formattedInput.reduce((acc, round) => {
  const theirs = rpsMap1[round[0]]
  const ours = rpsMap1[round[1]]
  return roundResult(theirs, ours).map((n, i) => n + acc[i])
}, [0, 0])

// Part 1 Answer
console.log(results[1])

const rpsMap = {
  A: 0,
  B: 1,
  C: 2,
}

const resultMap = {
  X: 2,
  Y: 0,
  Z: 1,
}

const getChoice = (theirs: string, result: string) => {
  return (rpsMap[theirs] + resultMap[result]) % 3 + 1
}

const results2 = formattedInput.reduce((acc, round) => {
  const theirs = rpsMap[round[0]] +1
  const ours = getChoice(round[0], round[1])
  return roundResult(theirs, ours).map((n, i) => n + acc[i])
}, [0, 0])

// Part 2 Answer
console.log(results2[1])
