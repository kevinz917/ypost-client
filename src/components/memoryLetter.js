import React from "react";
import { Link, useHistory } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import styles from "./letter.module.css";

const MemoryLetter = ({ letterContent }) => {
  const randNum = (a, b) => {
    return Math.random() * (b - a) + a;
  };
  if (!letterContent) return <div />;
  return (
    <div
      className="paperCard"
      style={{ marginTop: "15px", marginBottom: "15px" }}
    >
      <div className="body textMain">
        Dear {letterContent.recipient.split(" ")[0]},
      </div>
      <br />
      <div className="body textMain">{letterContent.message}</div>
      {letterContent.audioUrl ? (
        <React.Fragment>
          <br />
          <ReactAudioPlayer src={letterContent.audioUrl} controls />
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
    </div>
  );
};

export default MemoryLetter;
