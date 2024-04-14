// PaysofterAccountFund.js
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
import { debitPaysofterAccountFund } from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import VerifyAccountFundOtp from "./VerifyAccountFundOtp";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const PaysofterAccountFund = ({
  promoTotalPrice,
  paymentData,
  reference,
  userEmail,
  publicApiKey,
  duration,
  paymenthMethod,
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
  const { loading, success, formattedPayerEmail, error } =
    debitPaysofterAccountState;
  console.log("formattedPayerEmail:", formattedPayerEmail);

  const [accountId, setAccountId] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSecurityCodeModal, setShowSecurityCodeModal] = useState(false);
  const [showVerifyAccountFundOtp, setShowVerifyAccountFundOtp] =
    useState(false);

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

  const debitAccountData = {
    account_id: accountId,
    security_code: securityCode,
    amount: promoTotalPrice,
    public_api_key: publicApiKey,
  };

  const submitHandler = () => {
    try {
      dispatch(debitPaysofterAccountFund(debitAccountData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setShowVerifyAccountFundOtp(true);
      }, 1000);
    } else {
      console.error("Error verifying account");
    }
  }, [success]);

  return (
    <>
      {showVerifyAccountFundOtp ? (
        <VerifyAccountFundOtp
          promoTotalPrice={promoTotalPrice}
          paymentData={paymentData}
          reference={reference}
          currency={currency}
          userEmail={userEmail}
          publicApiKey={publicApiKey}
          securityCode={securityCode}
          accountId={accountId}
          formattedPayerEmail={formattedPayerEmail}
          duration={duration}
          paymenthMethod={paymenthMethod}
        />
      ) : (
        <View style={{ padding: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}
            >
              Paysofter Account Fund
            </Text>
            <TouchableOpacity onPress={handleInfoModalShow}>
              <FontAwesomeIcon icon={faInfoCircle} size={20} />
            </TouchableOpacity>
            <Modal visible={showInfoModal} animationType="slide" transparent>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ backgroundColor: "white", padding: 20 }}>
                  <Text>
                    Paysofter Account Fund option settles payments using the
                    payer's funded Paysofter Account Fund.
                  </Text>
                  <Button title="Close" onPress={handleInfoModalClose} />
                </View>
              </View>
            </Modal>
          </View>

          {success && (
            <Message variant="success">
              OTP sent to your email {formattedPayerEmail} successfully.
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <TextInput
            placeholder="Enter Paysofter Account ID"
            value={accountId}
            onChangeText={setAccountId}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              marginBottom: 16,
              padding: 8,
            }}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              placeholder="Enter Account Security Code"
              value={securityCode}
              onChangeText={setSecurityCode}
              secureTextEntry={!securityCodeVisible}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: "gray",
                marginBottom: 16,
                padding: 8,
              }}
            />
            <TouchableOpacity onPress={toggleSecurityCodeVisibility}>
              <FontAwesomeIcon
                icon={securityCodeVisible ? faEyeSlash : faEye}
                size={20}
              />
            </TouchableOpacity>
          </View>

          <Button title="Pay" onPress={submitHandler} />
        </View>
      )}
    </>
  );
};

export default PaysofterAccountFund;
