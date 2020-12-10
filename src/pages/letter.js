import React, { useState, useEffect } from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Mail from "../assets/mail2.json";

import { fetchCard } from "../util/api";
import PaperCard from "../components/papercard";
import ReactAudioPlayer from "react-audio-player";
import BlurredObject from "../assets/blurredObject.png";
import Lottie from "react-lottie";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const Letter = (props) => {
  const letterId = props.match.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [sent, setSent] = useState(false);
  const [letterContent, setLetterContent] = useState({});
  const [pageState, setPageState] = useState("");

  // testing card id: 5fce5c52935c922b9a5b26da
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: Mail,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // on Mount
  useEffect(() => {
    const onMount = async () => {
      setPageState("Opening");
      // Check if it's first time visiting website
      if (localStorage.getItem("sent") === null) {
        localStorage.setItem("sent", false);
      }
      if (localStorage.getItem("letters") === null) {
        localStorage.setItem("letters", JSON.stringify([]));
      }
      // Check if user has sent letter before
      if (JSON.parse(localStorage.getItem("sent")) === true) {
        setSent(true);
      }

      let fetchedCard = await fetchCard(letterId);
      if (fetchedCard) {
        setLetterContent(fetchedCard);
      }

      // Add card to localStorage
      let temp = JSON.parse(localStorage.getItem("letters"));
      if (temp.includes(fetchedCard._id) === false) {
        temp.push(fetchedCard._id);
        localStorage.setItem("letters", JSON.stringify(temp));
      }
      setIsLoading(false);
      await timeout(2000);
      setPageState("Opened");
    };
    onMount();
  }, []);

  const navigate = (e) => {
    props.history.push("/");
  };
  return pageState === "Opening" ? (
    <div style={{ height: 300, width: 300, margin: "auto" }}>
      <Lottie options={defaultOptions} />
    </div>
  ) : (
    <React.Fragment>
      {isLoading ? null : (
        <PaperCard>
          <div className="body textMain">Dear Kevin</div>
          <br />
          {sent ? (
            <div className="body textMain">{letterContent.message}</div>
          ) : (
            <img src={BlurredObject} style={{ width: "100%" }} />
          )}
          <br />
          {letterContent.audioUrl ? (
            <React.Fragment>
              <div
                className="body textMain italic"
                style={{ opacity: 0.4, marginBottom: "5px" }}
              >
                Voice mail ↓
              </div>
              {sent ? (
                <ReactAudioPlayer src={letterContent.audioUrl} controls />
              ) : (
                <div className="body textMain blurred">[ Hidden for now ]</div>
              )}
            </React.Fragment>
          ) : null}
          <br />

          <button className="buttonMain buttonPrimary" onClick={navigate}>
            {sent ? "Send letter to friend" : "Send a letter to unlock →"}
          </button>
        </PaperCard>
      )}
    </React.Fragment>
  );
};

export default Letter;
