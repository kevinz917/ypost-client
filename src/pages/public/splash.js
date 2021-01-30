import React from "react";
import { Link } from "react-router-dom";

import "./splash.css";

import Hero from "../../assets/hero.png";
import Ypostold from "../../assets/ypostold.png";

const Splash = () => {
  return (
    <div className="fade-in">
      <div className="mb-4 normal-section">
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="headerxl text-center">
            Build a more connected team
          </div>
          <div
            className="body textMain text-center"
            style={{ maxWidth: "500px" }}
          >
            Send simple, delightful cards to your team. Build a culture of
            empathy. 11k+ letters sent.
          </div>
          <Link to="/login" className="link">
            <button className="buttonMain buttonPrimary">Get started →</button>
          </Link>
          <br />
          <img src={Hero} alt="hero" className="hero" />
        </div>
      </div>
      <div className="white-section vertical-section">
        <div className="horizontal-section">
          <div>
            <img src={Ypostold} className="side-image" alt="ypost old mockup" />
            <br />
            <br />
          </div>
          <div className="side-text-section">
            <div className="header1">About YPost</div>
            <br />
            <div>
              YPost started as a postcard exchange for Yale students, with 4k+
              users and 11k+ letters send within a few days. We're currently
              transitioning to a mental health platform for teams ~
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
