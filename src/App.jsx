import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import uiSelector from './ui/selectors'
import authSelector from './auth/selectors'
import { toggleSidebar } from './ui/actions'
import { doLogin, doLogout } from './auth/actions'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dash from './components/Dash'
import LoginPane from './components/LoginPane'
import { ninja, ninjaContainer } from './App.css'

let select = state => ({
  ...uiSelector(state),
  ...authSelector(state)
})

@connect(select)
export default class App extends Component {
  render() {
    const { dispatch, mobile, showSidebar, isLoggedIn, username } = this.props

    let nav = !mobile
      ? null
      : <Navbar
          onToggleSidebar={toggleSidebar(dispatch)}
          sidebarVisible={showSidebar} />

    let sidebar = <ReactCSSTransitionGroup transitionName="slide-left" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      {!showSidebar
        ? null
        : <Sidebar
            mobile={mobile}
            username={username}
            onLogout={doLogout(dispatch)} />}
    </ReactCSSTransitionGroup>

    if (!isLoggedIn) {
      return <div style={{paddingTop: '5rem'}}>
        <LoginPane onLogin={doLogin(dispatch)} />
      </div>
    } else {
      return <div className={ninjaContainer}>
        {nav}
        <div className={ninja}>
          {sidebar}
          <Dash mobile={mobile}/>
        </div>
      </div>
    }
  }
}
