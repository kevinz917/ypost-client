import React, { useState, useEffect } from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Lottie from "react-lottie";
import ReactAudioPlayer from "react-audio-player";
import Mail from "../assets/mail2.json";
import { Link } from "react-router-dom";
import PaperCard from "../components/papercard";

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

  return pageState === "Opening" ? (
    <div style={{ height: 300, width: 300, margin: "auto" }}>
      <Lottie options={defaultOptions} />
    </div>
  ) : pageState === "Opened" ? (
    <PaperCard>
      <div className="body textMain">Hey Kevin!</div>
      <br />
      <div className="body textMain">
        Hope everything is going well! Happy holidays and I hope you have a good
        one :)
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
    </PaperCard>
  ) : (
    <div />
  );
};

export default Demo;
