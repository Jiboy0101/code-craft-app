import React from 'react';

function CommandHistory({ commandList, onDownload }) {
  return (
    <div className="command-history">
      <h3>Command History</h3>
      <ul>
        {commandList.map((commands, index) => (
          <li key={index}>
            <div>
              <strong>Command {index + 1}:</strong>
              <ul>
                {commands.map((command, i) => (
                  <li key={i}>{command}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => onDownload(commands)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommandHistory;
