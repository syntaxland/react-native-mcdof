// emailOtpActions.js
import axios from "axios";
import {
  EMAIL_OTP_SEND_REQUEST,
  EMAIL_OTP_SEND_SUCCESS,
  EMAIL_OTP_SEND_FAIL,
  EMAIL_OTP_VERIFY_REQUEST,
  EMAIL_OTP_VERIFY_SUCCESS,
  EMAIL_OTP_VERIFY_FAIL,
  EMAIL_OTP_RESEND_REQUEST,
  EMAIL_OTP_RESEND_SUCCESS,
  EMAIL_OTP_RESEND_FAIL,
} from "../constants/emailOtpConstants";

import { API_URL } from "../../config/apiConfig";
 
export const sendEmailOtp =
  (email, firstName) => async (dispatch) => {
    try {
      dispatch({
        type: EMAIL_OTP_SEND_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, first_name: firstName });

      await axios.post(`${API_URL}/api/send-email-otp/`, body, config);

      dispatch({
        type: EMAIL_OTP_SEND_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: EMAIL_OTP_SEND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const verifyEmailOtp = (otp) => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_OTP_VERIFY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${API_URL}/api/verify-email-otp/`, { otp }, config);

    dispatch({
      type: EMAIL_OTP_VERIFY_SUCCESS,
      payload: data,
    });
    // window.location.reload();
    // window.location.href = "/login"; 
  } catch (error) {
    dispatch({
      type: EMAIL_OTP_VERIFY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const resendEmailOtp =
  (email, firstName) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMAIL_OTP_RESEND_REQUEST,
      });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({ email, first_name: firstName });

      await axios.post(`${API_URL}/api/resend-email-otp/`, body, config);

      dispatch({
        type: EMAIL_OTP_RESEND_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: EMAIL_OTP_RESEND_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
