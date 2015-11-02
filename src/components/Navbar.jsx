import React from 'react'
import { navbar } from './Navbar.css'

export default function Navbar ({onToggleSidebar}) {
  return <div className={navbar}>
    <div className='ui borderless icon menu'>
      <a className='item' onClick={onToggleSidebar}>
        <i className='large sidebar icon'></i>
      </a>
    </div>
  </div>
}
