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

const RESET_GROUPSTATE = () => {
  return {
    type: "RESET_GROUPSTATE",
  };
};

const defaultState = {
  groupId: null,
  groupDescription: null,
  cards: [],
};

const groupReducer = (groupState = defaultState, action) => {
  switch (action.type) {
    case "SET_GROUPID":
      return { ...groupState, groupId: action.payload };
    case "SET_GROUP_INFO":
      return { ...groupState, groupDescription: action.payload };
    case "SET_GROUPCARDS":
      return { ...groupState, cards: action.payload };
    case "RESET_GROUPSTATE":
      return defaultState;
    default:
      return groupState;
  }
};

export {
  SET_GROUPID,
  SET_GROUP_INFO,
  SET_GROUPCARDS,
  RESET_GROUPSTATE,
  groupReducer,
};
