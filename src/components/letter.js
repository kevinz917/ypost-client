import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import styles from "./sticker.module.css";

import PaperCard from "../components/papercard";
import ReactAudioPlayer from "react-audio-player";
import BlurredObject from "../assets/blurredObject.png";
import { createCard } from "../util/api";

const Letter = ({ letterContent, sent = true, setIsPreview = null }) => {
  let history = useHistory();

  const sendLetter = async (e) => {
    let createdCard = await createCard(
      letterContent.author,
      letterContent.email,
      letterContent.message,
      letterContent.audioFile,
      letterContent.sticker
    );
    localStorage.setItem("sent", true);
    history.push("/done");
  };
  if (!letterContent) return <div />;
  return (
    <PaperCard>
      {setIsPreview && (
        <React.Fragment>
          <div className="link">
            <span
              className="navigation body"
              onClick={() => {
                setIsPreview(false);
              }}
            >
              ← Back
            </span>
          </div>
          <hr />
          <br />
        </React.Fragment>
      )}
      <div className="body textMain">Dear x</div>
      <br />
      {sent ? (
        <div className="body textMain">{letterContent.message}</div>
      ) : (
        <img src={BlurredObject} alt="blurred" style={{ width: "100%" }} />
      )}
      <br />
      {letterContent.audioUrl ? (
        <React.Fragment>
          {sent ? (
            <ReactAudioPlayer src={letterContent.audioUrl} controls />
          ) : (
            <div className="body textMain blurred">[ Hidden for now ]</div>
          )}
        </React.Fragment>
      ) : null}
      <br />
      {letterContent.sticker && (
        <div>
          <img
            src={letterContent.sticker}
            alt="sticker"
            width={100}
            className={styles.placedSticker}
          />
        </div>
      )}
      {setIsPreview ? (
        <button className="buttonMain buttonPrimary" onClick={sendLetter}>
          <div>Send letter →</div>
        </button>
      ) : (
        <Link to="/" className="link">
          <button className="buttonMain buttonPrimary">
            {sent ? "Send letter to friend" : "Send a letter to unlock →"}
          </button>
        </Link>
      )}
    </PaperCard>
  );
};

export default Letter;
