// messagingReducers.js
import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  EMAIL_SEND_REQUEST,
  EMAIL_SEND_SUCCESS,
  EMAIL_SEND_FAIL,
} from "../constants/messagingConstants";

const initialState = {
  sending: false,
  sendingError: null,
  messages: [],
  loading: false,
  loadingError: null,
  success: false,
  sent: false,
  error: null,
};

export const messagingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { ...state, sending: true, sendingError: null };
    case SEND_MESSAGE_SUCCESS:
      return { ...state, sending: false, success: true };
    case SEND_MESSAGE_FAIL:
      return { ...state, sending: false, sendingError: action.payload };

    case GET_MESSAGES_REQUEST:
      return { ...state, loading: true, loadingError: null };
    case GET_MESSAGES_SUCCESS:
      return { ...state, loading: false, messages: action.payload };
    case GET_MESSAGES_FAIL:
      return { ...state, loading: false, loadingError: action.payload };

    default:
      return state;
  }
};

export const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_SEND_REQUEST:
      return {
        ...state,
        sending: true,
        sent: false,
        error: null,
      };
    case EMAIL_SEND_SUCCESS:
      return {
        ...state,
        sending: false,
        sent: true,
        error: null,
      };
    case EMAIL_SEND_FAIL:
      return {
        ...state,
        sending: false,
        sent: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
