import React, { Component } from 'react';
import Settings from './Settings';

class Header extends Component {
    render() {
        return(
            <header>
                <div className="wrapper">
                    <h1>Title</h1>
                    <button onClick={this.props.logOut}>Log Out</button>
                    <form>
                        <label htmlFor="themeColor">Pick Message Color Theme:</label>
                        <input 
                        type="color" 
                        id="themeColor"
                        onChange={this.props.changeThemeColor}/>

                    </form>
                </div>
            </header>
        );
    };
}

export default Header;