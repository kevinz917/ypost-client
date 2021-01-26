import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, fetchCount } from "../util/api";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { sendAmplitudeData } from "../util/amplitude";
import styles from "./landing.module.css";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Hero from "../assets/hero.png";

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Landing = () => {
  const dispatch = useDispatch();
  const stateVal = useSelector((state) => state.state);

  // On mount
  useEffect(() => {
    const onMount = async () => {
      dispatch(SET_VAL("isLoading", true));
      sendAmplitudeData("Visited home page");

      // fetch list of all students in same org
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

      if (stateVal.letterCount === null) {
        const letterCount = await fetchCount();
        dispatch(SET_VAL("letterCount", letterCount.data.count));
      }
    };

    if (stateVal.auth === 1) {
      onMount();
    }
  }, []);

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

  return stateVal.isLoading === 0 ? null : (
    <div className="paperCardContainer">
      {stateVal.auth === 1 ? (
        <Link to="/feedback" className="link">
          <div className="paperCard">
            <div className="header3 textMain">Share your thoughts →</div>
            <div className="textMain body">
              File a complaint or say anonymously directly to your manager
            </div>
          </div>
        </Link>
      ) : null}
      <div className="paperCard">
        <div className="w-100 d-flex flex-column align-items-center">
          <img src={Hero} style={{ width: "90%", height: "auto" }} alt="hero" />
        </div>
        <hr />
        <div className="h2 textMain">YPost</div>
        <br />
        <div className="body textMain">
          Send simple and delightful cards to your teammates. Show your
          gratitude and build a better team, together ~
        </div>
        <br />
        <div className={styles.letter_cnt_container + " body textMain fade-in"}>
          {stateVal.letterCount === null ? (
            <span className={styles.letter_cnt_label}>Loading...</span>
          ) : (
            <div className="fade-in">
              <span className={styles.letter_cnt_label}>
                total notes sent:{" "}
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
            <Link to={`/user/${stateVal.userInfo.userId}`}>
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
    </div>
  );
};

export default Landing;
