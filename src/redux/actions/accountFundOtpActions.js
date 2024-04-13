// accountFundOtpActions.js
import axios from "axios";
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
} from "../constants/accountFundOtpConstants";

import { PAYSOFTER_API_URL } from "../../config/apiConfig";
// import { API_URL } from "../../config/apiConfig";

export const sendOtp = (email, firstName) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_OTP_REQUEST,
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

    await axios.post(`${PAYSOFTER_API_URL}/api/send-otp/`, body, config);

    dispatch({
      type: SEND_OTP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SEND_OTP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const verifyOtp = (otpData) => async (dispatch) => {
  try {
    dispatch({
      type: VERIFY_OTP_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${PAYSOFTER_API_URL}/api/verify-otp/`,
      { otpData },
      config
    );

    dispatch({
      type: VERIFY_OTP_SUCCESS,
      payload: data,
    });
    // window.location.reload();
    // window.location.href = "/dashboard";
  } catch (error) {
    dispatch({
      type: VERIFY_OTP_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
