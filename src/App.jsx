import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import uiSelector from './ui/selectors'
import loginSelector from './login/selectors'
import { toggleSidebar } from './ui/actions'
import { doLogin, doLogout } from './login/actions'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Room from './components/Room'
import LoginPane from './components/LoginPane'
import { ninja, ninjaContainer } from './App.css'

let select = state => ({
    ...uiSelector(state),
    ...loginSelector(state)
})

@connect(select)
export default class App extends Component {
    render() {
        const { dispatch, mobile, showSidebar, isLoggedIn, username } = this.props

        let nav = !mobile
          ? null
          : <Navbar
              onToggleSidebar={() => dispatch(toggleSidebar())}
              sidebarVisible={showSidebar}
            />

        let sidebar = <ReactCSSTransitionGroup transitionName="slide-left" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {!showSidebar
              ? null
              : <Sidebar
                  mobile={mobile}
                  username={username}
                  onLogout={() => dispatch(doLogout())}/>}
        </ReactCSSTransitionGroup>

        let room = <Room mobile={mobile}/>

        return !isLoggedIn
            ? <div style={{paddingTop: '5rem'}}>
                <LoginPane onLogin={(u, p) => dispatch(doLogin(u, p))} />
              </div>
            : <div className={ninjaContainer}>
                {nav}
                <div className={ninja}>
                    {sidebar}
                    {room}
                </div>
              </div>
    }
}
