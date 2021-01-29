import axios from "axios";
import { Base } from "../util/base";
import {
  SET_VAL,
  SET_USER_INFO,
  SET_USERID,
  SET_FETCHED_CARDS,
  RESET_STATE,
} from "../redux/masterReducer";
import { RESET_GROUPSTATE } from "../redux/groupReducer";
import { SET_GROUPID } from "../redux/groupReducer";
import { store } from "../index";
import api from "./index";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// let headers = {};
// if (cookies.get("ypostUser") !== undefined) {
//   // console.log(headers);
//   headers = {
//     "access-token": cookies.get("ypostUser").accessToken,
//   };
// }

// sign up api
const onSignup = async (userObj) => {
  try {
    let res = await axios.post("/user/signup", userObj);
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
const validateCookie = async () => {
  try {
    let res = await api.post("/user/validate");

    if (res.data.status === "success") {
      store.dispatch(SET_USERID(res.data.userId));
      store.dispatch(SET_GROUPID(res.data.groupId));
      return true;
    }
  } catch {
    return false;
  }
};

// fetch info
const fetchUserInfo = async () => {
  try {
    const res = await api.post("/user/fetchInfo");

    if (res) {
      const userInfo = res.data.data;
      store.dispatch(
        SET_USER_INFO({
          email: userInfo.email,
          role: userInfo.role,
        })
      );
      return;
    }
  } catch (err) {
    return err;
  }
};

// fetch all cards
const fetchAllCards = async () => {
  try {
    const res = await api.post("/user/fetchall");

    store.dispatch(SET_FETCHED_CARDS(res.data.data));

    return res;
  } catch (err) {
    return;
  }
};

// log out
const logout = async () => {
  localStorage.removeItem("ypostUser");
  cookies.remove("ypostUser");
  store.dispatch(RESET_GROUPSTATE());
  store.dispatch(RESET_STATE());
  store.dispatch(SET_VAL("auth", -1));
};

export {
  onSignup,
  onLogin,
  validateCookie,
  logout,
  fetchUserInfo,
  fetchAllCards,
};
