import api from "./index";

const toggleReaction = async (cardId, count) => {
  await api.post("/card/togglereaction", { cardId, count });
};

export { toggleReaction };
