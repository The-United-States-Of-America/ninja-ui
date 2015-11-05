import React from 'react'
import { navbar } from './Navbar.css'

/**
 * Navbar to display on mobile and small screens
 */
export default function Navbar ({onToggleSidebar}) {
  return <div className={navbar}>
    <div className='ui borderless icon menu'>
      <a className='item' onClick={onToggleSidebar}>
        <i className='large sidebar icon'></i>
      </a>
    </div>
  </div>
}

Navbar.propTypes = {
  /**
   * Function to call when user intends to toggle the sidebar
   */
  onToggleSidebar: React.PropTypes.func
}
