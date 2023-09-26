import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';
import iska from './pictures/iska-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faHome, faCircleQuestion, faFileArrowDown, faKeyboard, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Menu from './components/Menu';
import Responses from './fileJSON/dataResponse.json';
import YearButtons from './components/displayEnroll';
import Program from './components/displayProgram';
import About from './components/displayAbout';
import locationsData from './fileJSON/locations.json'; // Import the JSON data
import pupMap from './pictures/map.jpg';
import "@fontsource/krona-one"; 

function TextInputApp({ onSendText, microphoneHidden, toggleMicrophone, setMicrophoneHidden }) {
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleShowInput = () => {
    setShowInput(true);
    setMicrophoneHidden(true); // Hide the microphone button when input is shown
  };

  const handleCloseButtonClick = () => {
    setShowInput(false);
    setMicrophoneHidden(false); // Show the microphone button
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendText = () => {
    onSendText(inputText);
    setInputText('');
  };

  return (
    <div>
      {!showInput && ( // Conditionally render the faKeyboard icon when showInput is false
        <FontAwesomeIcon
          className="keyBoard"
          onClick={handleShowInput}
          icon={faKeyboard}
          size="2xl"
          style={{ color: '#ffc800' }}
        />
      )}
      {showInput && (
        <div className="center-input">
          <div className='closed-back'>
            <FontAwesomeIcon
              onClick={handleCloseButtonClick}
              icon={faMicrophone}
              size="2xl"
              style={{ color: '#ffc800' }}
            />
          </div>
          <input
            type="text"
            placeholder="Type a keyword..."
            value={inputText}
            onChange={handleInputChange}
          />
          <div className="center-icon">
            <div className='send'>
              <FontAwesomeIcon
                onClick={handleSendText}
                icon={faPaperPlane}
                size="2xl"
                style={{ color: '#ffc800' }}
              />
            </div>
          </div>
        </div>
      )}
      {microphoneHidden && !showInput && (
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


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const defaultMapURL = pupMap;



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

  const [responseDisplayed, setResponseDisplayed] = useState(false);

  const [microphoneHidden, setMicrophoneHidden] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [commandRecognized, setCommandRecognized] = useState(false);


  useEffect(() => {
    if (errorMessage) {
      speakErrorMessage(errorMessage);
    }
  }, [errorMessage]);
  
  const speakErrorMessage = (error) => {
    const errorMessageUtterance = new SpeechSynthesisUtterance(error);
    window.speechSynthesis.speak(errorMessageUtterance);
  };

  


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

  const locations = locationsData;

  const handleTextInput = (text) => {
    sendTextToCommands(text);
  };

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
    setResponseDisplayed(false);

    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
  };


  
  const locationCommands = locations.map((location) => ({
    command: [`where is the ${location.name}`, `where is ${location.name}`,  `where's the ${location.name}`, `locate ${location.name}`, `locate the ${location.name}`, `find the ${location.name}`,  `find ${location.name}`, `room number ${location.name}`, `find room number ${location.name}`,`find the room number ${location.name}`, `where is room number ${location.name}`, `where is the room number ${location.name}`, `locate the room number ${location.name}`, `locate room number ${location.name}`, `where is the room ${location.name}`, `where is room ${location.name}`, `room ${location.name}`],
    callback: () => {
      resetTranscript();
      displayText(`Showing map for the ${location.name}. The get to the ${location.name}, here are the directions to follow. All the directions that I will give will start from the main gate. ${location.directions}`);
      displayImage(pupMap, 320, 470);
      setResetButtonVisible(true);
      setDownloadButtonVisible(false);
    },
  }));

  

  const commands = [
    {
      command: ['hi', 'hello'],
      callback:() => {
        resetTranscript();
        displayText("Hello, I'm iska, how can I help you?")
        const textDisplay = `Hi, I'm ISKA, how can I help you?`;
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

      }

    },

    {
      command: ['what are you'],
      callback: () => {
        resetTranscript();
        displayText('I am a P U P Virtual Assistant developed by the team of CodeCraft a 4th year B S I T student.');
        const textDisplay = `I am a PUP Virtual Assistant developed by the team of CodeCraft a 4th year BSIT student.`;
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

      }

    },

    {
      command: ['* map *', 'map *', '* map', 'map', 'university map', 'map of the university', 'show university map'],
      callback: () => {
        resetTranscript();
        displayText('These is the map of P U P lopez quezon branch')
        const textDisplay = `These is the map of PUP Lopez Quezon branch`;
        displayOtherText(textDisplay);
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

        setResponseDisplayed(true); // Set responseDisplayed to true



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

        setResponseDisplayed(true); // Set responseDisplayed to true

        displayDefaultMap(false);

        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }

        
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

        setResponseDisplayed(true); // Set responseDisplayed to true

        displayDefaultMap(false);

        
    const textDisplayContainer = document.querySelector('.textOther');
    while (textDisplayContainer.firstChild) {
      textDisplayContainer.removeChild(textDisplayContainer.firstChild);
    }
        
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
    setCommandRecognized(true); // Set commandRecognized to true
  } else {
    const errorMessage = 'Command not recognized'; // Set the error message
    setErrorMessage(errorMessage);

    // Use the Web Speech API to speak the error message
    const speechSynthesis = window.speechSynthesis;
    if (speechSynthesis) {
      const speechMessage = new SpeechSynthesisUtterance(errorMessage);
      speechSynthesis.speak(speechMessage);
    }

    const textDisplay = `Command not recognized`;
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






  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  const startListening = () => {
    SpeechRecognition.startListening();
    setSpeechActive(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setSpeechActive(false);
  };
  const handleTextInputClick = (e) => {
    const targetClassName = e.target.classList;

    // Check if the magnifying glass icon was clicked
    if (targetClassName.contains('faMagnifyingGlass')) {
      setMicrophoneHidden(!microphoneHidden); // Toggle the value of microphoneHidden
    }
  };


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
          <p>Available Programs</p>
          <p>About the PUP</p>
          <p>How to enroll</p>
          <p>What can you do?</p>
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


