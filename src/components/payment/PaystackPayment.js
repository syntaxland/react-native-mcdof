// PaystackPayment.js
import React, { useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { clearCart } from "../../redux/actions/cartActions";
import { createPayment } from "../../redux/actions/paymentActions";
// import ApplyPromoCode from "../../ApplyPromoCode";
import Loader from "../../Loader";
import Message from "../../Message";
import { Paystack } from "react-native-paystack-webview";
import axios from "axios";
import { API_URL } from "../../config/apiConfig";
import { styles } from "../screenStyles";

const PaystackPayment = ({ paymentData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [reference, setReference] = useState("");
  const userEmail = userInfo.email;

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
        setPaystackPublicKey(response.data.paystackPublicKey);
        setReference(response.data.reference);
      } catch (error) {
        console.log(error);
      }
    };

    getPaymentDetails();
  }, [userInfo.access]);

  const handlePaymentSuccess = async (response) => {
    setLoading(true);
    try {
      // const { data } = await axios.post(
      //   `${API_URL}/api/payments/`,
      //   {
      //     ...paymentData,
      //     transactionRef: response.transactionRef,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${userInfo.access}`,
      //     },
      //   }
      // );
      dispatch(createPayment(paymentData));
      dispatch(clearCart());
      setSuccess(true);
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setError(error.response ? error.response.data.detail : error.message);
      setLoading(false);
    }
  };

  const handlePaymentError = (error) => {
    setError(error.message);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Payment successful!</Message>}
          <Paystack
            paystackKey={paystackPublicKey}
            amount={paymentData.totalPrice}
            billingEmail={userEmail}
            billingMobile={paymentData.billingMobile}
            reference={reference}
            activityIndicatorColor="green"
            onCancel={() => setLoading(false)}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            autoStart={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaystackPayment;
