import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import { sendAmplitudeData } from "../util/amplitude";

const Done = (props) => {
  const [lastLetterId, setLastLetterId] = useState(null);

  // on mount
  useEffect(() => {
    let letters = JSON.parse(localStorage.getItem("letters"));
    if (letters.length > 0) {
      setLastLetterId(letters[letters.length - 1]);
    }
  }, []);

  return (
    <div className="paperCardContainer">
      <br />
      <div className="paperCard" style={{ maxWidth: 450 }}>
        <div className="horizontalInbetween">
          <div className="header2 textMain">You're all set! </div>
        </div>
        <br />
        <div className="body textMain">
          Your YPost has arrived in their inbox. Make sure to ask them to check!
          Have a great day.
        </div>
        <br />
        <Link to="/" className="link">
          <button className="buttonMain buttonPrimary">
            <div>Send another note</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Done;
