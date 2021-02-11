import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents, fetchCount } from "../util/api";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import Stamp from "../assets/stamp.svg";
import YCC from "../assets/ycc_logo.png";
import AsyncSelect from "react-select/async";
import Flake from "../assets/arrow_heart.png";
import { sendAmplitudeData } from "../util/amplitude";
import styles from "./landing.module.css";
import { Base } from "../util/base";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Landing = (props) => {
  const dispatch = useDispatch();
  const [letter_count, setLetterCount] = useState(-1);
  const [loadingState, setLoadingState] = useState(0);
  const [hovered, setHovered] = useState(false);
  const stateVal = useSelector((state) => state.state);

  // On mount
  useEffect(() => {
    const onMount = async () => {
      dispatch(SET_VAL("isLoading", true));
      sendAmplitudeData("Visited home page");
      setLoadingState(0);
      if (stateVal.auth) {
        let studentList = await fetchStudents();
        dispatch(SET_VAL("studentList", studentList));
      }
      if (localStorage.getItem("sent") === null) {
        localStorage.setItem("sent", 0);
      }
      if (localStorage.getItem("letters") === null) {
        localStorage.setItem("letters", JSON.stringify([]));
      }
      setLoadingState(1);
      await delay(800);
      dispatch(SET_VAL("isLoading", false));
      setLoadingState(2);
      const letterCount = await fetchCount();
      if (letterCount && letterCount.data) {
        setLetterCount(letterCount.data.count);
      }
    };
    if (stateVal.auth !== -1) onMount();
  }, [dispatch, stateVal.auth]);

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
    return stateVal.studentList.filter(
      (i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        i.label.includes("24")
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
      {stateVal.auth && stateVal.auth !== -1 && (
        <Link to={`/user/${stateVal.auth.studentId}`}>
          <div
            className={styles.memory + " paperCard pointer body"}
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: hovered ? "var(--coral)" : "black",
                transition: "color 0.3s",
              }}
            >
              💭 &nbsp; Visit Memory Lane →
            </div>

            <div
              className="fade-in"
              style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
            >
              Check out all of your YPosts in one place here.
            </div>
          </div>
        </Link>
      )}
      <div className="paperCard">
        <div className="horizontalInbetween">
          <div className="h1 textMain">Hey Class of '24!</div>
          <div>
            <img
              src={YCC}
              alt="ycc"
              style={{ transform: "rotate(-20deg)", width: "75px" }}
            />
            <img
              src={Stamp}
              alt="logo"
              style={{ transform: "rotate(20deg)", width: "65px" }}
            />
          </div>
        </div>
        <br />
        <div className="body textMain">
          We miss you all immensely and wish we could give you a hug in person
          this Valentine’s! But no reason why we can’t share the love even
          though we are apart!
          <br />
          <div style={{ marginTop: "10px" }}>
            <strong>
              We are so excited to work with the YPost team so that you can show
              your friends across the globe that you are still thinking of them!
            </strong>
          </div>
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            XOXO,
            <br />
            <strong>FCC</strong>
          </div>
        </div>
        <br />
        <div className="body textMain italic horizontalInbetween">
          <Link to="/about" className="hyperlink">
            About this project.
          </Link>
          <div
            className={styles.letter_cnt_container + " body textMain fade-in"}
          >
            {letter_count === -1 ? (
              <span className={styles.letter_cnt_label}>Loading...</span>
            ) : (
              <div className="fade-in">
                <span className={styles.letter_cnt_label}>
                  Total YPosts Sent:{" "}
                </span>
                <span className={styles.letter_cnt_val}>{letter_count}</span>
              </div>
            )}
          </div>
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
          <button
            className="buttonMain buttonRecord"
            onClick={() => {
              window.location.href = `${Base}/auth/cas`;
            }}
          >
            Login with CAS
          </button>
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
      <div className="report-container" style={{ marginBottom: "20px" }}>
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
