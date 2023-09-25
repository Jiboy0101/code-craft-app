import React, { useState, useEffect } from 'react';

const Alarm = ({ displayText, setAlarm, setAlarmTime, alarmTime }) => {
  const [alarmActive, setAlarmActive] = useState(false);

  useEffect(() => {
    if (alarmActive && alarmTime) {
      const currentTime = new Date();
      if (currentTime >= alarmTime) {
        // Time to trigger the alarm
        // You can implement a notification sound or other action here
        alert('Alarm triggered!');
        setAlarmActive(false); // Turn off the alarm after it's triggered
        setAlarmTime(null); // Reset the alarm time
      }
    }
  }, [alarmActive, alarmTime, setAlarmTime]);

  return (
    <div>
      {/* Render alarm-related UI elements here if needed */}
    </div>
  );
};

export default Alarm;
