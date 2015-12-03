import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import toastr from 'toastr'
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

  updateDate (date) {
    this.setState({
      dateRequested: date
    })
  }

  async handleAppointmentCreation () {
    toastr.success('Created appointment!')
    let providerDetails = await fetch(`${DBSRV}/provider/get/${this.state.providerEmail.trim()}`)
    let provider = await providerDetails.json()

    let createResponse = await postJson(`${DBSRV}/appt/create`,
      { clientId: this.props.user.id, providerId: provider.id, state: this.state.state, info: this.state.info, comments: this.state.comments, dateRequested: this.state.dateRequested.toISOString() })

    await createResponse.json()
    this.setState({
      info: '',
      comments: '',
      providerEmail: ''
    })
  }

  // The sub-variable state can be [1: Requested, 2: Modified, 3: Approved]
  // Refer to: http://the-united-states-of-america.github.io/ninja-backend-dbsrv/api/#api-Appointments-CreateAppointment
  state = {
    providerEmail: '',
    state: 1,
    info: '',
    comments: '',
    dateRequested: moment(),
    showMakeAppt: false,
    appointments: []
  }

  async componentDidMount () {
    if (this.state.appointments) {
      let URL = (this.props.user.usertype === 'client') ? `${DBSRV}/appt/client/${this.props.user.id}` : `${DBSRV}/appt/provider/${this.props.user.id}`
      let response = await fetch(URL)
      let appointments = await response.json()

      let fileListResponse = await* appointments.map(a => fetch(`${DBSRV}/file/list/${a.id}`))
      let fileList = await* fileListResponse.map(f => f.json())

      appointments = appointments.map((appt, idx) => ({
        ...appt,
        files: fileList[idx]
      })).filter(appt => appt.state !== 0).map(appt => ({
        ...appt,
        dateRequested: new Date(appt.dateRequested)
      }))

      this.setState({ appointments })
    }
  }

  showAppt () {
    this.setState({
      showMakeAppt: true
    })
  }

  async cancelAppt (appt) {
    await postJson(`${DBSRV}/appt/update`, {
      query: {
        id: appt.id.toString()
      },
      update: {
        state: 0
      }
    })

    this.componentDidMount()
  }

  async approveAppt (appt) {
    await postJson(`${DBSRV}/appt/update`, {
      query: {
        id: appt.id.toString()
      },
      update: {
        state: 3
      }
    })

    this.componentDidMount()
  }

  async declineAppt (appt) {
    await postJson(`${DBSRV}/appt/update`, {
      query: {
        id: appt.id.toString()
      },
      update: {
        state: 0
      }
    })

    this.componentDidMount()
  }

  async uploadFile (appt) {
    console.log(`Starting upload on ${appt.id}`)
    let file = document.fileupload.querySelector('[type="file"]').files[0]
    let data = new FormData()
    data.append('doc', file)
    document.fileupload.reset()

    await fetch(`${DBSRV}/file/upload/${appt.id}`, {
      method: 'post',
      body: data
    })

    console.log(`Finished upload on ${appt.id}`)
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
              <DatePicker selected={this.state.dateRequested} onChange={::this.updateDate} />
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

    let appointments = (() => {
      if (this.props.user.usertype === 'client') {
        return <div className='ui cards'>
          {this.state.appointments.map((appt, idx) => <div className='card' key={idx}>
            <div className='content'>
              <Gravatar className='ui right floated mini circular image' email={appt.provider.email}/>
              <div className='header'>
                Appointment on {appt.dateRequested.toISOString().slice(0, 10)}
              </div>
              <div className='meta'>
                with <strong>{appt.provider.prefix}{appt.provider.firstName}{appt.provider.lastName}</strong>
              </div>
              <div className='description'>
                {appt.info}
                <h3 className='ui header'>Files</h3>
                <div className='ui list'>
                  {appt.files.map(file =>
                    <div key={file} className='item'>
                       <a href={`${DBSRV}/file/get/${appt.id}/${file}`}>
                         {file}
                       </a>
                     </div>
                  )}
                </div>
              </div>
            </div>
            <div className='extra content'>
              {appt.state === 1
                ? <p>Pending Approval...</p>
              : <div>
                <span className='right floated'>
                  <form name='fileupload' className='ui two mini buttons' action={`${DBSRV}/file/upload`} method='post'>
                    <label className='ui mini basic green button'>
                      <span>Add Document</span>
                      <input type='file' style={{ display: 'none' }} onChange={() => this.uploadFile(appt)}/>
                    </label>
                    <div className='ui mini basic red button' onClick={() => ::this.cancelAppt(appt)}>Delete</div>
                  </form>
                </span>
                <p>All Set!</p>
              </div>}
            </div>
          </div>)}
        </div>
      } else {
        return <div className='ui cards'>
          {this.state.appointments.map((appt, idx) => <div className='card' key={idx}>
            <div className='content'>
              <Gravatar className='ui right floated mini circular image' email={appt.client.email}/>
              <div className='header'>
                Appointment on {appt.dateRequested.toISOString().slice(0, 10)}
              </div>
              <div className='meta'>
                with <strong>{appt.client.firstName}{appt.client.lastName}</strong>
              </div>
              <div className='description'>
                {appt.info}
                <h3 className='ui header'>Files</h3>
                <div className='ui list'>
                  {appt.files.map(file =>
                    <div key={file} className='item'>
                       <a href={`${DBSRV}/file/get/${appt.id}/${file}`}>
                         {file}
                       </a>
                     </div>
                  )}
                </div>
              </div>
            </div>
            <div className='extra content'>
              {appt.state === 1
                ? <div className='ui two buttons'>
                  <div className='ui basic green button' onClick={() => ::this.approveAppt(appt)}>Approve</div>
                  <div className='ui basic red button' onClick={() => ::this.declineAppt(appt)}>Decline</div>
                </div>
                : <div>
                    <span className='right floated'>
                      <form name='fileupload' className='ui two mini buttons' action={`${DBSRV}/file/upload`} method='post'>
                        <label className='ui mini basic green button'>
                          <span>Add Document</span>
                          <input type='file' style={{ display: 'none' }} onChange={() => this.uploadFile(appt)}/>
                        </label>
                        <div className='ui mini basic red button' onClick={() => ::this.cancelAppt(appt)}>Delete</div>
                      </form>
                    </span>
                  <p>All Set!</p>
                </div>}
            </div>
          </div>)}
        </div>
      }
    })()

    return <div className='ui basic segment'>
      {this.state.appointments.length > 0 ? appointments : <h2>No Appointments Scheduled!</h2>}
      <div style={{marginTop: '1rem'}}>
        {appointmentForm}
      </div>
    </div>
  }
}
