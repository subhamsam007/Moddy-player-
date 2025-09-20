import React, { useEffect, useRef } from "react";
import * as faceapi from "@vladmandic/face-api";


export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
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

    // Run detection when the video starts playing
    const handleVideoPlay = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      // Match canvas to video size
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
          let mostprobableexpression = "";
          let withFaceExpressions = "";
          for (const expression of Object.keys(detections[0].expressions)) {
            if (detections[0].expressions[expression] > mostprobableexpression) {
                mostprobableexpression = detections[0].expressions[expression];
                withFaceExpressions = expression;
            }
          }
          console.log(mostprobableexpression);

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        resizedDetections.forEach((detection) => {
          const { x, y, width, height } = detection.detection.box;

          // Find the dominant expression
          const expressions = detection.expressions;
          const maxExpression = Object.keys(expressions).reduce((a, b) =>
            expressions[a] > expressions[b] ? a : b
          );

          // Draw rectangle around the face
          context.beginPath();
          context.strokeStyle = "#00FF00"; // Green rectangle
          context.lineWidth = 3;
          context.rect(x, y, width, height);
          context.stroke();

          // Draw the dominant expression text
          context.fillStyle = "#00FF00";
          context.font = "20px Arial";
          context.fillText(maxExpression.toUpperCase(), x + 5, y - 10);
        });
      }, 2000);
    };

    // Load models, then start video
    loadModels().then(startVideo);

    // Event listener for when the video starts playing
    if (videoRef.current) {
      videoRef.current.addEventListener("play", handleVideoPlay);
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "720px", height: "560px", margin: "auto" }}>
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

      {/* Canvas for drawing rectangle & expression */}
      <canvas
        ref={canvasRef}
        width="720"
        height="560"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
}
