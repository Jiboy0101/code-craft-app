import React, { Component } from 'react';
import './mapList.css';
// Import your GIFs
import gif1 from '../places/gate.gif';
import gif2 from '../places/gate.gif';
import gif3 from '../components/iska-ai.gif';
import gif4 from '../components/iska-ai.gif';
import gif5 from '../components/iska-ai.gif';



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
      <div>
        {showButtons ? (
          <div className='place'>
            <button onClick={() => {this.handleButtonClick(gif1); speakText('In main gate folow this direction and you will see the Science building');}}>Gate</button>
            <button onClick={() => this.handleButtonClick(gif2)}>Button 2</button>
            <button onClick={() => this.handleButtonClick(gif3)}>Button 3</button>
            <button onClick={() => this.handleButtonClick(gif4)}>Button 4</button>
            <button onClick={() => this.handleButtonClick(gif5)}>Button 5</button>
          </div>
        ) : null}

        {displayGif && (
          <div className='mapGif'>
            <img className='mapss' src={displayGif} alt="Selected GIF" />
          </div>
        )}

        {!showButtons && (
            <div className='go-back'>
          <button onClick={this.showAllButtons}>Show All</button>
            </div>
        )}
      </div>
    );
  }
}

export default GifButtonComponent;
