import React, { Component } from 'react'
import { Calendar } from 'react-calendar-component'
import './Dash.css'

/**
 * Dashboard view that hold overview of appointments with calendar
 */
export default class Dash extends Component {
  render () {
    return <div className='ui basic segment'>
      <Calendar
        showDaysOfWeek
        forceSixRows={false}
      />
    </div>
  }
}
