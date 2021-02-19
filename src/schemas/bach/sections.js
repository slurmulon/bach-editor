import { Sections } from 'bach-js'
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
  parts: ['note', 'chord', 'scale']
}

export const rules = [
  {
    ref: 'musical',
    message: `Playback requires every beat to contain at least one musical element (${required.parts.join(', ')})`,
    validator: sections => sections.musical,
  }
]

