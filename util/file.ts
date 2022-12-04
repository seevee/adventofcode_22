import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

export const readFileToString = (metaUrl: string, filename: string): Promise<string> => {
  return readFile(path.dirname(fileURLToPath(metaUrl)) + '/' + filename, 'utf-8')
}
