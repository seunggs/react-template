import R from 'ramda'

export const convertQueryStrToObj = R.curry(queryStr => {
  // i.e. ?pathname=checkout&somethingelse=x
  // returns {pathname: 'checkout', somethingelse: 'x'}
  if (R.isNil(queryStr)) { return }
  return R.compose(R.fromPairs, R.map(R.split('=')), R.split('&'), R.replace('?', ''))(queryStr)
})

// convertKebabCaseToCamelCase :: String -> String
export const convertKebabCaseToCamelCase = R.curry(text => {
  return R.compose(R.join(''), R.adjust(R.toLower, 0), R.join(''), R.unnest, R.map(R.adjust(R.toUpper, 0)), R.split('-'))(text)
})

// convertToCurrency :: String -> Float -> String
export const convertToCurrency = R.curry((currencySymbol, num) => {
  return currencySymbol + (num / 100).toFixed(2)
})

// convertToPercentage :: Integer -> Float -> String
export const convertToPercentage = R.curry((digits, num) => {
  return (num * 100).toFixed(digits) + '%'
})

// checkIsInteger :: * -> Boolean
export const checkIsInteger = R.curry(value => {
  if (isNaN(value)) { return false }
  var x = parseFloat(value)
  return (x | 0) === x
})
