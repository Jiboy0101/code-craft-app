import React from 'react';
import './displayDesign.css';

function suggestButton({ onClick }) {
  return (
    <div className='suggestButton'>
    <button onClick={onClick}>Additional Button</button>
    <button onClick={onClick}>Additional Button</button>
    <button onClick={onClick}>Additional Button</button>
    </div>
    
  );
}

export default suggestButton;
