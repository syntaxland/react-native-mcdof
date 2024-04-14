// VerifyAccountFundPromiseOtp.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartActions";
import {
  createPayment,
  debitPaysofterAccountFund,
  verifyOtp,
  createPaysofterPromise,
} from "../../actions/paymentActions";
import Loader from "../Loader";
import Message from "../Message";
import ConfirmPaysofterPromise from "./ConfirmPaysofterPromise";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const VerifyAccountFundPromiseOtp = ({
  promoTotalPrice,
  paymentData,
  reference,
  buyerEmail,
  publicApiKey,
  formattedPayerEmail,
  currency,
  duration,
  paymenthMethod,
  paymentProvider,
}) => {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const createdAt = new Date().toISOString();
  const [showConfirmPaysofterPromise, setShowConfirmPaysofterPromise] =
    useState(false);

  const otpVerifyState = useSelector((state) => state.otpVerifyState);
  const { loading, success, error } = otpVerifyState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);

  useEffect(() => {
    if (success) {
      dispatch(createPaysofterPromise(paysofterPromiseData));
      setShowConfirmPaysofterPromise(true);
      dispatch(createPayment(paymentData));
      dispatch(clearCart());
      setShowSuccessMessage(true);
      setTimeout(() => {
        // Navigate to the login screen or any other desired screen
      }, 5000);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  const sendOtpData =
    JSON.parse(localStorage.getItem("debitAccountData")) || [];

  const otpData = {
    otp: otp,
    account_id: sendOtpData.account_id,
    amount: promoTotalPrice,
    currency: currency,
  };

  const debitAccountData = {
    account_id: sendOtpData.account_id,
    security_code: sendOtpData.security_code,
    amount: promoTotalPrice,
  };

  const paysofterPromiseData = {
    payment_id: reference,
    email: buyerEmail,
    amount: promoTotalPrice,
    public_api_key: publicApiKey,
    account_id: sendOtpData.account_id,
    currency: currency,
    duration: duration,
    payment_method: paymenthMethod,
    payment_provider: paymentProvider,
    created_at: createdAt,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyOtp(otpData));
  };

  const handleResendEmailOtp = () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      dispatch(debitPaysofterAccountFund(JSON.stringify(debitAccountData)));
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

  return (
    <>
      {showConfirmPaysofterPromise ? (
        <ConfirmPaysofterPromise
          promoTotalPrice={promoTotalPrice}
          paymentData={paymentData}
          reference={reference}
          buyerEmail={buyerEmail}
          publicApiKey={publicApiKey}
          currency={currency}
          duration={duration}
          paymenthMethod={paymenthMethod}
        />
      ) : (
        <View style={{ padding: 16 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Verify OTP
          </Text>
          {showSuccessMessage && (
            <Message variant="success">Promise sent successfully!</Message>
          )}
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {resendMessage && (
            <Message variant={resendLoading ? "info" : "success"}>
              {resendMessage}
            </Message>
          )}
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              marginBottom: 16,
              padding: 8,
            }}
          />
          <Button
            title="Verify OTP"
            onPress={handleVerifyEmailOtp}
            disabled={loading || success}
          />
          <Text style={{ marginTop: 16 }}>
            OTP has been sent to your email {formattedPayerEmail} for Paysofter
            Account ID: {sendOtpData.account_id} and expires in 10 minutes. It
            might take a few seconds to deliver.
          </Text>
          <Button
            title={
              resendLoading
                ? "Resending OTP..."
                : resendDisabled
                ? `Resend OTP (${countdown}sec)`
                : "Resend OTP"
            }
            onPress={handleResendEmailOtp}
            disabled={resendDisabled || resendLoading}
          />
        </View>
      )}
    </>
  );
};

export default VerifyAccountFundPromiseOtp;
