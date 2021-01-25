import React, { useState, useEffect } from "react";
import { sendAmplitudeData } from "../util/amplitude";
import { fetchUserCards } from "../util/api";
import MemoryLetter from "../components/memoryLetter";
import Flake from "../assets/flake.svg";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL, SET_USER_INFO } from "../redux/masterReducer";
import { fetchUserInfo } from "../api/user";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Memories = (props) => {
  const stateVal = useSelector((state) => state.state);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Sent", value: "1" },
    { name: "Received", value: "2" },
  ];

  useEffect(() => {
    const onMount = async () => {
      // fetch user info
      SET_VAL("isLoading", true);
      await fetchUserInfo();
      SET_VAL("isLoading", false);

      sendAmplitudeData("Visited Memory Lane");
    };
    onMount();
  }, [props.match.params.id]);

  return stateVal.isLoading === true ? null : (
    <div className="paperCardContainer fade-in">
      <div style={{ height: "40px", width: "100%" }} />
      <div className="link" onClick={(e) => props.history.push("/")}>
        <span className="navigation body">← Back</span>
      </div>
      <hr />
      <br />
      <div className="header2 textMain">💌 Your cards</div>
      <br />
      <ButtonGroup toggle>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <div>
        {stateVal.userInfo.receivedCards.map((card, index) => (
          <MemoryLetter key={index} letterContent={card} />
        ))}
      </div>
    </div>
  );
};

export default Memories;

// <div>
//   {stateVal.userInfo.receivedCards.map((card, index) => (
//     <MemoryLetter key={index} letterContent={card} />
//   ))}
// </div>;
