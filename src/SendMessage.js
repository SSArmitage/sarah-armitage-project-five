import React, { Component } from 'react';

class SendMessage extends Component {
    render() {
        return(
            <div className="wrapper">
                <form onSubmit={this.props.onButtonClick}>
                    <label htmlFor="userMessage"></label>
                    {/* <input type="text" id="userMessage" /> */}
                    <textarea 
                    rows="10" 
                    cols="40" 
                    placeholder="Enter message here" 
                    id="userMessage" 
                    onChange={this.props.onTextInput}
                    value={this.props.textInputValue}>
                    </textarea>
                    <button>Send</button>
                </form>
            </div>
        );
    };
}

export default SendMessage;