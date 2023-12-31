import React, { Component } from 'react';
import '../building.css';
// Import your GIFs
import canteen from '../../places/gate/Gate to Canteen.gif';
import gif2 from '../../places/gate.gif'; // Replace with the actual path to your image
import gif3 from '../../components/iska-ai.gif';
import gif4 from '../../components/iska-ai.gif';
import gif5 from '../../components/iska-ai.gif';
import placePic from '../../pictures/placePic/pylon2022.jpg'

class Canteen extends Component {
  constructor() {
    super();
    this.state = {
      displayGif: null,
      showButtons: true,
    };
  }

  // Function to handle button clicks and display the corresponding GIF
  handleButtonClick = (gif) => {
    this.setState({
      displayGif: gif,
      showButtons: false,
    });

    // Hide elements with the textOther classname
    const hideTextOther = document.querySelectorAll('.textOther');
    hideTextOther.forEach((element) => {
      element.style.display = 'none';
    });

    const hideReset = document.querySelectorAll('.reset-button');
    hideReset.forEach((element) => {
      element.style.display = 'none';
    });

    const hideMicrophone = document.querySelectorAll('.bottom');
    hideMicrophone.forEach((element) => {
      element.style.display = 'none';
    });

    
    
  };

  // Function to show all the buttons
  showAllButtons = () => {
    this.setState({
      displayGif: null,
      showButtons: true,
    });

     // Show elements with the textOther classname
     const showTextOther = document.querySelectorAll('.textOther');
     showTextOther.forEach((element) => {
       element.style.display = ''; // Set to an empty string to use the default display value
     });

     const showMicrophone = document.querySelectorAll('.bottom');
     showMicrophone.forEach((element) => {
       element.style.display = ''; // Set to an empty string to use the default display value
     });

     const showReset = document.querySelectorAll('.reset-button');
     showReset.forEach((element) => {
       element.style.display = '';
     });
  };

  render() {
    const { displayGif, showButtons } = this.state;

    const speakText = (text) => {
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(speech);
      } else {
        console.error('Speech synthesis is not supported in this browser.');
      }
    };

    return (
      <div className='place-list'>
        {showButtons ? (
          <ul className='place'>
            <li>
            <p className='text'>Main Gate</p>
              <img src={placePic} alt='Main Gate' onClick={() => { this.handleButtonClick(canteen); speakText('In the main gate, follow this direction and you will see the canteen'); }}/>
            </li>
            <li>
            <p className='text'>Admission Office</p>
              <img src={placePic} alt='CANTEEN' onClick={() => this.handleButtonClick(gif2)}/>
            </li>
            <li>
            <p className='text'>Gynasium</p>
              <img src={placePic} alt='GYMNASIUM' onClick={() => this.handleButtonClick(gif3)}/>
            </li>
            <li>
            <p className='text'>Science Building</p>
              <img src={placePic} alt='ADMISSION OFFICE' onClick={() => this.handleButtonClick(gif4)}/>
            </li>
            <li>
            <p className='text'>Engineer Building</p>
              <img src={placePic} alt='ENGINEERING BUILDING' onClick={() => this.handleButtonClick(gif5)}/>
            </li>
            <li>
              <img src={placePic} alt='SCIENCE BUILDING' onClick={() => this.handleButtonClick(canteen)}/>
            </li>
          </ul>
        ) : null}
    
        {displayGif && (
          <div className='mapGif'>
            <img className='mapss' src={displayGif} alt="Selected GIF" />
          </div>
        )}
    
        {!showButtons && (
          <div className='go-back'>
            <button onClick={this.showAllButtons}>Back</button>
          </div>
        )}
      </div>
    );
        }
      }    

export default Canteen;
