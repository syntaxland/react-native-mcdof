// PaymentScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  // Button ,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import PaystackPayment from "../payment/PaystackPayment";
// import Paysofter from "../payment/Paysofter";
import { styles } from "../screenStyles";

import axios from 'axios';
import { API_URL } from "../../config/apiConfig"; 

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const order_id = route.params.id;

  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);

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

  const shippingPrice = cartItems.length > 0 ? 1000 : 0;
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
  console.log("finalItemsPrice:", finalItemsPrice);

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
    // publicKey,
    paystackPublicKey,
    paysofterPublicKey,
    // shipmentSave,
  };
  console.log("paymentData:", paymentData);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackIcon}>
          <FontAwesomeIcon color="blue" icon={faArrowLeft} /> Previous
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Payment Page</Text>
          {/* Render payment gateway buttons */}
          <TouchableOpacity
            style={styles.button}
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
          {/* Render other payment gateway buttons */}
          {/* Add modals or additional components here */}
          {selectedPaymentGateway === "paystack" && (
            <PaystackPayment paymentData={paymentData} />
          )}

          {/* {selectedPaymentGateway === "paysofter" && (
            <Paysofter
              // paymentData={paymentData}
              reference={reference}
              order_id={order_id}
              userEmail={userEmail}
              paysofterPublicKey={paysofterPublicKey}
            />
          )} */}

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

