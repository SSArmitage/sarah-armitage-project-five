import React, { Component } from 'react';

class SignInLogIn extends Component {
    render() {
        return(
            <div className="wrapper">
                <div className="notSingedInPage">
                    <h2>Not signed in</h2>
                    <form className="signUp">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Email address"/>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Password" />
                        <button>Sign Up!</button>
                    </form>

                    <form className="login">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email address" />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password" />
                        <button>Sign In</button>
                    </form>
                </div>
            </div> 
        );
    };
}

export default SignInLogIn;