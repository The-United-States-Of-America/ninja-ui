import React, { Component } from 'react'
import { sidebar } from './Sidebar.css'

export default function Sidebar({mobile}) {
    let position = mobile ? 'absolute' : 'inherit';
    let height = mobile ? 'calc(100% - 4rem)' : '100vh';

    return (
        <div className={sidebar} style={{position, height}}>
            <div className="ui basic segment">
            </div>
        </div>
    );
}
