// userProfileReducers.js
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
} from '../constants/userProfileConstants';

const initialState = {
  success: false, 
  loading: false,
  error: null,
  profile: [],

};


export const getUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, profile: action.payload };
    case GET_USER_PROFILE_FAIL:
      return { ...state, loading: false, error: action.payload };
    // ... Other cases ...
    default:
      return state;
  }
};


export const updateUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_USER_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true };
    case CHANGE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const sendPasswordResetLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_PASSWORD_RESET_LINK_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case SEND_PASSWORD_RESET_LINK_SUCCESS:
      return { ...state, loading: false, success: true };
    case SEND_PASSWORD_RESET_LINK_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_USER_ACCOUNT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_USER_ACCOUNT_SUCCESS:
      return { ...state, loading: false, profile: {}, success: true };
    case DELETE_USER_ACCOUNT_FAIL:
      return { ...state, loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};


export const updateUserAvatarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_AVATAR_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_USER_AVATAR_SUCCESS:
      return { ...state, loading: false, success: true, profile: action.payload };
    case UPDATE_USER_AVATAR_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
