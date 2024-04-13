// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  productListReducers,
  productDetailsReducers,
  saveProductReducer,
  userFavoriteProductsReducer,
  userViewedProductsReducer,
  removeProductReducer,
  updateProductSaveCountReducer,
  viewedProductReducer,
  recommendedProductsReducer,
  productSearchReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducers } from "./reducers/userReducers";
import { userRegisterReducers } from "./reducers/userReducers";
import {
  marketplaceSellerAccountReducer,
  marketplaceSellerPhotoReducer,
  getSellerAccountReducer,
  updateSellerAccountReducer,
  getSellerPhotoReducer,
  updateSellerPhotoReducer,
  postFreeAdReducer,
  postPaidAdReducer,
  getFreeAdReducer,
  updateFreeAdReducer,
  getAllFreeAdReducer,
  getPaidAdReducer,
  updatePaidAdReducer,
  getAllPaidAdReducer,
  deleteFreeAdReducer,
  deletePaidAdReducer,
  getFreeAdDetailReducer,
  getSellerApiKeyReducer,
  updateSellerApiKeyReducer,
  getPaidAdDetailReducer,
  createPaidAdMessageReducer,
  editPaidAdReducer,
  deactivatePaidAdReducer,
  reactivatePaidAdReducer,
  deactivateFreeAdReducer,
  getSellerActivePaidAdsReducer,
  getSellerActiveFreeAdsReducer,
  reactivateFreeAdReducer,
  editFreeAdReducer,
  getSellerUsernameSearchReducer,
  searchAdsReducer,
  getSellerShopfrontLinkReducer,
  getSellerDetailReducer,
  listPaidAdMessageReducer,
  createFreeAdMessageReducer,
  listFreeAdMessageReducer,
} from "./reducers/marketplaceSellerReducers";

import {
  orderCreateReducer,
  shipmentSaveReducer,
  userShipmentsReducer,
  allUserShipmentsReducer,
  orderListReducer,
  allOrderListReducer,
  orderDeleteReducer,
  orderItemsListReducer,
  confirmDeliveryReducer,
  // shippingAddressReducer,
  reviewListReducer,
  orderAddReviewReducer,
  orderEditReviewReducer,
} from "./reducers/orderReducers";

import {
  getPaymentApiKeysReducer,
  paymentCreateReducer,
  paysofterPaymentCreateReducer,
  debitPaysofterAccountReducer,
  debitPaysofterUsdAccountReducer,
  createPaysofterPromiseReducer,
  paymentListReducer,
  listAllPaymentsReducer,
} from "./reducers/paymentReducers";

import { favoriteReducer } from "./reducers/favoriteReducers";
import {
  createSupportTicketReducer,
  createSupportMessageReducer,
  listSupportTicketReducer,
  listSupportMessageReducer,
  replySupportTicketReducer,
  listSupportTicketReplyReducer,
  ticketDetailListReducer,
  allTicketListReducer,
  allTicketResponseReducer,
} from "./reducers/supportReducers";
import {
  getUserProfileReducer,
  changePasswordReducer,
  updateUserProfileReducer,
  deleteUserProfileReducer,
  updateUserAvatarReducer,
  sendPasswordResetLinkReducer,
  resetPasswordReducer,
} from "./reducers/userProfileReducers";

import {
  emailOtpSendReducer,
  emailOtpVerifyReducer,
  emailOtpResendReducer,
} from "./reducers/emailOtpReducers";

import {
  otpSendReducer,
  otpVerifyReducer,
  otpVerifyUsdPromiseReducer,
} from "./reducers/accountFundOtpReducers";

import {
  buyCreditPointReducer,
  sellCreditPointReducer,
  getBuyCreditPointReducer,
  getBuyerCreditPointReducer,
  getSellCreditPointReducer,
  creditPointRequestCreateReducer,
  creditPointListReducer,
  creditPointAllListReducer,
  creditPointBalanceReducer,
  creditPointEarningsReducer,
  userCreditPointPaymentsReducer,
  allCreditPointPaymentsReducer,
} from "./reducers/creditPointReducers";

