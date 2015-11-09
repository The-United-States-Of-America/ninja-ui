import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
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

      this.setState({ family })
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

  render () {
    if (this.state.family) {
      return <div className={family}>
        {this.state.family.map(fam => <div key={fam.id} className={member}>
          <Gravatar className='ui small centered circular image' email={fam.email} size={500}/>
          <h3>{fam.firstName} {fam.lastName}</h3>
        </div>)}
      </div>
    } else if (this.props.family) {
      return <div className='ui segment'>
        <p></p>
        <div className='ui active loader'></div>
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
