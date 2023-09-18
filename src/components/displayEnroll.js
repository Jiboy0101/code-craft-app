import React from 'react';
import './displayEnroll.css';

function YearButtons({ onYearButtonClick }) {

 

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speech);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  };

  return (
    <div className='year-button'>
       <button onClick={() => { onYearButtonClick('regular'); speakText('Here is how to enroll as a regular student');}}>REGULAR</button>
      <button onClick={() => { onYearButtonClick('irregular'); speakText('Here is how to enroll as a irregular student');}}>IRREGULAR</button>
      <button onClick={() => { onYearButtonClick('transferee'); speakText('Here is how to enroll as a transferee student');}}>TRANSFEREE</button>
      <button onClick={() => { onYearButtonClick('freshmen'); speakText('Here is the process to enroll as a freshmen student'); }}>FRESHMEN</button>
     
    </div>
  );
}

export default YearButtons;
