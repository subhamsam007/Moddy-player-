import React from 'react'
import { useState } from 'react'
import './moodsongs.css'

const Moodsongs = () => {
    const [songs , setSongs] = useState([
        {
            id: 1,
            title: 'Song 1',
            artist: 'Artist 1',
        },
        {
            id: 2,
            title: 'Song 2',
            artist: 'Artist 2',
        },
        {
            id: 3,
            title: 'Song 3',
            artist: 'Artist 3',
        },
    ])
  return (
    <div className='mood_songs'>
        <h1>Recommended songs</h1>

            {songs.map((song) => (
                <div key={song.id}>
                    <div className='song_card'>
                       <h3>{song.title}</h3>
                       <p>{song.artist}</p>
                    </div>
                    <div className='play_pause_button'>
                       <i className="ri-play-line"></i>
                       <i className="ri-pause-line"></i>
                    </div>
                </div>
            ))}
    </div>
  )
}

export default Moodsongs
