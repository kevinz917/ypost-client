import React, { useState, useEffect } from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import Yalelogo from "../assets/yalelogo.svg";
import Cat from "../assets/cat.gif";
import PaperCard from "../components/papercard";
import { useSelector, useDispatch } from "react-redux";
import { SET_VAL } from "../redux/masterReducer";

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
  const email = useSelector((state) => state.inputReducer.email);

  const [errorMessage, setErrorMessage] = useState(null);

  const validate = (e) => {
    if (email.length === 0) {
      setErrorMessage("Email can't be empty!");
    } else if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address!");
    } else {
      props.history.push("/write");
    }
  };

  return (
    <PaperCard>
      <div className="horizontalInbetween">
        <div className="h1 textMain">Hey Yalies —</div>
        <img
          src={Yalelogo}
          style={{ transform: "rotate(20deg)", width: "30px" }}
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
      <div className="body textMain">Happy holidays :)</div>
      <br />
      <br />
      <input
        className="inputMain"
        placeholder="Enter recipient's yale.edu email"
        type="email"
        value={email}
        onChange={(e) => dispatch(SET_VAL("email", e.target.value))}
      />
      <br />
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
