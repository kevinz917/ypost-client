import React from "react";
import { Navbar, Form, Nav, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navigation.css";
import "../../styles/typography.css";
import "../../styles/color.css";

const Navigation = () => {
  return (
    <div className="nav-master">
      <div className="nav-container">
        <Link to="/" className="link">
          <div className="h2 nav-item-left">YPost</div>
        </Link>
        <Link to="/" className="link">
          <div className="nav-item-left body textMain">home</div>
        </Link>
        <Link to="/about" className="link">
          <div className="nav-item-left body textMain">contact</div>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
