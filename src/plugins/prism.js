/* eslint-disable */

import Prism from 'prismjs'

const name = new RegExp(/[a-zA-Z_]+[a-zA-Z0-9_-]*/)
const number = new RegExp(/[0-9]\d*(\.\d+)?/)

Prism.languages.bach = {
  // 'header': {
  //   pattern: /@\w+/,
  //   lookbehind: true,
  //   // alias: 'attr-value'
  //   // alias: ['tag', 'bold']
  //   alias: ['bold', 'namespace']
  // },
  'constant': {
    pattern: /(^|[^:]):\w+/,
    lookbehind: true,
    alias: 'variable'
  },
  'attribute': {
    pattern: /\w+(^|[^:]):/,
    lookbehind: true
  },
  // 'element': {
  //   pattern: /\w+\(/,
  //   lookbehind: true,
  //   alias: 'entity'
  // },
  'string': {
    pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: true
  },
  number,
  //name,
  'play': {
    pattern: /!Play/i,
    lookahead: true
  },
  // 'builtin': /\!Play/i,
  'boolean': /\b(?:true|false)\b/,
  'operator': /[-+%=]|\/|\*|\||[->]|@/,
  'punctuation': {
    pattern: /[{}[\](),.:]/,
    greedy: false
  }
}
