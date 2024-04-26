// VerifyEmailOtp.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  verifyEmailOtp,
  sendEmailOtp,
} from "../../redux/actions/emailOtpActions";
import { styles } from "../screenStyles";
import Message from "../../Message";
import Loader from "../../Loader";

const VerifyEmailOtp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userRegisterData, setUserRegisterData] = useState(null);

  const emailOtpVerify = useSelector((state) => state.emailOtpVerify);
  const { loading, success, error } = emailOtpVerify;

  useEffect(() => {
    const fetchRegistrationData = async () => {
      const registrationData = await AsyncStorage.getItem("registrationData");
      if (registrationData) {
        const parsedData = JSON.parse(registrationData);
        setUserRegisterData(parsedData);
      }
    };

    fetchRegistrationData();
  }, []);

  useEffect(() => {
    if (success) {
      AsyncStorage.removeItem("registrationData");
      setOtp("");
      setResendDisabled(false);
      setResendLoading(false);
      setResendMessage("");
      setCountdown(60);
      setShowSuccessMessage(true);
      setTimeout(() => {
        navigation.navigate("Login");
      }, 5000);
    }
  }, [success]);

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

  const handleResendEmailOtp = async () => {
    setResendLoading(true);
    setResendMessage("");

    try {
      const registrationData = await AsyncStorage.getItem("registrationData");
      if (registrationData) {
        const parsedData = JSON.parse(registrationData);
        await dispatch(sendEmailOtp(parsedData.email, parsedData.first_name));
        setResendMessage(`OTP resent to ${parsedData.email} successfully.`);
        setResendDisabled(true);
      }
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }

    setResendLoading(false);
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyEmailOtp(otp));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      {showSuccessMessage && (
        <Message variant="success">
          Email verified successfully! You can now log in.
        </Message>
      )}
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {resendMessage && (
        <Message variant={resendLoading ? "info" : "success"}>
          {resendMessage}
        </Message>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
          placeholder="Enter OTP"
        />
      </View>
      <Button
        title="Verify OTP"
        onPress={handleVerifyEmailOtp}
        disabled={loading || success}
      />
      <Text style={{ textAlign: "center" }}>
        OTP has been sent to your email{" "}
        <Text style={{ fontWeight: "bold" }}>
          {userRegisterData && userRegisterData.email}
        </Text>{" "}
        and expires in 30 minutes. It might take a few seconds to deliver.
      </Text>
      <TouchableOpacity
        onPress={handleResendEmailOtp}
        disabled={resendDisabled || resendLoading}
      >
        <Text>
          {resendLoading
            ? "Resending OTP..."
            : resendDisabled
            ? `Resend OTP (${countdown}sec)`
            : "Resend OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyEmailOtp;
