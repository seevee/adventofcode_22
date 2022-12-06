import { readFileToString } from '../util/file.js'

type Range = [number, number]
type RangePair = [Range, Range]

const file = await readFileToString(import.meta.url, 'input')
const fileInput: RangePair[] = file
  .split('\n')
  .filter(s => !!s)
  .map(s => s.split(',').map(s => s.split('-').map(x => parseInt(x)) as Range) as RangePair)

// Part 1 Answer
console.log(fileInput.filter((rangePair: RangePair) => {
  return ((
    rangePair[0][0] <= rangePair[1][0] &&
      rangePair[0][1] >= rangePair[1][1]
  ) || (
    rangePair[1][0] <= rangePair[0][0] &&
      rangePair[1][1] >= rangePair[0][1]
  ))
}).length)

// Part 2 Answer
console.log(fileInput.filter((rangePair: RangePair) => {
  return ((
    rangePair[0][0] <= rangePair[1][1] &&
      rangePair[0][1] >= rangePair[1][0]
  ) || (
    rangePair[1][0] <= rangePair[0][1] &&
      rangePair[1][1] >= rangePair[0][0]
  ))
}).length)
