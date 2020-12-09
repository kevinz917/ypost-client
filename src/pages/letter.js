import React, { useState, useEffect } from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

import { fetchCard } from "../util/api";

import PaperCard from "../components/papercard";
import ReactAudioPlayer from "react-audio-player";

const Letter = (props) => {
  const letterId = props.match.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [sent, setSent] = useState(false);
  const [letterContent, setLetterContent] = useState({});

  // testing card id: 5fce5c52935c922b9a5b26da

  // on Mount
  useEffect(() => {
    const onMount = async () => {
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
    };
    onMount();
  }, []);

  const navigate = (e) => {
    props.history.push("/");
  };
  return (
    <React.Fragment>
      {isLoading ? null : (
        <PaperCard>
          <div className="body textMain">Dear Kevin</div>
          <br />
          <div className={sent ? "body textMain" : "blurred"}>
            {letterContent.message}
          </div>
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
            Send a letter to unlock :)
          </button>
        </PaperCard>
      )}
    </React.Fragment>
  );
};

export default Letter;
