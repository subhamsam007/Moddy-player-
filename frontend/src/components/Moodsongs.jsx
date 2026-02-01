import React from 'react'
import { useState, useRef } from 'react'
import './moodsongs.css'

const Moodsongs = ({songs, faceDetected = true, detectedMood = null}) => {

    const [isPlaying, setIsPlaying] = useState(null);
    const audioRefs = useRef({});
    const mood = detectedMood ? String(detectedMood).toLowerCase() : null;
    
    const handlePlaypause = (index) => {
        if (isPlaying === index) {
            if (audioRefs.current[index]) {
                audioRefs.current[index].pause();
            }
            setIsPlaying(null);
        } else {
            // Pause all other audios
            Object.keys(audioRefs.current).forEach(key => {
                if (key !== String(index) && audioRefs.current[key]) {
                    audioRefs.current[key].pause();
                }
            });
            if (audioRefs.current[index]) {
                audioRefs.current[index].play();
            }
            setIsPlaying(index);
        }
    };
    
  return (
    <div className='mood_songs'>
        <h1>Recommended songs</h1>

                        {(!songs || songs.length === 0) && faceDetected && mood && (
                          <div>
                            <div className='song_card'>
                              <div className={`overlay mood-${mood}`}>
                                {mood === 'happy' && 'You look Happy 😊'}
                                {mood === 'sad' && 'Feeling Sad 💧'}
                                {mood === 'neutral' && 'Neutral Mood 😐'}
                                {mood === 'surprised' && 'Surprised 😲'}
                                {mood === 'angry' && 'Angry 😠'}
                              </div>
                              <h3>No songs found</h3>
                              <p>Try again or add songs for this mood.</p>
                            </div>
                          </div>
                        )}

                        {(songs || []).map((song, index) => (
                            <div key={song._id || index}>
                                        <div className='song_card'>
                                             {!faceDetected ? (
                                                 <div className="overlay no-face">SHOW YOUR FACE</div>
                                             ) : mood ? (
                                                 <div className={`overlay mood-${mood}`}>
                                                     {mood === 'happy' && 'You look Happy 😊'}
                                                     {mood === 'sad' && 'Feeling Sad 💧'}
                                                     {mood === 'neutral' && 'Neutral Mood 😐'}
                                                     {mood === 'surprised' && 'Surprised 😲'}
                                                     {mood === 'angry' && 'Angry 😠'}
                                                 </div>
                                             ) : null}
                                             
                                             <h3>{song.title}</h3>
                                             <p>{song.artist}</p>
                                             <h1>{song.mood}</h1>
                                        </div>
                    <div className='play_pause_button'>
                        <button onClick={() => handlePlaypause(index)}>
                            {isPlaying === index ?  <i className="ri-pause-line"></i> : 
                             <i className="ri-play-line"></i>}
                        </button>
                        <audio
                            ref={(el) => audioRefs.current[index] = el}
                            src={song.audio}
                            onEnded={() => setIsPlaying(null)}
                            controls
                            controlsList="nodownload"
                            className='native_audio_player'
                        />
                    </div>
                </div>
            ))}
    </div>
  )
}

export default Moodsongs
