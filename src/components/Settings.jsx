import React, { Component } from 'react'

export default function Settings({theme, mobile, onThemeChange, onToggleMobile}) {
    let changeTheme = (name) => function() {
        onThemeChange(name);
    };

    let ThemePicker = () => <div className="ui compact menu">
        <div className="ui simple dropdown item">
            {theme.name}
            <i className="dropdown icon"></i>
            <div className="menu">
                <div className="item" onClick={changeTheme('chat')}>Chat</div>
                <div className="item" onClick={changeTheme('iceberg')}>Iceberg</div>
                <div className="item" onClick={changeTheme('royal')}>Royal</div>
            </div>
        </div>
    </div>

    let MobileSelection = () => <div className="ui segment">
        <div className="ui checkbox">
            <input type="checkbox" checked={mobile} onChange={onToggleMobile}/>
            <label>Use Mobile</label>
        </div>
    </div>

    return <div className={`${theme.sidebar} ui list`}>
        <h3>Layout</h3>
        <MobileSelection/>
        <h3>Theme</h3>
        <ThemePicker/>
    </div>
}
