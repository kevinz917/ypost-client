import axios from "axios";
import { Base } from "./base";
import { sendAmplitudeData } from "../util/amplitude";

// Create card
const createCard = async (
  author,
  recipient,
  email,
  message,
  audioFile,
  sticker
) => {
  const data = new FormData();
  if (author === "") {
    data.append("author", "anonymous");
  } else {
    data.append("author", author);
  }

  data.append("recipient", recipient);
  data.append("email", email);
  data.append("message", message);
  if (audioFile) {
    data.append("file", audioFile, "sample");
  }
  sticker.forEach((x) => {
    sendAmplitudeData(x);
    data.append("sticker", x);
  });

  axios.post(`${Base}/card/new`, data);
};

//  Fetch single card
const fetchCard = async (id) => {
  let fetchedCard = await axios.get(`${Base}/card/single/${id}`);

  if (fetchedCard) {
    return fetchedCard.data.data;
  }
  return null;
};

// Fetch all students
const fetchStudents = async () => {
  let fetchedStudentList = await axios.get(`${Base}/card/allstudents`);

  if (fetchedStudentList) {
    return fetchedStudentList.data.data;
  }
};

// Set letter to "sent" status
const setOpened = async (id) => {
  await axios.post(`${Base}/card/opened`, { _id: id });
};

// Get number of letters
const fetchCount = async () => {
  let fetchedCount = await axios.get(`${Base}/card/count`);

  if (fetchedCount) {
    return fetchedCount;
  }
};

const casCheck = async () => {
  let auth = await axios.get(`${Base}/auth/check`, { withCredentials: true });
  // console.log(auth);
  if (auth) {
    return auth;
  }
};

export {
  createCard,
  fetchCard,
  fetchStudents,
  setOpened,
  fetchCount,
  casCheck,
};
