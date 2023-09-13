import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import iska from './pictures/iska-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Menu from './components/Menu';

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
        { text: '"ISKA" Virtual Assistant', style: 'header', alignment: 'center'},
        { text: displayTextOnScreen, alignment: 'justify'},
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
      },
    };

    pdfMake.createPdf(docDefinition).download('iska-web-app.pdf');
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
        const text = `
          1. FRESHMAN ADMISSION
              The OAS processes and facilitates the enrollment applications of those who passed the PUPCET. The Office evaluates the authenticity of the applicant's application documents and the applicant's qualifications for admission, adhering to the University admission requirements/criteria.
        
          Steps to follow
              1. Visit the PUP website. Apply for PUP College Entrance Test through the iApply, read the information provided and click the iApplyNow button.https://iapply.pup.edu.ph
              2. Click proceed to begin your on-line registration and select your intended campus and program, then submit the on-line application.
              3. Upon successful submission of your on-line application, go to Display Voucher to print your Payment Voucher.
              4. Go to the nearest LandBank Branch to remit payment via online collection or pay directly to the Cashier Office of the Branch.
              5. Claim ePermit on-line. Allow five (5) working days after payment to LandBank before claiming your Test Permit online.
              6. Go to PUP Testing Center 30 minutes before your time schedule as printed in your PUPCET Test Permit.
              Visit the PUP website to check your score and online confirmation of the schedule date of processing of admission credentials, interview and enrolment.
              8. Fill out the Student ww.pup.edu.ph Admission Records Form 1 (SAR Form1).
              9. Click the PRINT button to print the SAR Form 1 with Route and Approval Slip.
              10. On the scheduled date of processing your credentials, follow the steps in enrolment as indicated in you SAR Form.
              11. For ALS qualities and those high school graduates whose final grade in English is 80 or lower.
              
              REGULAR STUDENT ADMISSION 

          3.ADMISSION OF TRANSFEEREES FROM ANOTHER SCHOOL
              The OAS processes and facilities transfer of students, preferably incoming 2nd Year, from another school or University to PUP, subject to the availability of slots and upon the approval of the Branch/Campus Director. PUP accepts transfer students from another school every first semester only.

              Fees: P300.00 (from State Colleges and Universities)
                    P500.00 (from Private School)
                    
          Steps to follow
          1. Submit transfer credentials for evaluation 
          2. Upon approval of Office of evaluated credentials, proceed to Office of the Student Affairs and Services for schedule of Psychological Examination.
          3. Proceed to the Cashier Office for Payment of Psychological Exam.
          4. Take the Psychological Exam.
          5. Proceed to Registrar Office and submit admission credentials for evaluation.
          6. Proceed to the Office of the Academic Programs/College of choice and copy the subjects.
          7. Send R-zero to OVPBC for tagging of subjects.
          8. Proceed to Cashier’s Office for Payment of tuition fee.
          9. Proceed to the Admission Office for printing of Registration Certificate and ID processing.
           `;
        displayText('Here is how to enroll in P U P LQ');
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true); // Show the reset button after a command is executed
      },
    },
    
    {
      command: 'what can you do',
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
      <div className='icon-button'>
        <div className="reset-button">
          {resetButtonVisible && (
            <FontAwesomeIcon onClick={resetDisplay} icon={faHome} size="xl" style={{color: "#ffc800",}}/>
          )}
          
            <FontAwesomeIcon className='questions' icon={faCircleQuestion} size="2xl" style={{color: "#ffc800",}} onClick={toggleQuestions} />
          
        </div>
      </div>

      {showQuestions && (
        <div className="question-list">
          {/* Add your list of questions here */}
          <h6 className='note'>Try to ask these suggestions (Note: This list is not clickable)</h6>
          <p>How to enroll?</p>
          <p>What can you do?</p>
          <p>Recite PUP Vision</p>
          <p>Recite PUP Mission</p>
          <p>Give the PUP Hymn</p>
          <p>How to request of good moral</p>
          <p>How to get School ID</p>
          <p>How to process INC grades</p>
          <p>Show programs available</p>
          {/* Add more questions as needed */}
        </div>
      )}

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
      <div className='download-button'>
      <div className='download-button2'>
      {downloadButtonVisible && (
        <button> 
<FontAwesomeIcon onClick={generatePDF} icon={faFileArrowDown}  size="xl" style={{"--fa-primary-color": "#fab005", "--fa-secondary-color": "#ffffff",}} />  Download</button>
      )}
      </div>
        
      </div>

      
      <footer className="microphone">
      <Menu/>
      <div className='transcript'>
      <p className="transcript-text">{transcript}</p>
      </div>
      {speechActive ? (
        <FontAwesomeIcon className='stop' onClick={stopListening} icon={faMicrophone} beat size="sm" style={{"--fa-primary-color": "#ffae00", "--fa-secondary-color": "#ffffff",}} />
      ) : (
        <FontAwesomeIcon className='start' onClick={startListening} icon={faMicrophone} size="sm" style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff",}} />
      )}
      </footer>
     
    </div>
  );
}
