import React, { useState } from 'react';
import './displayDesign.css';

function YearButtons({ onYearButtonClick }) {
  const [activeYear, setActiveYear] = useState(null);

  const speakText = (text, year) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speech);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
    
    setActiveYear(year); // Set the active year when a button is clicked
  };

  return (
    <div className='choices-button'>
      <button
        onClick={() => { onYearButtonClick('regular'); speakText('Here is the process to enroll for regular student. Please take your time to be guided with the steps. Good Luck', 'regular'); }}
        className={activeYear === 'regular' ? 'active' : ''}
      >
        REGULAR
      </button>
      <button
        onClick={() => { onYearButtonClick('irregular'); speakText('Here is the process to enroll for irregular student. Please take your time to be guided with the steps. Good Luck', 'irregular'); }}
        className={activeYear === 'irregular' ? 'active' : ''}
      >
        IRREGULAR
      </button> 
      <button
        onClick={() => { onYearButtonClick('transferee'); speakText('Here is the process to enroll as a transferee student to our university. Follow the steps below and you can definitely be one of us! Please take your time to be guided with the steps. Good Luck, Congrats and Welcome in Advance.', 'transferee'); }}
        className={activeYear === 'transferee' ? 'active' : ''}
      >
        TRANSFEREE
      </button>
      <button
        onClick={() => { onYearButtonClick('freshmen'); speakText('Here is the process to enroll as a freshmen student to our university. Follow the steps below and you can definitely be one of us! Please take your time to be guided with the steps. Good Luck, Congrats and Welcome in Advance.', 'freshmen'); }}
        className={activeYear === 'freshmen' ? 'active' : ''}
      >
        FRESHMEN
      </button>
    </div>
  );
}

export default YearButtons;
