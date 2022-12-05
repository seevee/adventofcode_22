import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')

const RPS = {
  A: 1, // rock
  B: 2, // paper
  C: 3, // scissors
  X: 1, // rock
  Y: 2, // paper
  Z: 3, // scissors
}

const results = file.split('\n').filter(str => !!str).reduce((acc, round) => {
  const rArr = round.split(' ')
  const theirs = RPS[rArr[0]]
  const ours = RPS[rArr[1]]
  acc[0] += theirs
  acc[1] += ours
  switch (theirs - ours) {
    case 0:
      acc[0] += 3
      acc[1] += 3
      break
    case 1:
    case -2:
      acc[0] += 6
      break
    case -1:
    case 2:
      acc[1] += 6
      break
  }
  return acc
}, [0, 0])

// Part 1 Answer
console.log(results[1])
