import axios from "axios";
import { Base } from "../util/base";
import Cookies from "universal-cookie";
import { store } from "../index";
const cookies = new Cookies();

// add feedback
const addFeedback = async (feedbackObj) => {
  try {
    let addedFeedback = await axios.post(`${Base}/feedback/add`, feedbackObj);

    // toastify?
    if (addedFeedback) {
      return;
    }
    return;
  } catch {}
};

// fetch all
const fetchAllFeedback = async (groupId) => {
  try {
    let fetchedFeedback = await axios.post(`${Base}/feedback/fetchall`, {
      groupId,
    });
    return fetchedFeedback;
  } catch (err) {
    return;
  }
};

export { addFeedback, fetchAllFeedback };
