import React, { Component } from 'react'
import { loginPane } from './LoginPane.css'

/**
 * Shows a view for logging into the application
 */
export default class LoginPane extends Component {
  static propTypes = {
    /**
     * Action to perform on login
     */
    onLogin: React.PropTypes.func,
    /**
     * Action to perform on register
     */
    onRegister: React.PropTypes.func,
    /**
     * If the previous login failed
     */
    failure: React.PropTypes.bool,
    /**
     * The message returned with a failure
     */
    failureMsg: React.PropTypes.string
  }

  state = {
    email: '',
    password: '',
    usertype: 'client',
    firstName: '',
    lastName: '',
    ssn: '',
    npi: '',
    prefix: '',
    register: false
  }

  handleUpdate (field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleLogin () {
    this.props.onLogin(this.state.email, this.state.password, this.state.usertype)
  }

  handleRegister () {
    this.props.onRegister(this.state)
  }

  goToRegistration () {
    this.setState({
      register: true
    })
  }

  render () {
    let bottomButton = this.state.register
      ? <button className='ui fluid green button' type='submit' onClick={::this.handleRegister}>
        Register
      </button>

      : <div style={{textAlign: 'center'}}>
          <button className='ui fluid blue button' type='submit' onClick={::this.handleLogin}>
            Login
          </button>
          <a onClick={::this.goToRegistration} href='#'>Not registered?</a>
      </div>

    let registerFields = this.state.register
      ? <div>
        <div className='field'>
          <label>First Name</label>
          <div className='ui fluid input'>
            <input
              type='text'
              placeholder='First Name'
              value={this.state.firstName}
              onChange={::this.handleUpdate('firstName')} />
          </div>
        </div>
        <div className='field'>
          <label>Last Name</label>
          <div className='ui fluid input'>
            <input
              type='text'
              placeholder='Last Name'
              value={this.state.lastName}
              onChange={::this.handleUpdate('lastName')} />
          </div>
        </div>
        {this.state.usertype === 'provider' || this.state.usertype === 'client'
          ? <div className='field'>
            <label>SSN</label>
            <div className='ui fluid input'>
              <input
                type='text'
                placeholder='SSN'
                value={this.state.ssn}
                onChange={::this.handleUpdate('ssn')} />
            </div>
          </div>
          : null
        }
        {this.state.usertype === 'provider'
          ? <div className='two fields'>
            <div className='field'>
              <label>NPI</label>
              <div className='ui fluid input'>
                <input
                  type='text'
                  placeholder='NPI'
                  value={this.state.npi}
                  onChange={::this.handleUpdate('npi')} />
              </div>
            </div>
            <div className='field'>
              <label>Prefix</label>
              <div className='ui fluid input'>
                <input
                  type='text'
                  placeholder='Prefix'
                  value={this.state.prefix}
                  onChange={::this.handleUpdate('prefix')} />
              </div>
            </div>
          </div>
          : null
        }
      </div>
      : null

    return <div className={loginPane}>
      <div className={`ui piled segment ${this.props.failure ? 'red' : ''}`}>
        <div className='ui large form'>
          <div style={{textAlign: 'center'}}>
            {this.props.failureMsg}
          </div>
          <div className='field'>
            <label>Email</label>
            <div className='ui fluid input'>
              <input
                type='text'
                placeholder='Email'
                value={this.state.email}
                onChange={::this.handleUpdate('email')} />
            </div>
          </div>
          <div className='field'>
            <label>Password</label>
            <div className='ui fluid input'>
              <input
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={::this.handleUpdate('password')} />
            </div>
          </div>
          <div className='field'>
            <label>User Type</label>
            <select className='ui dropdown' value={this.state.usertype} onChange={::this.handleUpdate('usertype')}>
              <option value='client'>Client</option>
              <option value='provider'>Provider</option>
              <option value='admin'>Administrator</option>
            </select>
          </div>
          {registerFields}
          {bottomButton}
        </div>
      </div>
    </div>
  }
}
