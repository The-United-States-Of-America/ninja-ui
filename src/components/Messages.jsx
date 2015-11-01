import React, { Component } from 'react'

export default class Messages extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    this.state.messages = [
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'A Message', body: 'do a thing'},
      {title: 'B Message', body: 'y0 r0l0'}
    ]
  }

  messagesList(messages) {
    return <div className="ui celled list">
      {messages.map((message, idx) => (
        <div className="item" key={idx}>
          <h3>{message.title}</h3>
          <p>{message.body}</p>
        </div>
      ))}
    </div>
  }

  render() {
    return this.messagesList(this.state.messages)
  }
}
