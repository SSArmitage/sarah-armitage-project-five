import React, { Component } from 'react';

class Settings extends Component {
    render() {
        return(
            <div className="settings">
                <h2>Settings</h2>
                <ul>
                    <li><button onClick={this.props.settingsPage}>Settings</button></li>
                    <li>Add/Change Username</li>
                    <li>Add Profile Picture</li>
                    <li onClick={this.props.changeTheme}>Change Theme</li>
                </ul>
            </div>
        );
    };
}

export default Settings;