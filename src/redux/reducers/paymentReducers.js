// paymentReducers.js
import {
  PAYMENT_CREATE_REQUEST,
  PAYMENT_CREATE_SUCCESS,
  PAYMENT_CREATE_FAIL,
  PAYMENT_LIST_REQUEST,
  PAYMENT_LIST_SUCCESS,
  PAYMENT_LIST_FAIL,
  LIST_ALL_PAYMENTS_REQUEST,
  LIST_ALL_PAYMENTS_SUCCESS,
  LIST_ALL_PAYMENTS_FAIL,
  PAYSOFTER_PAYMENT_CREATE_REQUEST,
  PAYSOFTER_PAYMENT_CREATE_SUCCESS,
  PAYSOFTER_PAYMENT_CREATE_FAIL,
  DEBIT_PAYSOFTER_ACCOUNT_REQUEST,
  DEBIT_PAYSOFTER_ACCOUNT_SUCCESS,
  DEBIT_PAYSOFTER_ACCOUNT_FAIL,
  CREATE_PAYSOFTER_PROMISE_REQUEST,
  CREATE_PAYSOFTER_PROMISE_SUCCESS,
  CREATE_PAYSOFTER_PROMISE_FAIL,
  GET_PAYMENT_API_KEYS_REQUEST,
  GET_PAYMENT_API_KEYS_SUCCESS,
  GET_PAYMENT_API_KEYS_FAIL,

  DEBIT_PAYSOFTER_USD_ACCOUNT_REQUEST,
DEBIT_PAYSOFTER_USD_ACCOUNT_SUCCESS,
DEBIT_PAYSOFTER_USD_ACCOUNT_FAIL,
} from "../constants/paymentConstants";

const initialState = {
  payments: [],
  formattedPayerEmail: [],
  payerEmail: [],
  paystackPublicKey: [],
  paysofterPublicKey: [],
  loading: false,
  success: false,
  error: null,
};

export const debitPaysofterUsdAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEBIT_PAYSOFTER_USD_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEBIT_PAYSOFTER_USD_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        formattedPayerEmail: action.payload.formattedPayerEmail,
      };
    case DEBIT_PAYSOFTER_USD_ACCOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPaymentApiKeysReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_API_KEYS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PAYMENT_API_KEYS_SUCCESS:
      return {
        ...state,
        loading: false,
        // paystackPublicKey: action.payload,
        // paysofterPublicKey: action.payload,

        paystackPublicKey: action.payload.paystackPublicKey,
        paysofterPublicKey: action.payload.paysofterPublicKey,
      };
    case GET_PAYMENT_API_KEYS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paymentCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAYMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paysofterPaymentCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYSOFTER_PAYMENT_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYSOFTER_PAYMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAYSOFTER_PAYMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const debitPaysofterAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEBIT_PAYSOFTER_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DEBIT_PAYSOFTER_ACCOUNT_SUCCESS:
      return {
        loading: false,
        success: true,
        formattedPayerEmail: action.payload.formattedPayerEmail,
      };
    case DEBIT_PAYSOFTER_ACCOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createPaysofterPromiseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAYSOFTER_PROMISE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PAYSOFTER_PROMISE_SUCCESS:
      return {
        loading: false,
        success: true,
        formattedPayerEmail: action.payload.formattedPayerEmail,
        payerEmail: action.payload.payerEmail,
      };
    case CREATE_PAYSOFTER_PROMISE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const paymentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PAYMENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PAYMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload,
      };
    case PAYMENT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const listAllPaymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ALL_PAYMENTS_REQUEST:
      return { ...state, loading: true };
    case LIST_ALL_PAYMENTS_SUCCESS:
      return { loading: false, payments: action.payload };
    case LIST_ALL_PAYMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
