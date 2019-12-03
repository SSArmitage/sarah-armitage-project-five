import React, { Component } from 'react';
import Settings from './Settings';

class Header extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         settingsPageOpen: false
    //     }
    // }

    render() {
        return(
            <header>
                <div className="wrapper flexContainer">
                    <h1>Chat App</h1>
                    <div 
                    className="iconContainer"
                    onClick={this.props.handleSettingsClick}>
                        <i class="fas fa-bars"></i>
                    </div>
                    {/* <button onClick={this.props.logOut}>Log Out</button> */}
                    {/* <form>
                        <label htmlFor="themeColor">Pick Message Color Theme:</label>
                        <input 
                        type="color" 
                        id="themeColor"
                        value="#ff34df"
                        onChange={this.props.changeThemeColor}/>
                    </form>
                    <form onSubmit={this.props.onButtonClickUserName}>
                        <label>Add Username</label>
                        <input 
                        type="text"
                        value={this.props.username}
                        onChange={this.props.userName} />
                        <button>Save</button>
                    </form> */}
                </div>
            </header>
        );
    };
}

export default Header;