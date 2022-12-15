import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')

type InputCd = [ '$', string, string ]
type InputLs = [ '$', string ]
type InputCommand = InputCd | InputLs
type InputFile = [ number, string ]
type InputDirectory = [ 'dir', string ]
type InputRow = InputCommand | InputFile | InputDirectory

// this could theoretically break down if a file was named 'size'
interface Directory {
  [key: string]: Directory | number
  size: number
}

const fileInput: InputRow[] = file.split('\n').filter(Boolean).map(x => x.split(' ') as InputRow)

const isInputCommand = (x: InputRow): x is InputCommand => {
  return (x as InputCommand)[0] === '$'
}

const isInputCd = (x: InputCommand): x is InputCd => {
  return typeof (x as InputCd)[2] === 'string'
}

const isInputFile = (x: InputRow): x is InputFile => {
  return (x as InputFile)[0] - 0 > 0
}

const isInputDirectory = (x: InputRow): x is InputDirectory => {
  return (x as InputDirectory)[0] === 'dir'
}

const isDirectory = (x: Directory | number): x is Directory => {
  return typeof (x as Directory).size === 'number'
}

const getDirectoryRef = (rootDir: Directory, workDir: string[]): Directory => {
  return workDir.reduce((acc, dir) => acc[dir] as Directory, rootDir)
}

const readInputDir = (input: InputRow[]) => input.reduce((acc, row) => {
  if (isInputCommand(row)) {
    if (isInputCd(row)) {
      if (row[2] === '/') return acc
      if (row[2] === '..') {
        const dirSize = getDirectoryRef(...acc).size
        acc[1].pop()
        getDirectoryRef(...acc).size += dirSize
        return acc
      }
      acc[1].push(row[2])
    }
  } else if (isInputDirectory(row)) {
    getDirectoryRef(...acc)[row[1]] = {size: 0}
  } else if (isInputFile(row)) {
    getDirectoryRef(...acc).size += Number(row[0])
    getDirectoryRef(...acc)[row[1]] = Number(row[0])
  }
  return acc
}, [{size: 0}, []] as [Directory, string[]])

// cleans up final directory size totals due to lack of cd back to root
const completeRootSums = (rootDir: Directory, workDir: string[]): Directory => {
  for (let i = workDir.length; i > 0; i--) {
    getDirectoryRef(rootDir, workDir.slice(0, i - 1)).size +=
      getDirectoryRef(rootDir, workDir.slice(0, i)).size
  }
  return rootDir
}

const dirsBelowSize = (rootDir: Directory, maxSize: number): Directory[] => {
  const dirs = rootDir.size <= maxSize ? [rootDir] : []
  Object.keys(rootDir).forEach(key => {
    if (isDirectory(rootDir[key])) {
      dirs.push(...dirsBelowSize(rootDir[key] as Directory, maxSize))
    }
  })
  return dirs
}

// Part 1 Answer
console.log(dirsBelowSize(completeRootSums(...readInputDir(fileInput)), 100000)
            .map(x => x.size)
            .reduce((a,b) => a + b))

const TOTAL_DISK_SPACE = 70000000
const FREE_SPACE_REQ = 30000000

const dirTree = completeRootSums(...readInputDir(fileInput))

const spaceToDelete = FREE_SPACE_REQ - (TOTAL_DISK_SPACE - dirTree.size)

const flattenDirectorySizes = (rootDir: Directory): number[] => {
  const dirs = [rootDir.size]
  Object.keys(rootDir).forEach(key => {
    if (isDirectory(rootDir[key])) {
      dirs.push(...flattenDirectorySizes(rootDir[key] as Directory))
    }
  })
  return dirs
}

// Part 2 Answer
console.log(Math.min(
  ...flattenDirectorySizes(completeRootSums(...readInputDir(fileInput)))
  .filter(x => x > spaceToDelete)
))

