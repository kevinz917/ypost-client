import React, { useState, useEffect, useRef } from "react";
import ReactAudioPlayer from "react-audio-player";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import styles from "./letter.module.css";
import CanvasDraw from "react-canvas-draw";
import canvas_styles from "../pages/write.module.css";

// Rotate ref
const useRotate = () => {
  const [rotate, setRotate] = useState(false);

  const randNum = (a, b) => {
    return Math.random() * (b - a) + a;
  };

  const onMouseEnter = () => {
    // console.log(true);
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
        transform: `rotate(${randNum(-4, 4)}deg) scale(1.08)`,
      };

  return { rotateStyle, onMouseEnter, onMouseLeave };
};

const MemoryLetter = ({ letterContent }) => {
  const { rotateStyle, ...rotateProps } = useRotate();
  const drawing_ref = useRef(null);
  const [width, setWidth] = useState(-1);
  const ref = useRef(null);

  useEffect(() => {
    if (drawing_ref && drawing_ref.current && letterContent.drawing) {
      drawing_ref.current.loadSaveData(letterContent.drawing);
    }
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [letterContent]);

  if (!letterContent) return <div />;
  return (
    <div
      ref={ref}
      className="memoryCard"
      style={width > 506 ? rotateStyle : {}}
      {...rotateProps}
    >
      <div className="body textMain">
        Dear {letterContent.recipient.split(" ")[0]},
      </div>
      <br />
      <div className="body textMain">{letterContent.message}</div>
      {letterContent.drawing &&
        JSON.parse(letterContent.drawing).lines.length > 0 && (
          <CanvasDraw
            ref={drawing_ref}
            lazyRadius={0}
            brushRadius={5}
            hideGrid={true}
            canvasWidth={"100%"}
            canvasHeight={200}
            className={canvas_styles.canvas}
            disabled={true}
          />
        )}
      {letterContent.audioUrl ? (
        <>
          <br />
          <ReactAudioPlayer src={letterContent.audioUrl} controls />
          <br />
        </>
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
                width={Math.min(
                  150,
                  (width - 56 - letterContent.sticker.length * 20) /
                    letterContent.sticker.length
                )}
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
