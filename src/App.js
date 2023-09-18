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
import pupWebsite from './components/pupwebsite';
import Responses from './components/dataResponse.json';
import YearButtons from './components/displayEnroll';
import Program from './components/displayProgram';

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

  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);

  const [programsButton, setProgramsButton] = useState(false);
  const [programsResponse, setSelectedProgram] = useState('');
  

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: '"ISKA" Virtual Assistant', style: 'header', alignment: 'center'},
        { text: displayTextOnScreen || selectedYearResponse || programsResponse, alignment: 'justify'},
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
  };

  const handleProgramButtonClick = (programs) => {
    const program = Responses[programs];
    setSelectedProgram(program);
  };


  const toggleAdditionalButtons = () => {
    setShowAdditionalButtons(!showAdditionalButtons);
  };


  const displayText = (text) => {
    let message = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(message);
    setDownloadButtonVisible(true); // HIde the download button

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
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions); // Toggle the visibility of question list
  };

  const commands = [
    {
      command: ['how to enroll', 'enrollment', 'enrollment procedures', 'enrollment process' ],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setYearButtonVisible(true);
          displayText('Please select below which level do you want to enroll')
          const textDisplay = `
          Please select below which level do you want to enroll.
          `;
          displayOtherText(textDisplay);
        setResetButtonVisible(true);
        setDownloadButtonVisible(true);
        setSelectedYearResponse(false);
        
      },
    },
    
    {
      command: 'website',
      callback: () => {
        resetTranscript();
        displayText('P U P Website and Pages')
        setDisplayTextOnScreen(pupWebsite);
        setDownloadButtonVisible(false);
        setResetButtonVisible(true);
        setYearButtonVisible(false);

      }
    },

    {
      command: 'what can you do',
      callback: () => {
        resetTranscript();
        setYearButtonVisible(false);
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
      },
    },
    {
      command: ['history of pup', 'history', 'pup history'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        const text = `
        History

The Polytechnic University of the Philippines (PUP) started as the Manila Business School (MBS) on October 1, 1904. It was founded in response to the demand to train individuals for government and private service employment. The MBS operated as part of the City School System under the superintendence of G.A. O'Reilly.

The school's first offerings included vocational-technical courses mostly for working students from the provinces. Four years later, the school became a national school and was renamed the Philippine School of Commerce (PSC). PSC offered four-year secondary courses in Commerce in addition to vocational-technical courses like bookkeeping, stenography, typewriting and telegraphy. In 1917, PSC under the leadership of its Acting Principal Luis F. Reyes, started to offer night classes to enable the young people with daytime employment acquire further training. However, due to the retrenchment policy of the government in 1932, the night school had to be discontinued, and the PSC operations had to be merged with that of the Philippine Normal School and the Philippine School of Arts and Trades in 1933.

In 1940, President Manuel L. Quezon, in his graduation address, vowed to seek appropriations from the National Assembly to build a separate School of Commerce while Congressman Manuel A. Alazarte and PSC Superintendent Luis F. Reyes presented a bill to Congress for the said purpose. These efforts though, were thwarted when World War II broke out. After the war, PSC continued to offer one- and two-year courses in retailing, merchandising, and four-year course in distributive arts education while still merged with PNS, until PSC Superintendent Luis Reyes applied for the acquisition of its own place to the Philippine Alien Property Administrator through AMalacañang and the Department of Foreign Affairs. Two old government buildings at Lepanto and S.H. Loyola Streets in Sampaloc District of Manila were turned over for the exclusive use of the PSC.
           `;
        displayText('Here is the history of P U P');
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true); // Show the reset button after a command is executed
      },
    },
    {
      command: ['PUP Hymn', 'Hymn'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        const text = `
        PUP Hymn
        Imno ng PUP
        S. Calabig, S. Roldan, and R. Amaranto

        Sintang Paaralan
        Tanglaw ka ng bayan
        Pandayan ng isip ng kabataan
        Kami ay dumating nang salat sa yaman
        Hanap na dunong ay iyong alay
        Ang layunin mong makatao
        Dinarangal ang Pilipino
        Ang iyong aral, diwa, adhikang taglay
        PUP, aming gabay
        Paaralang dakila
        PUP, pinagpala
        Gagamitin ang karunungan
        Mula sa iyo, para sa bayan
        Ang iyong aral, diwa, adhikang taglay
        PUP, aming gabay
        Paaralang dakila
        PUP, pinagpala
           `;
        displayText('P U P hymn ');
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true); // Show the reset button after a command is executed
      },
    },
    {
      command: ['Available Programs', 'Programs Available'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        setProgramsButton(true);
        displayText('The P U P Lopez offers a lots of programs its either Diploma or Bachelors Degree.');
        const textDisplay = `
        The PUP Lopez offers a lots of programs its either Diploma or Bachelors Degree.
        `;
        displayOtherText(textDisplay);
        setResetButtonVisible(true); // Show the reset button after a command is executed
      },
    },
    {
      command: ['vision', 'pup vision'],
      callback: () => {
        resetTranscript();
        displayText('Here is the P U P Vision.P U P The National Polytechnic University');
        const text = ' P U P: The National Polytechnic University';
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true);
        setDownloadButtonVisible(false);
      },
    },
    {
      command: ['mission', 'pup mission'],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
        displayText('Here is the P U P Mission. Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities through a re-engineered polytechnic university by committing to:');
        const text = `
        Ensuring inclusive and equitable quality education and promoting lifelong learning opportunities through a re-engineered polytechnic university by committing to:
        Provide democratized access to educational opportunities for the holistic development of individuals with global perspective
        Offer industry-oriented curricula that produce highly-skilled professionals with managerial and technical capabilities and a strong sense of public service for nation building
        Embed a culture of research and innovation
        Continuously develop faculty and employees with the highest level of professionalism
        Engage public and private institutions and other stakeholders for the attainment of social development goal
        Establish a strong presence and impact in the international academic community
           `;
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true); // Show the reset button after a command is executed
      },
    },
     
   

    
];

