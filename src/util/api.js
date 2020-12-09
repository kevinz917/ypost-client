import axios from "axios";
import { Base } from "./base";

// POST -> create new card
const createCard = async (author, recipient, message, audioFile, sticker) => {
  console.log("Creating new card");

  const data = new FormData();
  data.append("author", author);
  data.append("recipient", recipient);
  data.append("message", message);
  data.append("sticker", sticker);
  if (audioFile) {
    data.append("file", audioFile, "sample");
  }

  axios.post(`${Base}/card/new`, data);
  // let newCard = await axios.post(`${Base}/card/new`, data);

  // if (newCard) {
  //   return newCard;
  // }
  // return null;
};

// GET -> Fetch single card

const fetchCard = async (id) => {
  let fetchedCard = await axios.get(`${Base}/card/${id}`);

  if (fetchedCard) {
    return fetchedCard.data.data;
  }
  return null;
};

export { createCard, fetchCard };
