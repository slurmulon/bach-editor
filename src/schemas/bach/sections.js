import { Sections, MUSICAL_ELEMENTS } from 'bach-js'
import { fail } from '@/use/notify'

export function validate (bach) {
  const sections = new Sections(bach)

  for (const rule of rules) {
    const valid = rule.validator(sections)

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
    validator: sections => sections.musical
  },
  {
    ref: 'usable',
    message: 'Unsupported scale or chord type',
    validator: sections => {
      try {
        return !!sections.all
      } catch (e) {
        return false
      }
    }
  }
]

