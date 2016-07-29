import R from 'ramda'
import {checkIsInteger, checkIsNotNegative, checkIsPercentage} from '../global/core'

/*
  validatorFunc (i.e. requiredValidator) = val => {
    valid: Boolean,
    errorMsg: String
  }
*/

// validateRequired :: String -> Boolean
const validateRequired = R.curry(val => !R.isEmpty(val))

// getValidateRequiredErrorMsg :: String -> String
const getValidateRequiredErrorMsg = R.curry(val => {
  return validateRequired(val) ? '' : 'Please fill in this field.'
})

// requiredValidator => String -> {*}
export const requiredValidator = R.curry(val => {
  return {
    valid: validateRequired(val),
    errorMsg: getValidateRequiredErrorMsg(val)
  }
})

// validateInteger :: * -> Boolean
const validateInteger = R.curry(val => {
  if (R.isEmpty(val)) { return true }
  return checkIsInteger(val)
})

// getValidateIntegerErrorMsg :: String -> String
const getValidateIntegerErrorMsg = R.curry(val => {
  return validateInteger(val) ? '' : 'Please enter an integer.'
})

// integerValidator => String -> {*}
export const integerValidator = R.curry(val => {
  return {
    valid: validateInteger(val),
    errorMsg: getValidateIntegerErrorMsg(val)
  }
})

// validateNumber :: String -> Boolean
const validateNumber = R.complement(isNaN)

// getValidateNumberErrorMsg :: String -> String
const getValidateNumberErrorMsg = R.curry(val => {
  return validateNumber(val) ? '' : 'Please enter a valid number.'
})

// numberValidator => String -> {*}
export const numberValidator = R.curry(val => {
  return {
    valid: validateNumber(val),
    errorMsg: getValidateNumberErrorMsg(val)
  }
})

// validateRange :: String -> [Integer] -> Boolean
const validateRange = R.curry((range, val) => {
  return (val >= R.head(range)) && (val <= R.last(range))
})

// getValidateRangeErrorMsg :: String -> [Integer] -> {*}
const getValidateRangeErrorMsg = R.curry((range, val) => {
  const min = R.head(range)
  const max = R.last(range)
  if (max === Infinity) {
    return validateRange(range, val) ? '' : `Please enter a value greater than ${min}.`
  } else {
    return validateRange(range, val) ? '' : `Please enter a value between ${min} and ${max}.`
  }
})

// rangeValidator => String -> [Integer] -> {*}
export const rangeValidator = R.curry((range, val) => {
  return {
    valid: validateRange(range, val),
    errorMsg: getValidateRangeErrorMsg(range, val)
  }
})

// dailyBudgetValidator => String -> {*}
export const dailyBudgetValidator = R.curry(val => {
  return {
    valid: checkIsNotNegative(val),
    errorMsg: checkIsNotNegative(val) ? '' : 'Please enter numbers only. Minimum is "0".'
  }
})

// maxBidValidator => String -> {*}
export const maxBidValidator = R.curry(val => {
  return {
    valid: checkIsPercentage(val) && val >= 1,
    errorMsg: (checkIsPercentage(val) && val >= 1) ? '' : 'Please enter numbers only. Minimum is "1" for one percent.'
  }
})
