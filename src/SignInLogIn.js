import React, { Component } from 'react';

class SignUpLogIn extends Component {
    render() {
        return(
            <div className="wrapperSideTwo loginFlexContainer">
                <div className="notSingedInPage">
                    {/* sign up user */}
                    <form className="signUp"
                        onSubmit={this.props.onButtonClickSignUp}>
                            <h2>Sign Up</h2>
                            {/* working on making this username input work */}
                            <div className="userInfo">
                                <label htmlFor="displayName">Username:</label>
                                <input 
                                    type="text" 
                                    id="displayName" 
                                    placeholder="Username"
                                    onChange={this.props.usernameSignUp}
                                    required/> 
                                <label htmlFor="emailSignUp">Email Address:</label>
                                <input 
                                    type="email" 
                                    id="emailSignUp" 
                                    placeholder="Email address"
                                    onChange={this.props.emailSignUp}
                                    required/>
                                <label htmlFor="passwordSignUp">Password:</label>
                                <input 
                                    type="password"
                                    id="passwordSignUp"
                                    placeholder="Password"
                                    onChange={this.props.passwordSignUp} 
                                    required
                                    title="8 characters minimum"/>
                            </div>
                            <button>Sign Up</button>
                    </form>

                    {/* Sign in user */}
                    <form 
                        className="login"
                        onSubmit={this.props.onButtonClickSignIn}>
                            <h2>Log In</h2>
                            <div className="userInfo">
                                <label htmlFor="emailLogIn">Email Address:</label>
                                <input
                                    type="emailLogIn"
                                    id="email"
                                    placeholder="Email address"
                                    onChange={this.props.emailSignIn} 
                                    required/>
                                <label htmlFor="passwordLogIn">Password:</label>
                                <input
                                    type="password"
                                    id="passwordLogIn"
                                    placeholder="Password"
                                    onChange={this.props.passwordSignIn} 
                                    required/>
                            </div>
                            <button>Log In</button>
                    </form>
                </div>
                {/* continue as guest */}
                <button 
                className="guestButton"
                onClick={this.props.onButtonClickGuest}
                >Continue as guest</button>
            </div> 
        );
    };
}

export default SignUpLogIn;