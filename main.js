import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Redirect, Link, browserHistory, RouterContext} from 'react-router'
import './assets/styles/main.css'
import Rx from 'rx-lite'
import R from 'ramda'
import {runCustomEventsPolyfill} from './modules/polyfill/custom-events'
import injectTapEventPlugin from 'react-tap-event-plugin'

import {state$} from 'state/observables'
import {changeState} from 'state/events'

import App from './routes/App/'
import Home from './routes/App/Home/'

// CustomEvents polyfill for IE
runCustomEventsPolyfill()

// Needed for onTouchTap
// Can go away when react 1.0 release
injectTapEventPlugin()

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
  </Route>
)

state$.subscribe(rootState => {
  const createElement = (Component, props) => {
    return <Component {...props} rootState={rootState} />
  }
  render((
    <Router routes={routes} createElement={createElement} history={browserHistory} />
  ), document.getElementById('app'))
})

// initialize content and state
changeState('global', {})
