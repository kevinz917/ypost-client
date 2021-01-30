import { combineReducers } from "redux";
import { groupReducer } from "./groupReducer";

// general purpose action
const SET_VAL = (field, payload) => {
  return {
    type: "SET_VAL",
    field,
    payload,
  };
};

const SET_USERID = (payload) => {
  return {
    type: "SET_USERID",
    payload,
  };
};

// set user info when fetching cards + groups
const SET_USER_INFO = (payload) => {
  return {
    type: "SET_USER_INFO",
    payload,
  };
};

const SET_FETCHED_CARDS = (payload) => {
  return {
    type: "SET_FETCHED_CARDS",
    payload,
  };
};

const RESET_STATE = () => {
  return {
    type: "RESET_STATE",
  };
};

const defaultState = {
  isLoading: false,
  letterCount: null,
  studentList: [],
  studentId: "none",
  selectedStudent: null,
  frame: null,
  email: "",
  message: "",
  author: "",
  audioFile: null,
  auth: 0,
  userInfo: {
    userId: "",
    sentCards: [],
    receivedCards: [],
    groups: [],
    email: "",
    role: "",
    reactions: [],
  },
};

const state = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_VAL":
      return { ...state, [action.field]: action.payload };
    case "SET_USERID":
      return {
        ...state,
        userInfo: { ...state.userInfo, userId: action.payload },
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          groups: action.payload.groups,
          email: action.payload.email,
          role: action.payload.role,
          reactions: action.payload.reactions,
        },
      };
    case "SET_FETCHED_CARDS":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          sentCards: action.payload.sentCards.reverse(),
          receivedCards: action.payload.receivedCards.reverse(),
        },
      };
    case "RESET_STATE":
      return defaultState;
    default:
      return state;
  }
};

const MasterReducer = combineReducers({ state, groupReducer });

export {
  SET_VAL,
  SET_USER_INFO,
  SET_USERID,
  SET_FETCHED_CARDS,
  RESET_STATE,
  MasterReducer,
};
