import axios from "axios";
import { Base } from "./base";
import { sendAmplitudeData } from "../util/amplitude";

// create card
const createCard = async (
  userId,
  author,
  recipient,
  email,
  message,
  audioFile,
  sticker,
  drawing,
  netId,
  frame,
  visibility,
  groupId
) => {
  const data = new FormData();
  data.append("userId", userId);
  if (author === "") {
    data.append("author", "anonymous");
  } else {
    data.append("author", author);
  }

  data.append("recipient", recipient);
  data.append("email", email);
  data.append("message", message);
  data.append("drawing", drawing);
  data.append("frame", frame);
  data.append("visibility", visibility);
  data.append("groupId", groupId);

  if (audioFile) {
    data.append("file", audioFile, "sample");
  }
  sticker.forEach((x) => {
    sendAmplitudeData(x);
    data.append("sticker", x);
  });
  data.append("netId", netId);

  axios.post(`${Base}/card/new`, data);
};

//  fetch single card
const fetchCard = async (id) => {
  let fetchedCard = await axios.get(`${Base}/card/single/${id}`);

  if (fetchedCard) {
    return fetchedCard.data.data;
  }
  return null;
};

// fetch all students
const fetchStudents = async () => {
  let fetchedStudentList = await axios.get(`${Base}/card/allstudents`);

  if (fetchedStudentList) {
    return fetchedStudentList.data.data;
  }
};

// set letter to "sent" status
const setOpened = async (id) => {
  await axios.post(`${Base}/card/opened`, { _id: id });
};

// get number of letters
const fetchCount = async () => {
  let fetchedCount = await axios.get(`${Base}/card/count`);

  if (fetchedCount) {
    return fetchedCount;
  }
};

// check cas login
const casCheck = async () => {
  let auth = await axios.get(`${Base}/auth/check`);

  if (auth) {
    return auth;
  }
};

// fetch all cards from users
const fetchUserCards = async (id) => {
  let fetchedCards = await axios.get(`${Base}/card/user/${id}`);
  if (fetchedCards) {
    return fetchedCards.data.cards;
  }
  return "invalid user :(";
};

export {
  createCard,
  fetchCard,
  fetchStudents,
  setOpened,
  fetchCount,
  casCheck,
  fetchUserCards,
};
