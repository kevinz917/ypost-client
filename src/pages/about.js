import React from "react";

import "../styles/color.css";
import "../styles/layout.css";
import "../styles/typography.css";
import "../styles/animation.css";
import { Link } from "react-router-dom";

import PaperCard from "../components/papercard";

const About = (props) => {
  return (
    <PaperCard>
      <Link to="/" className="link">
        <span className="navigation body">← Back</span>
      </Link>
      <hr />
      <br />
      <div className="body textMain italic">
        "More than two in ten adults in the United States (22%) and the United
        Kingdom (23%) say they always or often feel lonely" - The Economist
      </div>
      <br />
      <div className="body textMain">[Insert text about this project]</div>
    </PaperCard>
  );
};

export default About;
