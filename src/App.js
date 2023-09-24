import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import iska from './pictures/iska-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion, faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Menu from './components/Menu';
import TextInputApp from './components/textInput';
import Responses from './components/dataResponse.json';
import YearButtons from './components/displayEnroll';
import Program from './components/displayProgram';
import About from './components/displayAbout';
import MapDisplay from './maps/MapDisplay';
import locationsData from './fileJSON/locations.json'; // Import the JSON data

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function DOM() {
  const [speechActive, setSpeechActive] = useState(false);

  const [displayTextOnScreen, setDisplayTextOnScreen] = useState('');

  const [resetButtonVisible, setResetButtonVisible] = useState(false);

  const [downloadButtonVisible, setDownloadButtonVisible] = useState(false);

  const [showQuestions, setShowQuestions] = useState(false); // State to control question list visibility

  const [yearbutton, setYearButtonVisible] = useState(false);
  const [selectedYearResponse, setSelectedYearResponse] = useState('');

  const [otherText, displayOtherText] = useState('');

  const [programsButton, setProgramsButton] = useState(false);
  const [programsResponse, setSelectedProgram] = useState('');

  const [aboutButtons, setAboutVisible]= useState(false);
  const [aboutResponse, setAboutResponse] = useState('');


  const [mapPopupOpen, setMapPopupOpen] = useState(false);


  const openMap = () => {
    setMapPopupOpen(true);
  };

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: '"ISKA" Virtual Assistant', style: 'header', alignment: 'center'},
        { text: displayTextOnScreen || selectedYearResponse || programsResponse || aboutResponse, alignment: 'justify'},
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

  const locations = locationsData;

  const handleYearButtonClick = (year) => {
    const response = Responses[year];
    setSelectedYearResponse(response);
    setDownloadButtonVisible(true); // HIde the download button

  };

  const handleProgramButtonClick = (programs) => {
    const program = Responses[programs];
    setSelectedProgram(program);
    setDownloadButtonVisible(true); // HIde the download button

  };

  const handleAboutButtonClick = (about) => {
    const abouts = Responses[about];
    setAboutResponse(abouts);
    setDownloadButtonVisible(true); // HIde the download button

  };


  const displayText = (text) => {
    let message = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(message);

  };

  const resetDisplay = () => {
    setDisplayTextOnScreen('');
    setResetButtonVisible(false); // Hide the reset button
    setDownloadButtonVisible(false); // Hide the download button
    setYearButtonVisible(false);
    setSelectedYearResponse(false);
    displayOtherText(false);
    setSelectedProgram(false);
    setProgramsButton(false);
    setAboutResponse(false);
    setAboutVisible(false);
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
  };

  const displayImage = (imageFilename) => {
    const imageElement = (
      <img
      src={iska}
      alt="ISKA Logo"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
  
    setDisplayTextOnScreen(imageElement);
  };

  
  const locationCommands = locations.map((location) => ({
    command: [`where is the ${location.name}`, `where is ${location.name}`, `locate ${location.name}`, `locate the ${location.name}`, `find the ${location.name}`,  `find ${location.name}`, `room number ${location.name}`, `find room number ${location.name}`,`find the room number ${location.name}`, `where is room number ${location.name}`, `where is the room number ${location.name}`, `locate the room number ${location.name}`, `locate room number ${location.name}`, `where is the room ${location.name}`, `where is room ${location.name}`, `room ${location.name}`],
    callback: () => {
      resetTranscript();
      displayText(`Showing map for the ${location.name}. The get to the ${location.name}, here are the directions to follow. All the directions that I will give will start from the main gate. ${location.directions}`);
      openMap();

    },
  }));

  

  const commands = [
    {
      command: ['* enroll *', '* enroll', 'enroll *', 'enroll', 'enrollment', '* enrollment', 'enrollment *', '* enrollment *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setYearButtonVisible(true);
          displayText('Please select below which level do you want to enroll')
          const textDisplay = `
          Please select below which level do you want to enroll.
          `;
          displayOtherText(textDisplay);

        setResetButtonVisible(true);

        
        setDisplayTextOnScreen(false);

        setProgramsButton(false);
        setSelectedProgram(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);


        
      },
    },

    {
      command: ['* do *', '* do', 'do *', 'do'],
      callback: () => {
        resetTranscript();
        displayText('There are various things that i can do. Below are the detailed list.');
        const textDisplay = `
        There are various things that i can do. Below are the detailed list.
          `;
        const text = `
        What I Can Do?
        - Answer Questions.
        - Show Processes.
        - Show Programs Available.
        - Recite PUP Mission and Vission.
        - Play PUP Hymn.
        - Show Directions.
        - Download Reports.
        - Open PUP Website.
        - Open PUP SIS.
        - I can provide anything about PUP Lopez. 
        `;
        displayOtherText(textDisplay);
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true);
        setDownloadButtonVisible(false);
        setProgramsButton(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);


      },
    },
    {
      command: ['About pup', '* about *', '* about', 'about *', '* about pup *', 'about pup *', '* about pup', 'about'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Here is all you want to know about P U P Lopez');
        const textDisplay = `
        Here is all you want to know about P U P Lopez.
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed
        setAboutVisible(true);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setProgramsButton(false);
        setSelectedProgram(false);

        setAboutResponse(false);

        
      },
    },
      
    {
      command: ['* programs', 'programs *', '* program', 'program *', 'program', 'programs', 'course *', '* course ', '* course *', '* programs *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setProgramsButton(true);
        displayText('The P U P Lopez offers a lots of programs its either Diploma or Bachelors Degree.');
        const textDisplay = `
        The PUP Lopez offers a lots of programs its either Diploma or Bachelors Degree.
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);
       
        
      },
    },
    {
      command: ['show * map *', '* display image', 'show picture *', 'display picture *', 'show * image *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayImage('iska-logo.png'); // Function to display the image with the specified filename
        const textDisplay = 'Here is an image:';
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed
        setYearButtonVisible(false);
        setSelectedYearResponse(false);
        setDisplayTextOnScreen(false);
        setProgramsButton(false);
        setSelectedProgram(false);
        setAboutResponse(false);
      },
    },
    ...locationCommands,
    

    
  
];

