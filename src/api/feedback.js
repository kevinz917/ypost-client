import axios from "axios";
import { Base } from "../util/base";
import Cookies from "universal-cookie";
const cookies = new Cookies();

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

export { addFeedback };
