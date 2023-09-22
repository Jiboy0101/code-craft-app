import React, { useState } from 'react';
import { faMagnifyingGlass, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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
    onSendText(inputText); // Call the callback function with the input text
    setInputText('');
  };

  return (
    <div className='box'>
        <div className='searchbar'>
          <div className='back'>
            <FontAwesomeIcon
              onClick={toggleInput}
              icon={faMagnifyingGlass}
              size="xl"
              style={{ color: "#ffc800" }} />
          </div>
          {showInput && (
            <div className='suggestion'>
            <button>Get ACE Form</button>
            <button>Get ACE Form</button>
            <button>Get ACE Form</button>

            <div className='bar'>
              <input
                type="text"
                placeholder="Enter text..."
                value={inputText}
                onChange={handleInputChange} />
              <FontAwesomeIcon
                onClick={handleSendText}
                icon={faPaperPlane}
                size="xl" />
            </div>
            </div>
          )}
        </div>
      </div>
      
  );
}

export default TextInputApp;
