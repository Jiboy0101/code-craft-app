import React, { useState } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './App.css';

import iska from './pictures/iska-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion, faFileArrowDown, faKeyboard, faPaperPlane, faTimes, faKiss } from '@fortawesome/free-solid-svg-icons';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Get and call the Menu.js 
import Menu from './Menu/Menu';

// Get the response to a command
import Responses from './fileJSON/dataResponse.json'; 
import processesData from './fileJSON/processes.json'; 

// calling the button when commanding 
import YearButtons from './display/displayEnroll';
import Program from './display/displayProgram';
import About from './display/displayAbout';

// Install a font for ISKA name
import "@fontsource/krona-one"; 

import gifImage from './components/iska-ai.gif'; // Adjust the path to your GIF file


//BUILDINGS 
import Canteen from './buildings/canteen/canteen';
import Science from './buildings/science/science';
import Engineer from './buildings/engineering/engineer';

import Vr from './VRtour';




// Function for the searchInput 
function TextInputApp({ onSendText, microphoneHidden, toggleMicrophone, setMicrophoneHidden }) {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState('');

  // Handle of showing the searchInput
  const handleShowInput = () => {
    setShowInput(true);
    setMicrophoneHidden(true); // Hide the microphone button when input is shown
  };

  // Handle the close button 
  const handleCloseButtonClick = () => {
    setShowInput(false);
    setMicrophoneHidden(false); // Show the microphone button
  };

  // handle the input change in searchInput
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle the text when sending trigger
  const handleSendText = () => {
    onSendText(inputText);
    setInputText('');
    
  };


  // Returning and displaying the searchInput 
  return (
    <div className='input'>
      {!showInput && ( // Conditionally render the faKeyboard icon when showInput is false
        <FontAwesomeIcon
          className="keyBoard"
          onClick={handleShowInput} // Showing searchInput
          icon={faKeyboard}
          size="xl"
          style={{ color: '#ffc800' }}
        />
      )}
      <div>
        {showInput && (
        <div className="center-input">
          <div className='closed-back'>
            <FontAwesomeIcon
              onClick={handleCloseButtonClick} // Close button or back to show microphone
              icon={faMicrophone}
              size="2xl"
              style={{ color: '#ffc800' }}
            />
          </div>
          <input
            type="text"
            placeholder="Type a keyword..."
            value={inputText}
            onChange={handleInputChange} // input when change and typing in searchInput
          />
          <div className="center-icon">
            <div className='send'>
              <FontAwesomeIcon
                onClick={handleSendText} // Sending the input of user
                icon={faPaperPlane}
                size="2xl"
                style={{ color: '#ffc800' }}
              />
            </div>
          </div>
        </div>
      )}
      </div>
      
      {microphoneHidden && !showInput && ( // hide the microphone and show the searchInput
        <FontAwesomeIcon
          onClick={() => toggleMicrophone(false)}
          icon={faMicrophone}
          size="sm"
          style={{
            "--fa-primary-color": "#ffffff",
            "--fa-secondary-color": "#ffffff",
          }}
        />
      )}
    </div>
  );
}

// Set the virtual file system for pdfMake
pdfMake.vfs = pdfFonts.pdfMake.vfs;



