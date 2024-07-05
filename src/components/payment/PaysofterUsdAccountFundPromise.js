// PaysofterUsdAccountFundPromise.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { debitPaysofterUsdAccountFund } from "../../redux/actions/paymentActions";
import VerifyUsdAccountFundPromiseOtp from "./VerifyUsdAccountFundPromiseOtp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Message from "../../Message";
import Loader from "../../Loader";
import { formatAmount } from "../../FormatAmount";

const PaysofterUsdAccountFundPromise = ({
  buyerEmail,
  amount,
  sellerApiKey,
  paymentData,
  reference,
  duration,
  currency,
}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

  const debitPaysofterUsdAccountState = useSelector(
    (state) => state.debitPaysofterUsdAccountState
  );
  const { loading, success, formattedPayerEmail, error } =
    debitPaysofterUsdAccountState;

  const [accountId, setAccountId] = useState("");
  const [accountIdError, setAccountIdError] = useState("");

  const [securityCode, setSecurityCode] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");

  const [formError, setFormError] = useState("");

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAccountInfoModal, setShowAccountInfoModal] = useState(false);
  const [showSecurityCodeModal, setShowSecurityCodeModal] = useState(false);
  const [
    showVerifyUsdAccountFundPromiseOtp,
    setShowVerifyUsdAccountFundPromiseOtp,
  ] = useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);

  const handleAccountInfoModalShow = () => setShowAccountInfoModal(true);
  const handleAccountInfoModalClose = () => setShowAccountInfoModal(false);
  const handleSecurityCodeModalShow = () => setShowSecurityCodeModal(true);
  const handleSecurityCodeModalClose = () => setShowSecurityCodeModal(false);
  const toggleSecurityCodeVisibility = () =>
    setSecurityCodeVisible(!securityCodeVisible);
  const handleInfoModalShow = () => setShowInfoModal(true);
  const handleInfoModalClose = () => setShowInfoModal(false);

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

  const debitUsdAccountData = {
    account_id: accountId,
    security_code: securityCode,
    amount: amount,
    public_api_key: sellerApiKey,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!accountId) {
      setAccountIdError("Please enter Account ID.");
      return;
    } else {
      setAccountIdError("");
    }

    if (!securityCode) {
      setSecurityCodeError("Please enter Security Code.");
      return;
    } else {
      setSecurityCodeError("");
    }

    if (!accountId || !securityCode) {
      setFormError("Please attend to the errors within the form.");
      return;
    } else {
      dispatch(debitPaysofterUsdAccountFund(debitUsdAccountData));
      await AsyncStorage.setItem(
        "debitUsdAccountData",
        JSON.stringify(debitUsdAccountData)
      );
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowVerifyUsdAccountFundPromiseOtp(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <>
      {showVerifyUsdAccountFundPromiseOtp ? (
        <VerifyUsdAccountFundPromiseOtp
          amount={amount}
          sellerApiKey={sellerApiKey}
          buyerEmail={buyerEmail}
          paymentData={paymentData}
          reference={reference}
          securityCode={securityCode}
          accountId={accountId}
          formattedPayerEmail={formattedPayerEmail}
          currency={currency}
          duration={duration}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {/* <Text style={styles.title}>Paysofter Account Fund (USD)</Text> */}

          <View style={styles.labelContainer}>
            <Text style={styles.title}>
              Paysofter Account Fund ({currency}){" "}
            </Text>
            <TouchableOpacity onPress={handleAccountInfoModalShow}>
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={16}
                // style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {success && (
            <Message variant="success">
              OTP sent to your email {formattedPayerEmail} successfully.
            </Message>
          )}

          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          {formError && <Message variant="danger">{formError}</Message>}

          <View style={styles.formGroup}>
            {/* <Text style={styles.label}>Account ID</Text> */}

            <View style={styles.labelContainer}>
              <Text style={styles.label}>Account ID </Text>
              <TouchableOpacity onPress={handleInfoModalShow}>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size={16}
                  // style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Paysofter Account ID"
                value={accountId}
                onChangeText={(value) => handleFieldChange("accountId", value)}
                maxLength={12}
              />
            </View>
            {accountIdError ? (
              <Text style={styles.errorText}>{accountIdError}</Text>
            ) : null}
          </View>

          <View style={styles.formGroup}>
            {/* <Text style={styles.label}>Security Code</Text> */}
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Security Code</Text>
              <TouchableOpacity onPress={handleSecurityCodeModalShow}>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size={16}
                  // style={styles.icon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter Account Security Code"
                value={securityCode}
                onChangeText={(value) =>
                  handleFieldChange("securityCode", value)
                }
                maxLength={4}
                secureTextEntry={!securityCodeVisible}
              />

              <TouchableOpacity
                onPress={toggleSecurityCodeVisibility}
                style={styles.iconButton}
              >
                <Text style={styles.icon}>
                  {securityCodeVisible ? (
                    <>
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        size={16}
                        style={styles.icon}
                      />
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEye}
                        size={16}
                        style={styles.icon}
                      />
                    </>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            {securityCodeError ? (
              <Text style={styles.errorText}>{securityCodeError}</Text>
            ) : null}
          </View>

          <View style={styles.submitContainer}>
            <TouchableOpacity onPress={submitHandler}>
              <Text style={styles.roundedPrimaryBtn}>{`Pay (${formatAmount(
                amount
              )} ${currency})`}</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={showAccountInfoModal}
            onRequestClose={handleAccountInfoModalClose}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Paysofter Account ID</Text>
                <Text style={styles.modalText}>
                  A uniquely assigned 12-digit Paysofter Account ID. Don't have
                  a Paysofter account?{" "}
                </Text>
                <View style={styles.learnMoreBtn}>
                  <Button
                    title="Create A Free Account"
                    onPress={() => {
                      Linking.openURL("https://paysofter.com/register/");
                    }}
                  />
                </View>

                <Button title="Close" onPress={handleAccountInfoModalClose} />
              </View>
            </View>
          </Modal>

          <Modal
            visible={showSecurityCodeModal}
            onRequestClose={handleSecurityCodeModalClose}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>
                  Paysofter Account Security Code
                </Text>
                <Text style={styles.modalText}>
                  A 4-digit randomly generated Paysofter Account Security Code
                  that expires at a given time (e.g. every hour).{" "}
                  <TouchableOpacity
                    onPress={() => Linking.openURL("https://paysofter.com/")}
                  >
                    <Text style={styles.modalLink}>Learn More</Text>
                  </TouchableOpacity>
                </Text>
                <Button title="Close" onPress={handleSecurityCodeModalClose} />
              </View>
            </View>
          </Modal>

          <Modal
            visible={showInfoModal}
            onRequestClose={handleInfoModalClose}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Paysofter Account ID Info</Text>
                <Text style={styles.modalText}>
                  A uniquely assigned 12-digit Paysofter Account ID. Don't have
                  a Paysofter account?{" "}
                  <View style={styles.learnMoreBtn}>
                    <Button
                      title="Create A Free Account"
                      onPress={() => {
                        Linking.openURL("https://paysofter.com/register/");
                      }}
                    />
                  </View>
                </Text>
                <Button title="Close" onPress={handleInfoModalClose} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  formGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  icon: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  submitContainer: {
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalLink: {
    color: "blue",
  },
  learnMoreBtn: {
    padding: 5,
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default PaysofterUsdAccountFundPromise;
