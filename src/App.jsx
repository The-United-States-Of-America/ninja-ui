import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import uiSelector from './ui/selectors'
import authSelector from './auth/selectors'
import { toggleSidebar, changeLocation } from './ui/actions'
import { doLogin, doLogout, doRegister } from './auth/actions'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dash from './components/Dash'
import LoginPane from './components/LoginPane'
import Settings from './components/Settings'
import Family from './components/Family'
import Organizations from './components/Organizations'
import Messages from './components/Messages'
import { ninja, ninjaContainer, ninjaView } from './App.css'

let select = state => ({
  ...uiSelector(state),
  ...authSelector(state)
})

@connect(select)
export default class App extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    mobile: React.PropTypes.bool,
    showSidebar: React.PropTypes.bool,
    isLoggedIn: React.PropTypes.bool,
    user: React.PropTypes.object,
    failure: React.PropTypes.bool,
    failureMsg: React.PropTypes.string,
    location: React.PropTypes.string
  }

  render () {
    const { dispatch,
            mobile,
            showSidebar,
            isLoggedIn,
            user,
            failure,
            failureMsg,
            location } = this.props

    if (!isLoggedIn) {
      return <div style={{paddingTop: '5rem'}}>
        <LoginPane onLogin={doLogin(dispatch)} onRegister={doRegister(dispatch)} failure={failure} failureMsg={failureMsg}/>
      </div>
    }

    let nav = !mobile
      ? null
      : <Navbar
          onToggleSidebar={toggleSidebar(dispatch)}
          sidebarVisible={showSidebar} />

    let sidebar = <ReactCSSTransitionGroup transitionName='slide-left' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
      {!showSidebar
        ? null
        : <Sidebar
            mobile={mobile}
            user={user}
            onLogout={doLogout(dispatch)}
            changeLocation={changeLocation(dispatch)} />}
    </ReactCSSTransitionGroup>

    let view = (() => {
      switch (location) {
        case 'settings':
          return <Settings />
        case 'family':
          return <Family userId={user.id} family={user.family}/>
        case 'messages':
          return <Messages user={user} mobile={mobile}/>
        case 'organizations':
          return <Organizations user={user}/>
        default:
          return <Dash mobile={mobile} user={user}/>
      }
    })()

    let height = mobile ? 'calc(100vh - 4rem)' : '100vh'


    return <div className={ninjaContainer}>
      {nav}
      <div className={ninja}>
        {sidebar}
        <div className={ninjaView} style={{height}}>
          {view}
        </div>
      </div>
    </div>
  }
}
