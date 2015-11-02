import React from 'react'
import Gravatar from 'react-gravatar'
import { sidebar, logoutButton } from './Sidebar.css'

export default function Sidebar ({mobile, username, onLogout, changeLocation}) {
  let position = mobile ? 'absolute' : 'inherit'
  let height = mobile ? 'calc(100vh - 4rem)' : '100vh'

  let goToAppointments = () => changeLocation('appointments')
  let goToFamily = () => changeLocation('family')
  let goToMessages = () => changeLocation('messages')
  let goToSettings = () => changeLocation('settings')

  return <div className={sidebar} style={{position, height}}>
    <div className='ui segment'>
      <Gravatar className='ui small centered circular image' email={username} size={500}/>
      <div className={logoutButton}>
        <button className='ui right labeled icon button' onClick={onLogout}>
          <i className='sign out icon'></i>
          Logout
        </button>
      </div>
      <div className='ui divider'></div>
      <div className='ui vertical fluid buttons'>
        <button className='ui right labeled basic icon button' onClick={goToAppointments}>
          <i className='calendar icon' style={{background: 'none'}}></i>
          Appointments
        </button>
        <button className='ui right labeled basic icon button' onClick={goToFamily}>
          <i className='group icon' style={{background: 'none'}}></i>
          My Family
        </button>
        <button className='ui right labeled basic icon button' onClick={goToMessages}>
          <i className='mail icon' style={{background: 'none'}}></i>
          Messages
        </button>
      </div>
      <div className='ui divider'></div>
        <div className='ui vertical fluid buttons'>
          <button className='ui right labeled basic icon button' onClick={goToSettings}>
            <i className='settings icon' style={{background: 'none'}}></i>
            Settings
          </button>
        </div>
    </div>
  </div>
}
