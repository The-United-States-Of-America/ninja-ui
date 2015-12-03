import React, { Component } from 'react'
import toastr from 'toastr'
import { DBSRV } from '../urls'
import { postJson } from '../utils'

/**
 * Basic view to display all members of a family
 */
export default class Organizations extends Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  state = {
    organizations: [],

    newOrganizationMembers: '',

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

  async handleOrganizationCreation () {
    let createResponse = await postJson(`${DBSRV}/organization/create`,
      { name: this.state.orgName, state: this.state.orgState, address: this.state.orgAddress, zip: this.state.orgZip, phone: this.state.orgPhone })
    let { id } = await createResponse.json()

    await postJson(`${DBSRV}/organization/invite`, { userId: this.props.user.id, organizationId: id })
    await postJson(`${DBSRV}/${this.props.user.usertype}/accept_org_invite`, { userId: this.props.user.id, organizationId: id })

    this.componentDidMount()
  }

  async handleOrganizationInvite (org) {
    toastr.success(`Invited ${this.state.newOrganizationMembers}!`)
    let clientResponse = await* this.state.newOrganizationMembers.split(',').map(email => fetch(`${DBSRV}/provider/get/${email.trim()}`))
    let clients = await* clientResponse.map(c => c.json())

    await* clients.map(client => postJson(`${DBSRV}/organization/invite`, { userId: client.id, organizationId: parseInt(org.id, 10) }))
    this.setState({ newOrganizationMembers: '' })
  }

  async componentDidMount () {
    let response = await fetch(`${DBSRV}/${this.props.user.usertype}/get/${this.props.user.email}`)
    let resBody = await response.json()

    if (this.props.user.usertype === 'admin' && resBody.organization) {
      let orgRes = await fetch(`${DBSRV}/organization/get/${resBody.organization.id}`)
      let org = await orgRes.json()
      resBody.organization.providers = org.providers
    } else if (resBody.organizations) {
      let orgsRes = await* resBody.organizations.map(org => fetch(`${DBSRV}/organization/get/${org.id}`))
      let orgs = await* orgsRes.map(o => o.json())
      resBody.organizations = resBody.organizations.map((org, idx) => ({
        ...org,
        providers: orgs[idx].providers
      }))
    }

    let organizations = this.props.user.usertype === 'admin' ? [resBody.organization] : resBody.organizations
    this.setState({ organizations })
  }

  render () {
    let organizations = <div className='ui basic segment relaxed divided list'>
      <h2>My Organizations</h2>
      {this.state.organizations.map((org, idx) => {
        return <div className='item' key={idx}>
            <i className='large building middle aligned icon'></i>
            <div className='content'>
              <a className='header'>{ org.name }</a>
              <div className='description'>{ org.phone }</div>
              {this.props.user.usertype !== 'client'
                ? <div className='field'>
                    <label>Invite New Members: </label>
                    <div className='ui action input'>
                      <input
                        type='text'
                        placeholder='Members'
                        value={this.state.newOrganizationMembers}
                        onChange={::this.handleUpdate('newOrganizationMembers')}/>
                      <button className='ui blue button' type='submit' onClick={() => ::this.handleOrganizationInvite(org)}>Submit</button>
                    </div>
                  </div>
                : null}
              </div>
            {org.providers
              ? <div>
                  <h3 className='ui header'>Providers</h3>
                  <div className='ui bulleted list'>
                    {org.providers.map(provider =>
                      <div className='item' key={provider.id}>
                        {provider.prefix} {provider.firstName} {provider.lastName}
                      </div>
                    )}
                  </div>
                </div>
              : null
            }
          </div>
      })}
    </div>

    return <div>
      {organizations}
      {this.props.user.usertype === 'provider'
        ? <div className='ui basic segment'>
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

            <div className='field'>
              <label>State</label>
              <select value={this.state.orgState} onChange={::this.handleUpdate('orgState')} className='ui fluid dropdown'>
                <option value=''>State</option>
                <option value='AL'>Alabama</option>
                <option value='AK'>Alaska</option>
                <option value='AZ'>Arizona</option>
                <option value='AR'>Arkansas</option>
                <option value='CA'>California</option>
                <option value='CO'>Colorado</option>
                <option value='CT'>Connecticut</option>
                <option value='DE'>Delaware</option>
                <option value='DC'>District Of Columbia</option>
                <option value='FL'>Florida</option>
                <option value='GA'>Georgia</option>
                <option value='HI'>Hawaii</option>
                <option value='ID'>Idaho</option>
                <option value='IL'>Illinois</option>
                <option value='IN'>Indiana</option>
                <option value='IA'>Iowa</option>
                <option value='KS'>Kansas</option>
                <option value='KY'>Kentucky</option>
                <option value='LA'>Louisiana</option>
                <option value='ME'>Maine</option>
                <option value='MD'>Maryland</option>
                <option value='MA'>Massachusetts</option>
                <option value='MI'>Michigan</option>
                <option value='MN'>Minnesota</option>
                <option value='MS'>Mississippi</option>
                <option value='MO'>Missouri</option>
                <option value='MT'>Montana</option>
                <option value='NE'>Nebraska</option>
                <option value='NV'>Nevada</option>
                <option value='NH'>New Hampshire</option>
                <option value='NJ'>New Jersey</option>
                <option value='NM'>New Mexico</option>
                <option value='NY'>New York</option>
                <option value='NC'>North Carolina</option>
                <option value='ND'>North Dakota</option>
                <option value='OH'>Ohio</option>
                <option value='OK'>Oklahoma</option>
                <option value='OR'>Oregon</option>
                <option value='PA'>Pennsylvania</option>
                <option value='RI'>Rhode Island</option>
                <option value='SC'>South Carolina</option>
                <option value='SD'>South Dakota</option>
                <option value='TN'>Tennessee</option>
                <option value='TX'>Texas</option>
                <option value='UT'>Utah</option>
                <option value='VT'>Vermont</option>
                <option value='VA'>Virginia</option>
                <option value='WA'>Washington</option>
                <option value='WV'>West Virginia</option>
                <option value='WI'>Wisconsin</option>
                <option value='WY'>Wyoming</option>
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
        : null}
    </div>
  }
}
