// messagingActions.js
import axios from "axios";
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

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const sendMessage = (messageData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEND_MESSAGE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.post(
      `${API_URL}/api/send-message-to-all/`,
      messageData,
      config
    );

    dispatch({ type: SEND_MESSAGE_SUCCESS });
    // window.location.reload();
    // window.location.href = "/dashboard/admin";
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getMessages = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MESSAGES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/message-inbox/`, config);

    dispatch({ type: GET_MESSAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sendEmail = (emailData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EMAIL_SEND_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.post(`${API_URL}/api/send-email-to-all/`, emailData, config);

    dispatch({ type: EMAIL_SEND_SUCCESS });
    // window.location.reload();
    // window.location.href = "/dashboard/admin";
  } catch (error) {
    dispatch({
      type: EMAIL_SEND_FAIL,
      payload: error.message,
    });
  }
};
