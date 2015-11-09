import React, { Component } from 'react'
import { DBSRV } from '../urls'

/**
 * Pane to list all messages for a user
 */
export default class Messages extends Component {
  static propTypes = {
    userId: React.PropTypes.string,
    usertype: React.PropTypes.string,
    mobile: React.PropTypes.bool
  }

  state = {
    messages: null,
    viewing: null
  }

  formatInvite (invite) {
    return <div>
      <h2>Congrats! You've been invited to the {invite.name} Family!</h2>
      <p>
        This means you'll be able to see all of the documents shared by
        the people in your family. They'll also be able to see the documents
        you share with them! Make sure you want to join though, you can only
        be a part of one family at a time.
      </p>
      <button className='ui blue button'>
        Accept
      </button>
      <button className='ui red button'>
        Decline
      </button>
    </div>
  }

  formatInviteHeader (message) {
    return <div>
      <h4>Congrats! You've been invited...</h4>
      <p>This means you'll be able to...</p>
    </div>
  }

  async componentDidMount () {
    try {
      let inviteType = this.props.usertype === 'client' ? 'get_family_invites' : 'get_org_invites'
      let inviteResponse = await fetch(`${DBSRV}/client/${inviteType}/${this.props.userId}`)
      let invite = await inviteResponse.json()

      this.setState({
        messages: [{
          ...invite,
          type: 'invite',
          inviteType: this.props.usertype
        }]
      })
    } catch (e) {
      this.setState({
        messages: []
      })
    }
  }

  messagesList (messages, viewMessage) {
    return <div className='ui celled list'>
      {messages.map((message, idx) => (
        <div className='item' key={idx} onClick={viewMessage(idx)}>
          {this.formatInviteHeader(message)}
        </div>
      ))}
    </div>
  }

  messageView (message) {
    if (message.type === 'invite') {
      return this.formatInvite(message)
    } else {
      return <div></div>
    }
  }

  mobileView () {
    let viewMessage = (viewing) => (() => this.setState({ viewing }))

    if (this.state.viewing === null) {
      return <div>
        {this.messagesList(this.state.messages, viewMessage)}
      </div>
    } else {
      return <div className='ui basic segment'>
        <div>
          <a href='#' onClick={viewMessage(null)}>&#10094; Back</a>
        </div>
        <div className='ui divider'></div>
        {this.messageView(this.state.messages[this.state.viewing])}
      </div>
    }
  }

  render () {
    if (this.state.messages && this.state.messages.length > 0) {
      return ::this.mobileView()
    } else if (this.state.messages) {
      return <div className='ui basic segment'>
        <h3 className='ui center aligned header'>Inbox Empty!</h3>
      </div>
    } else {
      return <div className='ui basic segment'>
        <div className='ui active loader' style={{marginTop: '3rem'}}></div>
      </div>
    }
  }
}
