import React, { useState } from 'react';
import {faMagnifyingGlass,faPaperPlane} from '@fortawesome/free-solid-svg-icons';
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
    <div className='search'>
      <FontAwesomeIcon onClick={toggleInput} icon={faMagnifyingGlass} size="xl" style={{color: "#ffc800",}} />
      {showInput && (
        <div>
          <input
            type="text"
            placeholder="Enter text..."
            value={inputText}
            onChange={handleInputChange}
          />
          <div>
          <FontAwesomeIcon onClick={handleSendText} icon={faPaperPlane} size="xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default TextInputApp;