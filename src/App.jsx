import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import uiSelector from './ui/selectors'
import { toggleSidebar } from './ui/actions'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Room from './components/Room'
import { ninja, ninjaContainer } from './App.css'

let select = state => ({
    ...uiSelector(state)
})

@connect(select)
export default class App extends Component {
    render() {
        const { dispatch, mobile, showSidebar } = this.props;

        let nav = !mobile ?
            null :
            <Navbar
                onToggleSidebar={() => dispatch(toggleSidebar())}
                sidebarVisible={showSidebar}
            />

        let sidebar = <ReactCSSTransitionGroup transitionName="slide-left" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            {!showSidebar ?
                null :
                <Sidebar mobile={mobile}/>
            }
        </ReactCSSTransitionGroup>

        let room = <Room mobile={mobile}/>

        return (
            <div className={ninjaContainer}>
                {nav}
                <div className={ninja}>
                    {sidebar}
                    {room}
                </div>
            </div>
        );
    }
}
