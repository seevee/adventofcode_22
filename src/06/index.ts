import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')
const fileInput: string[] = file.split('\n').filter(Boolean)[0].split('')

const processChars = (chars: string[], numDistinct: number) => {
  for (let i = numDistinct; i <= chars.length; i++) {
    const marker = chars.slice(i - numDistinct, i)
    if ([...new Set(marker)].length === marker.length) return i
  }
}

// Part 1 Answer
console.log(processChars(fileInput, 4))

// Part 2 Answer
console.log(processChars(fileInput, 14))
