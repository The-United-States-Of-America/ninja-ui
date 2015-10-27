import React, { Component } from 'react'
import { navbar } from './Navbar.css'

export default function Navbar ({onToggleSidebar}) {
  return <div className={`${navbar} ui borderless icon menu`}>
    <a className="item" onClick={onToggleSidebar}>
      <i className="large sidebar icon"></i>
    </a>
  </div>
}
