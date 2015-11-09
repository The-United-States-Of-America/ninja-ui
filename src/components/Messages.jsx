import React, { Component } from 'react'
import { DBSRV } from '../urls'
import { postJson } from '../utils'

/**
 * Pane to list all messages for a user
 */
export default class Messages extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    mobile: React.PropTypes.bool,
    changeLocation: React.PropTypes.func
  }

  state = {
    messages: null
  }

  async acceptInvite (invite) {
    let inviteType = this.props.user.usertype === 'client' ? 'accept_fam_invite' : 'accept_org_invite'
    let body = this.props.user.usertype === 'client'
      ? { clientId: this.props.user.id, familyId: invite.id }
      : { userId: this.props.user.id, organizationId: invite.id }

    await postJson(`${DBSRV}/client/${inviteType}`, body)
    this.props.changeLocation('family')
  }

  async declineInvite (invite) {
    let inviteType = this.props.user.usertype === 'client' ? 'reject_fam_invite' : 'reject_org_invite'
    let body = this.props.user.usertype === 'client'
      ? { clientId: this.props.user.id, familyId: invite.id }
      : { userId: this.props.user.id, organizationId: invite.id }

    await postJson(`${DBSRV}/client/${inviteType}`, body)
    this.componentDidMount()
  }

  async componentDidMount () {
    try {
      let inviteType = this.props.user.usertype === 'client' ? 'get_family_invites' : 'get_org_invites'
      let inviteResponse = await fetch(`${DBSRV}/client/${inviteType}/${this.props.user.id}`)

      if (inviteResponse.status >= 400) {
        this.setState({
          messages: []
        })
      } else {
        let invite = await inviteResponse.json()

        this.setState({
          messages: [{
            ...invite,
            type: 'invite',
            inviteType: this.props.user.usertype
          }]
        })
      }
    } catch (e) {
      this.setState({
        messages: []
      })
    }
  }

  messageView (message) {
    if (message.type === 'invite') {
      return <div>
        <h2>Congrats! You've been invited to the {message.name} Family!</h2>
        <p>
          This means you'll be able to see all of the documents shared by
          the people in your family. They'll also be able to see the documents
          you share with them! Make sure you want to join though, you can only
          be a part of one family at a time.
        </p>
        <button className='ui blue button' onClick={() => ::this.acceptInvite(message)}>
          Accept
        </button>
        <button className='ui red button' onClick={() => ::this.declineInvite(message)}>
          Decline
        </button>
      </div>
    } else {
      return <div></div>
    }
  }

  mobileView () {
    return <div className='ui celled list'>
      {this.state.messages.map((message, idx) => (
        <div className='item' key={idx}>
          {::this.messageView(message)}
        </div>
      ))}
    </div>
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
