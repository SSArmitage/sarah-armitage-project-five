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
            <div>
            {this.props.userChange === false

            ?

                <header className="headerSignedOutPage">
                    <div className="wrapper flexContainer">
                        <h1>Chat App</h1>
                        <div
                            className="iconContainer"
                            onClick={this.props.handleSettingsClick}>
                            <i class="fas fa-bars"></i>
                        </div>
                    </div>
                </header>
            

            :

                <header className="headerSignedInPage">
                    <div className="wrapper flexContainer">
                        <h1>Chat App</h1>
                        <div
                            className="iconContainer"
                            onClick={this.props.handleSettingsClick}>
                            <i class="fas fa-bars"></i>
                        </div>
                    </div>
                </header>
        }
            </div >

            
        );
    };
}

export default Header;