import test from 'tape'
import {
  requiredValidator,
  integerValidator,
  rangeValidator,
  dailyBudgetValidator,
  maxBidValidator
} from './core'

test('requiredValidator()', assert => {
  const inputValue = 'non-empty value'
  const actual = requiredValidator(inputValue)
  const expected = {valid: true, errorMsg: ''}

  assert.deepEqual(actual, expected,
    `requiredValidator() should return {valid: true, errorMsg: ''} if the
    given value is not empty`)

  const inputValue2 = ''
  const actual2 = requiredValidator(inputValue2)
  const expected2 = {valid: false, errorMsg: 'Please fill in this field.'}

  assert.deepEqual(actual2, expected2,
    `requiredValidator() should return {valid: false, errorMsg: 'This field
    is required.'} if the given value is empty`)

  assert.end()
})

test('integerValidator()', assert => {
  const inputValue = 2
  const actual = integerValidator(inputValue)
  const expected = {valid: true, errorMsg: ''}

  assert.deepEqual(actual, expected,
    `integerValidator() should return {valid: true, errorMsg: ''} if the
    given value is a valid integer`)

  const inputValue2 = '2'
  const actual2 = integerValidator(inputValue2)
  const expected2 = {valid: true, errorMsg: ''}

  assert.deepEqual(actual2, expected2,
    `integerValidator() should return {valid: true, errorMsg: ''} if the
    given value is a valid integer even in a string type`)

  const inputValue3 = 'blah'
  const actual3 = integerValidator(inputValue3)
  const expected3 = {valid: false, errorMsg: 'Please enter an integer.'}

  assert.deepEqual(actual3, expected3,
    `integerValidator() should return {valid: false, errorMsg: 'The value must
    be an integer.'} if the given value is not a valid integer`)

  assert.end()
})

test('rangeValidator()', assert => {
  const range = [1, 10]
  const inputValue = 5
  const actual = rangeValidator(range, inputValue)
  const expected = {valid: true, errorMsg: ''}

  assert.deepEqual(actual, expected,
    `rangeValidator() should return {valid: true, errorMsg: ''} if the
    given value is within a given range`)

  const range2 = [0, 10]
  const inputValue2 = '5'
  const actual2 = rangeValidator(range2, inputValue2)
  const expected2 = {valid: true, errorMsg: ''}

  assert.deepEqual(actual2, expected2,
    `rangeValidator() should return {valid: true, errorMsg: ''} if the
    given value is within a given range even in a string type`)

  const range3 = [0, 10]
  const inputValue3 = 11
  const actual3 = rangeValidator(range3, inputValue3)
  const expected3 = {valid: false, errorMsg: 'Please enter a value between 0 and 10.'}

  assert.deepEqual(actual3, expected3,
    `rangeValidator() should return {valid: false, errorMsg: 'The value must be
    between [min] and [max].'} if the given value is not within a defined range.`)

  const range4 = [0, Infinity]
  const inputValue4 = -2
  const actual4 = rangeValidator(range4, inputValue4)
  const expected4 = {valid: false, errorMsg: 'Please enter a value greater than 0.'}

  assert.deepEqual(actual4, expected4,
    `rangeValidator() should return {valid: false, errorMsg: 'The value must be
    greater than [min]'} if the max range is Infinity and the given value is
    not within the range.`)

  assert.end()
})

test('dailyBudgetValidator()', assert => {
  const inputValue = 100
  const actual = dailyBudgetValidator(inputValue)
  const expected = {valid: true, errorMsg: ''}

  assert.deepEqual(actual, expected,
    `dailyBudgetValidator() should return {valid: true, errorMsg: ''} if the
    given value is a valid number`)

  const inputValue2 = '200'
  const actual2 = dailyBudgetValidator(inputValue2)
  const expected2 = {valid: true, errorMsg: ''}

  assert.deepEqual(actual2, expected2,
    `dailyBudgetValidator() should return {valid: true, errorMsg: ''} if the
    given value is a valid number even in a string type`)

  const inputValue3 = 0
  const actual3 = dailyBudgetValidator(inputValue3)
  const expected3 = {valid: true, errorMsg: ''}

  assert.deepEqual(actual3, expected3,
    `dailyBudgetValidator() should return {valid: true, errorMsg: ''} if the
    given value is zero`)

  const inputValue4 = 'blah'
  const actual4 = dailyBudgetValidator(inputValue4)
  const expected4 = {valid: false, errorMsg: 'Please enter numbers only. Minimum is "0".'}

  assert.deepEqual(actual4, expected4,
    `dailyBudgetValidator() should return {valid: false, errorMsg: 'Please enter
    numbers only. Minimum is "0".'} if the given value is not a valid number`)

  const inputValue5 = '-5'
  const actual5 = dailyBudgetValidator(inputValue5)
  const expected5 = {valid: false, errorMsg: 'Please enter numbers only. Minimum is "0".'}

  assert.deepEqual(actual5, expected5,
    `dailyBudgetValidator() should return {valid: false, errorMsg: 'Please enter
    numbers only. Minimum is "0".'} if the given value is not a non-negative
    number`)

  assert.end()
})

test('maxBidValidator()', assert => {
  const inputValue = 5
  const actual = maxBidValidator(inputValue)
  const expected = {valid: true, errorMsg: ''}

  assert.deepEqual(actual, expected,
    `maxBidValidator() should return {valid: true, errorMsg: ''} if the
    given value is a valid number`)

  const inputValue2 = '5'
  const actual2 = maxBidValidator(inputValue2)
  const expected2 = {valid: true, errorMsg: ''}

  assert.deepEqual(actual2, expected2,
    `maxBidValidator() should return {valid: true, errorMsg: ''} if the
    given value is a valid number even in a string type`)

  const inputValue3 = 'blah'
  const actual3 = maxBidValidator(inputValue3)
  const expected3 = {valid: false, errorMsg: 'Please enter numbers only. Minimum is "1" for one percent.'}

  assert.deepEqual(actual3, expected3,
    `maxBidValidator() should return {valid: false, errorMsg: 'Please enter
    numbers only. Minimum is "1" for one percent.'} if the given value is not
    a valid number`)

  const inputValue4 = '101'
  const actual4 = maxBidValidator(inputValue4)
  const expected4 = {valid: false, errorMsg: 'Please enter numbers only. Minimum is "1" for one percent.'}

  assert.deepEqual(actual4, expected4,
    `maxBidValidator() should return {valid: false, errorMsg: 'Please enter
    numbers only. Minimum is "1" for one percent.'} if the given value is
    greater than 100`)

  const inputValue5 = '0'
  const actual5 = maxBidValidator(inputValue5)
  const expected5 = {valid: false, errorMsg: 'Please enter numbers only. Minimum is "1" for one percent.'}

  assert.deepEqual(actual5, expected5,
    `maxBidValidator() should return {valid: false, errorMsg: 'Please enter
    numbers only. Minimum is "1" for one percent.'} if the given value is less
    than 1`)

  assert.end()
})
