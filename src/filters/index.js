import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import numeral from 'numeral'
import Fraction from 'fraction.js'

dayjs.extend(relativeTime)

export const numberless = text => {
  if (!text) return text

  return text.replace(/[0-9]+$/, '')
}

export const fractionize = text => {
  if (!text) return text

  return new Fraction(text).toFraction(true).replace(/\s/, ' + ')
}

export const meter = value => {
  if (!value) return value

  return Array.isArray(value) ? `${value[0]} | ${value[1]}` : '-'
}

export const round = value => !isNaN(value) ? value.toFixed(2) : value

export const when = value => {
  if (!value) return value

  return dayjs(value).fromNow()
}

export const numeric = value => numeral(value).format('0,0[.][000]')
