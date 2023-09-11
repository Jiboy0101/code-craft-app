import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import iska from './pictures/iska-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function DOM() {
  const [speechActive, setSpeechActive] = useState(false);
  const [displayTextOnScreen, setDisplayTextOnScreen] = useState('');
  const [resetButtonVisible, setResetButtonVisible] = useState(false);
  const [downloadButtonVisible, setDownloadButtonVisible] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false); // State to control question list visibility

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: 'ISKA Displayed Text', style: 'header' },
        { text: displayTextOnScreen },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('iska_displayed_text.pdf');
  };

  const displayText = (text) => {
    let message = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(message);
    setDownloadButtonVisible(true); // Show the download button
  };

  const resetDisplay = () => {
    setDisplayTextOnScreen('');
    setResetButtonVisible(false); // Hide the reset button
    setDownloadButtonVisible(false); // Hide the download button
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
  };

  const commands = [
    {
      command: 'how to enroll',
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Here is how to enroll in P U P Lopez, Quezon');
        setDisplayTextOnScreen('Lorem Ipsum is simply dummy text...');
        setResetButtonVisible(true); // Show the reset button after a command is executed
      },
    },
    {
      command: 'What can you do',
      callback: () => {
        resetTranscript();
        displayText('I can do various things.');
        setDisplayTextOnScreen('I can help you in every related Questions about PUP.');
        setResetButtonVisible(true);
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
      <div className='top-button'>
        <div className="reset-button">
          {resetButtonVisible && (
            <FontAwesomeIcon onClick={resetDisplay} icon={faHome} size="2xl" />
          )}
          <div>
            <FontAwesomeIcon className='questions' icon={faCircleQuestion} size="2xl" onClick={toggleQuestions} />
          </div>
        </div>
      </div>

      {showQuestions && (
        <div className="question-list">
          {/* Add your list of questions here */}
          <p>Question 1: How to do XYZ?</p>
          <p>Question 2: What is ABC?</p>
          {/* Add more questions as needed */}
        </div>
      )}

      <img src={iska} alt="PUP Logo" className="logo" />
      <h1 className='app-name'>ISKA</h1>
      <p className='desc'>Hi! I'm ISKA, PUP Virtual Assistant, how can I help you?</p>
      {downloadButtonVisible && (
        <button onClick={generatePDF}>Download as PDF</button>
      )}
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
