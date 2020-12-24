import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendAmplitudeData } from "../util/amplitude";
import { SET_VAL } from "../redux/masterReducer";
import { fetchUserCards } from "../util/api";
import Letter from "../components/letter";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

const Memories = (props) => {
  const dispatch = useDispatch();
  const [userCards, setUserCards] = useState([]);
  useEffect(() => {
    const onMount = async () => {
      dispatch(SET_VAL("isLoading", true));
      let fetchedCards = await fetchUserCards(props.match.params.id);
      console.log(fetchedCards);
      setUserCards(fetchedCards);
    };
    onMount();
  }, []);
  return (
    <div>
      <Letter letterContent={userCards[0]} sent={1} admin={true} />
    </div>
  );
};

export default Memories;
