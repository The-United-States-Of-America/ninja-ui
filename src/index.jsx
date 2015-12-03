import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import ui from './ui/reducers'
import auth from './auth/reducers'
import App from './App'
import 'babel-core/polyfill'
import 'whatwg-fetch'
import 'semantic-ui-css/semantic'
import 'semantic-ui-css/semantic.css'
import 'toastr/build/toastr.css'
import 'react-datepicker/dist/react-datepicker.css'

var devTools = null
var finalCreateStore = createStore

if (DEBUG) {
  let createDevTools = require('redux-devtools').createDevTools
  let LogMonitor = require('redux-devtools-log-monitor')
  let DockMonitor = require('redux-devtools-dock-monitor')

  devTools = (() => {
    let DevTools = createDevTools(
      <DockMonitor toggleVisibilityKey='H' changePositionKey='Q' defaultIsVisible={false}>
        <LogMonitor />
      </DockMonitor>
    )

    finalCreateStore = compose(
      DevTools.instrument()
    )(createStore)

    return <DevTools />
  })()
}

let store = finalCreateStore(combineReducers({
  ui,
  auth
}))

ReactDOM.render(
  <Provider store={store}>
    <div>
      {devTools}
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)
