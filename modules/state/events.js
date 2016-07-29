import R from 'ramda'

export const changeState = (id, newState) => {
  const isValidId = !R.isNil(id)
  if (!isValidId) { throw Error('Please input a valid id for state change event') }

  const eventData = {[id]: newState}
  const changeStateEvent = new global.CustomEvent('state:change', {detail: eventData})
  global.document.dispatchEvent(changeStateEvent)
}
