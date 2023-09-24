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

  const locations = [
    {
      name: 'gym',
      directions: 'The gym is located in front of the accounting building. From the gate, just walk to the quadrangle and cross the bridge near the canteen and just follow the road to get to the gym.',
    },
    {
      name: 'gymnasium',
      directions: 'The gym is located in front of the accounting building. From the gate, just walk to the quadrangle and cross the bridge near the canteen and just follow the road to get to the gym.',
    },
    {
      name: 'canteen',
      directions: 'The canteen is located near the bridge and creek.',
    },
    {
      name: 'kitchen lab',
      directions: 'To reach the kitchen laboratory, just walk to the quadrangle and cross the bridge near the canteen and you will see the kitchen laboratory, which is the first room near the gymnasium.',
    },
    {
      name: 'beverage lab',
      directions: 'To reach the beverage laboratory, just walk to the quadrangle and cross the bridge near the canteen and you will see the beverage laboratory, which is the second or middle room near the gymnasium.',
    },
    {
      name: 'tissue lab',
      directions: 'The tissue laboratory is loacted near the creek, just walk to the quadrangle and cross the bridge near the canteen and you will see the tissue laboratory, which is the third room near the creek.',
    },
    {
      name: 'grandstand',
      directions: 'The granstand can already be seen from the gate, it is located in the campus field at the back of the accounting building.',
    },
    {
      name: 'accounting office',
      directions: 'The accounting office is on the ground floor of the administrative building. Enter the main building, and you will find it in the first room on your right.',
    },
    {
      name: 'cashier office',
      directions: 'The cashier office is on the ground floor of the administrative building. Enter the main building, and you will find it in the second room on your right.',
    },
    {
      name: 'registrar office',
      directions: 'The registrar office is on the ground floor of the administrative building. Enter the main building, and you will find it in the third room on your right.',
    },
    {
      name: 'admission office',
      directions: 'The admission office is on the ground floor of the administrative building. Enter the main building, and you will find it in the fourth room on your right.',
    },
    {
      name: 'osas',
      directions: 'The osas is on the second floor of the administrative building. Enter the main building and take the stairs, and you will find it in the first room on your right.',
    },
    {
      name: 'directors office',
      directions: 'The directors office is on the second floor of the administrative building. Enter the main building and take the stairs, and you will find it in the second room on your right.',
    },
    {
      name: 'academic office',
      directions: 'The academic office is on the second floor of the administrative building. Enter the main building and take the stairs, and you will find it in the third room on your right.',
    },
    {
      name: 'ICT lab 1',
      directions: 'The ICT laboratory 1 is located near the main gate on your left.',
    },
    {
      name: 'ICT lab 2',
      directions: 'The ICT laboratory 2 is located infront of the main gate.',
    },
    {
      name: 'health building',
      directions: 'To reach the health and science building, just cross the bridge near ICT laboratory 2 and you will see a orange colored building which is the health and science building.',
    },
    {
      name: 'science building',
      directions: 'To reach the health and science building, just cross the bridge near ICT laboratory 2 and you will see a orange colored building which is the health and science building.',
    },
    {
      name: 'health and science building',
      directions: 'To reach the health and science building, just cross the bridge near ICT laboratory 2 and you will see a orange colored building which is the health and science building.',
    },
    {
      name: 'engineering building',
      directions: 'To reach the engineering building, just cross the bridge near ICT laboratory 2 and you will see a long building with green roof near the health and science building. That will be the architecture, engineering and technology building.',
    },
    {
      name: 'archi building',
      directions: 'To reach the engineering building, just cross the bridge near ICT laboratory 2 and you will see a long building with green roof near the health and science building. That will be the architecture, engineering and technology building.',
    },
    {
      name: 'architecture building',
      directions: 'To reach the engineering building, just cross the bridge near ICT laboratory 2 and you will see a long building with green roof near the health and science building. That will be the architecture, engineering and technology building.',
    },
    {
      name: 'architecture, engineering and technology building',
      directions: 'To reach the engineering building, just cross the bridge near ICT laboratory 2 and you will see a long building with green roof near the health and science building. That will be the architecture, engineering and technology building.',
    },
    {
      name: 'agri-business farm',
      directions: 'The agri-business farm is located at the end of the engineering building, just cross the bridge near ICT laboratory 2 and walk a few meters to the end of the engineering building and you will see the farm. Tt can also be accessed by another way, just go past the nantes building and gymnasium to the end of the education building and you will see the farm.',
    },
    {
      name: 'farm',
      directions: 'The agri-business farm is located at the end of the engineering building, just cross the bridge near ICT laboratory 2 and walk a few meters to the end of the engineering building and you will see the farm. Tt can also be accessed by another way, just go past the nantes building and gymnasium to the end of the education building and you will see the farm.',
    },
    {
      name: 'educ building',
      directions: 'To reach the education building, cross the bridge near the canteen and walk through the hallway of the nantes building and at the end of the nantes building you will see an orange building. That will be the education building.',
    },
    {
      name: 'education building',
      directions: 'To reach the education building, cross the bridge near the canteen and walk through the hallway of the nantes building and at the end of the nantes building you will see an orange building. That will be the education building.',
    },
    {
      name: 'accounting building',
      directions: 'To reach the accounting building, cross the bridge near the canteen and you will see a nantes building at the back of the grandstand, that will be the accounting building.',
    },
  ];
  
  const locationCommands = locations.map((location) => ({
    command: [`where is the ${location.name}`, `locate the ${location.name}`, `find the ${location.name}`, `room number ${location.name}`, `room ${location.name}`],
    callback: () => {
      resetTranscript();
      displayText(`Showing map for the ${location.name}. The get to the ${location.name}, here are the directions to follow. All the directions that I will give will start from the main gate. ${location.directions}`);
      openMap();

      setResetButtonVisible(true);
      setDownloadButtonVisible(false);
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


