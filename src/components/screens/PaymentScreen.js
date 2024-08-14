// PaymentScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Button ,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions/cartActions";
import {
  createPayment,
  resetPaymentState,
} from "../../redux/actions/paymentActions";
import ApplyPromoCode from "../../ApplyPromoCode";
import Message from "../../Message";
import Loader from "../../Loader";
import { styles } from "../screenStyles";
import { formatAmount } from "../../FormatAmount";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import PaystackPayment from "../payment/PaystackPayment";
import { Paysofter } from "react-native-paysofter";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const order_id = route.params.order_id;
  console.log("order_id Payment:", order_id);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const createdAt = new Date().toISOString();

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { loading, success, error } = paymentCreate;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const applyPomoCodeState = useSelector((state) => state.applyPomoCodeState);
  const { promoDiscount, discountPercentage } = applyPomoCodeState;
  // console.log(
  //   "Paystack promoDiscount:",
  //   promoDiscount,
  //   "discountPercentage:",
  //   discountPercentage
  // );

  // const shipmentSave = JSON.parse(localStorage.getItem("shipmentData")) || [];
  // console.log("shipmentSave:", shipmentSave);

  const [paysofterPublicKey, setPaysofterPublicKey] = useState("");
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [reference, setReference] = useState("");
  const userEmail = userInfo.email;
  // const createdAt = new Date().toISOString();
  const currency = "NGN";

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = cartItems?.length > 0 ? 1000 : 0;
  const taxPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price * 0.1,
    0
  );

  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const promoTotalPrice = totalPrice - promoDiscount;
  // console.log(
  //   "totalPrice:",
  //   totalPrice,
  //   "promoDiscount:",
  //   promoDiscount,
  //   "promoTotalPrice:",
  //   promoTotalPrice
  // );

  const finalItemsPrice = itemsPrice - promoDiscount;
  // console.log("finalItemsPrice:", finalItemsPrice);

  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/get-payment-details/`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        );
        setPaysofterPublicKey(response.data.paysofterPublicKey);
        setPaystackPublicKey(response.data.paystackPublicKey);
        setReference(response.data.reference);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchData = async () => {
      await getPaymentDetails();
    };
    fetchData();
  }, [userInfo.access]);

  const handlePaymentGatewaySelection = (paymentGateway) => {
    setSelectedPaymentGateway(paymentGateway);
  };

  const paymentData = {
    reference,
    order_id,
    totalPrice,
    taxPrice,
    userEmail,
    shippingPrice,
    itemsPrice,
    finalItemsPrice,
    promoDiscount,
    discountPercentage,
    promoTotalPrice,
    paystackPublicKey,
    paysofterPublicKey,
    currency,
  };
  console.log("paymentData:", paymentData);

  const handleOnSuccess = () => {
    console.log("handling onSuccess...");
    const paymentDetails = {
      reference: reference,
      order_id: order_id,
      amount: totalPrice,
      email: userEmail,

      items_amount: itemsPrice,
      final_items_amount: finalItemsPrice,
      promo_code_discount_amount: promoDiscount,
      promo_code_discount_percentage: discountPercentage,
      final_total_amount: promoTotalPrice,
    };
    dispatch(createPayment(paymentDetails));
  };

  const onSuccess = () => {
    handleOnSuccess();
  };

  const handleOnClose = () => {
    console.log("handling onClose...");
    // window.location.reload();
    // window.location.href = "/";
  };

  const onClose = () => {
    handleOnClose();
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearCart());
        dispatch(resetPaymentState());
        navigation.navigate("Home");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  const initiatePayment = () => {
    setPaymentInitiated(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackIcon}>
          <FontAwesomeIcon color="blue" icon={faArrowLeft} /> Previous
        </Text>
      </TouchableOpacity>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <Message variant="success">Order successfully created!</Message>
      )}

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Payment Page</Text>
          <TouchableOpacity
            style={styles.buttonDark}
            onPress={() => handlePaymentGatewaySelection("paystack")}
          >
            <Text style={styles.buttonText}>Pay with Paystack</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePaymentGatewaySelection("paysofter")}
          >
            <Text style={styles.buttonText}>Pay with Paysofter</Text>
          </TouchableOpacity>

          {selectedPaymentGateway === "paystack" && (
            <PaystackPayment paymentData={paymentData} />
          )}

          {selectedPaymentGateway === "paysofter" && (
            <>
              <Text style={styles.title}>Paysofter</Text>

              <View style={styles.viewContainer}>
                <Text>Order ID: {paymentData.order_id}</Text>
                <Text>
                  Shipping Cost: {formatAmount(paymentData.shippingPrice)}{" "}
                  {paymentData?.currency}{" "}
                </Text>
                <Text>
                  Tax: {formatAmount(paymentData.taxPrice)}{" "}
                  {paymentData?.currency}{" "}
                </Text>
                <Text>
                  Total Amount: {formatAmount(paymentData.totalPrice)}{" "}
                  {paymentData?.currency}{" "}
                </Text>
                <Text>
                  Promo Discount: {formatAmount(paymentData?.promoDiscount)}{" "}
                  {paymentData?.currency}{" "}
                </Text>
                <Text>
                  Final Total Amount:{" "}
                  {formatAmount(paymentData?.finalTotalPrice)}{" "}
                  {paymentData?.currency}{" "}
                </Text>
                <Text>Timestamp: {createdAt}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <ApplyPromoCode order_id={paymentData.order_id} />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  // style={styles.buttonDark}
                  title="Pay Now"
                  onPress={initiatePayment}
                  // color="#343a40"
                />

                {paymentInitiated && (
                  <>
                    <Paysofter
                      email={userEmail}
                      currency={currency}
                      amount={finalItemsPrice}
                      paysofterPublicKey={paysofterPublicKey}
                      onSuccess={onSuccess}
                      onClose={onClose}
                      paymentRef={reference}
                      showPromiseOption={true}
                      showFundOption={true}
                      showCardOption={true}
                    />
                  </>
                )}
              </View>
            </>
          )}

          {/* Modal for Paysofter Account Info */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showInfoModal}
            onRequestClose={handleInfoModalClose}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Paysofter Account</Text>
                <Text style={styles.modalText}>
                  Don't have a Paysofter account? You're just about 3 minutes
                  away! Sign up for a much softer payment experience.
                </Text>
                <TouchableOpacity
                  onPress={() => handleInfoModalShow()}
                  style={styles.modalButton}
                >
                  {/* <Text style={styles.modalButtonText}>Close</Text> */}
                  <Text>Show Info Modal</Text>

                  <FontAwesomeIcon color="white" icon={faInfoCircle} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;
