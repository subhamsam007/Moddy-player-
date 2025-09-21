import React, { useEffect, useRef } from "react";
import * as faceapi from "@vladmandic/face-api";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);

  const MODEL_URL = "/models";

  // Load the face-api.js models
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  // Start webcam stream
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  // Run detection when button is clicked
  const detect = async () => {
    if (!videoRef.current) {
      console.error("Video reference not found");
      return;
    }

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    // Find the most probable expression
    const expressions = detections[0].expressions;
    let mostProbableExpression = "";
    let highestProbability = 0;

    for (const expression of Object.keys(expressions)) {
      if (expressions[expression] > highestProbability) {
        highestProbability = expressions[expression];
        mostProbableExpression = expression;
      }
    }

    console.log("Most probable expression:", mostProbableExpression);
  };

  useEffect(() => {
    // Load models first, then start the webcam
    loadModels().then(startVideo);
  }, []);

  return (
    <div style={{ position: "relative", width: "720px", height: "560px" }}>
      {/* Webcam Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{
          position: "absolute",
          width: "720px",
          height: "560px",
          top: 0,
          left: 0,
        }}
      />
      
      {/* Detect button */}
      <button onClick={detect} style={{ marginTop: "580px" }}>
        Detect Expressions
      </button>
    </div>
  );
}
