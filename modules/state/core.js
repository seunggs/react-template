import R from 'ramda'

/*
  STATE STRUCTURE = {
    'id': {
      key: value,
      key2: value2
    },
    ...
  }
*/

// getElemState :: String -> {*} -> {*}
export const getElemState = R.curry((rootState, id) => {
  if (R.isNil(rootState)) { return {} }
  if (R.equals({}, rootState)) { return {} }
  return R.isNil(R.prop(id, rootState)) ? {} : R.prop(id, rootState)
})

// getRootStateFromLocalStorage :: {*} -> {*}
export const getRootStateFromLocalStorage = (localStorage) => {
  return !R.isNil(localStorage) ? JSON.parse(localStorage.getItem('rootState')) : {}
}
