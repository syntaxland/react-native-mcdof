// promoActions.js
import axios from "axios";
import {
  REFERRAL_SUCCESS,
  REFERRAL_ERROR,
  GENERATE_REFERRAL_REQUEST,
  GENERATE_REFERRAL_SUCCESS,
  GENERATE_REFERRAL_ERROR,
  GET_USER_REFERRALS_REQUEST,
  GET_USER_REFERRALS_SUCCESS,
  GET_USER_REFERRALS_ERROR,
  GENERATE_REFERRAL_BUTTON_REQUEST,
  GENERATE_REFERRAL_BUTTON_SUCCESS,
  GENERATE_REFERRAL_BUTTON_ERROR,
  PROMO_CODE_REQUEST,
  PROMO_CODE_SUCCESS,
  PROMO_CODE_FAIL,
  // SET_PROMO_DISCOUNT,
  // CLEAR_PROMO_CODE,
  CREATE_PROMO_REQUEST,
  CREATE_PROMO_SUCCESS,
  CREATE_PROMO_FAIL,
  CLEAR_PROMO_MESSAGE,
  PROMO_PRODUCT_REQUEST,
  PROMO_PRODUCT_SUCCESS,
  PROMO_PRODUCT_FAIL,
} from "../constants/promoConstants";

// const API_URL = process.env.REACT_APP_API_URL;
import { API_URL } from "../../config/apiConfig";

export const applyPromoCode = (promoCode, order_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROMO_CODE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    const dataToSend = { promoCode, order_id };

    const { data } = await axios.post(
      `${API_URL}/api/apply-promo-code/`,
      dataToSend,
      config
    );
    dispatch({
      type: PROMO_CODE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMO_CODE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listPromoProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PROMO_PRODUCT_REQUEST });

    const { data } = await axios.get(`${API_URL}/api/promo-products/`);

    dispatch({
      type: PROMO_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROMO_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createPromoCode = (promoData) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PROMO_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/api/create-promo-code/`,
      promoData,
      config
    );

    dispatch({
      type: CREATE_PROMO_SUCCESS,
      payload: data,
    });
    window.location.reload();
    // window.location.href = "/dashboard/users";
  } catch (error) {
    dispatch({
      type: CREATE_PROMO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const clearPromoMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_PROMO_MESSAGE });
};

// export const clearPromoCode = () => (dispatch) => {
//   dispatch({ type: CLEAR_PROMO_CODE });
// };

// export const applyPromoCode = (promoCode) => async (dispatch, getState) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
//       },
//     };

//     const response = await axios.post(
//       `${API_URL}/api/apply-promo/`,
//       { promo_code: promoCode },
//       config
//     );

//     dispatch({
//       type: APPLY_PROMO_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: APPLY_PROMO_ERROR,
//       payload:
//         error.response && error.response.data.detail
//           ? error.response.data.detail
//           : error.message,
//     });
//   }
// };

// export const setTimer = (seconds) => {
//   return {
//     type: SET_TIMER,
//     payload: seconds,
//   };
// };

export const generateReferralLink = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GENERATE_REFERRAL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/api/generate-referral-link/`,
      config
    );

    // Dispatch success action with the response data
    dispatch({
      type: GENERATE_REFERRAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Dispatch error action with the error message
    dispatch({
      type: GENERATE_REFERRAL_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const generateReferralLinkButton = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GENERATE_REFERRAL_BUTTON_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/api/generate-referral-link-button/`,
      config
    );

    // Dispatch success action with the response data
    dispatch({
      type: GENERATE_REFERRAL_BUTTON_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Dispatch error action with the error message
    dispatch({
      type: GENERATE_REFERRAL_BUTTON_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserReferrals = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_REFERRALS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/api/get-user-referrals/`,
      config
    );

    // Dispatch success action with the response data
    dispatch({
      type: GET_USER_REFERRALS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    // Dispatch error action with the error message
    dispatch({
      type: GET_USER_REFERRALS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const referUser = (referralCode) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      },
    };

    await axios.post(
      `${API_URL}/api/refer/`,
      { referral_code: referralCode },
      config
    );

    dispatch({
      type: REFERRAL_SUCCESS,
      payload: referralCode,
    });
  } catch (error) {
    dispatch({
      type: REFERRAL_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
