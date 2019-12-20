import React, { Component } from 'react';
import EmojiPicker from './EmojiPicker';

class SendMessage extends Component {
    constructor() {
        super();
        // creating a Ref that can then be assigned to the textarea element with ref-attribute, assigning it to the variable textInput
        this.textInput = React.createRef();
        this.state = {
            selectedEmoji: ''
        }
    }

    componentDidMount() {
        // document.addEventListener("keydown", this.enterFunction, false);
        document.addEventListener("keypress", this.enterFunction, false);
    }

    enterFunction = (event )=> {
        if (event.keyCode === 13) {
            event.preventDefault();
            //Do whatever when esc is pressed
            console.log("Pressed enter");
            console.log(event);
            document.getElementById('clickSend').click();
            // this.props.onButtonClick()
        }
    }

    // grab the emoji chosen by the user (coming from the EmojiPicker component) and set it in state in the variable slectedEmoji
    getChosenEmoji = (event, emoji) => {
        // console.log(emoji);
        // this.setState({
        //     selectedEmoji: emoji
        // })
        this.props.sendEmojiIntoApp(emoji);
        // focus to the textarea when the emoji is clicked (lets the user keep typing message after they choose an emoji) -> using "React refs"
        this.textInput.current.focus();
    }

    // submitOnEnter(event) {
    //     console.log(event);
    //     event.preventDefault();
        
    //     if (event.which === 13) {
    //         event.target.form.dispatchEvent(new Event("submit", { cancelable: true }));
    //         console.log("enter");
            
    //         event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    //     }
    // }

    render() {
        return(
            <div className="sendMessageArea">
                <div className="wrapper flexContainer">
                    <form 
                    onSubmit={this.props.onButtonClick}
                    // onSubmit={this.submitOnEnter}
                    >
                            <label htmlFor="userMessage"></label>
                            <textarea 
                            rows="10" 
                            cols="40" 
                            placeholder="Enter message here" 
                            id="userMessage" 
                            onChange={this.props.onTextInput}
                            value={this.props.textInputValue}
                            ref={this.textInput}>
                            </textarea>
                            <div
                            className="sendAndEmojiContainer">
                                <button 
                                className="emojiIcon"
                                onClick={this.props.onEmojiClick}>
                                    <i class="far fa-laugh"></i>
                                </button>
                                <button id="clickSend">Send</button>   
                            </div>
                            
                        {this.props.showEmojiPicker 
                        ? 
                        <div className="emojiPicker">
                            <EmojiPicker 
                            handleEmojiClick={this.getChosenEmoji}/>
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