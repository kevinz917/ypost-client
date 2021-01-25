import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../../api/user";
import { Button } from "react-bootstrap";

import "./profile.css";

const Profile = (props) => {
  const authVal = useSelector((state) => state.state.auth);

  const logOut = async () => {
    await logout();
    props.history.push("/");
  };

  return (
    <div className="profile-container">
      <div className="header2">My profile</div>
      <div className="textMain body">Groups: </div>
      <br />
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
};

export default Profile;
