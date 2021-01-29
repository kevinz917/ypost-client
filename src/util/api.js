import { sendAmplitudeData } from "../util/amplitude";
import api from "../api/index";
import { SET_VAL } from "../redux/masterReducer";
import { store } from "../index";
// import { dispatch } from "react-redux";

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

  await api.post("/card/new", data);
};

//  fetch single card
const fetchCard = async (id) => {
  let fetchedCard = await api.get(`/card/single/${id}`);

  if (fetchedCard) {
    return fetchedCard.data.data;
  }
  return null;
};

// set letter to "sent" status
const setOpened = async (id) => {
  await api.post("/card/opened", { _id: id });
};

// get number of letters
const fetchCount = async () => {
  let fetchedCount = await api.get("/card/count");
  store.dispatch(SET_VAL("letterCount", fetchedCount));

  if (fetchedCount) {
    return fetchedCount;
  }
};

// fetch all cards from users
const fetchUserCards = async (id) => {
  let fetchedCards = await api.get(`/card/user/${id}`);
  if (fetchedCards) {
    return fetchedCards.data.cards;
  }
  return "invalid user :(";
};

export { createCard, fetchCard, setOpened, fetchCount, fetchUserCards };
