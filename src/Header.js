import React, { Component } from 'react';
import Settings from './Settings';

class Header extends Component {
    render() {
        return(
            <div>
            {this.props.headerChange === null

            ?

                <header className="headerSignedOutPage">
                    <div className="wrapperSideTwo flexContainer">
                        <h1>Chat App</h1>
                    </div>
                </header>
            

            :

                <header className="headerSignedInPage">
                    <div className="wrapperSideTwo flexContainer">
                        <h1>Chat App</h1>
                        <div
                            className="iconContainer"
                            onClick={this.props.handleSettingsClick}>
                            <i className="fas fa-bars"></i>
                        </div>
                    </div>
                </header>
        }
            </div >

            
        );
    };
}

export default Header;