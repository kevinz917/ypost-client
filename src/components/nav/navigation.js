import React from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

import "./navigation.css";
import "../../styles/typography.css";
import "../../styles/color.css";

const Navigation = () => {
  return (
    <div className="nav-master">
      <div className="nav-container justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <Link to="/" className="link">
            <div className="nav-item-left textMain h2">YPost</div>
          </Link>
          <Link to="/" className="link">
            <div className="nav-item-left body textMain">home</div>
          </Link>
          <Link to="/about" className="link">
            <div className="nav-item-left body textMain">contact</div>
          </Link>
        </div>
        <Link to="/me" className="link">
          <div className="d-flex flex-row align-items-center textMain">
            <FiUser size={25} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
