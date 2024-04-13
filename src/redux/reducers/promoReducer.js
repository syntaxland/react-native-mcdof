// promoReducer.js
import {
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
  SET_PROMO_DISCOUNT,
  CREATE_PROMO_REQUEST,
  CREATE_PROMO_SUCCESS,
  CREATE_PROMO_FAIL,
  CLEAR_PROMO_MESSAGE,
  PROMO_PRODUCT_REQUEST,
  PROMO_PRODUCT_SUCCESS,
  PROMO_PRODUCT_FAIL,
} from "../constants/promoConstants";

const initialState = {
  promoCode: null,
  promoError: null,
  timer: 0,

  promoDiscount: 0,
  discountPercentage: 0,

  referralLink: null,
  referralCode: null,
  referralError: null,
  referralErrorButton: null,

  loading: false,
  success: false,
  error: null,
  userReferrals: [],
};

export const applyPomoCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROMO_CODE_REQUEST:
      return { ...state, loading: true };
    case PROMO_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        promoCode: action.payload,
        promoDiscount: action.payload.promoDiscount,
        discountPercentage: action.payload.discountPercentage,
      };
    case PROMO_CODE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SET_PROMO_DISCOUNT:
      return { ...state, promoDiscount: action.payload };
    default:
      return state;
  }
};

export const createPromoCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROMO_REQUEST:
      return { loading: true };
    case CREATE_PROMO_SUCCESS:
      return { loading: false, success: true, promoCode: action.payload };
    case CREATE_PROMO_FAIL:
      return { loading: false, error: action.payload };
    case CLEAR_PROMO_MESSAGE:
      return { ...state, success: false, error: null };
    default:
      return state;
  }
};

export const promoProductListReducer = (
  state = { promoProducts: [] },
  action
) => {
  switch (action.type) {
    case PROMO_PRODUCT_REQUEST:
      return { loading: true, promoProducts: [] };
    case PROMO_PRODUCT_SUCCESS:
      return { loading: false, promoProducts: action.payload };
    case PROMO_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const referralReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_REFERRAL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GENERATE_REFERRAL_SUCCESS:
      return {
        ...state,
        referralLink: action.payload.referral_link,
        referralCode: action.payload.referral_code,
        referralError: null,
        loading: false,
      };
    case GENERATE_REFERRAL_ERROR:
      return {
        ...state,
        referralLink: null,
        referralCode: null,
        referralError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const referralButtonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_REFERRAL_BUTTON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GENERATE_REFERRAL_BUTTON_SUCCESS:
      return {
        ...state,
        referralLink: action.payload.referral_link,
        referralCode: action.payload.referral_code,
        referralErrorButton: null,
        loading: false,
      };
    case GENERATE_REFERRAL_BUTTON_ERROR:
      return {
        ...state,
        referralLink: null,
        referralCode: null,
        referralErrorButton: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const getUserReferralsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REFERRALS_REQUEST:
      return { ...state, loading: true };
    case GET_USER_REFERRALS_SUCCESS:
      return { ...state, loading: false, userReferrals: action.payload };
    case GET_USER_REFERRALS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
