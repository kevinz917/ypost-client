import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, fetchCount } from "../util/api";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import Stamp from "../assets/stamp.svg";
import AsyncSelect from "react-select/async";
import { sendAmplitudeData } from "../util/amplitude";
import styles from "./landing.module.css";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Landing = (props) => {
  const dispatch = useDispatch();
  const [loadingState, setLoadingState] = useState(0);
  const stateVal = useSelector((state) => state.state);

  // On mount
  useEffect(() => {
    const onMount = async () => {
      dispatch(SET_VAL("isLoading", true));
      sendAmplitudeData("Visited home page");
      setLoadingState(0);

      // fetch list of all students
      if (stateVal.auth && stateVal.studentList.length < 2) {
        let studentList = await fetchStudents();
        dispatch(SET_VAL("studentList", studentList));
      }

      if (localStorage.getItem("sent") === null) {
        localStorage.setItem("sent", 0);
      }
      if (localStorage.getItem("letters") === null) {
        localStorage.setItem("letters", JSON.stringify([]));
      }
      dispatch(SET_VAL("isLoading", false));
      setLoadingState(2);

      if (stateVal.letterCount === null) {
        const letterCount = await fetchCount();
        dispatch(SET_VAL("letterCount", letterCount.data.count));
      }
    };

    onMount();
  }, [dispatch, stateVal.auth]);

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

  return loadingState === 0 ? null : (
    <div className="paperCardContainer">
      <div className="paperCard">
        <div className="horizontalInbetween">
          <div className="h2 textMain">YPost</div>
          <img
            src={Stamp}
            alt="logo"
            style={{ transform: "rotate(20deg)", width: "50px" }}
          />
        </div>
        <br />
        <div className="body textMain">
          Send simple and delightful cards to your teammates. Show your
          gratitude and build a better team, together ~
        </div>
        <br />
        <br />
        <div className={styles.letter_cnt_container + " body textMain fade-in"}>
          {stateVal.letterCount === null ? (
            <span className={styles.letter_cnt_label}>Loading...</span>
          ) : (
            <div className="fade-in">
              <span className={styles.letter_cnt_label}>
                Total YPosts Sent:{" "}
              </span>
              <span className={styles.letter_cnt_val}>
                {stateVal.letterCount}
              </span>
            </div>
          )}
        </div>
        <br />
        {stateVal.auth !== -1 && (
          <React.Fragment>
            <AsyncSelect
              loadOptions={loadOptions}
              placeholder="Type in recipient name"
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
            <Link to="/write">
              <button className="buttonMain buttonPrimary">
                <div>Send a note</div>
              </button>
            </Link>
            <Link to={`/user/${stateVal.auth.studentId}`}>
              <button className="buttonMain buttonSecondary">
                <div>View your cards </div>
              </button>
            </Link>
          </React.Fragment>
        )}
        {stateVal.auth === -1 ? (
          <Link to="/login" className="link">
            <button className="buttonMain buttonRecord">Log in here</button>
          </Link>
        ) : null}
      </div>
      <br />
      <div className="report-container">
        To report a problem or share a thought, talk to us{" "}
        <a
          href="mailto: founders@ypost.app"
          target="_blank"
          rel="noreferrer"
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
