import React from 'react'
import Gravatar from 'react-gravatar'
import { sidebar, logoutButton } from './Sidebar.css'

/**
 * Sidebar for application
 *
 * Contains several buttons on the side for navigation
 */
export default function Sidebar ({mobile, user, onLogout, changeLocation}) {
  let position = mobile ? 'absolute' : 'inherit'
  let height = mobile ? 'calc(100vh - 4rem)' : '100vh'

  let goToAppointments = () => changeLocation('appointments')
  let goToFamily = () => changeLocation('family')
  let goToMessages = () => changeLocation('messages')
  let goToSettings = () => changeLocation('settings')
  let goToOrganizations = () => changeLocation('organizations')

  return <div className={sidebar} style={{position, height}}>
    <div className='ui segment'>
      <Gravatar className='ui small centered circular image' email={user.email} size={500}/>
      <div style={{textAlign: 'center'}}>
        <h4>{user.firstName} {user.lastName}</h4>
      </div>
      <div className={logoutButton}>
        <button className='ui right labeled icon button' onClick={onLogout}>
          <i className='sign out icon'></i>
          Logout
        </button>
      </div>
      <div className='ui divider'></div>
      <div className='ui vertical fluid buttons'>
        {user.usertype !== 'admin'
          ? <button className='ui right labeled basic icon button' onClick={goToAppointments}>
            <i className='calendar icon' style={{background: 'none'}}></i>
            Appointments
          </button>
          : null}
        {user.usertype === 'client'
          ? <button className='ui right labeled basic icon button' onClick={goToFamily}>
            <i className='group icon' style={{background: 'none'}}></i>
            My Family
          </button>
          : null}
        <button className='ui right labeled basic icon button' onClick={goToOrganizations}>
          <i className='building icon' style={{background: 'none'}}></i>
          My Organizations
        </button>
        <button className='ui right labeled basic icon button' onClick={goToMessages}>
          <i className='mail icon' style={{background: 'none'}}></i>
          Messages
        </button>
      </div>
      <div className='ui divider'></div>
      {/*<div className='ui vertical fluid buttons'>
        <button className='ui right labeled basic icon button' onClick={goToSettings}>
          <i className='settings icon' style={{background: 'none'}}></i>
          Settings
        </button>
      </div>*/}
    </div>
  </div>
}

Sidebar.propTypes = {
  /**
   * If the sidebar should be rendered as mobile or not
   */
  mobile: React.PropTypes.bool,
  /**
   * Email of the current user
   */
  email: React.PropTypes.string,
  /**
   * Action to perform when the user wants to log out
   */
  onLogout: React.PropTypes.func,
  /**
   * A function that takes in a string location and adjusts the app accordingly
   */
  changeLocation: React.PropTypes.func
}
