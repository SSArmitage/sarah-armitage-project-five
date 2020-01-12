import React, { Component } from 'react';
import EmojiPicker from './EmojiPicker';
import axios from 'axios';

class SendMessage extends Component {
    constructor() {
        super();
        // creating a Ref that can then be assigned to the textarea element with ref-attribute, assigning it to the variable textInput
        this.textInput = React.createRef();
        this.state = {
            selectedEmoji: '',
            searchGifs: [],
            showGifPicker: false,
            selectedGifId: ''
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

    handleGifSearch = (event) => {
        event.preventDefault();
        console.log("I clicked the GIF button");
        
        // make axios call to GIPHY api
        axios({
            method: 'get',
            url: `http://api.giphy.com/v1/gifs/search`,
            responseType: 'json',
            params: {
                api_key: 'aBCgQnzAOOAJ9COBm7Yt2Rwhp5jVz0rN',
                q: `dog`
            }
        }).then((gifData) => {
            console.log(gifData.data.data);
            this.setState({
                searchGifs: gifData.data.data
            }, this.setState({
                showGifPicker: true
            }))
        })
    }

    handleGifClick = (event) => {
        console.log(event);
        console.log(event.target.src);
        this.setState({
            selectedGifId: event.target.src,
            showGifPicker: false
        })
        // this.props.sendGifToApp(event.target.id)
    }

    sendInfoWithForm = (event) => {
        console.log("blaaa blaa blaa");
        this.props.onFormButtonClick(this.state.selectedGifId);
        this.setState({
            selectedGifId: ''
        })
    }

    // NOTE: got gif to show up inside of fake text area.. now need it to get sent to the dispaly messages when send form
    // need to remove the chosen gif from the text area after the send button is clicked - DONE
    // also need to change the input stuff for the new fake text area
    // fix date/time stamps

    render() {
        return(
            <div className="sendMessageArea">
                <div className="wrapper flexContainer">
                    <form 
                    onSubmit={this.props.onButtonClick}
                    // onSubmit={this.sendInfoWithForm}
                    // onSubmit={this.submitOnEnter}
                    >
                            <label htmlFor="userMessage"></label>
                            {/* <textarea 
                            rows="10" 
                            cols="40" 
                            placeholder="Enter message here" 
                            id="userMessage" 
                            onChange={this.props.onTextInput}
                            value={this.props.textInputValue}
                            ref={this.textInput}
                            contenteditable>
                            </textarea> */}

                            {/* div that will look like a textarea, depending on the content, will either have an actual text area inside for catching the users text input OR an image tag for gifs selected by the user */}
                            <div 
                            className="textArea"
                            id="userMessage"
                            onChange={this.props.onTextInput}
                            value={this.props.textInputValue}
                            ref={this.textInput}
                            contenteditable>

                            {this.state.selectedGifId
                            ?
                            
                            <div className="imageContainer">
                                <img
                                src={this.state.selectedGifId}
                                width="120"
                                height="100"
                                contenteditable="false" />
                            </div>
                            :
                            null
                            }

                            {/* Hi */}
                            <textarea
                                rows="10"
                                cols="40"
                                placeholder="Enter message here"
                                id="userMessage"
                                onChange={this.props.onTextInput}
                                value={this.props.textInputValue}
                                ref={this.textInput}
                                // contenteditable
                                >
                            </textarea>

                            </div>
                            <div
                            className="sendAndEmojiContainer">
                                <button 
                                className="emojiIcon"
                                onClick={this.props.onEmojiClick}>
                                    <i class="far fa-laugh"></i>
                                </button>
                                <button onClick={this.handleGifSearch}>GIF</button>
                                <button 
                                id="clickSend"
                                onClick={this.sendInfoWithForm}>Send</button>   
                            </div>
                            
                        {this.props.showEmojiPicker 
                        ? 
                        <div className="emojiPicker">
                            <EmojiPicker 
                            handleEmojiClick={this.getChosenEmoji}/>
                        </div> 
                        :
                        null}

                        {this.state.showGifPicker
                        ?
                        <div className="gifPicker">
                            <ul>
                                {this.state.searchGifs.map((gifObject) => {
                                    return (
                                        <li>
                                            <img 
                                            src={gifObject.images.fixed_height_small.url}
                                            id={gifObject.id}
                                            onClick={this.handleGifClick}/>
                                        </li>
                                    )
                                })
    
                                }
                            </ul>
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