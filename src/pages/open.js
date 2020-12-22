import React, { useState, useEffect } from "react";
import Letter from "../components/letter";
import Mail from "../assets/mail2.json";
import { fetchCard, setOpened } from "../util/api";
import Lottie from "react-lottie";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

const timeout = (delay) => {
  return new Promise((res) => setTimeout(res, delay));
};

const Open = (props) => {
  const letterId = props.match.params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [sent, setSent] = useState(0);
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
        localStorage.setItem("sent", 0);
      }
      if (localStorage.getItem("letters") === null) {
        localStorage.setItem("letters", JSON.stringify([]));
      }
      // Check if user has sent letter before
      // if (JSON.parse(localStorage.getItem("sent")) === 0) {
      //   setSent(0);
      // }

      let fetchedCard = await fetchCard(letterId);
      if (fetchedCard) {
        setLetterContent(fetchedCard);
      }
      if (!fetchedCard.opened) {
        setOpened(fetchedCard._id);
      }

      // Add card to localStorage
      let temp = JSON.parse(localStorage.getItem("letters"));
      if (temp.includes(fetchedCard._id) === false) {
        temp.push(fetchedCard._id);
        localStorage.setItem("letters", JSON.stringify(temp));
        setSent(JSON.parse(localStorage.getItem("sent")) - 1);
      } else {
        setSent(JSON.parse(localStorage.getItem("sent")));
      }
      setIsLoading(false);
      await timeout(2000);
      setPageState("Opened");
    };
    onMount();
  }, [letterId]);

  return pageState === "Opening" ? (
    <div style={{ height: 300, width: 300, margin: "auto" }}>
      <Lottie options={defaultOptions} />
    </div>
  ) : isLoading ? null : (
    <Letter letterContent={letterContent} sent={sent} />
  );
};

export default Open;
