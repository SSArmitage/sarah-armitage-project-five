import React, { Component } from 'react';

class SignUpLogIn extends Component {
    constructor() {
        super();
        this.state = {
            userClickedSignUp: false,
            userClickedLogIn: false
        }
    }

    goToSignUp = () => {
        console.log(`Sign up`);
        this.setState({
            userClickedSignUp: true
        })
    }

    goToLogIn = () => {
        console.log(`Log in!`);
        this.setState({
            userClickedLogIn: true
        })
    }

    goBack = () => {
        console.log(`Go back!`);
        this.setState({
            userClickedSignUp: false,
            userClickedLogIn: false
        })
    }

    render() {
        return(
            <div className="wrapperSideTwo loginFlexContainer">
                <div className="notSingedInPage">
                    {!this.state.userClickedSignUp && !this.state.userClickedLogIn
                    ?
                    <div className="logInButtons">
                        <div className="iconContainerChat">
                            <i class="fas fa-comment"></i>
                        </div>
                        {/* Sign up */ }
                        <button onClick={this.goToSignUp} > Sign Up</button>
                        {/* Log in */}
                        <button onClick={this.goToLogIn}>Log In</button>
                        {/* continue as guest */}
                        <button
                            className="guestButton"
                            onClick={this.props.onButtonClickGuest}
                        >Guest</button>
                    </div>
                    :
                    <div>
                        {this.state.userClickedSignUp
                        ?   
                        <div className="signUpPage">
                            < form className="signUp"
                            onSubmit={this.props.onButtonClickSignUp}>
                                <h2>Sign Up</h2>
                                <div className="userInfo">
                                    <label htmlFor="displayName">Username:</label>
                                    <input
                                        type="text"
                                        id="displayName"
                                        placeholder="Username"
                                        onChange={this.props.usernameSignUp}
                                        required />
                                    <label htmlFor="emailSignUp">Email Address:</label>
                                    <input
                                        type="email"
                                        id="emailSignUp"
                                        placeholder="Email address"
                                        onChange={this.props.emailSignUp}
                                        required />
                                    <label htmlFor="passwordSignUp">Password:</label>
                                    <input
                                        type="password"
                                        id="passwordSignUp"
                                        placeholder="Password"
                                        onChange={this.props.passwordSignUp}
                                        required
                                        title="8 characters minimum" />
                                </div>
                                <button>Sign Up</button>
                                {/* to exit the sign up form */}
                                <div
                                    onClick={this.goBack}
                                    className="backButton">
                                    <i class="fas fa-times"></i>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="logInPage">
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
                                    required />
                                     <label htmlFor="passwordLogIn">Password:</label>
                                     <input
                                    type="password"
                                    id="passwordLogIn"
                                    placeholder="Password"
                                    onChange={this.props.passwordSignIn}
                                    required />
                                </div>
                                <button>Log In</button>
                                {/* to exit the log in form */}
                                <div
                                    onClick={this.goBack}
                                    className="backButton">
                                    <i class="fas fa-times"></i>
                                </div> 
                            </form> 
                        </div> 
                     } 
                    </div>
                    }
                </div>
            </div> 
        );
    };
}

export default SignUpLogIn;