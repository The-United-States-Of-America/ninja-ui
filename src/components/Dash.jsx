import React, { Component } from 'react'
import { Calendar } from 'react-calendar-component'
import { dash } from './Dash.css'

export default class Dash extends Component {
  render() {
    let height = this.props.mobile ? 'calc(100vh - 4rem)' : '100vh'

    return <div className={dash}>
      <div className="ui basic segment" style={{height}}>
        <Calendar
          showDaysOfWeek={true}
          forceSixRows={false}
        />
      </div>
    </div>
  }
}
