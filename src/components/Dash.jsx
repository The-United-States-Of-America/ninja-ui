import React, { Component } from 'react'
import { Calendar } from 'react-calendar-component'
import { DBSRV } from '../urls'
import { postJson } from '../utils'
import './Dash.css'

/**
 * Dashboard view that hold overview of appointments with calendar
 */
export default class Dash extends Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  handleUpdate (field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  async handleAppointmentCreation () {
    let providerDetails = await fetch(`${DBSRV}/provider/get/${this.state.providerEmail.trim()}`)
    let provider = await providerDetails.json()

    let createResponse = await postJson(`${DBSRV}/appt/create`,
      { clientId: this.props.user.id, providerId: provider.id, state: this.state.state, info: this.state.info, comments: this.state.comments })
    let { id } = await createResponse.json()
  }

  // The sub-variable state can be [1: Requested, 2: Modified, 3: Approved]
  // Refer to: http://the-united-states-of-america.github.io/ninja-backend-dbsrv/api/#api-Appointments-CreateAppointment
  state = {
    providerEmail: '',
    state: 1,
    info: '',
    comments: '',

    appointments: true
  }

  async componentDidMount () {
    if (this.state.appointments) {
      let URL = (this.props.user.usertype === 'client') ? `${DBSRV}/appt/client/${this.props.user.id}` : `${DBSRV}/appt/provider/${this.props.user.id}`
      let response = await fetch(URL)
      let appointments = await response.json()
      this.setState({ appointments })
    }
  }

  render () {

    let calendar = <div className='ui basic segment'>
      <Calendar
        showDaysOfWeek
        forceSixRows={false}
      />
    </div>

    let appointmentForm = <div className='ui basic segment'>
      <h2>Schedule an Appointment</h2>
        <div className='ui form'>
          <div className='field'>
            <label>Provider E-Mail</label>
            <div className='ui fluid input'>
              <input
                type='text'
                placeholder='Provider EMail'
                value={this.state.providerEmail}
                onChange={::this.handleUpdate('providerEmail')}/>
            </div>
          </div>
          <div className='field'>
            <label>Information (Allergies, Medications, Developments)</label>
            <div className='ui fluid input'>
              <textarea
                value={this.state.info}
                onChange={::this.handleUpdate('info')}/>
            </div>
          </div>
          <button className='ui fluid blue button' type='submit' onClick={::this.handleAppointmentCreation}>
            Submit
          </button>
        </div>
    </div>

    return <div>
      {calendar}
      {appointmentForm}
    </div>


  }
}
