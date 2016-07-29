import Rx from 'rx-lite'
import R from 'ramda'
import config from '../../client-config'
import {global} from '../mocks/global'

export const checkUserExists$$ = userEmail => {
  return Rx.Observable.create(observer => {
    fetch(`${config.apiBase}/api/users?userEmail=${encodeURIComponent(userEmail)}`)
      .then(res => res.json())
      .then(userObj => {
        if (R.isEmpty(userObj)) {
          observer.onNext(null)
          observer.onCompleted()
        } else {
          observer.onNext(userObj)
          observer.onCompleted()
        }
      })
      .catch(err => observer.onError(err))

    return () => console.log('Disposed')
  })
}

export const addUserProfile$$ = profile => {
  return Rx.Observable.create(observer => {
    fetch(config.apiBase + '/api/users', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(userObj => {
        observer.onNext(userObj)
        observer.onCompleted()
      })
      .catch(err => observer.onError(err))

    return () => console.log('Disposed')
  })
}

export const userLogin$ = Rx.Observable.fromEvent(global.document, 'user:login')
