import { readFileToString } from '../util/file.js'

const file = await readFileToString(import.meta.url, 'input')
const treeGrid: number[][] = file.split('\n').filter(Boolean).map(x => x.split('').map(Number))

const transpose = <T>(a: T[][]) => a[0].map((_, c) => a.map((_, r) => a[r][c]))
const transposedTreeGrid = transpose(treeGrid)

const treeVisibleFromRowEnds = (row: number[], tree: number, treeIndex: number): boolean => {
  return [row.slice(0, treeIndex), row.slice(treeIndex + 1)].some(x => tree > Math.max(...x))
}

// Part 1 Answer
console.log(treeGrid.reduce((acc, row, rowIndex) => {
  return acc + row.reduce((rowAcc, tree, treeIndex) => {
    return (([0, treeGrid.length - 1].includes(rowIndex) || [0, row.length - 1].includes(treeIndex))
      || treeVisibleFromRowEnds(row, tree, treeIndex)
      || treeVisibleFromRowEnds(transposedTreeGrid[treeIndex], tree, rowIndex))
    ? rowAcc + 1
    : rowAcc
  }, 0)
}, 0))

const seriesScore = (treeSeries: number[], index: number): number => {
  const height = treeSeries[index]
  let i = index - 1
  while (i > 0 && treeSeries[i] < height) --i
  let j = index + 1
  while (j < treeSeries.length - 1 && treeSeries[j] < height) ++j
  return (index - i) * (j - index)
}

const treeScenicScore = (row: number, col: number): number => (
  [row, col].includes(0)
    || row === treeGrid.length - 1
    || col === transposedTreeGrid.length - 1
)
  ? 0
  : seriesScore(transposedTreeGrid[col], row) * seriesScore(treeGrid[row], col)

// Part 2 Answer
console.log(treeGrid.reduce((acc, row, i) => row.reduce((rAcc, _, j) => (
  Math.max(treeScenicScore(i, j), rAcc)
), acc), 0))
