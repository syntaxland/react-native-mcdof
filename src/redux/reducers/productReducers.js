// productReducers.js
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
  USER_FAVORITE_PRODUCTS_REQUEST,
  USER_FAVORITE_PRODUCTS_SUCCESS,
  USER_FAVORITE_PRODUCTS_FAIL,
 
  USER_VIEWED_PRODUCTS_REQUEST,
  USER_VIEWED_PRODUCTS_SUCCESS,
  USER_VIEWED_PRODUCTS_FAIL,

  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SAVE_COUNT,

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

const initialState = {
  products: [],
  loading: false,
  error: null,
};


export const productListReducers = (state = { products: [] }, action) => { 
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { laoding: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { laoding: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { laoding: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducers = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const viewedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_PRODUCT_REQUEST:
      return { loading: true };
    case VIEW_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case VIEW_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const saveProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_PRODUCT_REQUEST:
      return { loading: true };
    case SAVE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case SAVE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeProductReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT_REQUEST:
      return { loading: true };
    case REMOVE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case REMOVE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userFavoriteProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case USER_FAVORITE_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case USER_FAVORITE_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case USER_FAVORITE_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userViewedProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case USER_VIEWED_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case USER_VIEWED_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case USER_VIEWED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const updateProductSaveCountReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_SAVE_COUNT:
      // Update the product's save count in your state
      // You can use the product._id to find the specific product and update its save count
      return { updated: true };

    default:
      return state;
  }
};

export const recommendedProductsReducer = (state = { productsRecommended: [] }, action) => {
  switch (action.type) {
    case RECOMMENDED_PRODUCTS_REQUEST:
      return { loading: true, productsRecommended: [] };
    case RECOMMENDED_PRODUCTS_SUCCESS:
      return { loading: false, productsRecommended: action.payload };
    case RECOMMENDED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_SEARCH_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
