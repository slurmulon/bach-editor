/* eslint-disable */

import Prism from 'prismjs'

const name = new RegExp(/[a-zA-Z_]+[a-zA-Z0-9_-]*/)
const number = new RegExp(/[0-9]\d*(\.\d+)?/)

Prism.languages.bach = {
  'header': {
    pattern: /@\w+/,
    lookbehind: true,
    alias: 'keyword'
    // alias: ['tag', 'bold']
    // alias: ['bold', 'namespace']
  },
  'constant': {
    pattern: /(^|[^:]):\S+/,
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
  // name,
  'play': {
    pattern: /play!/i,
    lookahead: true
  },
  // 'builtin': /\!Play/i,
  'boolean': /\b(?:true|false)\b/,
  'operator': /[-+%=]|\/|\*|\||!|[->]|of|do|when/,
  'punctuation': {
    pattern: /[{}[\](),.:]/,
    greedy: false
  },
  'duration': {
    pattern: /\b(?:bar|2n|4n|8n|16n|32n|64n|128n256n)\b/,
    greedy: false,
    alias: 'number'
  },
  'match': {
    pattern: /(?:(?:even|odd|last|first|gte|gt|lte|lt)\?)/,
    greedy: false,
    alias: 'operator'
  },
  'comment': {
    pattern: /#{2}(.+)/,
    greedy: true
  }
}