import { messagingReducer, emailReducer } from "./reducers/messagingReducers";
import {
  // chatReducer,
  chatRoomsReducer,
  chatMessagesReducer,
} from "./reducers/chatReducers";
import {
  referralReducer,
  referralButtonReducer,
  getUserReferralsReducer,
  applyPomoCodeReducer,
  createPromoCodeReducer,
  promoProductListReducer,
} from "./reducers/promoReducer";

import {
  feedbackCreateReducer,
  feedbackListReducer,
} from "./reducers/feedbackReducers";

const rootReducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productSave: saveProductReducer,
  userFavoriteProducts: userFavoriteProductsReducer,
  userViewedProducts: userViewedProductsReducer,
  viewedProduct: viewedProductReducer,
  productRemove: removeProductReducer,
  updateProductSaveCount: updateProductSaveCountReducer,
  recommendedProducts: recommendedProductsReducer,
  productSearch: productSearchReducer,

  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,

  orderCreate: orderCreateReducer,
  shipmentSave: shipmentSaveReducer,
  userShipments: userShipmentsReducer,
  allUserShipments: allUserShipmentsReducer,
  orderItemsList: orderItemsListReducer,
  confirmDelivery: confirmDeliveryReducer,
  // shippingAddress: shippingAddressReducer,

  reviewList: reviewListReducer,
  orderAddReview: orderAddReviewReducer,
  orderEditReview: orderEditReviewReducer,

  buyCreditPointState: buyCreditPointReducer,
  sellCreditPointState: sellCreditPointReducer,
  getBuyCreditPointState: getBuyCreditPointReducer,
  getBuyerCreditPointState: getBuyerCreditPointReducer,
  getSellCreditPointState: getSellCreditPointReducer,
  creditPointRequestCreate: creditPointRequestCreateReducer,
  creditPointList: creditPointListReducer,
  creditPointAllList: creditPointAllListReducer,
  creditPointBal: creditPointBalanceReducer,
  userCreditPointPayments: userCreditPointPaymentsReducer,
  allCreditPointPayments: allCreditPointPaymentsReducer,
  creditPointEarningState: creditPointEarningsReducer,

  orderList: orderListReducer,
  allOrderList: allOrderListReducer,
  orderDelete: orderDeleteReducer,

  getPaymentApiKeysState: getPaymentApiKeysReducer,
  paymentCreate: paymentCreateReducer,
  paysofterPayment: paysofterPaymentCreateReducer,
  debitPaysofterAccountState: debitPaysofterAccountReducer,
  debitPaysofterUsdAccountState: debitPaysofterUsdAccountReducer,
  createPaysofterPromiseState: createPaysofterPromiseReducer,
  paymentList: paymentListReducer,
  listAllPayments: listAllPaymentsReducer,

  favorites: favoriteReducer,

  emailOtpSend: emailOtpSendReducer,
  emailOtpVerify: emailOtpVerifyReducer,
  emailOtpResend: emailOtpResendReducer,

  otpSendState: otpSendReducer,
  otpVerifyState: otpVerifyReducer,
  otpVerifyUsdPromiseState: otpVerifyUsdPromiseReducer,
  userProfile: getUserProfileReducer,
  updateProfile: updateUserProfileReducer,
  userChangePassword: changePasswordReducer,
  deleteProfile: deleteUserProfileReducer,
  updateUserAvatar: updateUserAvatarReducer,

  sendPasswordResetLink: sendPasswordResetLinkReducer,
  resetPassword: resetPasswordReducer,

  messaging: messagingReducer,
  emailMessaging: emailReducer,
  // chat: chatReducer,
  chatRooms: chatRoomsReducer,
  chatMessages: chatMessagesReducer,

  createSupportTicketState: createSupportTicketReducer,
  createSupportMessageState: createSupportMessageReducer,
  listSupportTicketState: listSupportTicketReducer,
  listSupportMessageState: listSupportMessageReducer,
  replySupportTicketState: replySupportTicketReducer,
  listSupportTicketReplyState: listSupportTicketReplyReducer,
  ticketDetailList: ticketDetailListReducer,
  allTicketList: allTicketListReducer,
  allTicketResponse: allTicketResponseReducer,
  feedbackCreate: feedbackCreateReducer,
  feedbackList: feedbackListReducer,

  referral: referralReducer,
  referralButton: referralButtonReducer,
  userReferralState: getUserReferralsReducer,
  applyPomoCodeState: applyPomoCodeReducer,
  createPromoCodeState: createPromoCodeReducer,
  promoProductList: promoProductListReducer,

  marketplaceSellerState: marketplaceSellerAccountReducer,
  marketplaceSellerPhotoState: marketplaceSellerPhotoReducer,
  getSellerAccountState: getSellerAccountReducer,
  updateSellerAccountState: updateSellerAccountReducer,
  getSellerPhotoState: getSellerPhotoReducer,
  updateSellerPhotoState: updateSellerPhotoReducer,
  postFreeAdState: postFreeAdReducer,
  postPaidAdState: postPaidAdReducer,

  getFreeAdState: getFreeAdReducer,
  updateFreeAdState: updateFreeAdReducer,
  getAllFreeAdState: getAllFreeAdReducer,
  getPaidAdState: getPaidAdReducer,
  updatePaidAdState: updatePaidAdReducer,
  getAllPaidAdState: getAllPaidAdReducer,
  deleteFreeAdState: deleteFreeAdReducer,
  deletePaidAdState: deletePaidAdReducer,

  getFreeAdDetailState: getFreeAdDetailReducer,
  getSellerApiKeyState: getSellerApiKeyReducer,
  updateSellerApiKeyState: updateSellerApiKeyReducer,
  getPaidAdDetailState: getPaidAdDetailReducer,

  editPaidAdState: editPaidAdReducer,
  deactivatePaidAdState: deactivatePaidAdReducer,
  reactivatePaidAdState: reactivatePaidAdReducer,

  deactivateFreeAdState: deactivateFreeAdReducer,
  getSellerActivePaidAdsState: getSellerActivePaidAdsReducer,
  getSellerActiveFreeAdsState: getSellerActiveFreeAdsReducer,
  reactivateFreeAdState: reactivateFreeAdReducer,
  editFreeAdState: editFreeAdReducer,

  getSellerUsernameSearchState: getSellerUsernameSearchReducer,
  searchAdsState: searchAdsReducer,
  getSellerShopfrontLinkState: getSellerShopfrontLinkReducer,
  getSellerDetailState: getSellerDetailReducer,

  createPaidAdMessageState: createPaidAdMessageReducer,
  listPaidAdMessageState: listPaidAdMessageReducer,
  createFreeAdMessageState: createFreeAdMessageReducer,
  listFreeAdMessageState: listFreeAdMessageReducer,
});

// Function to initialize the store asynchronously
export const initializeStore = async () => {
  // Get cartItems from AsyncStorage
  const getCartItems = async () => {
    try {
      const cartItems = await AsyncStorage.getItem("cartItems");
      return cartItems ? JSON.parse(cartItems) : [];
    } catch (error) {
      console.error("Error getting cart items from AsyncStorage:", error);
      return [];
    }
  };

  // Get userInfo from AsyncStorage
  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error("Error getting user info from AsyncStorage:", error);
      return null;
    }
  };

  // Get userRegister data from AsyncStorage
  const getUserRegisterData = async () => {
    try {
      const registerData = await AsyncStorage.getItem("registerData");
      return registerData ? JSON.parse(registerData) : null;
    } catch (error) {
      console.error("Error getting register data from AsyncStorage:", error);
      return null;
    }
  };

  // Initial state with data from AsyncStorage
  const initialState = {
    cart: { cartItems: await getCartItems() },
    userLogin: { userInfo: await getUserInfo() },
    userRegister: { registerData: await getUserRegisterData() },
  };

  // Create and return the Redux store 
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
};
