import React from 'react';
import './displayDesign.css';

function About({ onAboutClick }) {

 

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
       <button onClick={() => { onAboutClick('history'); speakText('These is the history of P U P');}}>History</button>
      <button onClick={() => { onAboutClick('mission'); speakText('Here is the mission of P U P');}}>PUP Mission</button>
      <button onClick={() => { onAboutClick('vision'); speakText('Here is the vision of P U P, P U P The National Polytechnic University ');}}>PUP Vision</button>
      <button onClick={() => { onAboutClick('hymn'); speakText('Here is the P U P Hymn by S. Calabig, S. Roldan, and R. Amaranto');}}>PUP Hymn</button>
    </div>
  );
}

export default About;
