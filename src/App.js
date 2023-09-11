import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import iska from './pictures/iska-logo.png';

// Import Font Awesome icons and CSS (you need to include Font Awesome in your project)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default function DOM() {
  const [speechActive, setSpeechActive] = useState(false);
  const [displayTextOnScreen, setDisplayTextOnScreen] = useState('');
  const [resetButtonVisible, setResetButtonVisible] = useState(false);

  const displayText = (text) => {
    let message = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(message);
  };

  const resetDisplay = () => {
    setDisplayTextOnScreen('');
    setResetButtonVisible(false); // Hide the reset button
  };

  const commands = [
    {
      command: 'how to enroll',
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Here is how to enroll in P U P Lopez, Quezon');
        setDisplayTextOnScreen('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.')
        setResetButtonVisible(true); // Show the reset button after a command is executed
      },
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const startListening = () => {
    SpeechRecognition.startListening();
    setSpeechActive(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setSpeechActive(false);
  };

  return (
    <div className="dom-page">
      <div className="reset-button">
        {resetButtonVisible && (
          <button onClick={resetDisplay}>
            <FontAwesomeIcon icon={faHome} />
          </button>
        )}
        <div className='questions'>
          <button><FontAwesomeIcon icon={faCircleQuestion} /></button>
        </div>
      </div>
      <img src={iska} alt="PUP Logo" className="logo" />
      <h1 className='app-name'>ISKA</h1>
      <p className='desc'>Hi! I'm ISKA, PUP Virtual Assistant, how can I help you?</p>
      <div className='container'>
        <div className="display-text">
          {displayTextOnScreen && (
            <p className="display-text-content">{displayTextOnScreen}</p>
          )}
        </div>
      </div>
      <p className="transcript-text">{transcript}</p>
      {speechActive ? (
        <FontAwesomeIcon className='stop' onClick={stopListening} icon={faMicrophone} beat size="sm" style={{"--fa-primary-color": "#ffae00", "--fa-secondary-color": "#ffffff",}} />
      ) : (
        <FontAwesomeIcon className='start' onClick={startListening} icon={faMicrophone} size="sm" style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff",}} />
      )}
    </div>
  );
}
