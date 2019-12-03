import React, { Component } from 'react';
import EmojiPicker from './EmojiPicker';

class SendMessage extends Component {
    render() {
        return(
            <div className="sendMessageArea">
                <div className="wrapper flexContainer">
                    <form onSubmit={this.props.onButtonClick}>
                            <label htmlFor="userMessage"></label>
                            <textarea 
                            rows="10" 
                            cols="40" 
                            placeholder="Enter message here" 
                            id="userMessage" 
                            onChange={this.props.onTextInput}
                            value={this.props.textInputValue}>
                            </textarea>
                            <div
                            className="sendAndEmojiContainer">
                                <button 
                                className="emojiIcon"
                                onClick={this.props.onEmojiClick}>
                                    <i class="far fa-laugh"></i>
                                </button>
                                <button>Send</button>   
                            </div>
                            
                        {this.props.showEmojiPicker 
                        ? 
                        <div className="emojiPicker">
                            <EmojiPicker />
                        </div> 
                        :
                        null}
                    </form>
                </div>
            </div>
        );
    };
}

export default SendMessage;