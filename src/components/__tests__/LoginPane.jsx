jest.dontMock('../LoginPane')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import LoginPane from '../LoginPane'

describe('LoginPane', () => {
  it('updates username upon typing', () => {
    let loginPane = TestUtils.renderIntoDocument(
      <LoginPane failure={true} onLogin={() => null}/>
    )

    let node = ReactDOM.findDOMNode(loginPane)
    let [ usernameField, passwordField ] = TestUtils.findRenderedDOMComponentsWithTag(node, 'input')
  })
})
