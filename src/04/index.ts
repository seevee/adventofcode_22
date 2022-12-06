import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')
const fileInput: string[][] = file.split('\n').filter(str => !!str).map(s => s.split(''))
