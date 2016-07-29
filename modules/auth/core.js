import R from 'ramda'
import Rx from 'rx-lite'
import {browserHistory} from 'react-router'
import {global} from '../mocks/global'
import {IMG_BASE_URL, AUTH0_URL} from '../global/constants'
import {LOGGEDIN_ID, NOTIFICATION_ID, LOGIN_BUTTON_ID} from '../state/constants'
import {changeState} from '../state/events'
import {sendUserLoginEvent} from '../users/events'
import {getUserObj$$} from './observables'
import {openStripe} from '../stripe/core'

/* --- IMPURE --------------------------------------------------------------- */

export const getLock = () => {
  if (R.isNil(Auth0Lock)) { return }
  console.log('Auth0Lock available')
  return new Auth0Lock(process.env.AUTH0_KEY, AUTH0_URL)
}

// getIdToken :: {*} -> String
export const getIdToken = (lock) => {
  let idToken = global.localStorage.getItem('userToken')
  const authHash = lock.parseHash(global.location.hash)
  if (!idToken && authHash) {
    if (authHash.id_token) {
      idToken = authHash.id_token
      global.localStorage.setItem('userToken', authHash.id_token)
    }
    if (authHash.error) {
      console.log("Error signing in", authHash)
      return null
    }
  }
  return idToken
}

// loggedIn :: () -> Boolean
export const loggedIn = () => {
  const idToken = global.localStorage.getItem('userToken')
  return !idToken ? false : true
}

// login :: {*} -> {*} -> (a -> b) -> IMPURE
// stripeOptions and stripeSuccessCb required if proceedToCheckout = true
export const login = (proceedToCheckout = false, stripeOptions, stripeSuccessCb) => {
  const lock = getLock()
  const lockOptions = {
    icon: `${IMG_BASE_URL}/logos/zensa-logo-auth0.svg`,
    gravatar: false,
    closable: true,
    socialBigButtons: true
  }

  lock.show(lockOptions, (err, profile, idToken) => {
    // If userToken is not available, return
    if (R.isNil(idToken)) {
      const visible = true
      const msg = 'Please try logging in again'
      const type = 'danger'
      changeState(NOTIFICATION_ID, {visible, msg, type})
      return
    }

    // If there's an error, return
    if (err) {
      console.log('Something went wrong while getting user\'s Auth0 profile: ', err)
      const visible = true
      const msg = 'Something went wrong while getting your profile - please try again'
      const type = 'danger'
      changeState(NOTIFICATION_ID, {visible, msg, type})
      return
    }

    global.localStorage.setItem('userEmail', profile.email)
    global.localStorage.setItem('userId', profile.user_id)

    console.log('Logging in...')

    // Otherwise, check to see if the users exists - if not, save the new user profile in DB
    getUserObj$$(profile).subscribe(
      userObj => {
        global.localStorage.setItem('userToken', idToken)
        changeState(LOGGEDIN_ID, {isLoggedIn: true})

        if (R.isNil(userObj)) {
          // existing user
          console.log('Existing user')
          sendUserLoginEvent()
        } else {
          // new user
          console.log('New user')
          sendUserLoginEvent()
        }
      },
      err => {
        console.log('Something went wrong while calling getUserObj$: ', err)
        const visible = true
        const msg = 'Something went wrong - please try again later'
        const type = 'danger'
        changeState(NOTIFICATION_ID, {visible, msg, type})
      }
    )
  })

  // If user closes login, open Stripe
  lock.on('hidden', () => {
    const disabled = false
    changeState(LOGIN_BUTTON_ID, {disabled})

    console.log('login hidden')
    if (proceedToCheckout) {
      const stripeOptionsWithEmailFilledIn = R.merge(stripeOptions, {email: global.localStorage.getItem('userEmail')})
      openStripe(stripeOptionsWithEmailFilledIn, stripeSuccessCb)
    }
  })
}