const sendTextToCommands = (text) => {
  const command = commands.find((cmd) => cmd.command.toLowerCase() === text.toLowerCase());

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
      <div className='text-input'>
      <TextInputApp onSendText={sendTextToCommands} />
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
          <p>History of PUP</p>
          <p>How to enroll</p>
          <p>How to request of good moral</p>
          <p>How to get School ID</p>
          <p>PUP Vision</p>
          <p>PUP Mission</p>
          <p>PUP Hymn</p>
          <p>What can you do?</p>
          {/* Add more questions as needed */}
        </div>
      )}

      <img src={iska} alt="PUP Logo" className="logo" />
      <h1 className='app-name'>ISKA</h1>
      <p className='desc'>Hi! I'm ISKA, PUP Virtual Assistant, how can I help you?</p>
      <div className='textOther'>
      <div classname='otherText'>{otherText}</div>

      </div>

      <div className='container'>
        <div className='buttons'>
          {yearbutton && (
            <YearButtons onYearButtonClick={handleYearButtonClick} showAdditionalButtons={toggleAdditionalButtons}  />
                  )}
          {programsButton && (
            <Program onProgramClick={handleProgramButtonClick} />
          ) }
        </div>

        <div>
        <pre className="otherResponse">
        {selectedYearResponse && (
          <p className="displayResponse">{selectedYearResponse}</p>
        )}
        {programsResponse && (
          <p className='p-response'>{programsResponse}</p>
        )}
      </pre>
      {showAdditionalButtons && (
        <div className='additional-buttons'>
          {/* Additional buttons go here */}
          <button onClick={() => console.log('Additional Button 1 Clicked')}>Additional Button 1</button>
          <button onClick={() => console.log('Additional Button 2 Clicked')}>Additional Button 2</button>
        </div>
      )}
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
      {speechActive ? (
        <FontAwesomeIcon className='stop' onClick={stopListening} icon={faMicrophone} beat size="sm" style={{"--fa-primary-color": "#ffae00", "--fa-secondary-color": "#ffffff",}} />
      ) : (
        <FontAwesomeIcon className='start' onClick={startListening} icon={faMicrophone} size="sm" style={{"--fa-primary-color": "#ffffff", "--fa-secondary-color": "#ffffff",}} />
      )}
      </footer>
     
    </div>
  );
}


