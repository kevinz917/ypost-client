import axios from "axios";
import { Base } from "../util/base";
import Cookies from "universal-cookie";
import { SET_VAL } from "../redux/masterReducer";
import { store } from "../index";

const cookies = new Cookies();

// sign up api
const onSignup = async (userObj) => {
  try {
    let res = await axios.post(`${Base}/user/signup`, userObj);
    if (res) {
      return res;
    }
  } catch (err) {
    return err;
  }
};

// log in api
const onLogin = async (userObj) => {
  try {
    let res = await axios.post(`${Base}/user/login`, userObj);
    return res.data;
  } catch (err) {
    return err;
  }
};

// validate cookie
const validateCookie = async (val) => {
  try {
    const headers = {
      "access-token": val,
    };
    let res = await axios.post(`${Base}/user/validate`, null, {
      headers: headers,
    });

    if (res) {
      return true;
    }
  } catch {
    return false;
  }
};

// log out
const logout = async () => {
  cookies.remove("ypostUser");
  store.dispatch(SET_VAL("auth", -1));
};

export { onSignup, onLogin, validateCookie, logout };
