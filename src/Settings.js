import React, { Component } from 'react';

class Settings extends Component {
    handleGuest = () => {
        alert("Guests cannot change username")
        
    }
    render() {
        return(
            <div className="settings">
                <div className="wrapperSideTwo flexContainer">
                    <div className="settingsFormContainer">
                        <h2>Settings</h2>
                        <ul>
                            <li>
                                <form onSubmit={this.props.onButtonClickUserName}>
                                    
                                        {/* <h3>Change Username</h3> */}
                                        <label 
                                        htmlFor="username"
                                        className="">
                                            Change Username:
                                        </label>
                                        {this.props.username === "Guest"
                                        ?
                                        <div>
                                            <input
                                            id="username"
                                            type="text"
                                            placeholder={this.props.username}
                                            onClick={this.handleGuest}
                                            readOnly/>
                                            <button disabled>Save</button>
                                        </div>
                                        :
                                        <div>
                                            <input
                                            id="username"
                                            type="text"
                                            value={this.props.username}
                                            onChange={this.props.userName} />
                                            <button>Save</button>
                                        </div>
                                        }
                                </form>
                            </li>
                            {/* adding these in but not working yet */}
                            {/* <li>
                                <form>
                                    <label>Add/Change Display Picture</label>
                                </form>
                            </li> */}
                            {/* <li>
                                <form>
                                    <h3>Change Color Theme</h3>
                                    <div className="colorChoices">
                                        <div className="color">
                                            <label htmlFor="color1"></label>
                                            <div className="color1"></div>
                                            <input 
                                            type="radio" 
                                            id="color1"
                                            name="colorChoice"
                                            checked={this.props.selectedColorOption = 'color1'}
                                            value="color1"
                                            onClick={this.props.handleColorChange}/>
                                        </div>
                                        
                                        <div className="color">
                                            <label htmlFor="color2"></label>
                                            <div className="color2"></div>
                                            <input 
                                            type="radio" 
                                            id="color2"
                                            name="colorChoice"
                                            checked={this.props.selectedColorOption = 'color2'}
                                            value="color2"
                                            onClick={this.props.handleColorChange}/>
                                        </div>

                                        <div className="color">
                                            <label htmlFor="color3"></label>
                                            <div className="color3"></div>
                                            <input 
                                            type="radio" 
                                            id="color3"
                                            name="colorChoice"
                                            checked={
                                            (event, 'color3') => {
                                                this.props.selectedColorOption
                                            }}
                                            value="color3"
                                            onClick={this.props.handleColorChange}/>
                                        </div>

                                        <div className="color">
                                            <label htmlFor="color4"></label>
                                            <div className="color4"></div>
                                            <input 
                                            type="radio" 
                                            id="color4"
                                            name="colorChoice"
                                            checked={this.props.selectedColorOption = 'color4'}
                                            value="color4"
                                            onClick={this.props.handleColorChange}/>
                                        </div>

                                        <div className="color">
                                            <label htmlFor="color5"></label>
                                            <div className="color5"></div>
                                            <input 
                                            type="radio" 
                                            id="color5"
                                            name="colorChoice"
                                            checked={this.props.selectedColorOption = 'color5'}
                                            value="color5"
                                            onClick={this.props.handleColorChange}/>
                                        </div>
                                    </div>
                                    <button>Save</button>
                                </form>
                            </li> */}
                            {/* <li>
                                <form>
                                        <label>Change Font Size</label>
                                </form>
                            </li> */}
                            <button onClick={this.props.logOut}>Log Out</button>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };
}

export default Settings;