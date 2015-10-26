import React, { Component } from 'react'

import { loginPane } from './LoginPane.css'

export default class LoginPane extends Component {
    constructor(props) {
        super(props)

        this.handleEmailUpdate = this.handleEmailUpdate.bind(this)
        this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this)

        this.state = {
            email: '',
            password: '',
            usertype: ''
        }
    }

    handleEmailUpdate(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordUpdate(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return <div className={`${loginPane} ui piled segment`}>
            <div className="ui large form">
                <div className="field">
                    <label>Email</label>
                    <div className="ui fluid input">
                        <input
                            type="text"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.handleEmailUpdate}
                        />
                    </div>
                </div>
                <div className="field">
                    <label>Password</label>
                    <div className="ui fluid input">
                        <input
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handlePasswordUpdate}
                        />
                    </div>
                </div>
                <div className="field">
                    <label>User Type</label>
                    <select className="ui dropdown">
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>
                <button
                    className="ui fluid blue button"
                    type="submit"
                    onClick={() => this.props.onLogin(this.state.username, this.state.password, this.state.usertype)}
                >
                    Login
                </button>
            </div>
        </div>
    }

}
