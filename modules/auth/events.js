import R from 'ramda'
import {global} from '../mocks/global'

export const sendAuth0ReadyEvent = () => {
  const eventData = 'auth0Ready'
  const auth0LoadedEvent = new CustomEvent('auth0:loaded', {detail: eventData})
  global.document.dispatchEvent(auth0LoadedEvent)
}
