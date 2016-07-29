import Rx from 'rx-lite'
import R from 'ramda'
import {global} from '../mocks/global'
import {checkUserExists$$, addUserProfile$$} from '../users/observables'

export const authReady$ = Rx.Observable.fromEvent(global.document, 'auth0:loaded')
  .map(e => e.detail)

export const getUserObj$$ = profile => {
  return checkUserExists$$(profile.email)
    .flatMap(userObj => {
      if (R.isNil(userObj)) {
        // user doesn't exist
        return addUserProfile$$(profile)
      } else {
        // user already exists - return null
        return Rx.Observable.return(null)
      }
    })
}
