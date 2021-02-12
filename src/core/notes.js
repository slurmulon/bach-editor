// @source: https://github.com/sustained/sforzando/blob/master/src/library/music.js

import { note, transpose } from '@tonaljs/tonal'
import { enharmonic } from '@tonaljs/note'

// export const all = expand('A0', 'C8')
// export const all = expand('A0', 'C6')
export const all = expand('A0', 'C4')

export function expand (from, to) {
  let fromNote = note(from)
  const toNote = note(to)

  if (fromNote.height >= toNote.height) {
    throw new Error('Reverse ranges are not yet implemented.')
  }

  if (fromNote.acc === 'b') {
    fromNote = note(enharmonic(fromNote))
  }

  const range = []

  for (let i = 0, l = toNote.height - fromNote.height, currNote = fromNote; i < l; i++) {
    range.push(currNote)
    currNote = note(enharmonic(transpose(currNote, 'm2')))
  }

  return range
}