export default function DOM() {
 // State for controlling speech activation
const [speechActive, setSpeechActive] = useState(false);
// State for displaying text on the screen
const [displayTextOnScreen, setDisplayTextOnScreen] = useState('');
// State for controlling the visibility of the reset button
const [resetButtonVisible, setResetButtonVisible] = useState(false);
// State for controlling the visibility of the download button
const [downloadButtonVisible, setDownloadButtonVisible] = useState(false);
// State to control the visibility of the question list
const [showQuestions, setShowQuestions] = useState(false);

const [showVirtual, setVirtual] = useState(false);

// State for controlling the visibility of the year button
const [yearbutton, setYearButtonVisible] = useState(false);
// State for holding the selected year response
const [selectedYearResponse, setSelectedYearResponse] = useState('');
// State for displaying other text
const [otherText, displayOtherText] = useState('');
// State for controlling the visibility of programs button
const [programsButton, setProgramsButton] = useState(false);
// State for holding the selected program response
const [programsResponse, setSelectedProgram] = useState('');
// State for controlling the visibility of about buttons
const [aboutButtons, setAboutVisible]= useState(false);
// State for holding the about response
const [aboutResponse, setAboutResponse] = useState('');
// State for tracking if a response is displayed
const [responseDisplayed, setResponseDisplayed] = useState(false);
// State for controlling the visibility of the microphone
const [microphoneHidden, setMicrophoneHidden] = useState(false);
// State for tracking if a command is recognized
const [commandRecognized, setCommandRecognized] = useState(false);
const [recognizedProcessText, setRecognizedProcessText] = useState(' ');
const [isQuestionIcon, setIsQuestionIcon] = useState(true);

//CANTEEN
const [canteenButton, setCanteenVisible] = useState(false);
const [canteenResponse, setCanteenResponse] = useState('');
//SCIENCE
const [scienceButton, setScienceVisible] = useState(false);
const [scienceResponse, setScienceResponse] = useState('');
//ENGINEER
const [engineerButton, setEngineerVisible] = useState(false);
const [engineerResponse, setEngineerResponse] = useState('');







  // function for generating the pdf file when download button is click
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

  // calling the response data from json file 

  const processes = processesData;


  const handleTextInput = (text) => {
    sendTextToCommands(text);
  };

// Function to handle a year button click event
const handleYearButtonClick = (year) => {
  const response = Responses[year];  // Retrieve the response associated with the selected year

    setSelectedYearResponse(response);
    setDownloadButtonVisible(true); // HIde the download button

  };

  // Function to handle a program button click event
  const handleProgramButtonClick = (programs) => {
    const program = Responses[programs];  // Retrieve the response associated with the selected year

    setSelectedProgram(program);
    setDownloadButtonVisible(true); // HIde the download button

  };

  // Function to handle a about button click event
  const handleAboutButtonClick = (about) => {
    const abouts = Responses[about];
    setAboutResponse(abouts);
    setDownloadButtonVisible(true); // HIde the download button

  };

  const handleCanteenButtonClick = (canteen) => {
    const canteenn = Responses[canteen];

    setCanteenResponse(canteenn);
    setDownloadButtonVisible(false);
  }

  const handleScienceButtonClick = (science) => {
    const sciencee = Responses[science];

    setScienceResponse(sciencee);
    setDownloadButtonVisible(false);
  }

  const handleEngineerButtonClick = (engineer) => {
    const engineerr = Responses[engineer];

    setEngineerResponse(engineerr);
    setDownloadButtonVisible(false);
  }

  // Function to display the text and speak it
  const displayText = (text) => {
    let message = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(message);

  };

  // Function for reset button event
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
    setResponseDisplayed(false);
    setRecognizedProcessText(false);
    setCanteenResponse(false);
    setCanteenVisible(false);
    setScienceVisible(false);
    setScienceResponse(false);

    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
  };

    // Function for toggleQuestions button event
  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
    setIsQuestionIcon(!isQuestionIcon);
  };

  const toggleVirtualtour = () => {
    setVirtual(!showVirtual);
  
  }


  

  const processesCommands = processes.map((get) => ({
    command: [`* ${get.name} *`, `${get.name} *`, `* ${get.name}`],
    callback: () => {
      resetTranscript();
      const recognitionText = [`${get.text}`]; // Access the "text" property from the JSON data
      displayText(`${get.response}`);
      setRecognizedProcessText(recognitionText);
      setResetButtonVisible(true);
      setDownloadButtonVisible(true);
    },
  }));
  
  // All the command user can ask for ISKA 
  const commands = [
    {
      command: ['hi', 'hello', 'hey', '* hello *', '* hello', 'hello *'],
      callback:() => {
        resetTranscript();
        displayText("Hello, I'm iska, how can I assist you?")
        const textDisplay = `Hello, I'm ISKA, how can I assist you?`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);
        setDownloadButtonVisible(false);
        setProgramsButton(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true);
        
        setResponseDisplayed(true);
        setCommandRecognized(true);

        setCanteenVisible(false);


      }

    },

    {
      command: ['what are you', 'who are you'],
      callback: () => {
        resetTranscript();
        displayText('Hi, I am iska, a P U P Lopez Virtual Assistant developed by the team Code Craft a 4th year B S I T students.');
        const textDisplay = `Hi, I am ISKA, a PUP Lopez Virtual Assistant developed by the team Code Craft a 4th year BSIT students.`;
        displayOtherText(textDisplay);
        setResetButtonVisible(true);
        setDownloadButtonVisible(false);
        setProgramsButton(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true);
        
        setResponseDisplayed(true);

        setCommandRecognized(true);

        setCanteenVisible(false);


      }

    },

    {
      command: ['* map *', 'map *', '* map', 'map', 'university map', 'map of the university', 'show university map'],
      callback: () => {
        resetTranscript();
        displayText('These is the map of P U P lopez quezon branch')
        setResetButtonVisible(true);
        setDownloadButtonVisible(false);
        setProgramsButton(false);


        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true);
        
        setResponseDisplayed(true);
        
        setCanteenVisible(false);

      },
    },
    {
      command: ['* enroll *', '* enroll', 'enroll *', 'enroll', 'enrollment', '* enrollment', 'enrollment *', '* enrollment *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setYearButtonVisible(true);
          displayText('Please choose from the options below to indicate the enrollment category you prefer')
          const textDisplay = `
          Please choose from the options below to indicate the enrollment category you prefer.
          `;
          displayOtherText(textDisplay);

        setResetButtonVisible(true);

        
        setDisplayTextOnScreen(false);

        setProgramsButton(false);
        setSelectedProgram(false);

        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);

        setResponseDisplayed(true); // Set responseDisplayed to true
        
        setCommandRecognized(true);

        setCanteenVisible(false);



        const textDisplayContainer = document.querySelector('.textOther');
        while (textDisplayContainer.firstChild) {
          textDisplayContainer.removeChild(textDisplayContainer.firstChild);
        }

        
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

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        setCanteenVisible(false);

        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }

      },
    },
    {
      command: ['About pup', '* about *', '* about', 'about *', '* about pup *', 'about pup *', '* about pup', 'about'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Here are some information about P U P Lopez. Please select below which one do you want to see.');
        const textDisplay = `
        Here are some information about P U P Lopez. Please select below which one do you want to see.
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

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        setCanteenVisible(false);

        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }

        
      },
    },
      
    {
      command: ['* programs', 'programs *', '* program', 'program *', 'program', 'programs', 'course *', '* course ', '* course *', 'course', 'courses', 'courses *', '* courses', '* programs *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setProgramsButton(true);
        displayText('The P U P Lopez offers a lots of programs its either Diploma or Bachelors Degree. Please select below which category do you want to see.');
        const textDisplay = `
        The P U P Lopez offers a lots of programs its either Diploma or Bachelors Degree. Please select below which category do you want to see.
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        setCanteenVisible(false);
        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
        
      },
    },

    {
      command: ['* canteen', '* canteen *', 'canteen', 'canteen *'],
      callback:() => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Canteen');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Canteen
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        setCanteenVisible(true);
        setCanteenResponse(false);
      }
    },

    {
      command: ['* science ', 'science *', '* science *', 'science'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Science Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Science Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);

        setScienceVisible(true);
        setScienceResponse(false);
      }
    },
    {
      command: ['* engineer', 'engineer *', '* engineer *', 'engineer', '* engineering', 'engineering *', '* engineering *', 'engineering', 'architecture', '* architecture', 'architecture *', '* arhitecture *'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Please select your nearest area in campus, so that I can assist you to show the way to Engineering and Architecture Building');
        const textDisplay = `
        Please select your nearest area in campus, so that I can assist you to show the way to Engineering and Architect Building
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed

        setProgramsButton(false);

        setYearButtonVisible(false);
        setSelectedYearResponse(false);

        setDisplayTextOnScreen(false);

        setAboutVisible(false);
        setAboutResponse(false);

        setSelectedProgram(false);

        setResponseDisplayed(true); // Set responseDisplayed to true

        setCommandRecognized(true);

        //CANTEEN
        setCanteenVisible(false);
        setCanteenResponse(false);
        //SCIENCE
        setScienceVisible(false);
        setScienceResponse(false);
        //ENGINEER
        setEngineerVisible(true);
        setEngineerResponse(false);

      }
    },
   // Also command for asking the locations
    ...processesCommands,
  
];

// Function for searchInput command
const sendTextToCommands = (text) => {
  const command = commands.find((cmd) => {
    if (typeof cmd.command === 'string') { // statement for command if its in lowercase and string
      return text.toLowerCase().includes(cmd.command.toLowerCase());
    } else if (Array.isArray(cmd.command)) {
      return cmd.command.some((phrase) =>
        text.toLowerCase().includes(phrase.toLowerCase())
      );
    }
    return false;
  });

  // statement for calling back the command response 
  if (command) {
    command.callback();
  } else {
    displayText('Sorry I currently do not have information about that.');
    const textDisplay = `Sorry I currently do not have information about that.`
    displayOtherText(textDisplay);
    
    setDownloadButtonVisible(false); // Display a message for unrecognized commands
    setResetButtonVisible(true);
    setAboutResponse(false);
    setAboutVisible(false);
    setDisplayTextOnScreen(false);
    setProgramsButton(false);
    setResponseDisplayed(false);
    setSelectedProgram(false);
    setSelectedYearResponse(false);
    setYearButtonVisible(false);
    
  }
};
  // Function for the transcript and resetting it and use speechRecognition when commanding or asking
  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  // Function for listening to saying
  const startListening = () => {
    SpeechRecognition.startListening();
    setSpeechActive(true);
  };

  // Function for stop commanding
  const stopListening = () => {
    SpeechRecognition.stopListening();
    setSpeechActive(false);
  };

  // Function for handling the textInput 
  const handleTextInputClick = (e) => {
    const targetClassName = e.target.classList;

    // Check if the magnifying glass icon was clicked
    if (targetClassName.contains('faMagnifyingGlass')) {
      setMicrophoneHidden(!microphoneHidden); // Toggle the value of microphoneHidden
    }
  };

  // Displaying in the website
  return (
    <div className="App">
      <header className='header'>
      <div className='left-icons'>
      <Menu/>
      <div className="reset-button">
          {resetButtonVisible && (
            <FontAwesomeIcon onClick={resetDisplay} icon={faHome} size="xl" style={{color: "#ffc800",}}/>
          )}
        </div>
      </div>
      <div className='logo-name'>
    <img src={iska} alt="PUP Logo" className="logo" />
    <div className='app-neym'>
    <h1 className='app-name'>
        IS<span>KA</span></h1>
    </div>
      <p className={responseDisplayed ? 'desc-hidden' : 'desc'}>
  Hi! I'm ISKA, PUP Virtual Assistant, how can I help you?
  <div className='ai'>
      <img src={gifImage} alt="Your GIF" />
    </div>
</p>
      </div>
      <div className='right-icon'>

      <FontAwesomeIcon className='questions' icon={isQuestionIcon ? faCircleQuestion : faTimes} size="2xl" style={{color: "#ffc800",}} onClick={toggleQuestions} />
      <FontAwesomeIcon className='virtual' icon={faKiss} size="2xl" onClick={toggleVirtualtour} />

      {showVirtual && (
        <div className='vr'>
        <Vr />
        </div>
      )

      }
      {showQuestions && (
        <div className="question-list">
          {/* Add your list of questions here */}
          <h6 className='note'>Try to ask these suggestions (Note: This list is not clickable)</h6>
          <p>- What are the available programs</p>
          <p>- Tell me about PUP</p>
          <p>- How to enroll</p>
          <p>- How to add subjects</p>
          <p>- How to change subjects</p>
          <p>- How to become academic achiever</p>
          <p>- How to apply for graduation</p>
          <p>- Where is the Nantes Building</p>
          <p>- Where is the Admission Office</p>
          <p>- Show university map</p>
          <p>- What can you do</p>
          {/* Add more questions as needed */}
        </div>
      )}
      </div>
      </header>

<div className='textOther'>
  { commandRecognized && ((otherText))}
  </div>
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
          {canteenButton && (
            <Canteen onCanteenButtonClick = {handleCanteenButtonClick} />
          )}
          {scienceButton && (
            <Science onScienceButtonClick = {handleScienceButtonClick} />
          )}
          {engineerButton && (
            <Engineer onEngineerButtonClick = {handleEngineerButtonClick} />
          )}
        </div>

        <div>
        <div className="otherResponse">
        {(selectedYearResponse || programsResponse || aboutResponse) && (
          <p className="displayResponse">{selectedYearResponse}{programsResponse}{aboutResponse}{canteenResponse}{scienceResponse}{engineerResponse}</p>         
        )}
        <p>{displayTextOnScreen}</p>
      </div>  
        </div>

        <div className="recognized-Text">
            {recognizedProcessText && (
              <p className="recognized-text-content">{recognizedProcessText}</p>
            )}
      </div>
      </div>

      <div className='download-container'>
      <div className='download-button'>
      {downloadButtonVisible && (
        <button onClick={generatePDF}> 
<FontAwesomeIcon  icon={faFileArrowDown}  size="xl" style={{"--fa-primary-color": "#fab005", "--fa-secondary-color": "#ffffff",}} /> </button>
      )}
      </div>

      </div>
      
      <div className='bottom'>
      <div className='transcript'>
      <p className="transcript-text" autoCorrect="off" spellCheck="true">{transcript}</p>
      </div>
      <div className="microphone">
      <div className="text-input" onClick={handleTextInputClick}>
      <TextInputApp
        onSendText={handleTextInput}
        microphoneHidden={microphoneHidden}
        setMicrophoneHidden={setMicrophoneHidden} // Pass the setMicrophoneHidden function as a prop
     />
    </div>
    <div className='mic'>
    {!microphoneHidden ? (
      speechActive ? (
      <FontAwesomeIcon className='stop' onClick={stopListening} icon={faMicrophone} beat style={{"--fa-primary-color": "#ffae00", "--fa-secondary-color": "#ffffff",}} />
      ) : (
      <FontAwesomeIcon className='start' onClick={startListening} icon={faMicrophone}  style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff",}} />
      )
      ) : null}
    </div>
      
      
      <div className='hide-this'>
      <FontAwesomeIcon
          className="keyBoard"
          icon={faKeyboard}
          size="xl"
          style={{ color: '#ffc800' }}
        />
      </div>
    </div>
      </div>
      
     
    </div>
  );
}


