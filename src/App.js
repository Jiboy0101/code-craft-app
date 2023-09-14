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
      command: ['how to enroll', 'enrollment', 'enrollment procedures', 'enrollment process' ],
      callback: () => {
        resetTranscript(); // Reset the transcript when a command is executed
          displayText('Here is the process on how you can enroll in P U P Lopez. Follow the steps below and you can definitely be one of us! Please take your time to be guided with steps. Good luck, congrats and welcome in advance.');
          const text = `
          FRESHMAN ADMISSION
              The OAS processes and facilitates the enrollment applications of those who passed the PUPCET. The Office evaluates the authenticity of the applicant's application documents and the applicant's qualifications for admission, adhering to the University admission requirements/criteria.
        
          HOW TO AVAIL OF THE SERVICE 
            Steps to follow 
            
              WHERE: (Ground Floor), Admission Office 

              1. Visit the PUP website. Apply for PUP College Entrance Test through the iApply, read the information provided and click the iApplyNow button.https://iapply.pup.edu.ph
              2. Click proceed to begin your on-line registration and select your intended campus and program, then submit the on-line application.
              3. Upon successful submission of your on-line application, go to Display Voucher to print your Payment Voucher.
              4. Go to the nearest LandBank Branch to remit payment via online collection or pay directly to the Cashier Office of the Branch.
              5. Claim ePermit on-line. Allow five (5) working days after payment to LandBank before claiming your Test Permit online.
              6. Go to PUP Testing Center 30 minutes before your time schedule as printed in your PUPCET Test Permit.
              7. Visit the PUP website to check your score and online confirmation of the schedule date of processing of admission credentials, interview and enrolment.
              8. Fill out the Student ww.pup.edu.ph Admission Records Form 1 (SAR Form1).
              9. Click the PRINT button to print the SAR Form 1 with Route and Approval Slip.
              10. On the scheduled date of processing your credentials, follow the steps in enrolment as indicated in you SAR Form.
              11. For ALS qualities and those high school graduates whose final grade in English is 80 or lower.
          
          RE-ADMISSION (for Returning Student)
            The OAS processes and facilitates the applications for re-admission of students.
          
          HOW TO AVAIL OF THE SERVICE 
            Steps to follow

            WHERE: (Ground Floor) Registrar Office, (2nd Floor) Office of the Student Affairs and Services (OSAS)

              1. Request Informative Copy of Grades and have it evaluated by the Curriculum Adviser.
              2. Secure Student Clearance and have it sign by the different offices.
              3. Go to the Registrar Office for Evaluation of requirements and fill out an application form for re-admission.
              4. Proceed to the Office of the Head of Academic Program for Approval of re-admission.
              5. Proceed to the Registrar Office and secure R-Zero.
              6. Send to OVPBC the accomplished R-Zero for tagging of subjects in the AMS Registration.

          ADMISSION OF TRANSFEEREES FROM ANOTHER SCHOOL
              The OAS processes and facilities transfer of students, preferably incoming 2nd Year, from another school or University to PUP, subject to the availability of slots and upon the approval of the Branch/Campus Director. PUP accepts transfer students from another school every first semester only.

              Fees: P300.00 (from State Colleges and Universities)
                    P500.00 (from Private School)
                    
          HOW TO AVAIL OF THE SERVICE 
            Steps to follow

            WHERE: (Ground Floor) Registrar Office, (2nd Floor) Office of the Student Affairs and Services (OSAS)

              1. Submit transfer credentials for evaluation 
              2. Upon approval of Office of evaluated credentials, proceed to Office of the Student Affairs and Services for schedule of Psychological Examination.
              3. Proceed to the Cashier Office for Payment of Psychological Exam.
              4. Take the Psychological Exam.
              5. Proceed to Registrar Office and submit admission credentials for evaluation.
              6. Proceed to the Office of the Academic Programs/College of choice and copy the subjects.
              7. Send R-zero to OVPBC for tagging of subjects.
              8. Proceed to Cashiers Office for Payment of tuition fee.
              9. Proceed to the Admission Office for printing of Registration Certificate and ID processing.
           `;
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true);
        setDownloadButtonVisible(true);
      },
    },
    {
      command: ['how to enroll freshman', 'how to enroll freshmen student','freshmen', 'freshman', 'how to enroll freshman student'],
      callback: () => {
        resetTranscript();
        displayText('Here is the process how to enroll a freshmen student in P U P Lopez. Follow the steps below and you can definitely be one of us! Please take your time to be guided with steps. Good luck, congrats and welcome in advance.');
        const text = `
        FRESHMAN ADMISSION
              The OAS processes and facilitates the enrollment applications of those who passed the PUPCET. The Office evaluates the authenticity of the applicant's application documents and the applicant's qualifications for admission, adhering to the University admission requirements/criteria.
        
          HOW TO AVAIL OF THE SERVICE 
            Steps to follow 
            
              WHERE: (Ground Floor), Admission Office 

              1. Visit the PUP website. Apply for PUP College Entrance Test through the iApply, read the information provided and click the iApplyNow button.https://iapply.pup.edu.ph
              2. Click proceed to begin your on-line registration and select your intended campus and program, then submit the on-line application.
              3. Upon successful submission of your on-line application, go to Display Voucher to print your Payment Voucher.
              4. Go to the nearest LandBank Branch to remit payment via online collection or pay directly to the Cashier Office of the Branch.
              5. Claim ePermit on-line. Allow five (5) working days after payment to LandBank before claiming your Test Permit online.
              6. Go to PUP Testing Center 30 minutes before your time schedule as printed in your PUPCET Test Permit.
              7. Visit the PUP website to check your score and online confirmation of the schedule date of processing of admission credentials, interview and enrolment.
              8. Fill out the Student ww.pup.edu.ph Admission Records Form 1 (SAR Form1).
              9. Click the PRINT button to print the SAR Form 1 with Route and Approval Slip.
              10. On the scheduled date of processing your credentials, follow the steps in enrolment as indicated in you SAR Form.
              11. For ALS qualities and those high school graduates whose final grade in English is 80 or lower.
        `;
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true);
        setDownloadButtonVisible(true);
      }
    },

    {
      command: ['how to enroll transferee student', 'how to enroll transferee', 'transferee', 'transferee student', 'enrollment of transferee', 'enrollment of transferee'],
      callback: () => {
        resetTranscript();
        displayText("Here is the process how to enroll a transferee student in P U P Lopez. Follow the steps below and you can definitely be one of us! Please take your time to be guided with steps. Good luck, congrats and welcome in advance.");
        const text = `
        ADMISSION OF TRANSFEEREES FROM ANOTHER SCHOOL
              The OAS processes and facilities transfer of students, preferably incoming 2nd Year, from another school or University to PUP, subject to the availability of slots and upon the approval of the Branch/Campus Director. PUP accepts transfer students from another school every first semester only.

              Fees: P300.00 (from State Colleges and Universities)
                    P500.00 (from Private School)
                    
          HOW TO AVAIL OF THE SERVICE 
            Steps to follow

            WHERE: (Ground Floor) Registrar Office, (2nd Floor) Office of the Student Affairs and Services (OSAS)

              1. Submit transfer credentials for evaluation 
              2. Upon approval of Office of evaluated credentials, proceed to Office of the Student Affairs and Services for schedule of Psychological Examination.
              3. Proceed to the Cashier Office for Payment of Psychological Exam.
              4. Take the Psychological Exam.
              5. Proceed to Registrar Office and submit admission credentials for evaluation.
              6. Proceed to the Office of the Academic Programs/College of choice and copy the subjects.
              7. Send R-zero to OVPBC for tagging of subjects.
              8. Proceed to Cashiers Office for Payment of tuition fee.
              9. Proceed to the Admission Office for printing of Registration Certificate and ID processing.
        `;
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true);
        setDownloadButtonVisible(false);
      }
    },

    {
      command: ['how to enroll returning student', 'returning student','returning', 'returning of irregular'],
      callback: () => {
        resetTranscript();
        displayText('Here is the process how to enroll a returning student in P U P Lopez. Follow the steps below and you can definitely be one of us! Please take your time to be guided with steps. Good luck.');
        const text= `
        RE-ADMISSION (for Returning Student)
            The OAS processes and facilitates the applications for re-admission of students.
          
          HOW TO AVAIL OF THE SERVICE 
            Steps to follow

            WHERE: (Ground Floor) Registrar Office, (2nd Floor) Office of the Student Affairs and Services (OSAS)

              1. Request Informative Copy of Grades and have it evaluated by the Curriculum Adviser.
              2. Secure Student Clearance and have it sign by the different offices.
              3. Go to the Registrar Office for Evaluation of requirements and fill out an application form for re-admission.
              4. Proceed to the Office of the Head of Academic Program for Approval of re-admission.
              5. Proceed to the Registrar Office and secure R-Zero.
              6. Send to OVPBC the accomplished R-Zero for tagging of subjects in the AMS Registration.
        `;
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true);
        setDownloadButtonVisible(true);
      }
    },
    {
      command: ['how to enroll regular student', 'regular student','regular', 'enrollment of regular student'],
      callback: () => {
        resetTranscript();
        displayText('Here is the process how to enroll a regular student in P U P Lopez. Follow the steps below! Please take your time to be guided with steps. Good luck.');
        const text= `
        REGULAR STUDENT
        
            STEPS TO FOLLOW:

            WHERE: PUP SIS

              1. Log in to your SIS Account.
              2. Check if your grades is complete. (Grades Section.)
              3. Go to Enrollment Section.
              4. Check all the subjects and schedule to enroll.
              5. Click Save and Assess.
              6. Review and click Okay to confirm.
              7. Review the assessment.
              8. Print Confirmation Slip.
        `;
        setDisplayTextOnScreen(text);
        setResetButtonVisible(true);
        setDownloadButtonVisible(true);
      }
    },
    {
      command: 'website',
      callback: () => {
        resetTranscript();
        displayText('P U P Website and Pages')
        setDisplayTextOnScreen(pupWebsite);
        setDownloadButtonVisible(false);
        setResetButtonVisible(true);
      }
    },

    {
      command: 'what can you do',
      callback: () => {
        resetTranscript();
        displayText('There are various things that i can do. Below are the detailed list.');
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
        const text = `
        Bachelor of Elementery Education (BEED)
        Bachelor in Public Administration (BPA)
        Bachelor in Public Adminsitration Major in Fiscal Adminstration (BPA -FA)
        Bachelor of Science in Accountancy (BSA)
        Bachelor of Science in Agri-Business Management (BSAM)
        Bachelor of Science in Business Administration Major in Financial Management (BSBS-FM)
        Bachelor of Science in Business Administration Major in Marketing Management (BSBA-MM)
        Bachelor of Science in Biology (BSBIO)
        Bachelor of Science in Civil Engineering (BSCE)
        Bachelor of Science in Electrical Engineering (BSEE) 
        Bachelor of Secondary Education (BSEDMT)
        Bachelor of Science in Hospitality Management (BSHM)
        Bachelor of Science in Information Technology (BSIT)
        Bachelor of Science in Nutrition and Dietics (BSND)
        Bachelor of Science in Office Administration Major in Legal Office Administration (BSOA- LOA)
           `;
        displayText('Here are the following programs available in P U P Lopez.');
        setDisplayTextOnScreen(text);
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
