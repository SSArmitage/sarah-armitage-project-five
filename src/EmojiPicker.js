import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

let emojiChosen = '';
const EmojiPicker = (props) => {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    // console.log(props);
    

    const onEmojiClick = (event, emojiObject) => {
        event.preventDefault();
        setChosenEmoji(emojiObject);
        // console.log(emojiObject.emoji);
        emojiChosen = emojiObject.emoji;
        // console.log(emojiChosen);
        props.handleEmojiClick(event, emojiChosen);
    }
    // check to make sure just one button has a "submit" functionality
    // the emoji button could be "submitting" b/c when the button is clicked, it is automatically sending the message-> want it to wait  so that the user can continue typing their mssage
    // check that the emoji button submit isnt actually calling the submit functionality of the message form

    return (
        <div>
            {/* {
                chosenEmoji
                    ? (<span>You chose: {chosenEmoji.emoji}</span>)
                    : <span>No emoji Chosen</span>

            } */}
            <Picker onEmojiClick={onEmojiClick} />
        </div>
    );
}


export default EmojiPicker;