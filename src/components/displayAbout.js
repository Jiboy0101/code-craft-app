import React, { useState } from 'react';
import './displayDesign.css';

function About({ onAboutClick }) {
  const [activeTab, setActiveTab] = useState(null);

  const speakText = (text, tab) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speech);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
    
    setActiveTab(tab); // Set the active tab when a button is clicked
  };

  return (
    <div className='choices-button'>
      <button
        onClick={() => { onAboutClick('history'); speakText('These is the history of P U P', 'history'); }}
        className={activeTab === 'history' ? 'active' : ''}
      >
        History
      </button>
      <button
        onClick={() => { onAboutClick('mission'); speakText('Here is the mission of P U P', 'mission'); }}
        className={activeTab === 'mission' ? 'active' : ''}
      >
        PUP Mission
      </button>
      <button
        onClick={() => { onAboutClick('vision'); speakText('Here is the vision of P U P, P U P The National Polytechnic University', 'vision'); }}
        className={activeTab === 'vision' ? 'active' : ''}
      >
        PUP Vision
      </button>
      <button
        onClick={() => { onAboutClick('hymn'); speakText('Here is the P U P Hymn write by Calabig, Roldan and Amaranto', 'hymn'); }}
        className={activeTab === 'hymn' ? 'active' : ''}
      >
        PUP Hymn
      </button>
    </div>
  );
}

export default About;
