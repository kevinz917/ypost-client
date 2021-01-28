const SET_GROUPID = (payload) => {
  return {
    type: "SET_GROUPID",
    payload,
  };
};

const SET_GROUP_INFO = (payload) => {
  return {
    type: "SET_GROUP_INFO",
    payload,
  };
};

const SET_GROUPCARDS = (payload) => {
  return {
    type: "SET_GROUPCARDS",
    payload,
  };
};

const groupReducer = (
  groupState = {
    groupId: null,
    groupDescription: null,
    cards: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_GROUPID":
      return { ...groupState, groupId: action.payload };
    case "SET_GROUP_INFO":
      return { ...groupState, groupDescription: action.payload };
    case "SET_GROUPCARDS":
      return { ...groupState, cards: action.payload };
    default:
      return groupState;
  }
};

export { SET_GROUPID, SET_GROUP_INFO, SET_GROUPCARDS, groupReducer };
