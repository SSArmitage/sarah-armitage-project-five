import React, { Component } from 'react';

class SignInLogIn extends Component {
    render() {
        return(
            <div className="wrapper">
                <div className="notSingedInPage">
                    <h2>Not signed in</h2>
                    {/* Sign up user */}
                    <form className="signUp"
                        onSubmit={this.props.onButtonClickSignUp}>
                        <fieldset>
                            <legend>Sign Up!</legend>
                            <label htmlFor="displayName">Username</label>
                            <input 
                                type="text" 
                                id="displayName" 
                                placeholder="Username"/>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Email address"
                                onChange={this.props.emailSignUp}/>
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.props.passwordSignUp} />
                            <button>Sign Up!</button>
                        </fieldset>
                    </form>

                    {/* Sign in user */}
                    <form 
                        className="login"
                        onSubmit={this.props.onButtonClickSignIn}>
                        <fieldset>
                            <legend>Sign In!</legend>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email address"
                                onChange={this.props.emailSignIn} />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.props.passwordSignIn} />
                            <button>Sign In</button>
                        </fieldset>
                    </form>
                </div>
            </div> 
        );
    };
}

export default SignInLogIn;