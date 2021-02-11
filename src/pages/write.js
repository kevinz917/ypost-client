import React, { useEffect, useRef, useState } from "react";
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
import { FiX, FiRotateCcw } from "react-icons/fi";
import { sendAmplitudeData } from "../util/amplitude";
import CanvasDraw from "react-canvas-draw";

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
  const drawing_ref = useRef(null);
  const stateVal = useSelector((state) => state.state);
  const [brush_color, setBrushcolor] = useState(0);
  const [letterContent, setLetterContent] = useState({});
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
    "https://i.ibb.co/kc6cNDY/bulldogvalentine-jpeg.jpg",
    "https://i.ibb.co/NWsCnkd/Dan-Valentine.jpg",
    "https://i.ibb.co/FYvNPzb/Pizza-Valentine.jpg",
    "https://i.ibb.co/424QtZg/Sterling-Valentine-1.jpg",
    "https://i.ibb.co/xjzKzyS/Sterling-Valentine.jpg",
  ];
  const validate = async (e) => {
    if (stateVal.message.length === 0 && audioFile === null) {
      setErrorMessage("Please type or record a message!");
    } else {
      setIsPreview(true);
      setLetterContent({
        author: stateVal.author,
        recipient: stateVal.selectedStudent,
        email: stateVal.email,
        message: stateVal.message,
        sticker: selected_stickers,
        audioFile: audioFile,
        audioUrl: audioUrl,
        drawing: drawing_ref.current.getSaveData(),
        netId: stateVal.netid,
      });
      sendAmplitudeData("Previewed letter");
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

  const colors = ["#444", "#70e690", "#FC777B", "#3370cc"];

  useEffect(() => {
    if (!isPreview && letterContent.drawing) {
      drawing_ref.current.loadSaveData(letterContent.drawing);
    }
  }, [isPreview, letterContent]);

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
        placeholder="Your name, or leave it blank"
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
      <div className="h2">Draw something</div>

      <CanvasDraw
        ref={drawing_ref}
        lazyRadius={0}
        brushRadius={5}
        brushColor={colors[brush_color]}
        catenaryColor={colors[brush_color]}
        hideGrid={true}
        canvasWidth={"100%"}
        canvasHeight={200}
        className={styles.canvas}
      />

      <div className={styles.toolbar}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={
              styles.color_square +
              (index === brush_color ? "" : " " + styles.not_selected)
            }
            style={{ backgroundColor: color }}
            onClick={(e) => {
              sendAmplitudeData(`${color}`);
              setBrushcolor(index);
            }}
          ></div>
        ))}
        <div
          onClick={() => {
            drawing_ref.current.undo();
          }}
          className={styles.undo}
        >
          <FiRotateCcw size={18} style={{ display: "block" }} />
        </div>
        <div
          onClick={() => {
            drawing_ref.current.clear();
          }}
          className={styles.clear}
        >
          <FiX size={22} style={{ display: "block" }} />
        </div>
      </div>

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
        <div>Preview YPost →</div>
      </button>
      {errorMessage ? (
        <div className="body textMain italic">{errorMessage}</div>
      ) : null}
    </PaperCard>
  );
};

export default Write;
