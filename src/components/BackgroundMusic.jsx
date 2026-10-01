import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const audioUrl = `${import.meta.env.BASE_URL}audio/Romantic%20Raaga%20%20Audio%20Jukebox%20%20Instrumental%20%20Classical%20%20Hariprasad%20Chaurasia%20%20Music%20Today.mp3`;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    let unmounted = false;
    audio.volume = 0.42;

    const startMusic = async () => {
      if (unmounted || !audio.paused) return;
      if (audio.currentTime < 1) audio.currentTime = 180;

      try {
        await audio.play();
        if (!unmounted) setPlaying(true);
      } catch {
        if (!unmounted) setPlaying(false);
      }
    };

    // Start as soon as the audio is ready. Browsers that block audible autoplay
    // will make the same attempt again on the visitor's first interaction.
    const handleReady = () => startMusic();
    audio.addEventListener('canplay', handleReady, { once: true });
    startMusic();
    document.addEventListener('pointerdown', startMusic, { once: true });
    document.addEventListener('keydown', startMusic, { once: true });

    return () => {
      unmounted = true;
      audio.pause();
      audio.removeEventListener('canplay', handleReady);
      document.removeEventListener('pointerdown', startMusic);
      document.removeEventListener('keydown', startMusic);
    };
  }, []);

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
    <audio ref={audioRef} src={audioUrl} autoPlay preload="auto" loop onEnded={() => setPlaying(false)} />
    <button type="button" onClick={toggleMusic} aria-pressed={playing} aria-label={playing ? 'Pause background music' : 'Play background music'}>
      {playing ? <Volume2 size={16} strokeWidth={1.5} /> : <VolumeX size={16} strokeWidth={1.5} />}<span>{playing ? 'Sound on' : 'Sound off'}</span>
    </button>
  </div>;
};

export default BackgroundMusic;
