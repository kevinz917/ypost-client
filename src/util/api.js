import axios from "axios";
import { Base } from "./base";

// Create card
const createCard = async (
  author,
  recipient,
  email,
  message,
  audioFile,
  sticker
) => {
  console.log("Creating new card");

  console.log(author, recipient, email);

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

export { createCard, fetchCard, fetchStudents, setOpened };
