import React from "react";
import { Link } from "react-router-dom";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Yalelogo from "../assets/yalelogo.svg";

const Done = (props) => {
  return (
    <div className="backgroundColor backgroundLayout">
      <div className="paperCard fade-in">
        <div className="horizontalInbetween">
          <div className="h1 textMain">You're all set! </div>
          <img
            src={Yalelogo}
            style={{ transform: "rotate(20deg)", width: "30px" }}
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
