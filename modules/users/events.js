import {global} from '../mocks/global'

export const sendUserLoginEvent = () => {
  const userLoginEvent = new CustomEvent('user:login')
  global.document.dispatchEvent(userLoginEvent)
}
