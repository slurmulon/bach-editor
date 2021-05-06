import { Music, MUSICAL_ELEMENTS } from 'bach-js'
import { fail } from '@/use/notify'

export function playable (bach) {
  const music = new Music(bach)

  for (const rule of rules) {
    const valid = rule.validator(music)

    if (!valid) {
      fail({ text: rule.message, timeout: 5000 })

      return false
    }
  }

  return true
}

export const required = {
  parts: MUSICAL_ELEMENTS
}

export const rules = [
  {
    ref: 'musical',
    message: `Each beat must contain at least one musical element (${required.parts.join(', ')})`,
    // FIXME (in bach-js)
    // validator: bach => bach.musical
    validator: bach => true
  },
  {
    ref: 'usable',
    message: 'Unsupported scale or chord type',
    validator: bach => {
      try {
        return bach.elements.every(({ notes }) => !!notes.length)
      } catch (e) {
        return false
      }
    }
  }
]

