import axios from "axios";
import { Base } from "./base";

const createCard = async (author, recipient, message, audioFile, sticker) => {
  console.log("Creating new card");

  const data = new FormData();
  data.append("author", author);
  data.append("recipient", recipient);
  data.append("message", message);
  data.append("sticker", sticker);
  data.append("file", audioFile, "sample");

  let newCard = await axios.post(`${Base}/card/new`, data);

  if (newCard) {
    return newCard;
  }
  return null;
};

export { createCard };
