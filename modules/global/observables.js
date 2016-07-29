import Rx from 'rx-lite'

export const documentLoaded$ = Rx.Observable.fromEvent(global, 'load')

export const elemLoaded$$ = elem => {
  return Rx.Observable.fromEvent(elem, 'load').take(1)
}
