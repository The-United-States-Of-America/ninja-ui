import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, compose } from 'redux'
import { Provider } from 'react-redux'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'
import ui from './ui/reducers'
import login from './login/reducers'
import App from './App'
import 'semantic-ui-css/semantic'
import 'semantic-ui-css/semantic.css'

if (DEBUG) {
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
