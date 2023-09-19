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
        onClick={() => { onYearButtonClick('regular'); speakText('Here is how to enroll as a regular student', 'regular'); }}
        className={activeYear === 'regular' ? 'active' : ''}
      >
        REGULAR
      </button>
      <button
        onClick={() => { onYearButtonClick('irregular'); speakText('Here is how to enroll as an irregular student', 'irregular'); }}
        className={activeYear === 'irregular' ? 'active' : ''}
      >
        IRREGULAR
      </button>
      <button
        onClick={() => { onYearButtonClick('transferee'); speakText('Here is how to enroll as a transferee student', 'transferee'); }}
        className={activeYear === 'transferee' ? 'active' : ''}
      >
        TRANSFEREE
      </button>
      <button
        onClick={() => { onYearButtonClick('freshmen'); speakText('Here is the process to enroll as a freshmen student', 'freshmen'); }}
        className={activeYear === 'freshmen' ? 'active' : ''}
      >
        FRESHMEN
      </button>
    </div>
  );
}

export default YearButtons;
