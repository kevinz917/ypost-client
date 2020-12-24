import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import styles from "./letter.module.css";

// Rotate ref
const useRotate = () => {
  const [rotate, setRotate] = useState(false);

  const randNum = (a, b) => {
    return Math.random() * (b - a) + a;
  };

  const onMouseEnter = () => {
    console.log(true);
    setRotate(true);
  };

  const onMouseLeave = () => {
    setRotate(false);
  };

  const rotateStyle = !rotate
    ? {
        opacity: 1,
      }
    : {
        transform: `rotate(${randNum(-7, 7)}deg) scale(1.1)`,
      };

  return { rotateStyle, onMouseEnter, onMouseLeave };
};

const MemoryLetter = ({ letterContent }) => {
  const { rotateStyle, ...rotateProps } = useRotate();

  if (!letterContent) return <div />;
  return (
    <div className="memoryCard" style={rotateStyle} {...rotateProps}>
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
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemoryLetter;
