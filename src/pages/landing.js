import React from "react";
import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import { Link } from "react-router-dom";
import Yalelogo from "../assets/yalelogo.svg";
import Footer from "../components/footer";

const Landing = () => {
  return (
    <div className="backgroundColor backgroundLayout">
      <div className="paperCard fade-in">
        <div className="horizontalInbetween">
          <div className="h1 textMain">Dear Yalies ...</div>
          <img
            src={Yalelogo}
            style={{ transform: "rotate(20deg)", width: "30px" }}
          />
        </div>
        <br />
        <div className="body textMain italic">We all miss our friends ...</div>
        <br />
        <div className="body textMain">
          That’s why 3 Yalies built this website, an easy way to send a virtual
          holiday card to the people you miss the most, with stickers and a
          voice message. Happy holidays everyone :){" "}
        </div>
        <br />
        <br />
        <input className="inputMain" placeholder="Enter email" />
        <br />
        <Link to="/write" className="link">
          <button className="buttonMain buttonPrimary">Continue →</button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
