import test from 'tape'
import {
  convertQueryStrToObj,
  convertKebabCaseToCamelCase,
  convertToCurrency,
  checkIsInteger
} from './core'

test('convertQueryStrToObj()', assert => {
  const queryStr = '?pathname=checkout&somethingelse=x'
  const actual = convertQueryStrToObj(queryStr)
  const expected = {
    pathname: 'checkout',
    somethingelse: 'x'
  }

  assert.deepEqual(actual, expected,
    `Given a query string, convertQueryStrToObj() should return an object with each
    query being the key value pair`)

  assert.end()
})

test('convertKebabCaseToCamelCase()', assert => {
  const text = 'some-kind-of-text'
  const actual = convertKebabCaseToCamelCase(text)
  const expected = 'someKindOfText'

  assert.equal(actual, expected,
    `Given kebab cased string, convertKebabCaseToCamelCase() should return a
    camel cased string`)

  const text2 = 'Some-Kind-of-text'
  const actual2 = convertKebabCaseToCamelCase(text2)
  const expected2 = 'someKindOfText'

  assert.equal(actual2, expected2,
    `Given kebab cased string, convertKebabCaseToCamelCase() should return a
    camel cased string`)

  const text3 = 'some'
  const actual3 = convertKebabCaseToCamelCase(text3)
  const expected3 = 'some'

  assert.equal(actual3, expected3,
    `Given any single word, convertKebabCaseToCamelCase() should return the
    original string`)

  assert.end()
})

test('checkIsInteger()', assert => {
  const validValues = [42, '42', 4e2, ' 1 ']
  const invalidValues = ['', ' ', 42.1, '1a', '4e2a', null, undefined, NaN]

  validValues.forEach(value => {
    const actual = checkIsInteger(value)
    const expected = true
    assert.equal(actual, expected,
      `Given a valid integer (either in Number or String type),
      checkIsInteger() should return true`)
  })

  invalidValues.forEach(value => {
    const actual2 = checkIsInteger(value)
    const expected2 = false
    assert.equal(actual2, expected2,
      `Given an invalid integer in any type, checkIsInteger() should return
      true`)
  })

  assert.end()
})
