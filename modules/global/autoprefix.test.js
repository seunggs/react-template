import test from 'tape'
import {autoprefix} from './autoprefix'

test('autoprefix()', assert => {
  const style = {
    transform: 'translateX(100px) scale(1)',
    display: 'none'
  }
  const actual = autoprefix(style)
  const expected = {
    display: 'none',
    msTransform: 'translateX(100px) scale(1)',
    WebkitTransform: 'translateX(100px) scale(1)',
    transform: 'translateX(100px) scale(1)'
  }

  assert.deepEqual(actual, expected,
    `Given a style object, autoprefix() should add keys with vendor prefixes
    for styles that need it (i.e. transform -> -webkit-transform and
    -ms-transform)`)
  assert.end()
})
