import React, { useState, useEffect } from "react";
import PaperCard from "../components/papercard";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, fetchCount } from "../util/api";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import Stamp from "../assets/stamp.svg";
import AsyncSelect from "react-select/async";
import Flake from "../assets/flake.svg";
import { sendAmplitudeData } from "../util/amplitude";
import styles from "./landing.module.css";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Landing = (props) => {
  const dispatch = useDispatch();
  const [letter_count, setLetterCount] = useState(-1);
  const [loadingState, setLoadingState] = useState(0);

  // On mount
  useEffect(() => {
    const onMount = async () => {
      dispatch(SET_VAL("isLoading", true));
      sendAmplitudeData("Visited home page");
      setLoadingState(0);
      let studentList = await fetchStudents();
      dispatch(SET_VAL("studentList", studentList));

      if (localStorage.getItem("sent") === null) {
        localStorage.setItem("sent", 0);
      }
      if (localStorage.getItem("letters") === null) {
        localStorage.setItem("letters", JSON.stringify([]));
      }
      setLoadingState(1);
      await delay(800);
      setLoadingState(2);
      await delay(50);
      const letterCount = await fetchCount();
      if (letterCount && letterCount.data) {
        setLetterCount(letterCount.data.count);
      }
      dispatch(SET_VAL("isLoading", false));
    };

    onMount();
  }, [dispatch]);

  const stateVal = useSelector((state) => state.state);
  const [errorMessage, setErrorMessage] = useState(null);

  const validate = (e) => {
    if (stateVal.email.length === 0) {
      setErrorMessage("Email can't be empty!");
    } else if (!stateVal.email.includes("@")) {
      setErrorMessage("Please enter a valid email address!");
    } else {
      sendAmplitudeData("Selected contact");
      props.history.push("/write");
    }
  };

  const filterStudents = (inputValue) => {
    return stateVal.studentList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterStudents(inputValue));
    }, 1000);
  };

  const onInputChange = (e) => {
    dispatch(SET_VAL("email", e ? e.value : ""));
    dispatch(SET_VAL("selectedStudent", e ? e.label : ""));
  };
  // console.log(stateVal.netid);
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
    <div className="paperCardContainer">
      <div className="paperCard">
        <div className="horizontalInbetween">
          <div className="h1 textMain">Hey Yalies!</div>
          <img
            src={Stamp}
            alt="logo"
            style={{ transform: "rotate(20deg)", width: "75px" }}
          />
        </div>
        <br />
        <div className="body textMain italic">Who do you miss the most?</div>
        <br />
        <div className="body textMain">
          3 Yalies built YPost so you can send virtual postcards to friends with{" "}
          <span style={{ fontWeight: "bold" }}>gifs and audio messages</span>!
          Check it out below, and Happy holidays :)
        </div>
        <br />
        <div className="body textMain italic">
          <Link to="/about" className="hyperlink">
            About this project.
          </Link>
        </div>
        <br />
        <div className={styles.letter_cnt_container + " body textMain fade-in"}>
          {letter_count === -1 ? (
            <span className={styles.letter_cnt_label}>Loading...</span>
          ) : (
            <div className="fade-in">
              <span className={styles.letter_cnt_label}>
                Total Letters Sent:{" "}
              </span>
              <span className={styles.letter_cnt_val}>{letter_count}</span>
            </div>
          )}
        </div>
        <br />
        {stateVal.auth ? (
          <AsyncSelect
            loadOptions={loadOptions}
            placeholder="Type in a recipient's name..."
            autoFocus
            onChange={onInputChange}
            isClearable={true}
            value={
              stateVal.email
                ? {
                    value: stateVal.email,
                    label: stateVal.selectedStudent,
                  }
                : null
            }
          />
        ) : (
          <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/cas`}>
            <button className="buttonMain buttonRecord">Login with CAS</button>
          </a>
        )}
        {stateVal.auth ? (
          <React.Fragment>
            <button className="buttonMain buttonPrimary" onClick={validate}>
              Continue →
            </button>
            {errorMessage ? (
              <React.Fragment>
                <br />
                <div className="body textMain italic">{errorMessage}</div>
              </React.Fragment>
            ) : null}
          </React.Fragment>
        ) : null}
      </div>
      <br />
      <div className="report-container">
        To report a problem or share a thought, talk to us{" "}
        <a
          href="mailto: founders@ypost.app"
          target="_blank"
          className="hyperlink italic"
        >
          here
        </a>
        .
      </div>
    </div>
  );
};

export default Landing;
