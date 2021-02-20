import Fraction from 'fraction.js'

export const numberless = text => {
  if (!text) return text

  return text.replace(/[0-9]+$/, '')
}

export const fractionize = text => {
  if (!text) return text

  return new Fraction(text).toFraction(true).replace(/\s/, ' + ')
}

export const round = value => !isNaN(value) ? value.toFixed(2) : value