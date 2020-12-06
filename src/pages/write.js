import React, { useState, useEffect } from "react";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Yalelogo from "../assets/yalelogo.svg";
import Mic from "../assets/mic.svg";
import ReactAudioPlayer from "react-audio-player";
import Footer from "../components/footer";

import { Link } from "react-router-dom";

const MicRecorder = require("mic-recorder-to-mp3");
const recorder = new MicRecorder({
  bitRate: 320,
});

const Write = () => {
  const [isActive, setIsActive] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const startRecording = async () => {
    await recorder
      .start()
      .then(() => {
        console.log("Record starting");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const stopRecording = async () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log("Stop recording");
        const file = new File(buffer, "temp.mp3", {
          type: "audio/mp3",
          lastModified: Date.now(),
        });
        const player = URL.createObjectURL(blob);
        console.log(player);
        setAudioUrl(player);
        setAudioFile(file);
      })
      .catch((e) => {
        alert("We could not retrieve your message");
      });
  };

  const toggle = async (event) => {
    if (isActive) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsActive(!isActive);
  };

  return (
    <div className="backgroundColor backgroundLayout">
      <div className="paperCard fade-in">
        <Link to="/" className="link">
          <div className="navigation body">← Back</div>
        </Link>
        <hr />
        <br />
        <div className="h2">Who is this from?</div>
        <input
          className="inputMain"
          placeholder="Your name, or leave it blank :)"
        />
        <br />
        <br />
        <div className="h2">Write a message</div>
        <textarea
          className="inputMain textareaMain"
          placeholder="Your name, or leave it blank :)"
          rows="7"
        />
        <br />
        <br />
        <div className="h2">Add a voice message!</div>
        <button
          className="buttonMain buttonRecord"
          onClick={(e) => toggle(e)}
          style={{ height: "40px" }}
        >
          {isActive ? null : (
            <img src={Mic} style={{ marginRight: "5px", width: "15px" }} />
          )}
          {isActive ? "Click to stop" : "Click to start"}
        </button>
        {audioFile === null ? null : (
          <ReactAudioPlayer src={audioUrl} controls />
        )}
        <br />
        <hr />
        <Link to="/done" className="link">
          <button className="buttonMain buttonPrimary">
            <div>Send letter →</div>
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Write;
