import React, { useState } from 'react';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import './App.css';

import iska from './pictures/iska-logo.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion, faFileArrowDown, faKeyboard, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Get and call the Menu.js 
import Menu from './Menu/Menu'; 

// Get the response to a command
import Responses from './fileJSON/dataResponse.json'; 
import locationsData from './fileJSON/locations.json'; 
import processesData from './fileJSON/processes.json'; 

// calling the button when commanding 
import YearButtons from './display/displayEnroll';
import Program from './display/displayProgram';
import About from './display/displayAbout';

// insert the Map of PUP Lopez
import pupMap from './pictures/map.jpg';

// Install a font for ISKA name
import "@fontsource/krona-one"; 

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
    <div>
      {!showInput && ( // Conditionally render the faKeyboard icon when showInput is false
        <FontAwesomeIcon
          className="keyBoard"
          onClick={handleShowInput} // Showing searchInput
          icon={faKeyboard}
          size="2xl"
          style={{ color: '#ffc800' }}
        />
      )}
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

// Set the default map URL to pupMap
const defaultMapURL = pupMap;



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



  // desgning and make to zoom and pich  the image map of PUP Lopez
  const displayImage = (imageURL, width, height) => {
    let zoomLevel = 1;
    let initialDistance = 0;
    let initialScale = 1;
    let lastScale = 1;
    let panning = false;
    let lastX = 0;
    let lastY = 0; 
    const imgElement = document.createElement('img');
    imgElement.src = imageURL;
    imgElement.alt = 'Locations Map';
    imgElement.style.maxWidth = '100%';
    if (width) {
      imgElement.style.width = `${width}px`;
    }
    if (height) {
      imgElement.style.height = `${height}px`;
    }
    const applyZoom = () => {
      const scale = Math.max(0.1, Math.min(3, initialScale * zoomLevel));
      imgElement.style.transform = `scale(${scale}) translate(${lastX}px, ${lastY}px)`;
    };

    // Set the zoom of the image  
    const handleZoom = (event) => {
      if (event.touches && event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  
        const scaleFactor = distance / initialDistance;
        zoomLevel = lastScale * scaleFactor;
        applyZoom();
      }
    };
    // Set the pan move of the image
    const handlePanMove = (event) => {
      if (panning && event.touches.length === 2) {
        const currentX = (event.touches[0].clientX + event.touches[1].clientX) / 2 - imgElement.getBoundingClientRect().left;
        const currentY = (event.touches[0].clientY + event.touches[1].clientY) / 2 - imgElement.getBoundingClientRect().top;
        lastX += currentX - lastX;
        lastY += currentY - lastY;
        applyZoom();
      }
    };
  
    const handlePanEnd = () => {
      panning = false;
      lastScale = zoomLevel;
    };
  
    imgElement.addEventListener('gesturestart', (event) => {
      event.preventDefault();
    });
  
    imgElement.addEventListener('touchstart', (event) => {
      if (event.touches.length === 2) {
        initialDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        initialScale = lastScale;
      }
    });
  
    imgElement.addEventListener('touchmove', (event) => {
      if (event.touches.length === 2) {
        handleZoom(event);
      } else if (panning) {
        handlePanMove(event);
      }
    });
  
    imgElement.addEventListener('touchend', handlePanEnd);
    imgElement.addEventListener('touchcancel', handlePanEnd);
  
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
    textDisplayContainer.appendChild(imgElement);
  };

  // Set and displaying the Map in the screen
  const displayDefaultMap = (defaultMapURL, width, height) => {
    let zoomLevel = 1;
    let initialDistance = 0;
    let initialScale = 1;
    let lastScale = 1;
    let panning = false;
    let lastX = 0;
    let lastY = 0; 
    const imgElement = document.createElement('img');
    imgElement.src = defaultMapURL;
    imgElement.style.maxWidth = '100%';
    if (width) {
      imgElement.style.width = `${width}px`;
    }
    if (height) {
      imgElement.style.height = `${height}px`;
    }
    const applyZoom = () => {
      const scale = Math.max(0.1, Math.min(3, initialScale * zoomLevel));
      imgElement.style.transform = `scale(${scale}) translate(${lastX}px, ${lastY}px)`;
    };
  
    const handleZoom = (event) => {
      if (event.touches && event.touches.length === 2) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  
        const scaleFactor = distance / initialDistance;
        zoomLevel = lastScale * scaleFactor;
        applyZoom();
      }
    };
  
    const handlePanMove = (event) => {
      if (panning && event.touches.length === 2) {
        const currentX = (event.touches[0].clientX + event.touches[1].clientX) / 2 - imgElement.getBoundingClientRect().left;
        const currentY = (event.touches[0].clientY + event.touches[1].clientY) / 2 - imgElement.getBoundingClientRect().top;
        lastX += currentX - lastX;
        lastY += currentY - lastY;
        applyZoom();
      }
    };
  
    const handlePanEnd = () => {
      panning = false;
      lastScale = zoomLevel;
    };
  
    imgElement.addEventListener('gesturestart', (event) => {
      event.preventDefault();
    });
  
    imgElement.addEventListener('touchstart', (event) => {
      if (event.touches.length === 2) {
        initialDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        );
        initialScale = lastScale;
      }
    });
  
    imgElement.addEventListener('touchmove', (event) => {
      if (event.touches.length === 2) {
        handleZoom(event);
      } else if (panning) {
        handlePanMove(event);
      }
    });
  
    imgElement.addEventListener('touchend', handlePanEnd);
    imgElement.addEventListener('touchcancel', handlePanEnd);
  
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
    textDisplayContainer.appendChild(imgElement);
  };


  // function for generating the pdf file when download button is click
  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: '"ISKA" Virtual Assistant', style: 'header', alignment: 'center'},
        { text: displayTextOnScreen || selectedYearResponse || programsResponse || aboutResponse || displayImage, alignment: 'justify'},
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
  const locations = locationsData;
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

    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
  };

    // Function for toggleQuestions button event
  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
  };


    // Function for command location in map event
  const locationCommands = locations.map((location) => ({
    command: [`* ${location.name}`, `where is the ${location.name}`, `where is ${location.name}`, `where's the ${location.name}`, `where's ${location.name}`,
     `find ${location.name}`, `find the ${location.name}`, `locate the ${location.name}`, `locate ${location.name}`, `find ${location.name}`, `find the ${location.name}`, `room number ${location.name}`, `find room number${location.name}`, `find the room number${location.name}`, `where is the${location.name}`, `where is room number${location.name}`, `locate the room number${location.name}`, `locate room number${location.name}`, `where is room${location.name}`, `where's room${location.name}`, `room${location.name}`],
    callback: () => {
      resetTranscript();
      displayText(`Showing map for the ${location.name}. The get to the ${location.name}, here are the directions to follow. All the directions that I will give will start from the main gate. ${location.directions}`);
      displayImage(pupMap, 320, 470);
      setResetButtonVisible(true);
      setDownloadButtonVisible(false);
    },
  }));

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
        displayText("Hello, I'm iska, how can I help you?")
        const textDisplay = `Hello, I'm ISKA, how can I help you?`;
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
        
        displayDefaultMap(defaultMapURL, 320, 470);


        setAboutResponse(false);
        setAboutVisible(false);

        setSelectedYearResponse(false);
        setYearButtonVisible(false);

        setResponseDisplayed(true);
        
        setResponseDisplayed(true);
        
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

        displayDefaultMap(false);

        setCommandRecognized(true);


        
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

        displayDefaultMap(false);

        setCommandRecognized(true);
        
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

        displayDefaultMap(false);

        setCommandRecognized(true);
        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
        
      },
    },
   // Also command for asking the locations
    ...locationCommands,
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
    <div className="dom-page">
      <div className='left-icon'>
      <Menu/>
      </div>

      
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
    <header className='head'>
    <img src={iska} alt="PUP Logo" className="logo" />
      <h1 className='app-name'>IS<span>KA</span></h1>
      <p className={responseDisplayed ? 'desc-hidden' : 'desc'}>
  Hi! I'm ISKA, PUP Virtual Assistant, how can I help you?
