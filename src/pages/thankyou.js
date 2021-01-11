import React from "react";
import PaperCard from "../components/papercard";
import styles from "../components/letter.module.css";
import { Link } from "react-router-dom";

function Thankyou() {
  return (
    <PaperCard maxWidth={550}>
      <Link to="/" className="link">
        <span className="navigation body">← Back</span>
      </Link>
      <hr />
      <div style={{ display: "flex", margin: "20px 0 10px 0" }}>
        <span style={{ margin: "auto" }}>
          <img
            src="https://media.giphy.com/media/QAsBwSjx9zVKoGp9nr/giphy.gif"
            alt="sticker"
            width={200}
            className={styles.placedSticker}
          />
        </span>
      </div>
      <div className="h1 textMain" style={{ textAlign: "center" }}>
        Thank you for filling out the form!
      </div>
      <div
        className="body"
        style={{ textAlign: "center", marginBottom: "10px" }}
      >
        This is to confirm that we have received your response :)
      </div>
    </PaperCard>
  );
}

export default Thankyou;
