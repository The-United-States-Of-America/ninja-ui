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
     * If the previous login failed
     */
    failure: React.PropTypes.bool
  }

  state = {
    email: '',
    password: '',
    usertype: 'client'
  }

  handleEmailUpdate (e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordUpdate (e) {
    this.setState({
      password: e.target.value
    })
  }

  handleUsertype (e) {
    this.setState({
      usertype: e.target.value
    })
  }

  handleLogin () {
    this.props.onLogin(this.state.email, this.state.password, this.state.usertype)
  }

  render () {
    return <div className={loginPane}>
      <div className={`ui piled segment ${this.props.failure ? 'red' : ''}`}>
        <div className='ui large form'>
          <div className='field'>
            <label>Email</label>
            <div className='ui fluid input'>
              <input
                type='text'
                placeholder='Email'
                value={this.state.email}
                onChange={::this.handleEmailUpdate} />
              </div>
            </div>
          <div className='field'>
            <label>Password</label>
            <div className='ui fluid input'>
              <input
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={::this.handlePasswordUpdate} />
            </div>
          </div>
          <div className='field'>
            <label>User Type</label>
            <select className='ui dropdown' value={this.state.usertype} onChange={::this.handleUsertype}>
              <option value='client'>Client</option>
              <option value='provider'>Provider</option>
              <option value='administrator'>Administrator</option>
            </select>
          </div>
          <button className='ui fluid blue button' type='submit' onClick={::this.handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  }

}
