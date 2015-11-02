import React, { Component } from 'react'
import { loginPane } from './LoginPane.css'

export default class LoginPane extends Component {
  static propTypes = {
    onLogin: React.PropTypes.func
  }

  state = {
    email: '',
    password: '',
    usertype: ''
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

  handleLogin () {
    this.props.onLogin(this.state.email, this.state.password, this.state.usertype)
  }

  render () {
    return <div className={loginPane}>
      <div className='ui piled segment'>
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
            <select className='ui dropdown'>
              <option value='patient'>Patient</option>
              <option value='doctor'>Doctor</option>
              <option value='admin'>Administrator</option>
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
