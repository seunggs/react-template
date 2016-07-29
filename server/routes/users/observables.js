import Rx from 'rx-lite'
import R from 'ramda'
import rdb from '../../config/rdbdash'

// getUserInDB$$ :: {*} -> Observable(-> {*})
// Retrieve a userObj from Users table; if it doesn't exist, return {}
export const getUserFromDB$$ = userEmail => {
  return Rx.Observable.create(observer => {
    let cancelled = false
    if (!cancelled) {
      rdb.table('users')
        .getAll(userEmail, {index: 'email'})
        .run()
        .then(dbRes => {
          if (R.isEmpty(dbRes)) {
            // the user doesn't exist
            observer.onNext({})
            observer.onCompleted()
          } else {
            // the user exists - return a single userObj
            observer.onNext(R.head(dbRes))
            observer.onCompleted()
          }
        })
        .catch(err => observer.onError(err))
    }
    return () => {
      cancelled = true
      console.log('Disposed')
    }
  })
}


// createUserInDB$$ :: {*} -> Observable(-> {*})
// Create a new user in Users table IF it doesn't already exist (otherwise, return {}) and return original userObj
export const createUserInDB$$ = userObj => {
  const userEmail = userObj.email
  return Rx.Observable.create(observer => {
    let cancelled = false
    if (!cancelled) {
      rdb.table('users')
        .getAll(userEmail, {index: 'email'})
        .run()
        .then(dbRes => {
          if (R.isEmpty(dbRes)) {
            return rdb.table('users')
              .insert(userObj)
              .run()
          } else {
            return {}
          }
        })
        .then(dbRes => {
          console.log('createUserInDB$$ dbRes: ', dbRes)
          observer.onNext(userObj)
          observer.onCompleted()
        })
        .catch(err => observer.onError(err))
    }
    return () => {
      cancelled = true
      console.log('Disposed')
    }
  })
}
