import React, { Component } from 'react'
import { room } from './Room.css'

export default class Room extends Component {
    render() {
        let height = this.props.mobile ? 'calc(100vh - 4rem)' : '100vh';

        return <div className={room} style={{height}}>
        </div>
    }
}
