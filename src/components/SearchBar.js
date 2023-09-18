import React, { useState } from 'react';
import '../App.css';
import App from '../App';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [isAssistantMode, setAssistantMode] = useState(true);
  const [isMicrophoneVisible, setMicrophoneVisible] = useState(true);

  const handleButtonClick = () => {
    setButtonClicked(true);
    setSearchResults([]); // Reset previous results

    if (searchTerm.trim() === "") {
      const errorText = "Please type a word.";
      console.error(errorText); // Log the error message
      return;
    }

    // Replace 'data' with your actual data source
    const data = [
      // Example data format:
      // { id: 1, name: 'Item 1', content: 'Content for Item 1', link: 'https://example.com/item1' },
      // { id: 2, name: 'Item 2', content: 'Content for Item 2', link: 'https://example.com/item2' },
      // ...
    ];

    const filteredResults = data.filter((val) =>
      val.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filteredResults);

    if (filteredResults.length > 0) {
      const contentToRead = filteredResults
        .map((val) => `${val.name}, ${val.content}`)
        .join('. ');
      speak(contentToRead);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  };

  
  const toggleSearchBar = () => {
    setSearchBarVisible(!isSearchBarVisible);
    setAssistantMode(!isSearchBarVisible);
    setMicrophoneVisible(true); // Ensure microphone is visible when switching back to assistant mode
  };

  const toggleMicrophone = () => {
    setMicrophoneVisible(!isMicrophoneVisible);
    setSearchBarVisible(false); // Hide the search bar when switching to microphone mode
    setAssistantMode(false); // Hide the assistant when switching to microphone mode
  };

  const goBackToAssistant = () => {
    setSearchBarVisible(false);
    setAssistantMode(true);
    setMicrophoneVisible(true); // Ensure microphone is visible when switching back to assistant mode
  };


  return (
    <div>
      {buttonClicked &&
        searchResults.map((val) => {
          return (
            <div className="template" key={val.id}>
              <p className="content">
                {val.name}<br /><br />
                {val.content}<br />
                <a className='link' href={val.link} target="_blank" rel="noopener noreferrer">
                  {val.link}
                </a>
              </p>
            </div>
          );
        })}
      {isAssistantMode && !isSearchBarVisible && !isMicrophoneVisible && <App />}
      {isMicrophoneVisible && (
        <footer className="microphone">
          {/* Your microphone code */}
        </footer>
      )}
      <br />
      <div className="template-Container">
        <div className="searchInput-Container">
          <div>
            <button className='back' onClick={goBackToAssistant}>Home</button>
          </div>
          <div>
            <button className='toggle-search' onClick={toggleSearchBar}>Toggle Search</button>
            <button className='toggle-microphone' onClick={toggleMicrophone}>Toggle Microphone</button>
          </div>
          {isSearchBarVisible && (
            <>
              <input
                className='input-search'
                id="searchInput"
                type="text"
                placeholder="Type a keyword..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <button className='search-button' onClick={handleButtonClick}>Ask</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
