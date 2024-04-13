// orderReducers.js
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  SHIPMENT_SAVE_REQUEST,
  SHIPMENT_SAVE_SUCCESS,
  SHIPMENT_SAVE_FAIL,
  USER_SHIPMENT_LIST_REQUEST,
  USER_SHIPMENT_LIST_SUCCESS,
  USER_SHIPMENT_LIST_FAIL,
  ALL_USERS_SHIPMENT_LIST_REQUEST,
  ALL_USERS_SHIPMENT_LIST_SUCCESS,
  ALL_USERS_SHIPMENT_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ALL_ORDER_LIST_REQUEST,
  ALL_ORDER_LIST_SUCCESS,
  ALL_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_ITEMS_LIST_REQUEST,
  ORDER_ITEMS_LIST_SUCCESS,
  ORDER_ITEMS_LIST_FAIL,
  REVIEW_ADD_REQUEST,
  REVIEW_ADD_SUCCESS,
  REVIEW_ADD_FAIL,
  CONFIRM_DELIVERY_REQUEST,
  CONFIRM_DELIVERY_SUCCESS,
  CONFIRM_DELIVERY_FAIL,
  // SHIPPING_ADDRESS_REQUEST,
  // SHIPPING_ADDRESS_SUCCESS,
  // SHIPPING_ADDRESS_FAIL,
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  ORDER_ADD_REVIEW_REQUEST,
  ORDER_ADD_REVIEW_SUCCESS,
  ORDER_ADD_REVIEW_FAIL,
  ORDER_EDIT_REVIEW_REQUEST,
  ORDER_EDIT_REVIEW_SUCCESS,
  ORDER_EDIT_REVIEW_FAIL,
} from "../constants/orderConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  order: {},
  shipments: [],
  reviews: [],
};

export const orderCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const shipmentSaveReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPMENT_SAVE_REQUEST:
      return { ...state, loading: true };
    case SHIPMENT_SAVE_SUCCESS:
      return { loading: false, success: true, ...action.payload };
    case SHIPMENT_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userShipmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SHIPMENT_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_SHIPMENT_LIST_SUCCESS:
      return { loading: false, shipments: action.payload };
    case USER_SHIPMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allUserShipmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS_SHIPMENT_LIST_REQUEST:
      return { ...state, loading: true };
    case ALL_USERS_SHIPMENT_LIST_SUCCESS:
      return { loading: false, shipments: action.payload };
    case ALL_USERS_SHIPMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ALL_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ALL_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderItemsListReducer = (state = { orderItems: [] }, action) => {
  switch (action.type) {
    case ORDER_ITEMS_LIST_REQUEST:
      return { loading: true, orderItems: [] };
    case ORDER_ITEMS_LIST_SUCCESS:
      return { loading: false, orderItems: action.payload };
    case ORDER_ITEMS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reviewAddReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_ADD_REQUEST:
      return { loading: true };
    case REVIEW_ADD_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case REVIEW_ADD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const confirmDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_DELIVERY_REQUEST:
      return { loading: true };
    case CONFIRM_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case CONFIRM_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const shippingAddressReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SHIPPING_ADDRESS_REQUEST:
//       return { loading: true, ...state };
//     case SHIPPING_ADDRESS_SUCCESS:
//       return { loading: false, shippingAddress: action.payload };
//     case SHIPPING_ADDRESS_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export const reviewListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REVIEW_LIST_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case REVIEW_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderAddReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADD_REVIEW_REQUEST:
      return { loading: true };
    case ORDER_ADD_REVIEW_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case ORDER_ADD_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderEditReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_EDIT_REVIEW_REQUEST:
      return { loading: true };
    case ORDER_EDIT_REVIEW_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case ORDER_EDIT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
