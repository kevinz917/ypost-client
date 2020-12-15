import { combineReducers } from "redux";

// General purpose action to change val given field
const SET_VAL = (field, val) => {
  return {
    type: "SET_VAL",
    field,
    val,
  };
};

const inputReducer = (
  state = {
    selectedStudent: null,
    email: "",
    message: "Sample message",
    author: "kevin.zhang@yale.edu",
    audioFile: null,
  },
  action
) => {
  switch (action.type) {
    case "SET_VAL":
      return { ...state, [action.field]: action.val };
    default:
      return state;
  }
};

const MasterReducer = combineReducers({ inputReducer });

export { SET_VAL, MasterReducer };
