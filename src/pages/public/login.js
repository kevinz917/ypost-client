import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";
import Cookies from "universal-cookie";
import { onSignup, onLogin, validateCookie } from "../../api/user";
import { SET_VAL } from "../../redux/masterReducer";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { fetchGroups } from "../../api/group";

const cookies = new Cookies();

const Login = (props) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(1);
  const [message, setMessage] = useState("");
  const [submitState, setSubmitState] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    group: "",
  });

  const [orgOptions, setOrgOptions] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);

  // on mount
  useEffect(() => {
    const onMount = async () => {
      let fetchedGroups = await fetchGroups();
      let options = [];
      fetchedGroups.forEach((org) =>
        options.push({ value: org._id, label: org.description })
      );
      setOrgOptions(options);
    };

    onMount();
  }, []);

  const onOrgSelect = (selectedOption) => {
    setUserData({ ...userData, group: selectedOption.value });
    setSelectedOrg(selectedOption);
  };

  const setChange = (selectionField) => (event) => {
    setUserData({ ...userData, [selectionField]: event.target.value });
  };

  // clears error message
  useEffect(() => {
    setMessage("");
  }, [mode]);

  // on submit
  const submitLogin = async () => {
    setSubmitState(true);
    const userObj = {
      email: userData.email,
      password: userData.password,
    };

    // should return a user obj with email and accessToken
    const res = await onLogin(userObj);

    if (res.error) {
      setMessage(res.error);
    } else {
      cookies.set("ypostUser", res);
      await validateCookie();
      dispatch(SET_VAL("auth", 1));
      props.history.push("/"); // change to dashboard route
    }
    setSubmitState(false);
  };

  const submitSignUp = async () => {
    let res = await onSignup(userData);

    if (res.error) {
      setMessage(res.error);
    } else {
      setMode(1);
    }
  };

  return (
    <div>
      <div
        style={{ width: "350px" }}
        className="shadow p-3 rounded ml-auto mr-auto mt-4 bg-white fade-in"
      >
        <div>
          {message.length === 0 ? null : (
            <Alert variant="info">{message}</Alert>
          )}
        </div>
        {mode === 0 ? (
          <div>
            <div className="h4 font-weight-bold mb-4">Sign up</div>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="First name"
                value={userData.firstName}
                onChange={setChange("firstName")}
              />
              <FormControl
                placeholder="Last name"
                value={userData.lastName}
                onChange={setChange("lastName")}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Email"
                value={userData.email}
                onChange={setChange("email")}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={setChange("password")}
              />
            </InputGroup>
            <br />
            <div>Select group</div>
            <Select
              options={orgOptions}
              value={selectedOrg}
              onChange={onOrgSelect}
            />
            <div
              className="text-primary"
              type="button"
              onClick={(e) => setMode(1)}
            >
              <br />
              Already signed up? Log in here
            </div>
            <div className="mt-4">
              <button
                className="buttonMain buttonPrimary"
                onClick={submitSignUp}
                disabled={submitState ? true : false}
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          <div className="fade-in">
            <div className="h4 font-weight-bold mb-4">Log in</div>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Email"
                value={userData.email}
                onChange={setChange("email")}
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <FormControl
                placeholder="Password"
                value={userData.password}
                onChange={setChange("password")}
                type="password"
              />
            </InputGroup>
            <div
              className="text-primary"
              type="button"
              onClick={(e) => setMode(0)}
            >
              <br />
              Don't have an account? Sign up here
            </div>
            <div className="mt-4">
              <button
                className="buttonMain buttonPrimary"
                onClick={submitLogin}
                disabled={submitState ? true : false}
              >
                Log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
