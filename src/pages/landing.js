import React, { useState, useEffect } from "react";
import PaperCard from "../components/papercard";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "../redux/masterReducer";
import { Link } from "react-router-dom";
import Stamp from "../assets/stamp.svg";
// import Select from "react-select";
import AsyncSelect from "react-select/async";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";

const StudentList = require("../assets/studentlist.json");

const Landing = (props) => {
  // On mount
  useEffect(() => {
    if (localStorage.getItem("sent") === null) {
      localStorage.setItem("sent", false);
    }
    if (localStorage.getItem("letters") === null) {
      localStorage.setItem("letters", JSON.stringify([]));
    }
  }, []);

  const dispatch = useDispatch();
  const stateVal = useSelector((state) => state.inputReducer);

  const [errorMessage, setErrorMessage] = useState(null);
  const [input, setInput] = useState("");

  const validate = (e) => {
    if (stateVal.email.length === 0) {
      setErrorMessage("Email can't be empty!");
    } else if (!stateVal.email.includes("@")) {
      setErrorMessage("Please enter a valid email address!");
    } else {
      props.history.push("/write");
    }
  };

  const filterStudents = (inputValue) => {
    return StudentList.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterStudents(inputValue));
    }, 1000);
  };

  const onInputChange = (e) => {
    dispatch(SET_VAL("email", e.value));
    dispatch(SET_VAL("selectedStudent", e.label));
  };

  return (
    <PaperCard>
      <div className="horizontalInbetween">
        <div className="h1 textMain">Hey Yalies —</div>
        <img
          src={Stamp}
          style={{ transform: "rotate(20deg)", width: "75px" }}
        />
      </div>
      <br />
      <div className="body textMain italic">
        Who do you miss most? Let’s bring some light to their day.
      </div>
      <br />
      <div className="body textMain">
        This holiday season, let’s bridge the physical gap between us—whether
        six feet or six time zones apart—with a virtual message of kindness, in
        writing or voice. Because, in our disconnected times, our campus
        community is more interconnected than it may seem.
      </div>
      <br />
      <div className="body textMain italic hyperlink">
        <Link to="/about">About this project</Link>
      </div>
      <br />
      <br />
      <AsyncSelect
        loadOptions={loadOptions}
        placeholder="Type in name"
        autoFocus
        onChange={onInputChange}
        defaultValue={{
          value: stateVal.email,
          label: stateVal.selectedStudent,
        }}
      />
      <button className="buttonMain buttonPrimary" onClick={validate}>
        Continue →
      </button>
      {errorMessage ? (
        <div className="body textMain italic">{errorMessage}</div>
      ) : null}
    </PaperCard>
  );
};

export default Landing;
