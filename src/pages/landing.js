import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchCount } from "../util/api";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import Select from "react-select";
import { sendAmplitudeData } from "../util/amplitude";
import { fetchMembers, fetchPublicPosts } from "../api/group";
import { fetchAllCards, fetchUserInfo } from "../api/user";
import MemoryLetter from "../components/memoryLetter";

import { Spinner } from "../components/other/LoadingSpinner";
import Hero from "../assets/hero.png";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import "../styles/custom.scss";

import Splash from "./public/splash";

const Landing = () => {
  const dispatch = useDispatch();
  const stateVal = useSelector((state) => state.state);
  const groupVal = useSelector((state) => state.groupReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [radioValue, setRadioValue] = useState("1");
  const radios = { 1: "For me", 2: "From me", 3: "Public cards" };

  // on mount
  useEffect(() => {
    const onMount = async () => {
      sendAmplitudeData("Visited home page");
      setIsLoading(true);

      await fetchUserInfo();

      if (stateVal.studentList.length === 0) {
        await fetchMembers();
      }

      if (
        stateVal.userInfo.sentCards.length > 0 ||
        stateVal.userInfo.receivedCards.length > 0
      ) {
        setIsLoading(false);
      }
      await fetchAllCards(); // your cards
      await fetchPublicPosts(); // group cards

      if (stateVal.letterCount === null) {
        await fetchCount();
      }
      setIsLoading(false);
    };

    if (stateVal.auth === 1) {
      onMount();
    }
  }, [groupVal.groupId]);

  // input change for async select
  const onInputChange = (e) => {
    dispatch(SET_VAL("email", e ? e.value : ""));
    dispatch(SET_VAL("selectedStudent", e ? e.label : ""));
  };

  if (stateVal.auth !== 1) {
    return <Splash />;
  }

  return isLoading === 0 ? null : (
    <div className="paperCardContainer fade-in">
      {stateVal.auth === 1 && (
        <Link to="/feedback" className="link">
          <div className="paperCard">
            <div className="header3 textMain">Share thoughts anonymously →</div>
            <div className="textMain body">
              speak up and share feedback anonymously to your lead
            </div>
          </div>
        </Link>
      )}
      <div className="paperCard">
        <div className="d-flex flex-row align-items-center">
          <div>
            <img
              src={Hero}
              style={{ width: "70px", height: "auto" }}
              alt="hero"
              className="mr-3"
            />
          </div>
          <div>
            <div className="d-flex flex-column header2 textMain">
              Send a note
            </div>
            <div className="body textMain">
              Send delightful cards to show gratitude
            </div>
          </div>
        </div>
        <br />
        {stateVal.auth !== -1 && (
          <React.Fragment>
            <Select
              options={stateVal.studentList}
              placeholder="Type in recipient name"
              autoFocus
              onChange={onInputChange}
              isClearable={true}
              value={
                stateVal.email && {
                  value: stateVal.email,
                  label: stateVal.selectedStudent,
                }
              }
            />
            <Link to="/write" className="link">
              <button className="buttonMain buttonPrimary">Send a note</button>
            </Link>
          </React.Fragment>
        )}
        {stateVal.auth === -1 ? (
          <Link to="/login" className="link">
            <button className="buttonMain buttonPrimary">Log in here</button>
          </Link>
        ) : null}
      </div>
      <div style={{ height: "10px" }} />
      {stateVal.auth === 1 ? (
        <div className="paperCardContainer fade-in">
          <br />
          <div className="d-flex flex-row justify-content-between w-100 s">
            <div className="header2 textMain">Your cards</div>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {radios[radioValue]}
              </Dropdown.Toggle>
              <Dropdown.Menu variant="secondary">
                {Object.keys(radios).map((selection) => (
                  <Dropdown.Item
                    onSelect={() => setRadioValue(`${selection}`)}
                    variant="secondary"
                  >
                    {radios[selection]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {isLoading ? (
            <Spinner />
          ) : radioValue === "1" ? (
            <React.Fragment>
              {stateVal.userInfo.receivedCards.map((card) => (
                <MemoryLetter letterContent={card} />
              ))}
            </React.Fragment>
          ) : radioValue === "2" ? (
            <React.Fragment>
              {stateVal.userInfo.sentCards.map((card) => (
                <MemoryLetter letterContent={card} />
              ))}
            </React.Fragment>
          ) : radioValue === "3" ? (
            <React.Fragment>
              {groupVal.cards.map((card) => (
                <MemoryLetter letterContent={card} status={"public"} />
              ))}
            </React.Fragment>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Landing;
