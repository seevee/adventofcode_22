import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')

const elfInventorySums = file.split('\n\n').map((inventory: string) => {
  return inventory.split('\n').reduce((acc, item) => acc + parseInt(item), 0)
}).filter((n: number): n is number => !!n)

// Part 1 Answer
console.log(Math.max(...elfInventorySums))

// Part 2 Answer
console.log(
  elfInventorySums
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, inv) => acc + inv, 0)
)
