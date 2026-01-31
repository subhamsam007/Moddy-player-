import { useState } from 'react'
import FaceExpressionDetector from "./components/Facialexpression"
import './App.css'
import Moodsongs from './components/Moodsongs'

function App() {

  return (
    <>
     <FaceExpressionDetector />
     <Moodsongs/>
    </>
  )
}

export default App
