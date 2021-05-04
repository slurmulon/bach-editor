// TODO: Rename to bach/music.js

import { Music, MUSICAL_ELEMENTS } from 'bach-js'
import { fail } from '@/use/notify'

export function validate (bach) {
  const music = new Music(bach)

  console.log('das music!', music)

  // for (const rule of rules) {
  //   const valid = rule.validator(music)

  //   if (!valid) {
  //     fail({ text: rule.message, timeout: 5000 })

  //     return false
  //   }
  // }

  return true
}

export const required = {
  parts: MUSICAL_ELEMENTS
}

export const rules = [
  {
    ref: 'musical',
    message: `Each beat must contain at least one musical element (${required.parts.join(', ')})`,
    validator: bach => bach.musical
  },
  {
    ref: 'usable',
    message: 'Unsupported scale or chord type',
    validator: sections => {
      try {
        // TODO: Redo
        // return !!sections.all
        return true
      } catch (e) {
        return false
      }
    }
  }
]

