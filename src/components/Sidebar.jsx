import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { sidebar } from './Sidebar.css'

export default function Sidebar ({mobile, username, onLogout}) {
  let position = mobile ? 'absolute' : 'inherit'
  let height = mobile ? 'calc(100% - 4rem)' : '100vh'

  return <div className={sidebar} style={{position, height}}>
    <div className="ui basic segment">
      <Gravatar className="ui small centered circular image" email={username} size={500}/>
      <div style={{textAlign:'center', paddingTop:'.5rem'}}>
        <button className="ui right labeled icon button" onClick={onLogout}>
          <i className="sign out icon"></i>
            Logout
        </button>
      </div>
    </div>
  </div>
}
