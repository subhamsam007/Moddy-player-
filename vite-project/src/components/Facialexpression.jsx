import React, { useEffect, useRef } from "react";
import * as faceapi from "@vladmandic/face-api"; // use the maintained fork

export default function FaceExpressionDetector() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // Start webcam
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

    useEffect(() => {
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.ageGenderNet.loadFromUri("/models");
            //   await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
            await faceapi.nets.faceExpressionNet.loadFromUri("/models");

            startVideo();
        };

        loadModels();

        if (videoRef.current) {
            videoRef.current.addEventListener("play", () => {
                const canvas = canvasRef.current;
                const displaySize = {
                    width: videoRef.current.width,
                    height: videoRef.current.height,
                };

                faceapi.matchDimensions(canvas, displaySize);

                setInterval(async () => {
                    const detections = await faceapi
                        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                        .withFaceExpressions()
                        .withAgeAndGender();  // ✅ Step 2

                    const resized = faceapi.resizeResults(detections, displaySize);

                    const context = canvas.getContext("2d");
                    context.clearRect(0, 0, canvas.width, canvas.height);

                    // ✅ Draw bounding box
                    faceapi.draw.drawDetections(canvas, resized);

                    // ✅ Draw expressions
                    faceapi.draw.drawFaceExpressions(canvas, resized);

                    // ✅ Step 3: Draw age & gender
                    resized.forEach((detection) => {
                        const { age, gender, genderProbability } = detection;
                        const box = detection.detection.box;

                        const drawBox = new faceapi.draw.DrawBox(box, {
                            label: `${Math.round(age)} yrs, ${gender} (${(genderProbability * 100).toFixed(0)}%)`
                        });
                        drawBox.draw(canvas);
                    });
                }, 200);

            });
        }
    }, []);

    return (
        <div
            style={{
                position: "relative",
                width: "500px",
                height: "400px",
                margin: "auto",
            }}
        >
            {/* Webcam Video */}
            <video
                ref={videoRef}
                autoPlay
                muted
                width="500"
                height="400"
                style={{ position: "absolute", top: 0, left: 0 }}
            />

            {/* Overlay Canvas */}
            <canvas
                ref={canvasRef}
                width="700"
                height="500"
                style={{ position: "absolute", top: 0, left: 0 }}
            />
        </div>
    );
}
