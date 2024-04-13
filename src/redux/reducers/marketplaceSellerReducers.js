// marketplaceSellerReducers.js
import {
  CREATE_MARKETPLACE_SELLER_REQUEST,
  CREATE_MARKETPLACE_SELLER_SUCCESS,
  CREATE_MARKETPLACE_SELLER_FAIL,
  MARKETPLACE_SELLER_PHOTO_REQUEST,
  MARKETPLACE_SELLER_PHOTO_SUCCESS,
  MARKETPLACE_SELLER_PHOTO_FAIL,
  POST_FREE_AD_REQUEST,
  POST_FREE_AD_SUCCESS,
  POST_FREE_AD_FAIL,
  POST_PAID_AD_REQUEST,
  POST_PAID_AD_SUCCESS,
  POST_PAID_AD_FAIL,
  GET_SELLER_ACCOUNT_REQUEST,
  GET_SELLER_ACCOUNT_SUCCESS,
  GET_SELLER_ACCOUNT_FAIL,
  UPDATE_SELLER_ACCOUNT_REQUEST,
  UPDATE_SELLER_ACCOUNT_SUCCESS,
  UPDATE_SELLER_ACCOUNT_FAIL,
  GET_SELLER_PHOTO_REQUEST,
  GET_SELLER_PHOTO_SUCCESS,
  GET_SELLER_PHOTO_FAIL,
  UPDATE_SELLER_PHOTO_REQUEST,
  UPDATE_SELLER_PHOTO_SUCCESS,
  UPDATE_SELLER_PHOTO_FAIL,
  GET_FREE_AD_REQUEST,
  GET_FREE_AD_SUCCESS,
  GET_FREE_AD_FAIL,
  UPDATE_FREE_AD_REQUEST,
  UPDATE_FREE_AD_SUCCESS,
  UPDATE_FREE_AD_FAIL,
  GET_ALL_FREE_AD_REQUEST,
  GET_ALL_FREE_AD_SUCCESS,
  GET_ALL_FREE_AD_FAIL,
  GET_PAID_AD_REQUEST,
  GET_PAID_AD_SUCCESS,
  GET_PAID_AD_FAIL,
  UPDATE_PAID_AD_REQUEST,
  UPDATE_PAID_AD_SUCCESS,
  UPDATE_PAID_AD_FAIL,
  GET_ALL_PAID_AD_REQUEST,
  GET_ALL_PAID_AD_SUCCESS,
  GET_ALL_PAID_AD_FAIL,
  DELETE_FREE_AD_REQUEST,
  DELETE_FREE_AD_SUCCESS,
  DELETE_FREE_AD_FAIL,
  DELETE_PAID_AD_REQUEST,
  DELETE_PAID_AD_SUCCESS,
  DELETE_PAID_AD_FAIL,
  GET_FREE_AD_DETAIL_REQUEST,
  GET_FREE_AD_DETAIL_SUCCESS,
  GET_FREE_AD_DETAIL_FAIL,
  GET_PAID_AD_DETAIL_REQUEST,
  GET_PAID_AD_DETAIL_SUCCESS,
  GET_PAID_AD_DETAIL_FAIL,
  GET_SELLER_API_KEY_REQUEST,
  GET_SELLER_API_KEY_SUCCESS,
  GET_SELLER_API_KEY_FAIL,
  UPDATE_SELLER_API_KEY_REQUEST,
  UPDATE_SELLER_API_KEY_SUCCESS,
  UPDATE_SELLER_API_KEY_FAIL,
  CREATE_PAID_AD_MESSAGE_REQUEST,
  CREATE_PAID_AD_MESSAGE_SUCCESS,
  CREATE_PAID_AD_MESSAGE_FAIL,
  LIST_PAID_AD_MESSAGE_REQUEST,
  LIST_PAID_AD_MESSAGE_SUCCESS,
  LIST_PAID_AD_MESSAGE_FAIL,
  CREATE_FREE_AD_MESSAGE_REQUEST,
  CREATE_FREE_AD_MESSAGE_SUCCESS,
  CREATE_FREE_AD_MESSAGE_FAIL,
  LIST_FREE_AD_MESSAGE_REQUEST,
  LIST_FREE_AD_MESSAGE_SUCCESS,
  LIST_FREE_AD_MESSAGE_FAIL,
  EDIT_PAID_AD_REQUEST,
  EDIT_PAID_AD_SUCCESS,
  EDIT_PAID_AD_FAIL,
  DEACTIVATE_PAID_AD_REQUEST,
  DEACTIVATE_PAID_AD_SUCCESS,
  DEACTIVATE_PAID_AD_FAIL,
  REACTIVATE_PAID_AD_REQUEST,
  REACTIVATE_PAID_AD_SUCCESS,
  REACTIVATE_PAID_AD_FAIL,
  DEACTIVATE_FREE_AD_REQUEST,
  DEACTIVATE_FREE_AD_SUCCESS,
  DEACTIVATE_FREE_AD_FAIL,
  REACTIVATE_FREE_AD_REQUEST,
  REACTIVATE_FREE_AD_SUCCESS,
  REACTIVATE_FREE_AD_FAIL,
  EDIT_FREE_AD_REQUEST,
  EDIT_FREE_AD_SUCCESS,
  EDIT_FREE_AD_FAIL,
  GET_SELLER_ACTIVE_PAID_ADS_REQUEST,
  GET_SELLER_ACTIVE_PAID_ADS_SUCCESS,
  GET_SELLER_ACTIVE_PAID_ADS_FAIL,
  GET_SELLER_ACTIVE_FREE_ADS_REQUEST,
  GET_SELLER_ACTIVE_FREE_ADS_SUCCESS,
  GET_SELLER_ACTIVE_FREE_ADS_FAIL,
  GET_SELLER_USERNAME_SEARCH_REQUEST,
  GET_SELLER_USERNAME_SEARCH_SUCCESS,
  GET_SELLER_USERNAME_SEARCH_FAIL,
  GET_SELLER_DETAIL_REQUEST,
  GET_SELLER_DETAIL_SUCCESS,
  GET_SELLER_DETAIL_FAIL,
  SEARCH_ADS_REQUEST,
  SEARCH_ADS_SUCCESS,
  SEARCH_ADS_FAIL,

  GET_SELLER_SHOPFRONT_LINK_REQUEST,
GET_SELLER_SHOPFRONT_LINK_SUCCESS,
GET_SELLER_SHOPFRONT_LINK_FAIL,
} from "../constants/marketplaceSellerConstants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  sellerAccount: [],
  sellerPhoto: [],
  adMessages: [],
  sellerApiKey: [],
  sellerAvatarUrl: [],
  serachResults: [],
  ads: [],
  freeSearchAds: [],
  paidSearchAds: [],
  freeAds: [],
  paidAds: [],
  sellerDetail: [],
  shopfrontLink: [],

};

