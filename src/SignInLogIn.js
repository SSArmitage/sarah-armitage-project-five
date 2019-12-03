import React, { Component } from 'react';

class SignInLogIn extends Component {
    render() {
        return(
            <div className="wrapper">
                <div className="notSingedInPage">
                    {/* <h2>Not signed in</h2> */}
                    {/* Sign up user */}
                    <form className="signUp"
                        onSubmit={this.props.onButtonClickSignUp}>
                        {/* <fieldset> */}
                            <h2>Sign Up</h2>
                            <label htmlFor="displayName">Username:</label>
                            <input 
                                type="text" 
                                id="displayName" 
                                placeholder="Username"
                                required/>
                            <label htmlFor="email">Email Address:</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Email address"
                                onChange={this.props.emailSignUp}
                                required/>
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.props.passwordSignUp} 
                                required
                                title="6 characters minimum"/>
                            <button>Sign Up</button>
                        {/* </fieldset> */}
                    </form>

                    {/* Sign in user */}
                    <form 
                        className="login"
                        onSubmit={this.props.onButtonClickSignIn}>
                        {/* <fieldset> */}
                            <h2>Sign In</h2>
                            <label htmlFor="email">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email address"
                                onChange={this.props.emailSignIn} 
                                required/>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={this.props.passwordSignIn} 
                                required/>
                            <button>Sign In</button>
                        {/* </fieldset> */}
                    </form>
                </div>
            </div> 
        );
    };
}

export default SignInLogIn;