import React from 'react'

export default function LoginPane() {
    let Email = () => <input type="text" placeholder="email"/>

    let Password = () => <input type="password" placeholder="password"/>

    let UserType = () => <div className="ui compact menu">
        <div className="ui simple dropdown item">
            User Type
            <i className="dropdown icon"></i>
            <div className="menu">
                <div className="item">Doctor</div>
                <div className="item">Patient</div>
                <div className="item">Administrator</div>
            </div>
        </div>
    </div>

    return <div>
        <h3>Email</h3>
        <Email/>
        <h3>Password</h3>
        <Password/>
        <h3>User Type</h3>
        <UserType/>
    </div>
}
