import { readFileToString } from '../util/file.js'

type Range = [number, number] // first minimum, second maximum
type RangePair = [Range, Range]

const file = await readFileToString(import.meta.url, 'input')
const fileInput: RangePair[] = file
  .split('\n')
  .filter(s => !!s)
  .map(s => s.split(',').map(s => s.split('-').map(Number)) as RangePair)

const rangesContained = (pair: RangePair) => ((
  pair[0][0] <= pair[1][0] && pair[0][1] >= pair[1][1]
) || (
  pair[1][0] <= pair[0][0] && pair[1][1] >= pair[0][1]
))

// Part 1 Answer
console.log(fileInput.filter(rangesContained).length)

const rangesOverlap = (pair: RangePair) => (
  pair[0][0] <= pair[1][1] && pair[0][1] >= pair[1][0]
)

// Part 2 Answer
console.log(fileInput.filter(rangesOverlap).length)
