import axios from "axios";
import { Base } from "../util/base";
import Cookies from "universal-cookie";
import {
  SET_VAL,
  SET_USER_INFO,
  SET_USERID,
  SET_FETCHED_CARDS,
} from "../redux/masterReducer";
import { store } from "../index";

const cookies = new Cookies();

let headers = {};
if (cookies.get("ypostUser") !== undefined) {
  // console.log(headers);
  headers = {
    "access-token": cookies.get("ypostUser").accessToken,
  };
}

// fetch all groups
const fetchGroups = async () => {
  try {
    let fetchedGroups = await axios.get(`${Base}/group/all`);
    if (fetchedGroups) return fetchedGroups.data.data.groups;
  } catch (err) {
    console.log(err);
    return;
  }
};

// fetch all members in a group
const fetchMembers = async (groupId) => {
  try {
    console.log(groupId);
    let fetchedMembers = await axios.post(`${Base}/group/members`, { groupId });
    return fetchedMembers.data.data.users;
  } catch (err) {
    console.log(err);
    return;
  }
};

export { fetchGroups, fetchMembers };
