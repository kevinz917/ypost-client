// import { store } from "../index";
import api from "./index";

// add feedback
const addFeedback = async (feedbackObj) => {
  try {
    let addedFeedback = await api.post("/feedback/add", feedbackObj);

    // toastify?
    if (addedFeedback) {
      return;
    }
    return;
  } catch {}
};

// fetch all feedback
const fetchAllFeedback = async (groupId) => {
  try {
    let fetchedFeedback = await api.post("feedback/fetchall", {
      groupId,
    });
    return fetchedFeedback;
  } catch (err) {
    return;
  }
};

// remove feedback
const removeFeedback = async (feedbackId) => {
  try {
    await api.post("/feedback/delete", { feedbackId });
    return;
  } catch (err) {
    return;
  }
};

export { addFeedback, fetchAllFeedback, removeFeedback };
