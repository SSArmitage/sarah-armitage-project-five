import React, { Component } from 'react';

class Settings extends Component {
    render() {
        return(
            <div className="settings">
                <div className="wrapper flexContainer">
                    <h2>Settings</h2>
                    <ul>
                        <li>
                            <form onSubmit={this.props.onButtonClickUserName}>
                                {/* <fieldset> */}
                                    <legend>Add/Change Username</legend>
                                    {/* <label htmlFor="username">Add/Change Username</label> */}
                                    <input
                                        id="username"
                                        type="text"
                                        value={this.props.username}
                                        onChange={this.props.userName} />
                                    <button>Save</button>
                                {/* </fieldset> */}
                            </form>
                        </li>
                        <li>
                            <form>
                                {/* <fieldset> */}
                                    <label>Add/Change Display Picture</label>
                                {/* </fieldset> */}
                            </form>
                        </li>
                        <li>
                            <form>
                                {/* <fieldset> */}
                                    <legend>Change Color Theme</legend>
                                    {/* <label htmlFor="themeColor">Pick Message Color Theme:</label> */}
                                    <input
                                        type="color"
                                        id="themeColor"
                                        value="#ff34df"
                                        onChange={this.props.changeThemeColor} />
                                {/* </fieldset> */}
                            </form>
                        </li>
                        <li>
                            <form>
                                {/* <fieldset> */}
                                    <label>Change Font Size</label>
                                {/* </fieldset> */}
                            </form>
                        </li>
                        <button onClick={this.props.logOut}>Log Out</button>
                    </ul>
                </div>
            </div>
        );
    };
}

export default Settings;