</p>

<div className='textOther'>
  { commandRecognized && ((otherText))}</div>

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
          <p className="displayResponse">{selectedYearResponse}{programsResponse}{aboutResponse}</p>         
        )}
      </div>  
        </div>
        
        <div className="display-text">
          {displayTextOnScreen && (
            <p className="display-text-content">{displayTextOnScreen}</p>
          )}
        </div>

        <div className="recognized-Text">
            {recognizedProcessText && (
              <p className="recognized-text-content">{recognizedProcessText}</p>
            )}
      </div>
      </div>

      
      
      <div className='download-button'>
      <div className='download-button2'>
      {downloadButtonVisible && (
        <button onClick={generatePDF}> 
<FontAwesomeIcon  icon={faFileArrowDown}  size="xl" style={{"--fa-primary-color": "#fab005", "--fa-secondary-color": "#ffffff",}} /> </button>
      )}
      </div>

        
      </div>



      <footer className="microphone">
      <Menu/>
      <div className='transcript'>
      <p className="transcript-text" autoCorrect="off" spellCheck="true">{transcript}</p>
      </div>
      {!microphoneHidden ? (
      speechActive ? (
      <FontAwesomeIcon className='stop' onClick={stopListening} icon={faMicrophone} beat size="sm" style={{"--fa-primary-color": "#ffae00", "--fa-secondary-color": "#ffffff",}} />
      ) : (
      <FontAwesomeIcon className='start' onClick={startListening} icon={faMicrophone} size="sm" style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff",}} />
      )
      ) : null}
      <div className="text-input" onClick={handleTextInputClick}>
      <TextInputApp
        onSendText={handleTextInput}
        microphoneHidden={microphoneHidden}
        setMicrophoneHidden={setMicrophoneHidden} // Pass the setMicrophoneHidden function as a prop
     />
    </div>
    </footer>
     
    </div>
  );
}


