import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Lottie from "react-lottie";
import ReactAudioPlayer from "react-audio-player";
import Mail from "../assets/mail.json";
import { Link } from "react-router-dom";
import Footer from "../components/footer";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const Demo = () => {
  const [pageState, setPageState] = useState("");

  // On mount
  useEffect(() => {
    const onMount = async () => {
      setPageState("Opening");
      await timeout(2000);
      setPageState("Opened");
    };

    onMount();
  }, []);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Mail,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="backgroundColor backgroundLayout">
      <Snowfall snowflakeCount={100} />
      {pageState === "Opening" ? (
        <Lottie options={defaultOptions} height={500} width={500} />
      ) : pageState === "Opened" ? (
        <div className="paperCard fade-in">
          <div className="body textMain">Hey Kevin!</div>
          <br />
          <div className="body textMain">
            Hope everything is going well! Happy holidays and I hope you have a
            good one :)
          </div>
          <br />
          <div
            className="body textMain italic"
            style={{ opacity: 0.4, marginBottom: "5px" }}
          >
            Voice mail ↓
          </div>
          <ReactAudioPlayer src={null} controls />
          <br />
          <br />
          <hr />
          <Link to="/" className="link">
            <button className="buttonMain buttonPrimary">
              <div>Send a letter</div>
            </button>
          </Link>
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default Demo;
