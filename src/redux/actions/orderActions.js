// orderActions.js
import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ALL_ORDER_LIST_REQUEST,
  ALL_ORDER_LIST_SUCCESS,
  ALL_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  // CART_SAVE_SHIPPING_ADDRESS,
  SHIPMENT_SAVE_REQUEST,
  SHIPMENT_SAVE_SUCCESS,
  SHIPMENT_SAVE_FAIL,
  USER_SHIPMENT_LIST_REQUEST,
  USER_SHIPMENT_LIST_SUCCESS,
  USER_SHIPMENT_LIST_FAIL,
  ALL_USERS_SHIPMENT_LIST_REQUEST,
  ALL_USERS_SHIPMENT_LIST_SUCCESS,
  ALL_USERS_SHIPMENT_LIST_FAIL,
  ORDER_ITEMS_LIST_REQUEST,
  ORDER_ITEMS_LIST_SUCCESS,
  ORDER_ITEMS_LIST_FAIL,

  // REVIEW_ADD_REQUEST,
  // REVIEW_ADD_SUCCESS,
  // REVIEW_ADD_FAIL,
  CONFIRM_DELIVERY_REQUEST,
  CONFIRM_DELIVERY_SUCCESS,
  CONFIRM_DELIVERY_FAIL,
  SHIPPING_ADDRESS_REQUEST,
  SHIPPING_ADDRESS_SUCCESS,
  SHIPPING_ADDRESS_FAIL,
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

import { API_URL } from "../../config/apiConfig";
// const API_URL = process.env.REACT_APP_API_URL;

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
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
      `${API_URL}/api/create-order/`,
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const saveShipment = (shipmentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SHIPMENT_SAVE_REQUEST });

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
      `${API_URL}/api/save-shipment/`,
      shipmentData,
      config
    );

    dispatch({ type: SHIPMENT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SHIPMENT_SAVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserShipments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SHIPMENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-shipments/`,
      config
    );

    dispatch({
      type: USER_SHIPMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SHIPMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllShipments = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_USERS_SHIPMENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-all-users-shipments/`,
      config
    );

    dispatch({
      type: ALL_USERS_SHIPMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_USERS_SHIPMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/get-user-orders/`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
    
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/get-all-orders/`, config);

    dispatch({
      type: ALL_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.delete(`${API_URL}/api/delete-orders/${id}/`, config);

    dispatch({ type: ORDER_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listOrderItems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_ITEMS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/api/get-order-items/`, config);

    dispatch({
      type: ORDER_ITEMS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ITEMS_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const confirmOderDelivery = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONFIRM_DELIVERY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.put(
      `${API_URL}/api/confirm-order-delivery/${orderId}/`,
      {},
      config
    );

    dispatch({ type: CONFIRM_DELIVERY_SUCCESS });
  } catch (error) {
    dispatch({
      type: CONFIRM_DELIVERY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getShippingAddress = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHIPPING_ADDRESS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-shipping-address/`,
      config
    );

    dispatch({
      type: SHIPPING_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIPPING_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUseReviews = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/get-user-reviews/`,
      config
    );

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listReviews = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get(
      `${API_URL}/api/review-list/${productId}`,
      config
    );

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const addReview =
  (orderItemId, rating, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_ADD_REVIEW_REQUEST,
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
        `${API_URL}/api/add-review/`,
        { order_item_id: orderItemId, rating, comment },
        config
      );

      dispatch({
        type: ORDER_ADD_REVIEW_SUCCESS,
        payload: data,
      });
      window.location.reload();
      window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: ORDER_ADD_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const editReview =
  (reviewId, rating, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_EDIT_REVIEW_REQUEST,
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

      const { data } = await axios.put(
        `${API_URL}/api/edit-review/${reviewId}/`,
        { rating, comment },
        config
      );

      dispatch({
        type: ORDER_EDIT_REVIEW_SUCCESS,
        payload: data,
      });
      window.location.reload();
      window.location.href = "/dashboard/users";
    } catch (error) {
      dispatch({
        type: ORDER_EDIT_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
