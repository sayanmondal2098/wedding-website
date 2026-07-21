import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const audioUrl = `${import.meta.env.BASE_URL}audio/Romantic%20Raaga%20%20Audio%20Jukebox%20%20Instrumental%20%20Classical%20%20Hariprasad%20Chaurasia%20%20Music%20Today.mp3`;

  useEffect(() => {
    if (audioRef.current) {
      // Set the start time to 180 seconds
      audioRef.current.currentTime = 180;
      
      // Attempt to auto-play
      audioRef.current.play().catch(err => {
        console.log("Autoplay blocked by browser. User must interact to play audio.", err);
      });
    }
  }, []);

  return (
    <div style={{ display: 'none' }}>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
      />
    </div>
  );
};

export default BackgroundMusic;
