// feedbackActions.js
import axios from "axios";
import {
    CREATE_FEEDBACK_REQUEST,
    CREATE_FEEDBACK_SUCCESS,
    CREATE_FEEDBACK_FAIL,
    LIST_FEEDBACK_REQUEST,
    LIST_FEEDBACK_SUCCESS,
    LIST_FEEDBACK_FAIL,
  
} from "../constants/feedbackConstants"; 

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const createFeedback = (feedbackData) => async (dispatch, getState) => { 
  try {
    dispatch({
      type: CREATE_FEEDBACK_REQUEST,
    });

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
      `${API_URL}/api/create-feedback/`,
      feedbackData,
      config
    );

    dispatch({
      type: CREATE_FEEDBACK_SUCCESS,
      payload: data,
    });
    // window.location.reload();
    // window.location.href = "/dashboard/users";
  } catch (error) {
    dispatch({
      type: CREATE_FEEDBACK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listFeedbacks = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: LIST_FEEDBACK_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
  
      const { data } = await axios.get(
        `${API_URL}/api/list-feedback/`,
        config
      );
  
      dispatch({
        type: LIST_FEEDBACK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIST_FEEDBACK_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
