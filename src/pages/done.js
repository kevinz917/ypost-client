import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Yalelogo from "../assets/yalelogo.svg";
import { sendAmplitudeData } from "../util/amplitude";

const Done = (props) => {
  const [lastLetterId, setLastLetterId] = useState(null);

  // On mount
  useEffect(() => {
    let letters = JSON.parse(localStorage.getItem("letters"));
    if (letters.length > 0) {
      setLastLetterId(letters[letters.length - 1]);
    }
  }, []);

  const navigate = (e) => {
    props.history.push("/");
  };
  return (
    <div className="paperCardContainer">
      {lastLetterId ? (
        <div className="paperCard" style={{ maxWidth: 450 }}>
          <div className="body textMain">Open your last letter! </div>
          <Link to={`/letter/${lastLetterId}`} className="link">
            <button className="buttonMain buttonPrimary">
              <div>Open letter</div>
            </button>
          </Link>
        </div>
      ) : null}
      <br />
      <div className="paperCard" style={{ maxWidth: 450 }}>
        <div className="horizontalInbetween">
          <div className="h1 textMain">You're all set! </div>
          <img
            src={Yalelogo}
            style={{ transform: "rotate(20deg)", width: "30px" }}
            alt="YaleLogo"
          />
        </div>
        <br />
        <div className="body textMain">
          Your postcard has arrived in their inbox. Make sure to ask them to
          check! Have a great day.
        </div>
        <br />
        <br />
        <div className="body textMain italic">Send another letter</div>
        <Link to="/" className="link">
          <button className="buttonMain buttonPrimary">
            <div>Send another letter</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Done;
