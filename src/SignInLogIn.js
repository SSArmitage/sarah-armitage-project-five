import React, { Component } from 'react';

class SignInLogIn extends Component {
    render() {
        return(
            <div className="wrapper">
                <div className="notSingedInPage">
                    <h2>Not signed in</h2>
                    {/* Sign up user */}
                    {/* <form className="signUp"
                        onSubmit={this.props.onButtonClickSignUp}>
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
                    </form> */}

                    {/* Sign in user */}
                    <form 
                        className="login"
                        onSubmit={this.props.onButtonClickSignIn}>
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
                    </form>
                </div>
            </div> 
        );
    };
}

export default SignInLogIn;