// supportActions.js
import axios from "axios";
import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  // CREATE_SUPPORT_MESSAGE_REQUEST,
  // CREATE_SUPPORT_MESSAGE_SUCCESS,
  // CREATE_SUPPORT_MESSAGE_FAIL,
  LIST_SUPPORT_TICKET_REQUEST,
  LIST_SUPPORT_TICKET_SUCCESS,
  LIST_SUPPORT_TICKET_FAIL,
  // LIST_SUPPORT_MESSAGE_REQUEST,
  // LIST_SUPPORT_MESSAGE_SUCCESS,
  // LIST_SUPPORT_MESSAGE_FAIL,
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

import { API_URL } from "../../config/apiConfig";
// const API_URL = process.env.REACT_APP_API_URL;

export const createSupportTicket = (ticketData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CREATE_TICKET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-support-ticket/`,
      ticketData,
      config
    );

    dispatch({ type: CREATE_TICKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_TICKET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listSupportTicket = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_SUPPORT_TICKET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/list-support-ticket/`,
      config
    );

    dispatch({ type: LIST_SUPPORT_TICKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_SUPPORT_TICKET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllSupportTickets = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_ALL_SUPPORT_TICKET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/list-all-support-ticket/`,
      config
    );

    dispatch({ type: LIST_ALL_SUPPORT_TICKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_ALL_SUPPORT_TICKET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAllSupportResponse = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_ALL_TICKET_RESPONSE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/list-all-support-response/`,
      config
    );

    dispatch({ type: LIST_ALL_TICKET_RESPONSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_ALL_TICKET_RESPONSE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const replySupportTicket = (replyticketData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REPLY_SUPPORT_TICKET_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/reply-support-ticket/`,
      replyticketData,
      config
    );

    dispatch({ type: REPLY_SUPPORT_TICKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REPLY_SUPPORT_TICKET_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listSupportTicketReply = (ticketId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: LIST_SUPPORT_TICKET_REPLY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/list-support-ticket-reply/${ticketId}/`,
      config
    );

    dispatch({ type: LIST_SUPPORT_TICKET_REPLY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_SUPPORT_TICKET_REPLY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getTicketDetail = (ticketId) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TICKET_DETAIL_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-ticket-detail/${ticketId}/`,
      config
    );

    dispatch({ type: GET_TICKET_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_TICKET_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
