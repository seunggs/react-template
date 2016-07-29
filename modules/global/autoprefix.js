import R from 'ramda'

export const autoprefix = styleObj => {
  const styleObjKeys = R.keys(styleObj)
  const autoprefixedStyleObj = styleObjKeys.reduce((prev, curr) => {
    switch (curr) {
      case 'transform':
        const autoprefixes = {'WebkitTransform': styleObj[curr], 'msTransform': styleObj[curr]}
        return R.merge(prev, autoprefixes)
      default:
        return prev
    }
  }, styleObj)
  return autoprefixedStyleObj
}
