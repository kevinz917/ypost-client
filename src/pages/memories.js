import React, { useState, useEffect } from "react";
import { sendAmplitudeData } from "../util/amplitude";
import MemoryLetter from "../components/memoryLetter";
import { useSelector, useDispatch } from "react-redux";
import {
  SET_VAL,
  SET_USER_INFO,
  SET_FETCHED_CARDS,
} from "../redux/masterReducer";
import { fetchUserInfo, fetchAllCards } from "../api/user";
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

      await fetchAllCards();

      sendAmplitudeData("Visited Memory Lane");
    };
    onMount();
  }, [props.match.params.id]);

  return stateVal.isLoading === true ? null : (
    <div className="paperCardContainer fade-in">
      <div style={{ height: "40px", width: "500px" }} />
      <div className="link" onClick={(e) => props.history.push("/")}>
        <span className="navigation body">← Back</span>
      </div>
      <hr />
      <div className="header2 textMain">💌 Your cards</div>
      <ButtonGroup toggle style={{ width: "100%" }}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="outline-secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      {radioValue === "1" ? (
        <React.Fragment>
          {stateVal.userInfo.sentCards.length > 0 ? (
            <div>
              {stateVal.userInfo.sentCards.map((card, index) => (
                <MemoryLetter letterContent={card} />
              ))}
            </div>
          ) : null}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Memories;

// <div>
//   {stateVal.userInfo.receivedCards.map((card, index) => (
//     <MemoryLetter key={index} letterContent={card} />
//   ))}
// </div>;
