import { compose, Music, MUSICAL_ELEMENTS } from 'bach-js'
import { fail } from '@/use/notify'

export function playable (bach) {
  const music = new Music(bach)

  for (const rule of rules) {
    const valid = rule.validator(music)

    if (!valid) {
      const message = rule.message(music)

      fail({ text: message, timeout: -1 })
      // fail(message)

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
    ref: 'parses',
    validator: bach => bach.parses,
    message: ({ data }) => {
      const reasons = data.reason.slice(0, Math.min(3, data.reason.length))
      const expecting = reasons.map(r => `<li>${r.expecting}</li>`)
      const text = 
        `<p><b>Invalid syntax</b></p>
        Line: ${data.line}<br/>
        Column: ${data.column}<br/>
        Expecting: <ul>${expecting.join('')}</ul>`

      return text
    }
  },
  {
    ref: 'musical',
    message: () => `Each beat must contain at least one musical element (${required.parts.join(', ')})`,
    // FIXME (in bach-js)
    // validator: bach => bach.musical
    validator: bach => true
  },
  {
    ref: 'usable',
    message: () => 'Unsupported scale or chord type',
    validator: bach => {
      try {
        return bach.elements.every(({ notes }) => !!notes.length)
      } catch (e) {
        return false
      }
    }
  }
]

