import React from "react";
import styles from "./sticker.module.css";

const Sticker = ({ src, selected_sticker }) => {
  return (
    <div className={styles.sticker_container}>
      <img
        src={src}
        className={`${selected_sticker === src ? styles.selected : ""} ${
          styles.sticker
        }`}
        width={75}
        draggable="false"
        alt=""
      />
    </div>
  );
};

export default Sticker;
