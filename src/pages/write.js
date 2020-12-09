import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Mic from "../assets/mic.svg";
import ReactAudioPlayer from "react-audio-player";
import PaperCard from "../components/papercard";

import { createCard } from "../util/api";

// Redux
import { SET_VAL } from "../redux/masterReducer";
import { useSelector, useDispatch } from "react-redux";

const MicRecorder = require("mic-recorder-to-mp3");
const recorder = new MicRecorder({
  bitRate: 320,
});

const Write = (props) => {
  const dispatch = useDispatch();

  const stateVal = useSelector((state) => state.inputReducer);

  const [isActive, setIsActive] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const validate = async (e) => {
    if (stateVal.message.length === 0 && audioFile === null) {
      setErrorMessage("Please type or record a message!");
    } else {
      // console.log(audioFile);
      // let createdCard = await createCard(
      //   stateVal.author,
      //   stateVal.email,
      //   stateVal.message,
      //   audioFile,
      //   null
      // );

      localStorage.setItem("sent", true);
      props.history.push("/done");
    }
  };

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

  const sendLetter = async (e) => {
    let createdCard = await createCard(
      stateVal.author,
      stateVal.email,
      stateVal.message,
      audioFile,
      null
    );
  };

  return (
    <PaperCard>
      <Link to="/" className="link">
        <span className="navigation body">← Back</span>
      </Link>
      <hr />
      <br />
      <div className="h2">Who is this from?</div>
      <input
        className="inputMain"
        placeholder="Your name, or leave it blank :)"
        value={stateVal.author}
        onChange={(e) => dispatch(SET_VAL("author", e.target.value))}
      />
      <br />
      <br />
      <div className="h2">Write a message</div>
      <textarea
        className="inputMain textareaMain"
        placeholder="Write here"
        rows="4"
        value={stateVal.message}
        style={{ maxWidth: "100%" }}
        onChange={(e) => dispatch(SET_VAL("message", e.target.value))}
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
      {audioFile === null ? null : <ReactAudioPlayer src={audioUrl} controls />}
      <hr />
      <button className="buttonMain buttonPrimary" onClick={validate}>
        <div>Send letter →</div>
      </button>
      {errorMessage ? (
        <div className="body textMain italic">{errorMessage}</div>
      ) : null}
    </PaperCard>
  );
};

export default Write;
