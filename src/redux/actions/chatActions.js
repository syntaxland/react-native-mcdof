// chatActions.js
import axios from 'axios';
import {
    GET_CHAT_ROOMS_REQUEST,
    GET_CHAT_ROOMS_SUCCESS, 
    GET_CHAT_ROOMS_FAIL,
    GET_CHAT_MESSAGES_REQUEST,
    GET_CHAT_MESSAGES_SUCCESS,
    GET_CHAT_MESSAGES_FAIL,
    SEND_CHAT_MESSAGE_REQUEST,
    SEND_CHAT_MESSAGE_SUCCESS,
    SEND_CHAT_MESSAGE_FAIL,
} from '../constants/chatConstants';

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const getChatRooms = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_CHAT_ROOMS_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const response = await axios.get(`${API_URL}/api/chat-rooms/`, config);

        dispatch({
            type: GET_CHAT_ROOMS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_CHAT_ROOMS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const getChatMessages = (roomName) => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_CHAT_MESSAGES_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const response = await axios.get(`${API_URL}/api/chat-messages/${roomName}/`, config);

        dispatch({
            type: GET_CHAT_MESSAGES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_CHAT_MESSAGES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

export const sendChatMessage = (selectedRoom, message) => async (dispatch, getState) => {
    try {
        dispatch({ type: SEND_CHAT_MESSAGE_REQUEST });

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.access}`,
            },
        };

        const data = { room_name: selectedRoom, message };

        await axios.post(`${API_URL}/api/chat-messages/${selectedRoom}/`, data, config);

        dispatch({ type: SEND_CHAT_MESSAGE_SUCCESS });
    } catch (error) {
        dispatch({
            type: SEND_CHAT_MESSAGE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};



// import * as actionTypes from '../constants/chatConstants';

// import { socket } from '../services/socketService';

// export const connectChat = () => async (dispatch) => {
//   try {
//     socket.connect(); 

//     socket.on('connect', () => {
//       dispatch({ type: actionTypes.CHAT_CONNECT_SUCCESS }); 
//     });

//     socket.on('message', (message) => {
//       dispatch({
//         type: actionTypes.CHAT_MESSAGE_RECEIVED,
//         payload: message,
//       });
//     });

//     socket.on('disconnect', () => {
//       dispatch({ type: actionTypes.CHAT_DISCONNECTED });
//     });
//   } catch (error) {
//     dispatch({
//       type: actionTypes.CHAT_CONNECT_FAIL,
//       payload: error.message,
//     });
//   }
// };

// export const sendMessage = (message) => async (dispatch) => {
//   try {
//     socket.emit('send_message', message); 

//   } catch (error) {
//     dispatch({
//       type: actionTypes.CHAT_SEND_MESSAGE_FAIL,
//       payload: error.message,
//     });
//   }
// };

// export const receiveMessage = (message) => async (dispatch) => {
//   try {
//     dispatch({
//       type: actionTypes.CHAT_MESSAGE_RECEIVED,
//       payload: message,
//     });
//   } catch (error) {
//     dispatch({
//       type: actionTypes.CHAT_RECEIVE_MESSAGE_FAIL,
//       payload: error.message,
//     });
//   }
// };
