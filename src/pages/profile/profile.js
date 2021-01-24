import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./profile.css";

const Profile = (props) => {
  const authVal = useSelector((state) => state.state.auth);

  return (
    <div className="profile-container">
      <div className="h2">My profile</div>
      <br />
      <div className="body textMain">NetId: {authVal.netId}</div>
      <div className="body textMain">Groups: WLI</div>
    </div>
  );
};

export default Profile;
