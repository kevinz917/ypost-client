import React, { useMemo, useState } from "react";
import styles from "./write.module.css";
import { Link } from "react-router-dom";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Mic from "../assets/mic.svg";
import ReactAudioPlayer from "react-audio-player";
import PaperCard from "../components/papercard";
import Sticker from "../components/sticker";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Redux
import { SET_VAL } from "../redux/masterReducer";
import { useSelector, useDispatch } from "react-redux";
import Letter from "../components/letter";

const MicRecorder = require("mic-recorder-to-mp3");
const recorder = new MicRecorder({
  bitRate: 320,
});

const Write = (props) => {
  const dispatch = useDispatch();

  const stateVal = useSelector((state) => state.state);
  if (!stateVal.selectedStudent) {
    props.history.push("/");
  }

  const [isActive, setIsActive] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selected_stickers, setSelected] = useState([]);
  const [isPreview, setIsPreview] = useState(false);

  // sticker array
  const sources = [
    "https://media.giphy.com/media/VKwspRV2pafJu/giphy.gif",
    "https://media.giphy.com/media/R7AW255ijTdV6/giphy.gif",
    "https://media.giphy.com/media/PuKSVqbw0hEpq/giphy.gif",
    "https://media.giphy.com/media/6eEWybJorTCvK/giphy.gif",
  ];

  const validate = async (e) => {
    if (stateVal.message.length === 0 && audioFile === null) {
      setErrorMessage("Please type or record a message!");
    } else {
      setIsPreview(true);
    }
  };

  const startRecording = async () => {
    await recorder
      .start()
      .then(() => {})
      .catch((e) => {
        console.error(e);
      });
  };

  const stopRecording = async () => {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "temp.mp3", {
          type: "audio/mp3",
          lastModified: Date.now(),
        });
        const player = URL.createObjectURL(blob);
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

  const stickers = sources.map((src) => (
    <Sticker src={src} key={src} selected_sticker={selected_stickers} />
  ));

  const handleSelect = (key) => {
    let new_stickers = [...selected_stickers];
    const index = new_stickers.indexOf(key);
    if (index > -1) {
      new_stickers.splice(index, 1);
    } else {
      new_stickers.push(key);
      if (new_stickers.length === 4) {
        new_stickers.splice(0, 1);
      }
    }
    setSelected(new_stickers);
  };

  const letterContent = useMemo(() => {
    if (!isPreview) return {};
    return {
      author: stateVal.author,
      recipient: stateVal.selectedStudent,
      message: stateVal.message,
      sticker: selected_stickers,
      audioUrl: audioUrl,
    };
  }, [isPreview, selected_stickers, stateVal, audioUrl]);

  return isPreview ? (
    <Letter letterContent={letterContent} setIsPreview={setIsPreview} />
  ) : (
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
      <div className="h2">Pick a sticker</div>
      <div style={{ width: "100%" }}>
        <ScrollMenu
          data={stickers}
          wheel={false}
          arrowLeft={<FaChevronLeft className={styles.arrow_btn} />}
          arrowRight={<FaChevronRight className={styles.arrow_btn} />}
          onSelect={handleSelect}
          disableTabindex={true}
          alignOnResize={false}
          translate={-1}
        />
      </div>
      <br />
      <br />
      <div className="h2">Add a voice message!</div>
      <button
        className="buttonMain buttonRecord"
        onClick={(e) => toggle(e)}
        style={{ height: "40px" }}
      >
        {isActive ? null : (
          <img
            src={Mic}
            style={{ marginRight: "5px", width: "15px" }}
            alt="mic"
          />
        )}
        {isActive ? "Click to stop" : "Click to start"}
      </button>
      {audioFile === null ? null : <ReactAudioPlayer src={audioUrl} controls />}
      <hr />
      <button className="buttonMain buttonPrimary" onClick={validate}>
        <div>Preview letter →</div>
      </button>
      {errorMessage ? (
        <div className="body textMain italic">{errorMessage}</div>
      ) : null}
    </PaperCard>
  );
};

export default Write;
