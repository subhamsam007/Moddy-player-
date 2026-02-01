import { useState } from 'react'
import FaceExpressionDetector from "./components/Facialexpression"
import './App.css'
import Moodsongs from './components/Moodsongs'

function App() {

  const [songs , setSongs] = useState([
        
    ])
  const [faceDetected, setFaceDetected] = useState(false)
  const [detectedMood, setDetectedMood] = useState(null)

  return (
    <div className="app-shell">
      <div className="card">
        <FaceExpressionDetector setSongs={setSongs} setFaceDetected={setFaceDetected} setDetectedMood={setDetectedMood} />
        <Moodsongs songs={songs} faceDetected={faceDetected} detectedMood={detectedMood} />
      </div>

      <aside className="card">
        <h2>About Moody Player</h2>
        <p>
          Moddy Player is an AI-powered mood-based music recommendation system that detects the 
          user’s facial expression using a webcam and suggests songs accordingly. The system analyzes emotions such as happiness, sadness, anger, neutrality,and surprise using real-time facial expression recognition.The project integrates frontend technologies like React.js with backend services using Node.js and MongoDB. ImageKit.io is used to store and deliver album covers efficiently. Moddy Player demonstrates how artificial intelligence, web technologies, and multimedia systems can work together to create smart and user-centric applications.
        </p>
        <h3>How it works</h3>
        <ul>
          <li>Face detection via face-api</li>
          <li>Song storage and retrieval from backend</li>
          <li>Upload songs with title, artist and mood</li>
        </ul>
        <h3>Quick actions</h3>
        <p style={{marginBottom:8}}>Start by clicking <strong>Detect Expressions</strong>.</p>
      </aside>
    </div>
  )
}

export default App
