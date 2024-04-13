// productAction.js
import axios from "axios";
import { 
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_SUCCESS, 
  SAVE_PRODUCT_FAIL,
  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  USER_FAVORITE_PRODUCTS_REQUEST,
  USER_FAVORITE_PRODUCTS_SUCCESS,
  USER_FAVORITE_PRODUCTS_FAIL,
  USER_VIEWED_PRODUCTS_REQUEST,
  USER_VIEWED_PRODUCTS_SUCCESS,
  USER_VIEWED_PRODUCTS_FAIL,
  // UPDATE_PRODUCT_SAVE_COUNT,
  VIEW_PRODUCT_REQUEST,
  VIEW_PRODUCT_SUCCESS,
  VIEW_PRODUCT_FAIL,
  RECOMMENDED_PRODUCTS_REQUEST,
  RECOMMENDED_PRODUCTS_SUCCESS,
  RECOMMENDED_PRODUCTS_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
} from "../constants/productConstants"; 

import { API_URL } from "../../config/apiConfig";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/products/`);
    dispatch({ 
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${API_URL}/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const saveProduct =
  (userId, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: SAVE_PRODUCT_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/products/${productId}/save-product/${userId}/`,
        { userId, productId },
        config
      );

      dispatch({
        type: SAVE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SAVE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const trackProductView =
  (userId, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: VIEW_PRODUCT_REQUEST });

      const config = {
        headers: {
          Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
        },
      };

      const { data } = await axios.post(
        `${API_URL}/api/products/${productId}/track-product-view/${userId}/`,
        {},
        config
      );

      dispatch({ type: VIEW_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VIEW_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const removeProduct =
  (userId, productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: REMOVE_PRODUCT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      };

      const { data } = await axios.delete(
        `${API_URL}/api/products/${productId}/remove-product/${userId}/`,
        config
      );

      dispatch({
        type: REMOVE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        productId,
      });
    }
  };

export const getUserFavoriteProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_FAVORITE_PRODUCTS_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
 
    const response = await axios.get(
      `${API_URL}/api/get-user-favorite-products/`,
      config
    );

    dispatch({
      type: USER_FAVORITE_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_FAVORITE_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUserViewedProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_VIEWED_PRODUCTS_REQUEST });

    const { userInfo } = getState().userLogin;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/api/get-user-viewed-products/`,
      config
    );

    dispatch({
      type: USER_VIEWED_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: USER_VIEWED_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateProductSaveCount =
  (productId, saveCount) => async (dispatch, getState) => {
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${getState().userLogin.userInfo.access}`,
      //   },
      // };
      // const { data } = await axios.put(
      //   `${API_URL}/api/products/${productId}/update-save-count/`,
      //   { saveCount },
      //   config
      // );
      // Dispatch an action to update the product in the frontend state
      // dispatch({ type: UPDATE_PRODUCT_SAVE_COUNT, payload: data });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

export const fetchRecommendedProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RECOMMENDED_PRODUCTS_REQUEST });

    const { userInfo } = getState().userLogin;

    // Make an API request to fetch recommended products
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const response = await axios.get(
      `${API_URL}/api/recommended-products/`,
      config
    );

    dispatch({
      type: RECOMMENDED_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: RECOMMENDED_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const searchProducts =
  (keyword, category, brand, priceRange, rating, sortOrder) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_SEARCH_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // const { data } = await axios.get(
      //   `${API_URL}/api/products/search/?keyword=${keyword}&category=${category}&brand=${brand}&priceRange=${priceRange}&rating=${rating}&sortOrder=${sortOrder}`
      // );
      const { data } = await axios.get(
        `${API_URL}/api/products/search/?search=${keyword}`,
        config
      );

      dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_SEARCH_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
