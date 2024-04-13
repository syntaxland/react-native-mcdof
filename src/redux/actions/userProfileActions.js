// userProfileActions.js
import axios from "axios";
import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  DELETE_USER_ACCOUNT_REQUEST,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  UPDATE_USER_AVATAR_REQUEST,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_FAIL,
  SEND_PASSWORD_RESET_LINK_REQUEST,
  SEND_PASSWORD_RESET_LINK_SUCCESS,
  SEND_PASSWORD_RESET_LINK_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/userProfileConstants";
import { logout } from "../actions/userActions";

import { API_URL } from "../../config/apiConfig";
// const API_URL = process.env.REACT_APP_API_URL;

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/api/get-user-profile/`,
      config
    );

    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const response = await axios.put(
      `${API_URL}/api/update-user-profile/`,
      userData,
      config
    );

    dispatch({
      type: UPDATE_USER_PROFILE_SUCCESS,
      payload: response.data,
    });
    window.location.reload();
    // window.location.href = "/dashboard/users";
  } catch (error) {
    dispatch({
      type: UPDATE_USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserAvatar = (avatarData) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_USER_AVATAR_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const formData = new FormData();
    formData.append("avatar", avatarData);

    const { data } = await axios.put(
      `${API_URL}/api/users/update-avatar/`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_USER_AVATAR_SUCCESS,
      payload: data,
    });
    window.location.reload();
    // window.location.href = "/dashboard/users";
  } catch (error) {
    dispatch({
      type: UPDATE_USER_AVATAR_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const sendPasswordResetLink = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_PASSWORD_RESET_LINK_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${API_URL}/api/password-reset-request/`,
      { email },
      config
    );

    dispatch({
      type: SEND_PASSWORD_RESET_LINK_SUCCESS,
      payload: response.data.detail,
    });
    window.location.reload();
    window.location.href = "/login";
  } catch (error) {
    dispatch({
      type: SEND_PASSWORD_RESET_LINK_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resetPassword = (token, newPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${API_URL}/api/reset-password/${token}/`,
      { new_password: newPassword },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: response.data.detail,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const changePassword = (oldPassword, newPassword) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const data = { old_password: oldPassword, new_password: newPassword };

    await axios.post(`${API_URL}/api/change-password/`, data, config);

    dispatch({ type: CHANGE_PASSWORD_SUCCESS });

    // Logout user and redirect to login page
    dispatch(logout());
    window.location.reload();
    window.location.href = "/login";
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUserAccount = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_ACCOUNT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const data = { password };

    await axios.post(`${API_URL}/api/user-account-delete/`, data, config);

    dispatch({ type: DELETE_USER_ACCOUNT_SUCCESS });

    // Log user out after deleting the account
    //   dispatch({ type: USER_LOGOUT });
    dispatch(logout());
    window.location.reload();
    window.location.href = "/";
  } catch (error) {
    dispatch({
      type: DELETE_USER_ACCOUNT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
