import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { DBSRV } from '../urls'
import { postJson } from '../utils'

/**
 * Basic view to display all members of a family
 */
export default class Organizations extends Component {
  static propTypes = {
    userId: React.PropTypes.string
  }

  state = {
    organizations: [],

    orgName: '',
    orgState: '',
    orgAddress: '',
    orgZip: '',
    orgPhone: ''
  }

  handleUpdate (field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  async componentDidMount () {

  }

  async handleOrganizationCreation () {
    let createResponse = await postJson(`${DBSRV}/organization/create`,
      { name: this.state.orgName, state: this.state.orgState, address: this.state.orgAddress, zip: this.state.orgZip, phone: this.state.orgPhone })
    let { id } = await createResponse.json()

    await postJson(`${DBSRV}/organization/invite`, { userId: this.props.userId, organizationId: id })
    await postJson(`${DBSRV}/client/accept_org_invite`, { userId: this.props.userId, organizationId: id })
  }

  render () {
    return <div className='ui basic segment'>
              <h2>Create a New Organization!</h2>
              <div className='ui form'>
                <div className='field'>
                  <label>Name</label>
                  <div className='ui fluid input'>
                    <input
                      type='text'
                      placeholder='Name'
                      value={this.state.orgName}
                      onChange={::this.handleUpdate('orgName')}/>
                  </div>
                </div>

                <div className='field'>
                  <label>Address</label>
                  <div className='ui fluid input'>
                    <input
                      type='text'
                      placeholder='Address'
                      value={this.state.orgAddress}
                      onChange={::this.handleUpdate('orgAddress')}/>
                  </div>
                </div>

                <div className="field">
                  <label>State</label>
                  <select value={this.state.orgState} onChange={::this.handleUpdate('orgState')} class="ui fluid dropdown">
                    <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>

                <div className='field'>
                  <label>Zip</label>
                  <div className='ui fluid input'>
                    <input
                      type='text'
                      placeholder='Zip'
                      value={this.state.orgZip}
                      onChange={::this.handleUpdate('orgZip')}/>
                  </div>
                </div>

                <div className='field'>
                  <label>Phone</label>
                  <div className='ui fluid input'>
                    <input
                      type='text'
                      placeholder='Phone'
                      value={this.state.orgPhone}
                      onChange={::this.handleUpdate('orgPhone')}/>
                  </div>
                </div>

                <button className='ui fluid blue button' type='submit' onClick={::this.handleOrganizationCreation}>
                  Submit
                </button>
              </div>
          </div>
  }
}
