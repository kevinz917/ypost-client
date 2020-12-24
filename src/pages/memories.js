import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendAmplitudeData } from "../util/amplitude";
import { SET_VAL } from "../redux/masterReducer";
import { fetchUserCards } from "../util/api";
import Letter from "../components/letter";
import MemoryLetter from "../components/memoryLetter";
import Flake from "../assets/flake.svg";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Memories = (props) => {
  const dispatch = useDispatch();

  const [userCards, setUserCards] = useState([]);
  const stateVal = useSelector((state) => state.state);
  const [loadingState, setLoadingState] = useState(0);

  useEffect(() => {
    const onMount = async () => {
      setLoadingState(0);
      let fetchedCards = await fetchUserCards(props.match.params.id);
      setUserCards(fetchedCards);
      setLoadingState(1);
      await delay(800);
      setLoadingState(2);
    };
    onMount();
  }, []);
  return loadingState === 0 ? (
    <img
      src={Flake}
      className="rotate snowflake paperCardContainer"
      alt="snow"
    />
  ) : loadingState === 1 ? (
    <img
      src={Flake}
      className="paperCardContainer snowflake move-me-3"
      alt="snow"
    />
  ) : (
    <div className="paperCardContainer fade-in">
      <div style={{ height: "40px" }} />
      <div className="h1 textMain">Your memories 💌 </div>
      <div className="body" style={{ opacity: "0.7" }}>
        {userCards.length} postcards
      </div>
      <br />
      <div>
        {userCards.map((card, idx) => {
          return <MemoryLetter letterContent={card} />;
        })}
      </div>
    </div>
  );
};

export default Memories;
