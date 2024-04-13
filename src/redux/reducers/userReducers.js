// userReducers.js
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

const initialState = {
  registerData: [],
  userInfo: [],
  loading: false,
  error: null,
};

export const userLoginReducers = (state = initialState, action) => { 
  switch (action.type) {
    case USER_LOGIN_REQUEST: 
      return { laoding: true };
    case USER_LOGIN_SUCCESS:
      return { laoding: false, success: true, userInfo: action.payload }; 
    case USER_LOGIN_FAIL:
      return { laoding: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, success: false, };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true, registerData: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    
    case "STORE_REGISTRATION_DATA":
    return {
      ...state,
      registrationData: action.payload,
    };

    case USER_LOGOUT: 
      return {};

    default:
      return state;
  }
};
