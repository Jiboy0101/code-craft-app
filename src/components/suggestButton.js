// SuggestButton.js
import React from 'react';
import './displayDesign.css'

function SuggestButton({ onButtonClick }) {
  const handleClick = (buttonName) => {
    onButtonClick(buttonName); // Call the onButtonClick callback with the buttonName
  };

  return (
    <div className='suggestButton'>
      <button onClick={() => handleClick("freshmen")}>Freshmen</button>
      <button onClick={() => handleClick("button1")}>Button 1</button>
      <button onClick={() => handleClick("button2")}>Button 2</button>
    </div>
  );
}

export default SuggestButton;
