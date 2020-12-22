import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import styles from "./letter.module.css";

import PaperCard from "../components/papercard";
import ReactAudioPlayer from "react-audio-player";
import BlurredObject from "../assets/blurredObject.png";
import { createCard } from "../util/api";

const Letter = ({ letterContent, sent = 0, setIsPreview = null }) => {
  let history = useHistory();
  const sendLetter = async (e) => {
    let createdCard = await createCard(
      letterContent.author,
      letterContent.recipient,
      letterContent.email,
      letterContent.message,
      letterContent.audioFile,
      letterContent.sticker
    );
    localStorage.setItem("sent", Math.min(sent + 1, 0));
    history.push("/done");
  };

  const randNum = (a, b) => {
    return Math.random() * (b - a) + a;
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
      <div className="body textMain">
        Dear {letterContent.recipient.split(" ")[0]},
      </div>
      <br />
      {sent === 0 ? (
        <div className="body textMain">{letterContent.message}</div>
      ) : (
        <img src={BlurredObject} alt="blurred" style={{ width: "100%" }} />
      )}
      {letterContent.audioUrl ? (
        <React.Fragment>
          <br />
          {sent === 0 ? (
            <ReactAudioPlayer src={letterContent.audioUrl} controls />
          ) : (
            <div className="body textMain blurred">[ Hidden for now ]</div>
          )}
          <br />
        </React.Fragment>
      ) : null}

      <br />
      <div className="body textMain" style={{ textAlign: "right" }}>
        Sincerely, <br />{" "}
        {letterContent.author ? letterContent.author : "Anonymous :)"}
      </div>
      <br />
      {letterContent.sticker && (
        <div style={{ display: "flex" }}>
          {letterContent.sticker.map((sticker) => (
            <span style={{ margin: "auto" }} key={sticker}>
              <img
                src={sticker}
                alt="sticker"
                width={100}
                className={styles.placedSticker}
                style={{ transform: `rotate(${randNum(-5, 5)}deg)` }}
              />
            </span>
          ))}
        </div>
      )}
      {setIsPreview ? (
        <button className="buttonMain buttonPrimary" onClick={sendLetter}>
          <div>Send letter →</div>
        </button>
      ) : (
        <Link to="/" className="link">
          <button className="buttonMain buttonPrimary">
            {sent === 0 ? "Send letter to friend" : "Send a letter to unlock →"}
          </button>
        </Link>
      )}
    </PaperCard>
  );
};

export default Letter;
