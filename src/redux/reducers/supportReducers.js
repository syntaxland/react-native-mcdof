// supportReducers.js
import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  CREATE_SUPPORT_MESSAGE_REQUEST,
  CREATE_SUPPORT_MESSAGE_SUCCESS,
  CREATE_SUPPORT_MESSAGE_FAIL,
  LIST_SUPPORT_TICKET_REQUEST,
  LIST_SUPPORT_TICKET_SUCCESS, 
  LIST_SUPPORT_TICKET_FAIL,
  LIST_SUPPORT_MESSAGE_REQUEST,
  LIST_SUPPORT_MESSAGE_SUCCESS,
  LIST_SUPPORT_MESSAGE_FAIL,
  REPLY_SUPPORT_TICKET_REQUEST,
  REPLY_SUPPORT_TICKET_SUCCESS,
  REPLY_SUPPORT_TICKET_FAIL,
  LIST_SUPPORT_TICKET_REPLY_REQUEST,
  LIST_SUPPORT_TICKET_REPLY_SUCCESS,
  LIST_SUPPORT_TICKET_REPLY_FAIL,
  GET_TICKET_DETAIL_REQUEST,
  GET_TICKET_DETAIL_SUCCESS,
  GET_TICKET_DETAIL_FAIL,
  LIST_ALL_SUPPORT_TICKET_REQUEST,
  LIST_ALL_SUPPORT_TICKET_SUCCESS,
  LIST_ALL_SUPPORT_TICKET_FAIL,
  LIST_ALL_TICKET_RESPONSE_REQUEST,
  LIST_ALL_TICKET_RESPONSE_SUCCESS,
  LIST_ALL_TICKET_RESPONSE_FAIL,
} from "../constants/supportConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  tickets: [],
  ticketMessages: [],
  ticketReplies: [],
};

export const createSupportTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TICKET_REQUEST:
      return { loading: true };
    case CREATE_TICKET_SUCCESS:
      return { loading: false, success: true };
    case CREATE_TICKET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const replySupportTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPLY_SUPPORT_TICKET_REQUEST:
      return { loading: true };
    case REPLY_SUPPORT_TICKET_SUCCESS:
      return { loading: false, success: true };
    case REPLY_SUPPORT_TICKET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createSupportMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SUPPORT_MESSAGE_REQUEST:
      return { loading: true };
    case CREATE_SUPPORT_MESSAGE_SUCCESS:
      return { loading: false, success: true };
    case CREATE_SUPPORT_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listSupportTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SUPPORT_TICKET_REQUEST:
      return { loading: true };
    case LIST_SUPPORT_TICKET_SUCCESS:
      return { loading: false, success: true, tickets: action.payload };
    case LIST_SUPPORT_TICKET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listSupportTicketReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SUPPORT_TICKET_REPLY_REQUEST:
      return { loading: true };
    case LIST_SUPPORT_TICKET_REPLY_SUCCESS:
      return { loading: false, success: true, ticketReplies: action.payload };
    case LIST_SUPPORT_TICKET_REPLY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listSupportMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_SUPPORT_MESSAGE_REQUEST:
      return { loading: true };
    case LIST_SUPPORT_MESSAGE_SUCCESS:
      return { loading: false, success: true, ticketMessages: action.payload };
    case LIST_SUPPORT_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ticketDetailListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKET_DETAIL_REQUEST:
      return { loading: true };
    case GET_TICKET_DETAIL_SUCCESS:
      return { loading: false, success: true, tickets: action.payload };
    case GET_TICKET_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allTicketListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ALL_SUPPORT_TICKET_REQUEST:
      return { loading: true };
    case LIST_ALL_SUPPORT_TICKET_SUCCESS:
      return { loading: false, success: true, tickets: action.payload };
    case LIST_ALL_SUPPORT_TICKET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allTicketResponseReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ALL_TICKET_RESPONSE_REQUEST:
      return { loading: true };
    case LIST_ALL_TICKET_RESPONSE_SUCCESS:
      return { loading: false, success: true, ticketReplies: action.payload };
    case LIST_ALL_TICKET_RESPONSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
