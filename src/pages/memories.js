import React, { useState, useEffect } from "react";
import { sendAmplitudeData } from "../util/amplitude";
import MemoryLetter from "../components/memoryLetter";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCards } from "../api/user";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Memories = (props) => {
  const stateVal = useSelector((state) => state.state);
  const [radioValue, setRadioValue] = useState("1");
  const [isFetching, setIsFetching] = useState(false);

  const radios = [
    { name: "Sent", value: "1" },
    { name: "Received", value: "2" },
  ];

  useEffect(() => {
    const onMount = async () => {
      // fetch cards
      setIsFetching(true);
      await fetchAllCards();
      setIsFetching(false);
      sendAmplitudeData("Visited Memory Lane");
    };
    onMount();
  }, []);

  return stateVal.isLoading === true ? null : (
    <div className="paperCardContainer fade-in">
      <div style={{ height: "40px", width: "500px" }} />
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
      <br />
      {isFetching ? (
        <div className="w-100 d-flex flex-row justify-content-center">
          <br />
          Loading letters ...
        </div>
      ) : radioValue === "1" ? (
        <React.Fragment>
          {stateVal.userInfo.sentCards.length > 0 ? (
            <div>
              {stateVal.userInfo.sentCards.map((card) => (
                <MemoryLetter letterContent={card} />
              ))}
            </div>
          ) : null}
        </React.Fragment>
      ) : radioValue === "2" ? (
        <React.Fragment>
          {stateVal.userInfo.receivedCards.length > 0 ? (
            <div>
              {stateVal.userInfo.receivedCards.map((card) => (
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

// <div className="link" onClick={(e) => props.history.push("/")}>
//   <span className="navigation body">← Back</span>
// </div>;
