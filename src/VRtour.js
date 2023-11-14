import React from 'react';

const MyIframeComponent = () => {
  const iframeStyles = {
    width: '100%',
    height: '640px',
    border: 'none',
    maxWidth: '100%',
  };

  return (
    <iframe
      title="Embedded Content"
      width="100%"
      height="640"
      style={iframeStyles}
      allow="xr-spatial-tracking vr gyroscope accelerometer fullscreen autoplay xr"
      scrolling="no"
      allowFullScreen={true}
      frameBorder="0"
      src="https://webobook.com/public/6552cc1ac65ac70a6b17f092,en?ap=true&si=true&sm=false&sp=true&sfr=false&sl=false&sop=false&"
      allowvr="yes"
    />
  );
};

export default MyIframeComponent;
