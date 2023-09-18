import React from 'react';
import './displayEnroll.css';

function Programs({ onProgramClick }) {

 

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
       <button onClick={() => { onProgramClick('bachelor'); speakText('These is the list of programs available in Bachelors Degree here at Lopez Quezon');}}>Bachelors</button>
      <button onClick={() => { onProgramClick('diploma'); speakText('These is the list of Diploma programs offers here at Lopez Quezon');}}>Diploma</button>
      
    </div>
  );
}

export default Programs;
