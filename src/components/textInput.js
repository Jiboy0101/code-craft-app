import React, { useState } from 'react';
import { faKeyboard, faArrowLeft, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css';

function TextInputApp({ onSendText }) {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState('');

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendText = () => {
    onSendText(inputText);
    setInputText('');
  };

  return (
    <div className='box'>
      <div className='searchbar'>
        <div className='back'>
          <FontAwesomeIcon
            className='find'
            onClick={toggleInput}
            icon={showInput ? faArrowLeft : faKeyboard}
            size="xl"
            style={{ color: "#ffc800" }}
          />
        </div>
        {showInput && (
          <div className='bar'>
            <input
              type="text"
              placeholder="Type a keyword..."
              value={inputText}
              onChange={handleInputChange}
              className="placeholder-color" // Add this class for styling
            />
            <FontAwesomeIcon
              className='plane'
              onClick={handleSendText}
              icon={faPaperPlane}
              size="xl"
              style={{ color: "#ffc800" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TextInputApp;
