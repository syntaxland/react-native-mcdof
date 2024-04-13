import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

import { API_URL } from "../../config/apiConfig";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${API_URL}/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  await AsyncStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  await AsyncStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });
    // localStorage.setItem("shipmentData", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  // localStorage.removeItem("cartItems");
  await AsyncStorage.removeItem(cartItems);
};
