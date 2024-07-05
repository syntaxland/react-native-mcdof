// VerifyAccountFundPromiseOtp.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-native-paper";
import {
  createPayment,
  resetPaymentState,
  debitPaysofterAccountFund,
  resetDebitPaysofterState,
  verifyOtp,
  resetVerifyOtpState,
  createPaysofterPromise,
  resetCreatePaysofterPromiseState,
} from "../../redux/actions/paymentActions";
import { clearCart } from "../../redux/actions/cartActions";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../Loader";
import Message from "../../Message";
import ConfirmPaysofterPromise from "./ConfirmPaysofterPromise";

const VerifyAccountFundPromiseOtp = ({
  buyerEmail,
  amount,
  sellerApiKey,
  paymentData,
  reference,
  formattedPayerEmail,
  currency,
  duration,
}) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const createdAt = new Date().toISOString();
  const [showConfirmPaysofterPromise, setShowConfirmPaysofterPromise] =
    useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const otpVerifyState = useSelector((state) => state.otpVerifyState);
  const { loading, success, error } = otpVerifyState;

  const createPaysofterPromiseState = useSelector(
    (state) => state.createPaysofterPromiseState
  );
  const { loading: promiseLoading, error: promiseError } =
    createPaysofterPromiseState;

  const [sendOtpData, setSendOtpData] = useState(null);

  useEffect(() => {
    const fetchSendOtpData = async () => {
      const data = await AsyncStorage.getItem("debitAccountData");
      setSendOtpData(JSON.parse(data));
    };
    fetchSendOtpData();
  }, []);

  const otpData = {
    otp: otp,
    account_id: sendOtpData?.account_id,
    amount: amount,
    currency: currency,
    public_api_key: sellerApiKey,
  };

  const debitAccountData = {
    account_id: sendOtpData?.account_id,
    security_code: sendOtpData?.security_code,
    amount: amount,
  };

  const paysofterPromiseData = {
    payment_id: reference,
    email: buyerEmail,
    amount: amount,
    public_api_key: sellerApiKey,
    account_id: sendOtpData?.account_id,
    currency: currency,
    duration: duration,
    created_at: createdAt,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyOtp(otpData));
  };

  const handleResendEmailOtp = async () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      await dispatch(
        debitPaysofterAccountFund(JSON.stringify(debitAccountData))
      );
      setResendMessage(`OTP resent to ${formattedPayerEmail} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  useEffect(() => {
    if (success) {
      dispatch(createPaysofterPromise(paysofterPromiseData));
      setShowSuccessMessage(true);
      dispatch(createPayment(paymentData));
      setTimeout(() => {
        AsyncStorage.removeItem("debitAccountData");
        dispatch(resetPaymentState());
        dispatch(resetCreatePaysofterPromiseState());
        dispatch(resetDebitPaysofterState());
        dispatch(resetVerifyOtpState());
        dispatch(clearCart());
        setShowConfirmPaysofterPromise(true);
      }, 3000);
    }
  }, [dispatch, success, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {showConfirmPaysofterPromise ? (
            <ConfirmPaysofterPromise
              amount={amount}
              paymentData={paymentData}
              reference={reference}
              buyerEmail={buyerEmail}
              sellerApiKey={sellerApiKey}
              currency={currency}
              duration={duration}
            />
          ) : (
            <View style={styles.content}>
              <Text style={styles.title}>Verify OTP ({currency})</Text>
              {showSuccessMessage && (
                <Message variant="success">Promise sent successfully!</Message>
              )}
              {loading && <Loader />}
              {error && <Message variant="danger">{error}</Message>}
              {promiseLoading && <Loader />}
              {promiseError && (
                <Message variant="danger">{promiseError}</Message>
              )}
              {resendMessage && (
                <Message variant={resendLoading ? "info" : "success"}>
                  {resendMessage}
                </Message>
              )}
              <TextInput
                style={styles.input}
                value={otp}
                onChangeText={(text) => setOtp(text)}
                placeholder="Enter OTP"
                required
              />
              <Button
                title="Verify OTP"
                onPress={handleVerifyEmailOtp}
                disabled={loading || success}
              />
              <Text style={styles.infoText}>
                OTP has been sent to your email {formattedPayerEmail} for
                Paysofter Account ID: {sendOtpData?.account_id} and expires in
                10 minutes. It might take a few seconds to deliver.
              </Text>
              <TouchableOpacity
                onPress={handleResendEmailOtp}
                disabled={resendDisabled || resendLoading}
              >
                <Text style={styles.resendText}>
                  {resendLoading
                    ? "Resending OTP..."
                    : resendDisabled
                    ? `Resend OTP (${countdown}sec)`
                    : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  content: {
    marginVertical: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
  infoText: {
    textAlign: "center",
    marginVertical: 20,
  },
  resendText: {
    color: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default VerifyAccountFundPromiseOtp;
