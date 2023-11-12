import React, { Component } from 'react';
import './mapList.css';
// Import your GIFs
import gif1 from '../places/gate.gif';
import gif2 from '../places/gate.gif'; // Replace with the actual path to your image
import gif3 from '../components/iska-ai.gif';
import gif4 from '../components/iska-ai.gif';
import gif5 from '../components/iska-ai.gif';
import placePic from '../pictures/placePic/pylon2022.jpg';

class GifButtonComponent extends Component {
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
  };

  // Function to show all the buttons
  showAllButtons = () => {
    this.setState({
      displayGif: null,
      showButtons: true,
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
              <img src={placePic} alt='Main Gate' onClick={() => { this.handleButtonClick(gif1); speakText('In the main gate, follow this direction and you will see the Science building'); }}/>
                            <p>Main Gate</p>
            </li>
            <li>
              <img src={placePic} alt='CANTEEN' onClick={() => this.handleButtonClick(gif2)}/>
            </li>
            <li>
              <img src={placePic} alt='GYMNASIUM' onClick={() => this.handleButtonClick(gif3)}/>
            </li>
            <li>
              <img src={placePic} alt='ADMISSION OFFICE' onClick={() => this.handleButtonClick(gif4)}/>
            </li>
            <li>
              <img src={placePic} alt='ENGINEERING BUILDING' onClick={() => this.handleButtonClick(gif5)}/>
            </li>
            <li>
              <img src={placePic} alt='SCIENCE BUILDING' onClick={() => this.handleButtonClick(gif1)}/>
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

export default GifButtonComponent;
