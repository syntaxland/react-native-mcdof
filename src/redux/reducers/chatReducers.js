// reducers.js
import {
  GET_CHAT_ROOMS_REQUEST,
  GET_CHAT_ROOMS_SUCCESS,
  GET_CHAT_ROOMS_FAIL,
  GET_CHAT_MESSAGES_REQUEST,
  GET_CHAT_MESSAGES_SUCCESS,
  GET_CHAT_MESSAGES_FAIL,
  // SEND_CHAT_MESSAGE_REQUEST,
  SEND_CHAT_MESSAGE_SUCCESS,
  // SEND_CHAT_MESSAGE_FAIL,
} from '../constants/chatConstants';

export const chatRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
      case GET_CHAT_ROOMS_REQUEST:
          return { loading: true, rooms: [] };
      case GET_CHAT_ROOMS_SUCCESS:
          return { loading: false, rooms: action.payload };
      case GET_CHAT_ROOMS_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

export const chatMessagesReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
      case GET_CHAT_MESSAGES_REQUEST:
          return { loading: true, messages: [] };
      case GET_CHAT_MESSAGES_SUCCESS:
          return { loading: false, messages: action.payload };
      case GET_CHAT_MESSAGES_FAIL:
          return { loading: false, error: action.payload };
      case SEND_CHAT_MESSAGE_SUCCESS:
          return { ...state, messages: [...state.messages, action.payload] };
      default:
          return state;
  }
};


// import * as actionTypes from '../constants/chatConstants';

// const initialState = {
//   connected: false,
//   messages: [],
//   error: null,
// };

// export const chatReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.CHAT_CONNECT_SUCCESS:
//       return { ...state, connected: true, error: null };

//     case actionTypes.CHAT_CONNECT_FAIL:
//       return { ...state, error: action.payload };

//     case actionTypes.CHAT_MESSAGE_RECEIVED: 
//       return { ...state, messages: [...state.messages, action.payload] };

//     case actionTypes.CHAT_SEND_MESSAGE_FAIL:
//       return { ...state, error: action.payload };

//     case actionTypes.CHAT_DISCONNECTED:
//       return { ...initialState, connected: false };

//     default:
//       return state;
//   }
// };

  



// import * as actionTypes from '../constants/chatConstants';

// export const chatReducer = (state = { connected: false, messages: [], error: null }, action) => {
//   switch (action.type) {
//     case actionTypes.CHAT_CONNECT_SUCCESS:
//       return { ...state, connected: true, error: null };

//     case actionTypes.CHAT_CONNECT_FAIL:
//       return { ...state, error: action.payload };

//     case actionTypes.CHAT_MESSAGE_RECEIVED:
//       return { ...state, messages: [...state.messages, action.payload] };

//     case actionTypes.CHAT_SEND_MESSAGE_FAIL:
//       return { ...state, error: action.payload };

//     case actionTypes.CHAT_DISCONNECTED:
//       return { connected: false, messages: [], error: null };

//     default:
//       return state;
//   }
// };