export const getSellerShopfrontLinkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_SHOPFRONT_LINK_REQUEST:
      return { loading: true };
    case GET_SELLER_SHOPFRONT_LINK_SUCCESS:
      return {
        loading: false,
        success: true,
        shopfrontLink: action.payload.shopfrontLink,
      };

    case GET_SELLER_SHOPFRONT_LINK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ADS_REQUEST:
      return { loading: true };
    case SEARCH_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        freeSearchAds: action.payload.free_ads,
        paidSearchAds: action.payload.paid_ads,
      };
    case SEARCH_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerUsernameSearchReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_SELLER_USERNAME_SEARCH_REQUEST:
      return { loading: true };
    case GET_SELLER_USERNAME_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        serachResults: action.payload.data,
        sellerAvatarUrl: action.payload.seller_avatar_url,
      };

    case GET_SELLER_USERNAME_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_DETAIL_REQUEST:
      return { loading: true };
    case GET_SELLER_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        sellerDetail: action.payload.data,
        sellerAvatarUrl: action.payload.seller_avatar_url,
      };

    case GET_SELLER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerActivePaidAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACTIVE_PAID_ADS_REQUEST:
      return { loading: true };
    case GET_SELLER_ACTIVE_PAID_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload,
      };

    case GET_SELLER_ACTIVE_PAID_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerActiveFreeAdsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACTIVE_FREE_ADS_REQUEST:
      return { loading: true };
    case GET_SELLER_ACTIVE_FREE_ADS_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload,
      };

    case GET_SELLER_ACTIVE_FREE_ADS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deactivateFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEACTIVATE_FREE_AD_REQUEST:
      return { loading: true };
    case DEACTIVATE_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DEACTIVATE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reactivateFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case REACTIVATE_FREE_AD_REQUEST:
      return { loading: true };
    case REACTIVATE_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REACTIVATE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_FREE_AD_REQUEST:
      return { loading: true };
    case EDIT_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deactivatePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEACTIVATE_PAID_AD_REQUEST:
      return { loading: true };
    case DEACTIVATE_PAID_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DEACTIVATE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reactivatePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case REACTIVATE_PAID_AD_REQUEST:
      return { loading: true };
    case REACTIVATE_PAID_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case REACTIVATE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const editPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PAID_AD_REQUEST:
      return { loading: true };
    case EDIT_PAID_AD_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case EDIT_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPaidAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAID_AD_MESSAGE_REQUEST:
      return { loading: true };
    case CREATE_PAID_AD_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_PAID_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listPaidAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_PAID_AD_MESSAGE_REQUEST:
      return { loading: true };
    case LIST_PAID_AD_MESSAGE_SUCCESS:
      return { loading: false, success: true, adMessages: action.payload };
    case LIST_PAID_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createFreeAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FREE_AD_MESSAGE_REQUEST:
      return { loading: true };
    case CREATE_FREE_AD_MESSAGE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_FREE_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listFreeAdMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_FREE_AD_MESSAGE_REQUEST:
      return { loading: true };
    case LIST_FREE_AD_MESSAGE_SUCCESS:
      return { loading: false, success: true, adMessages: action.payload };
    case LIST_FREE_AD_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_API_KEY_REQUEST:
      return { loading: true };
    case GET_SELLER_API_KEY_SUCCESS:
      return { loading: false, success: true, sellerApiKey: action.payload };
    case GET_SELLER_API_KEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerApiKeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_API_KEY_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_API_KEY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case UPDATE_SELLER_API_KEY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFreeAdDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FREE_AD_DETAIL_REQUEST:
      return { loading: true };
    case GET_FREE_AD_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload.data,
        sellerApiKey: action.payload.sellerApiKey,
        sellerAvatarUrl: action.payload.seller_avatar_url,
      };
    case GET_FREE_AD_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaidAdDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAID_AD_DETAIL_REQUEST:
      return { loading: true };
    case GET_PAID_AD_DETAIL_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload.data,
        sellerApiKey: action.payload.sellerApiKey,
        sellerAvatarUrl: action.payload.seller_avatar_url,
      };
    case GET_PAID_AD_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FREE_AD_REQUEST:
      return { loading: true };
    case GET_FREE_AD_SUCCESS:
      return {
        loading: false,
        success: true,
        ads: action.payload,
      };

    case GET_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FREE_AD_REQUEST:
      return { loading: true };
    case UPDATE_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_FREE_AD_REQUEST:
      return { loading: true };
    case DELETE_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FREE_AD_REQUEST:
      return { loading: true };
    case GET_ALL_FREE_AD_SUCCESS:
      return { loading: false, success: true, freeAds: action.payload };
    case GET_ALL_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAID_AD_REQUEST:
      return { loading: true };
    case GET_PAID_AD_SUCCESS:
      return { loading: false, success: true, ads: action.payload };
    case GET_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAID_AD_REQUEST:
      return { loading: true };
    case UPDATE_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deletePaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PAID_AD_REQUEST:
      return { loading: true };
    case DELETE_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PAID_AD_REQUEST:
      return { loading: true };
    case GET_ALL_PAID_AD_SUCCESS:
      return { loading: false, success: true, paidAds: action.payload };
    case GET_ALL_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postPaidAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PAID_AD_REQUEST:
      return { loading: true };
    case POST_PAID_AD_SUCCESS:
      return { loading: false, success: true };
    case POST_PAID_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postFreeAdReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_FREE_AD_REQUEST:
      return { loading: true };
    case POST_FREE_AD_SUCCESS:
      return { loading: false, success: true };
    case POST_FREE_AD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case GET_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true, sellerAccount: action.payload };
    case GET_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerAccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_ACCOUNT_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_ACCOUNT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_ACCOUNT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const marketplaceSellerAccountReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CREATE_MARKETPLACE_SELLER_REQUEST:
      return { loading: true };
    case CREATE_MARKETPLACE_SELLER_SUCCESS:
      return { loading: false, success: true };
    case CREATE_MARKETPLACE_SELLER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const marketplaceSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case MARKETPLACE_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case MARKETPLACE_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case MARKETPLACE_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case GET_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true, sellerPhoto: action.payload };
    case GET_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateSellerPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELLER_PHOTO_REQUEST:
      return { loading: true };
    case UPDATE_SELLER_PHOTO_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_SELLER_PHOTO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
