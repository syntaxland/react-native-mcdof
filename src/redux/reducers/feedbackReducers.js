// feedbackReducers.js
import {
  CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_FAIL,
    LIST_FEEDBACK_REQUEST,
    LIST_FEEDBACK_SUCCESS,
    LIST_FEEDBACK_FAIL,
} from "../constants/feedbackConstants"; 

const initialState = {
  feedbacks: [],
  loading: false,
  success: false,
  error: null,
};

export const feedbackCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FEEDBACK_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_FEEDBACK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const feedbackListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIST_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedbacks: action.payload,
      };
    case LIST_FEEDBACK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
