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
            gifSearchText: '',
            selectedGifId: ''
        }
    }

    componentDidMount() {
        // document.addEventListener("keydown", this.enterFunction, false);
        document.addEventListener("keypress", this.enterFunction, false);
    }

    // prevents this from firing when user logs out (id="clickSend" would be null)
    componentWillUnmount() {
        document.removeEventListener("keypress", this.enterFunction, false)
    }

    enterFunction = (event) => {
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
        // event.preventDefault();
        console.log("I searched for a gif");
        console.log(this.state.gifSearchText);
        
        
        // make axios call to GIPHY api
        axios({
            method: 'get',
            url: `https://api.giphy.com/v1/gifs/search`,
            responseType: 'json',
            params: {
                api_key: 'aBCgQnzAOOAJ9COBm7Yt2Rwhp5jVz0rN',
                // q: `dog`
                q: this.state.gifSearchText
            }
        }).then((gifData) => {
            console.log(gifData.data.data);
            this.setState({
                searchGifs: gifData.data.data
            })
        }).catch((error) => {
            console.log(error);
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

    // when user clicks on Gif button, either show or hide the Gif menu
    // also... clear the api images and the search text so they are clear/empty for the next search
    changeGifMenuVisibility = (event) => {
        console.log(event);
        console.log(this.state.showGifPicker);
        
        if (this.state.showGifPicker) {
            this.setState({
                showGifPicker: false,
                searchGifs: [],
                gifSearchText: ''
            })
        } else {
            this.setState({
                showGifPicker: true
            })
        }
        
    }

    // when user types their gif search into the text input
    // AFTER the user's input is set in state, a callback fxn runs that will fire the handleGifSearch() fxn (if it was not wrapped in a callback fxn, handleGifSearch() would fire right away and it would call the API before the current typed letter was saved in state, causing the images returned from the API to always be a letter behind)
    handleGifTextInput = (event) => {
        this.setState({
            gifSearchText: event.target.value
        }, function() {
            console.log("I was placed in state");
            this.handleGifSearch()
        })
    }

    //✅NOTE: got gif to show up inside of fake text area.. now need it to get sent to the dispaly messages when send form
    //✅need to remove the chosen gif from the text area after the send button is clicked - DONE
    //✅also need to change the input stuff for the new fake text area
    //✅fix date/time stamps
    //✅remove api search text from the gif picker after it is closed

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

                            {/* an editable div (the "contenteditable" attribute allows users to make changes to the content inside the div, user can edit the contents of the div) that will look like a textarea. Depending on the content, the div will either have an actual text area inside for catching the users text input OR an image tag for gifs selected by the user */}
                            {/* passing an image into a "textarea" */}
                            <div 
                            className="textArea"
                            id="userMessage"
                            onChange={this.props.onTextInput}
                            value={this.props.textInputValue}
                            ref={this.textInput}
                            contentEditable>

                            {this.state.selectedGifId
                            ?
                            
                            <div className="imageContainer">
                                <img
                                src={this.state.selectedGifId}
                                width="120"
                                height="100"
                                contentEditable="false" />
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
                                    <i className="far fa-laugh"></i>
                                </button>
                                {/* <button onClick={this.handleGifSearch}>GIF</button> */}
                                <button onClick={this.changeGifMenuVisibility}>GIF</button>
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
                            <input 
                            type="text"
                            onChange={this.handleGifTextInput}
                            value={this.state.gifSearchText}
                            autoFocus
                            >
                            </input>

                            {/* if there is text in the gif search, render the list of gifs from the api, else, don't render anything */}
                            {this.state.gifSearchText
                            ?
                            <ul>
                                {this.state.searchGifs.map((gifObject) => {
                                    return (
                                        <li>
                                            <img
                                                src={gifObject.images.fixed_height_small.url}
                                                id={gifObject.id}
                                                onClick={this.handleGifClick} />
                                        </li>
                                    )
                                })
                                }
                            </ul>
                            :
                            null
                            }
                           
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