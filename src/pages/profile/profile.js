import React from "react";
import { useSelector } from "react-redux";
import { logout } from "../../api/user";
import { Button } from "react-bootstrap";

import "./profile.css";

const Profile = (props) => {
  const stateVal = useSelector((state) => state.state);
  const groupVal = useSelector((state) => state.groupReducer);

  const logOut = async () => {
    await logout();
    props.history.push("/");
  };

  return (
    <div className="profile-container">
      <div className="header2">My profile</div>
      <br />
      <div className="textMain body">Group ID: {groupVal.groupId}</div>
      <div className="textMain body">Role: {stateVal.userInfo.role}</div>
      <br />
      <Button onClick={logOut}>Logout</Button>
    </div>
  );
};

export default Profile;
