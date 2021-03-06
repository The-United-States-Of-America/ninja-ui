import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import toastr from 'toastr'
import { DBSRV } from '../urls'
import { postJson } from '../utils'
import { family, member } from './Family.css'

/**
 * Basic view to display all members of a family
 */
export default class Family extends Component {
  static propTypes = {
    family: React.PropTypes.object,
    userId: React.PropTypes.string
  }

  state = {
    family: null,
    familyName: '',
    familyInvites: ''
  }

  handleUpdate (field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  async componentDidMount () {
    if (this.props.family) {
      let response = await fetch(`${DBSRV}/family/getMembers/${this.props.family.id}`)
      let family = await response.json()
      let allFamApptRes = await* family.map(member => fetch(`${DBSRV}/appt/client/${member.id}`))
      let allFamAppt = await* allFamApptRes.map(a => a.json())
      let appointments = allFamAppt.reduce((prev, app) => prev.concat(app))

      let fileListResponse = await* appointments.map(a => fetch(`${DBSRV}/file/list/${a.id}`))
      let fileList = await* fileListResponse.map(f => f.json())

      appointments = appointments.map((appt, idx) => ({
        ...appt,
        files: fileList[idx]
      })).filter(appt => appt.state !== 0).map(appt => ({
        ...appt,
        dateRequested: new Date(appt.dateRequested)
      }))

      this.setState({ family, appointments })
    }
  }

  async handleFamilyCreation () {
    let createResponse = await postJson(`${DBSRV}/family/create`, { name: this.state.familyName })
    let { id } = await createResponse.json()

    await postJson(`${DBSRV}/family/invite`, { clientId: this.props.userId, familyId: id })
    await postJson(`${DBSRV}/client/accept_fam_invite`, { clientId: this.props.userId, familyId: id })

    let clientResponse = await* this.state.familyMembers.split(',').map(email => fetch(`${DBSRV}/client/get/${email.trim()}`))
    let clients = await* clientResponse.map(c => c.json())

    await* clients.map(client => postJson(`${DBSRV}/family/invite`, { clientId: client.id, familyId: id }))
  }

  async handleFamilyInvitation () {
    toastr.success(`Invited ${this.state.newFamilyMembers}!`)
    let clientResponse = await* this.state.newFamilyMembers.split(',').map(email => fetch(`${DBSRV}/client/get/${email.trim()}`))
    let clients = await* clientResponse.map(c => c.json())

    await* clients.map(client => postJson(`${DBSRV}/family/invite`, { clientId: client.id, familyId: this.props.family.id }))
    this.setState({ newFamilyMembers: '' })
  }

  render () {
    if (this.state.family) {
      return <div>
        <h2>Members</h2>
        <div className={`${family} ui basic segment`}>
          {this.state.family.map(fam => <div key={fam.id} className={member}>
            <Gravatar className='ui small centered circular image' email={fam.email} size={500}/>
            <h3>{fam.firstName} {fam.lastName}</h3>
          </div>)}
        </div>
        <div className='ui basic segment'>
          <h2>Appointments</h2>
          <div className='ui cards'>
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
            </div>)}
          </div>
        </div>
        <div className='ui basic segment'>
          <h2>Invite more members to: {this.props.family.name}</h2>
            <div className='ui form'>
              <div className='field'>
                <label>Family Members (Comma Separated)</label>
                <div className='ui fluid input'>
                  <input
                    type='text'
                    placeholder='Members'
                    value={this.state.newFamilyMembers}
                    onChange={::this.handleUpdate('newFamilyMembers')}/>
                </div>
              </div>
              <button className='ui fluid blue button' type='submit' onClick={::this.handleFamilyInvitation}>
                Submit
              </button>
            </div>
        </div>
      </div>
    } else if (this.props.family) {
      return <div className='ui basic segment'>
        <div className='ui active loader' style={{marginTop: '3rem'}}></div>
      </div>
    } else {
      return <div className='ui basic segment'>
        <h2>Create a new family!</h2>
          <div className='ui form'>
            <div className='field'>
              <label>Family Name</label>
              <div className='ui fluid input'>
                <input
                  type='text'
                  placeholder='Name'
                  value={this.state.familyName}
                  onChange={::this.handleUpdate('familyName')}/>
              </div>
            </div>
            <div className='field'>
              <label>Family Members (Comma Separated)</label>
              <div className='ui fluid input'>
                <input
                  type='text'
                  placeholder='Members'
                  value={this.state.members}
                  onChange={::this.handleUpdate('familyMembers')}/>
              </div>
            </div>
            <button className='ui fluid blue button' type='submit' onClick={::this.handleFamilyCreation}>
              Submit
            </button>
          </div>
      </div>
    }
  }
}
