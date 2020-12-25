import { combineReducers } from "redux";

// General purpose action to change val given field
const SET_VAL = (field, val) => {
  return {
    type: "SET_VAL",
    field,
    val,
  };
};

const state = (
  state = {
    isLoading: false,
    studentList: [],
    selectedStudent: null,
    email: "",
    message: "",
    author: "",
    audioFile: null,
    auth: -1,
    netid: "",
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

const MasterReducer = combineReducers({ state });

export { SET_VAL, MasterReducer };