const sendTextToCommands = (text) => {
  const command = commands.find((cmd) => {
    if (typeof cmd.command === 'string') {
      return text.toLowerCase().includes(cmd.command.toLowerCase());
    } else if (Array.isArray(cmd.command)) {
      return cmd.command.some((phrase) =>
        text.toLowerCase().includes(phrase.toLowerCase())
      );
    }
    return false;
  });

  if (command) {
    command.callback();
  } else {
    displayText('Command not recognized');
    setDownloadButtonVisible(false); // Display a message for unrecognized commands
  }
};




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
      <div className='left-icon'>
      <Menu/>
      </div>

<MapDisplay  isOpen={mapPopupOpen} onClose={() => setMapPopupOpen(false)} />
      
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
          <p>Available Programs</p>
          <p>About the PUP</p>
          <p>How to enroll</p>
          <p>What can you do?</p>
          {/* Add more questions as needed */}
        </div>
      )}
    <header className='head'>
    <img src={iska} alt="PUP Logo" className="logo" />
      <h1 className='app-name'>ISKA</h1>
      <p className='desc'>Hi! I'm ISKA, PUP Virtual Assistant, how can I help you?</p>
      <div className='textOther'>
      <div className='otherText'>{otherText}</div>

      </div>
    </header>
      

      <div className='container'>
        <div className='buttons'>
          {yearbutton && (
            <YearButtons onYearButtonClick={handleYearButtonClick}  />
                  )}
          {programsButton && (
            <Program onProgramClick={handleProgramButtonClick} />
          ) }
          { aboutButtons && (
            <About onAboutClick={handleAboutButtonClick} />
          )}
        </div>

        <div>
        <div className="otherResponse">
        {(selectedYearResponse || programsResponse || aboutResponse) && (
          <p className="displayResponse">{selectedYearResponse}{programsResponse}{aboutResponse}{displayImage}</p>         
        )}
      </div>  
        </div>
        
        <div className="display-text">
          {displayTextOnScreen && (
            <p className="display-text-content">{displayTextOnScreen}</p>
          )}
        </div>
      </div>
      
      <div className='download-button'>
      <div className='download-button2'>
      {downloadButtonVisible && (
        <button onClick={generatePDF}> 
<FontAwesomeIcon  icon={faFileArrowDown}  size="xl" style={{"--fa-primary-color": "#fab005", "--fa-secondary-color": "#ffffff",}} />  Download</button>
      )}
      </div>

        
      </div>



      <footer className="microphone">

      <div className='transcript'>
      <p className="transcript-text" autoCorrect="off" spellCheck="true">{transcript}</p>
      </div>
      <div className='speak'>
      {speechActive ? (
        <FontAwesomeIcon className='stop' onClick={stopListening} icon={faMicrophone} beat size="sm" style={{"--fa-primary-color": "#ffae00", "--fa-secondary-color": "#ffffff",}} />
      ) : (
        <FontAwesomeIcon className='start' onClick={startListening} icon={faMicrophone} size="sm" style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff",}} />
      )}
      </div>
      
      <div className='text-input'>
      <TextInputApp onSendText={sendTextToCommands} />

      </div>
      </footer>
     
    </div>
  );
}


