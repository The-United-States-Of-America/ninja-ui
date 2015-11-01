import React, { Component } from 'react'
import { Calendar } from 'react-calendar-component'
import './Dash.css'

export default class Dash extends Component {
  render() {
    return <div className="ui basic segment">
      <Calendar
        showDaysOfWeek={true}
        forceSixRows={false}
      />
    </div>
  }
}
