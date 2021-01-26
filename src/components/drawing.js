import React, { useState, useEffect, useRef } from "react";

import styles from "./letter.module.css";
import CanvasDraw from "react-canvas-draw";
import canvas_styles from "../pages/write.module.css";

const Drawing = ({ letterContent }) => {
  useEffect(() => {
    if (drawing_ref && drawing_ref.current && letterContent.drawing) {
      drawing_ref.current.loadSaveData(letterContent.drawing);
    }
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [letterContent]);

  return (
    <div>
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
    </div>
  );
};

export default Drawing;
