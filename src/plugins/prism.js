/* eslint-disable */

import Prism from 'prismjs'

const name = new RegExp(/[a-zA-Z_]+[a-zA-Z0-9_-]*/)
const number = new RegExp(/^[0-9]\d*(\.\d+)?/)

Prism.languages.bach = {
  'header': {
    pattern: /@\w+/,
    lookbehind: true,
    alias: 'meta'
  },
  'constant': {
    pattern: /(^|[^:]):\w+/,
    lookbehind: true,
    alias: 'variable'
  },
  'attribute': {
    pattern: /\w+(^|[^:]):/,
    lookbehind: true
  },
  'element': {
    pattern: /\w+\(/,
    lookbehind: true,
    alias: 'atom'
  },
  number,
  name,
  'play': /\!Play/i,
  'boolean': /\b(?:true|false)\b/,
  'operator': /[-+%=]|\/|\*|\||->/,
  'punctuation': /[{}[\](),.:]/
}
