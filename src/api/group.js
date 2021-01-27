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
    let fetchedMembers = await axios.post(`${Base}/group/members`, { groupId });
    return fetchedMembers.data.data.users;
  } catch (err) {
    console.log(err);
    return;
  }
};

// fetch public posts
const fetchPublicPosts = async (groupId) => {
  try {
    let fetchedPublicPosts = await axios.get(
      `${Base}/card/fetchpublic/${groupId}`
    );
    if (fetchedPublicPosts) {
      return fetchedPublicPosts.data.data.cards;
    }
  } catch (err) {
    return err;
  }
};

// const fetchPublicPosts = (groupId) => {
//   return fetch(`${Base}/card/fetchpublic/${groupId}`).then((res) => {
//     res.json();
//   });
// };

export { fetchGroups, fetchMembers, fetchPublicPosts };
