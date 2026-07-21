import React, { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef(null);

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
        src="/audio/Romantic Raaga  Audio Jukebox  Instrumental  Classical  Hariprasad Chaurasia  Music Today.mp3"
        loop
      />
    </div>
  );
};

export default BackgroundMusic;
