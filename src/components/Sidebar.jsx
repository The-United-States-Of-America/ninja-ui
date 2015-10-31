import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { sidebar, logoutButton } from './Sidebar.css'

export default function Sidebar ({mobile, username, onLogout}) {
  let position = mobile ? 'absolute' : 'inherit'
  let height = mobile ? 'calc(100vh - 4rem)' : '100vh'

  return <div className={sidebar} style={{position, height}}>
    <div className="ui segment">
      <Gravatar className="ui small centered circular image" email={username} size={500}/>
      <div className={logoutButton}>
        <button className="ui right labeled icon button" onClick={onLogout}>
          <i className="sign out icon"></i>
            Logout
        </button>
      </div>
      <div className="ui divider"></div>
      <div className="ui vertical fluid buttons">
        <button className="ui basic button">
          Appointments
        </button>
        <button className="ui basic button">
          My Family
        </button>
        <button className="ui basic button">
          Messages
        </button>
      </div>
      <div className="ui divider"></div>
        <div className="ui vertical fluid buttons">
          <button className="ui basic button">
            Settings
          </button>
        </div>
    </div>
  </div>
}
