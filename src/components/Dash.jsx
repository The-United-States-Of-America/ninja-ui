import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
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
    showMakeAppt: false,
    appointments: []
  }

  async componentDidMount () {
    if (this.state.appointments) {
      let URL = (this.props.user.usertype === 'client') ? `${DBSRV}/appt/client/${this.props.user.id}` : `${DBSRV}/appt/provider/${this.props.user.id}`
      let response = await fetch(URL)
      let appointments = await response.json()
      console.log(appointments)

      this.setState({
        appointments: appointments.map(appt => ({
          ...appt,
          dateRequested: (new Date(appt.dateRequested)).toISOString().slice(0, 10)
        }))
      })
    }
  }

  showAppt () {
    this.setState({
      showMakeAppt: true
    })
  }

  render () {
    let appointmentForm = this.state.showMakeAppt
      ? <div>
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
      : <button className='ui blue button' onClick={::this.showAppt}>
        Schedule Appointment
      </button>

    // let appointments = <div className='ui list'>
    //   <h3 className='ui center aligned header'>Upcoming Appointments</h3>
    //   {this.state.appointments.map((appt, idx) => <div className='item' key={idx}>
    //     <h4>Appointment on {appt.dateRequested}</h4>
    //   </div>)}
    // </div>

    let appointments = <div className='ui cards'>
      {this.state.appointments.map((appt, idx) => <div className='card' key={idx}>
        <div className='content'>
          <Gravatar className='ui right floated mini circular image' email={appt.provider.email}/>
          <div className='header'>
            Appointment on {appt.dateRequested}
          </div>
          <div className='meta'>
            with <strong>{appt.provider.prefix}{appt.provider.firstName}{appt.provider.lastName}</strong>
          </div>
          <div className='description'>
            {appt.info}
          </div>
        </div>
        <div className='extra content'>
          <div className='ui two buttons'>
            <div className='ui basic green button'>Approve</div>
            <div className='ui basic red button'>Decline</div>
          </div>
        </div>
      </div>)}
    </div>

    return <div className='ui basic segment'>
      {appointments}
      <div style={{marginTop: '1rem'}}>
        {appointmentForm}
      </div>
    </div>
  }
}
