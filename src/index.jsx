import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import ui from './ui/reducers'
import login from './login/reducers'
import App from './App'
import 'semantic-ui-css/semantic'
import 'semantic-ui-css/semantic.css'


let store = createStore(combineReducers({
    ui,
    login
}));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
