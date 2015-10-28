import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import ui from './ui/reducers'
import login from './auth/reducers'
import App from './App'
import 'babel-core/polyfill'
import 'whatwg-fetch'
import 'semantic-ui-css/semantic'
import 'semantic-ui-css/semantic.css'

if (DEBUG) {
  let createDevTools = require('redux-devtools').createDevTools
  let LogMonitor = require('redux-devtools-log-monitor')
  let DockMonitor = require('redux-devtools-dock-monitor')

  var DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='H' changePositionKey='Q'>
      <LogMonitor />
    </DockMonitor>
  )

  var finalCreateStore = compose(
    DevTools.instrument()
  )(createStore)
} else {
  var finalCreateStore = createStore

  var DevTools = () => <div />
}

let store = finalCreateStore(combineReducers({
  ui,
  login
}));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <DevTools />
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);
