// PaysofterAccountFundPromise.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Modal, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { debitPaysofterAccountFund } from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import VerifyAccountFundPromiseOtp from "./VerifyAccountFundPromiseOtp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const PaysofterAccountFundPromise = ({
  promoTotalPrice,
  paymentData,
  reference,
  userEmail,
  publicApiKey,
  duration,
  paymenthMethod,
  paymentProvider,
  currency,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);

  const debitPaysofterAccountState = useSelector(
    (state) => state.debitPaysofterAccountState
  );
  const {
    loading,
    success,
    formattedPayerEmail,
    error,
  } = debitPaysofterAccountState;
  console.log(
    "formattedPayerEmail:",
    formattedPayerEmail,
    "paymenthMethod:",
    paymenthMethod
  );

  const [accountId, setAccountId] = useState("");
  const [accountIdError, setAccountIdError] = useState("");

  const [securityCode, setSecurityCode] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");

  const [formError, setFormError] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSecurityCodeModal, setShowSecurityCodeModal] = useState(false);
  const [showVerifyAccountFundPromiseOtp, setShowVerifyAccountFundPromiseOtp] = useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);

  const toggleSecurityCodeVisibility = () => {
    setSecurityCodeVisible(!securityCodeVisible);
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const handleSecurityCodeModalShow = () => {
    setShowSecurityCodeModal(true);
  };

  const handleSecurityCodeModalClose = () => {
    setShowSecurityCodeModal(false);
  };

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "accountId":
        setAccountId(value);
        setAccountIdError("");
        break;

      case "securityCode":
        setSecurityCode(value);
        setSecurityCodeError("");
        break;

      default:
        break;
    }
  };

  const submitHandler = () => {
    if (!accountId) {
      setAccountIdError("Please enter Account ID.");
    } else {
      setAccountIdError("");
    }

    if (!securityCode) {
      setSecurityCodeError("Please enter Security Code.");
    } else {
      setSecurityCodeError("");
    }

    if (!accountId || !securityCode) {
      setFormError("Please attend to the errors within the form.");
      return;
    }

    dispatch(debitPaysofterAccountFund({
      account_id: accountId,
      security_code: securityCode,
      amount: promoTotalPrice,
      public_api_key: publicApiKey,
    }));

    // Save data to local storage if needed
    // localStorage.setItem("debitAccountData", JSON.stringify(debitAccountData));
  };

  useEffect(() => {
    if (success) {
      setShowVerifyAccountFundPromiseOtp(true);
    }
  }, [success]);

  return (
    <>
      {showVerifyAccountFundPromiseOtp ? (
        <VerifyAccountFundPromiseOtp
          promoTotalPrice={promoTotalPrice}
          paymentData={paymentData}
          reference={reference}
          buyerEmail={userEmail}
          publicApiKey={publicApiKey}
          securityCode={securityCode}
          accountId={accountId}
          formattedPayerEmail={formattedPayerEmail}
          currency={currency}
          duration={duration}
          paymenthMethod={paymenthMethod}
          paymentProvider={paymentProvider}
        />
      ) : (
        <View style={{ padding: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
              Paysofter Account Fund
            </Text>
            <TouchableOpacity onPress={handleInfoModalShow}>
              <FontAwesomeIcon icon={faInfoCircle} size={20} />
            </TouchableOpacity>
            <Modal visible={showInfoModal} animationType="slide" transparent>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "white", padding: 20 }}>
                  <Text>Paysofter Account Fund option settles payments using the payer's funded Paysofter Account Fund.</Text>
                  {/* Implement your navigation for Learn More */}
                  <Button title="Close" onPress={handleInfoModalClose} />
                </View>
              </View>
            </Modal>
          </View>

          {success && <Message variant="success">OTP sent to your email {formattedPayerEmail} successfully.</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          {formError && <Message variant="danger">{formError}</Message>}

          <TextInput
            placeholder="Enter Paysofter Account ID"
            value={accountId}
            onChangeText={(text) => handleFieldChange("accountId", text)}
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 16, padding: 8 }}
          />
          <Text style={{ color: "red" }}>{accountIdError}</Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Enter Account Security Code"
              value={securityCode}
              onChangeText={(text) => handleFieldChange("securityCode", text)}
              secureTextEntry={!securityCodeVisible}
              style={{ flex: 1, borderWidth: 1, borderColor: "gray", marginBottom: 16, padding: 8 }}
            />
            <TouchableOpacity onPress={toggleSecurityCodeVisibility}>
              <FontAwesomeIcon icon={securityCodeVisible ? faEyeSlash : faEye} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={{ color: "red" }}>{securityCodeError}</Text>

          <Button title="Pay" onPress={submitHandler} />
        </View>
      )}
    </>
  );
};

export default PaysofterAccountFundPromise;
