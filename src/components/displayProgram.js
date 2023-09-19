import React, { useState } from 'react';
import './displayDesign.css';

function Programs({ onProgramClick }) {
  const [activeProgram, setActiveProgram] = useState(null);

  const speakText = (text, program) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speech);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
    
    setActiveProgram(program); // Set the active program when a button is clicked
  };

  return (
    <div className='choices-button'>
      <button
        onClick={() => { onProgramClick('bachelor'); speakText('These is the list of programs available in Bachelors Degree here at Lopez Quezon', 'bachelor'); }}
        className={activeProgram === 'bachelor' ? 'active' : ''}
      >
        Bachelors
      </button>
      <button
        onClick={() => { onProgramClick('diploma'); speakText('These is the list of Diploma programs offers here at Lopez Quezon', 'diploma'); }}
        className={activeProgram === 'diploma' ? 'active' : ''}
      >
        Diploma
      </button>
    </div>
  );
}

export default Programs;
