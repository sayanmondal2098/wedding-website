import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const audioUrl = `${import.meta.env.BASE_URL}audio/Romantic%20Raaga%20%20Audio%20Jukebox%20%20Instrumental%20%20Classical%20%20Hariprasad%20Chaurasia%20%20Music%20Today.mp3`;

  useEffect(() => () => audioRef.current?.pause(), []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (audio.currentTime < 1) audio.currentTime = 180;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return <div className="music-control">
    <audio ref={audioRef} src={audioUrl} loop onEnded={() => setPlaying(false)} />
    <button type="button" onClick={toggleMusic} aria-pressed={playing} aria-label={playing ? 'Pause background music' : 'Play background music'}>
      {playing ? <Volume2 size={16} strokeWidth={1.5} /> : <VolumeX size={16} strokeWidth={1.5} />}<span>{playing ? 'Sound on' : 'Sound off'}</span>
    </button>
  </div>;
};

export default BackgroundMusic;
