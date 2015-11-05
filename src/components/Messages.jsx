import React from 'react'

/**
 * Pane to list all messages for a user
 */
export default function Messages (props) {
  let messages = [
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

  return <div className='ui celled list'>
    {messages.map((message, idx) => (
      <div className='item' key={idx}>
        <h3>{message.title}</h3>
        <p>{message.body}</p>
      </div>
    ))}
  </div>
}
