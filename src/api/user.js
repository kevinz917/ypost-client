import axios from "axios";
import { Base } from "../util/base";
import Cookies from "universal-cookie";
import { SET_VAL, SET_USER_INFO, SET_USERID } from "../redux/masterReducer";
import { store } from "../index";

const cookies = new Cookies();

let headers = {};
if (cookies.get("ypostUser") !== undefined) {
  // console.log(headers);
  headers = {
    "access-token": cookies.get("ypostUser").accessToken,
  };
}

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

    if (res.data.status === "success") {
      // console.log(res.data);
      // store.dispatch(SET_VAL("userInfo", { userId: res.data.userId }));
      store.dispatch(SET_USERID(res.data.userId));
      return true;
    }
  } catch {
    return false;
  }
};

const fetchUserInfo = async () => {
  try {
    const res = await axios.post(`${Base}/user/fetchInfo`, null, {
      headers: headers,
    });

    if (res) {
      const userInfo = res.data.data;
      store.dispatch(
        SET_USER_INFO({
          sentCards: userInfo.sentCards,
          receivedCards: userInfo.receivedCards,
          email: userInfo.email,
        })
      );
      return;
    }
  } catch (err) {
    return err;
  }
};

// log out
const logout = async () => {
  console.log("logging out");
  cookies.remove("ypostUser");
  store.dispatch(SET_VAL("auth", -1));
};

export { onSignup, onLogin, validateCookie, logout, fetchUserInfo };
