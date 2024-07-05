// PaysofterAccountFund.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faInfoCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  debitPaysofterAccountFund,
  // resetDebitPaysofterNgnState,
} from "../../redux/actions/paymentActions";
import VerifyAccountFundOtp from "./VerifyAccountFundOtp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Message from "../../Message";
import Loader from "../../Loader";
import { formatAmount } from "./FormatAmount";

const PaysofterAccountFund = ({
  amount,
  paymentData,
  paysofterPublicKey,
  reference,
  userEmail,
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
  }, [userInfo]);

  const debitPaysofterAccountState = useSelector(
    (state) => state.debitPaysofterAccountState
  );
  const { loading, success, formattedPayerEmail, error } =
    debitPaysofterAccountState;

  const [accountId, setAccountId] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAccountInfoModal, setShowAccountInfoModal] = useState(false);
  const [showSecurityCodeModal, setShowSecurityCodeModal] = useState(false);
  const [showVerifyAccountFundOtp, setShowVerifyAccountFundOtp] =
    useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);

  const handleAccountInfoModalShow = () => setShowAccountInfoModal(true);
  const handleAccountInfoModalClose = () => setShowAccountInfoModal(false);
  const handleSecurityCodeModalShow = () => setShowSecurityCodeModal(true);
  const handleSecurityCodeModalClose = () => setShowSecurityCodeModal(false);
  const toggleSecurityCodeVisibility = () =>
    setSecurityCodeVisible(!securityCodeVisible);
  const handleInfoModalShow = () => setShowInfoModal(true);
  const handleInfoModalClose = () => setShowInfoModal(false);

  const debitAccountData = {
    account_id: accountId,
    security_code: securityCode,
    amount: amount,
    public_api_key: paysofterPublicKey,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await AsyncStorage.setItem(
        "debitAccountData",
        JSON.stringify(debitAccountData)
      );
      dispatch(debitPaysofterAccountFund(debitAccountData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (success) {
      // dispatch(resetDebitPaysofterNgnState());

      const timer = setTimeout(() => {
        setShowVerifyAccountFundOtp(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
    // else {
    //   console.error("Error verifying account");
    // }
  }, [success]);

  const handleLearnMore = () => {
    Linking.openURL("https://paysofter.com/");
  };

  console.log("PaysofterAccountFund", debitAccountData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {showVerifyAccountFundOtp ? (
            <VerifyAccountFundOtp
              amount={amount}
              paymentData={paymentData}
              reference={reference}
              currency={currency}
              userEmail={userEmail}
              securityCode={securityCode}
              accountId={accountId}
              formattedPayerEmail={formattedPayerEmail}
              duration={duration}
              paymenthMethod={paymenthMethod}
            />
          ) : (
            <>
              <View style={styles.header}>
                {/* <Text style={styles.title}>Paysofter Account Fund</Text>
            <Button title="Info" onPress={handleAccountInfoModalShow} /> */}
                <View style={styles.labelContainer}>
                  <Text style={styles.title}>Paysofter Account Fund</Text>
                  <TouchableOpacity onPress={handleAccountInfoModalShow}>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      size={16}
                      // style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Modal
                visible={showAccountInfoModal}
                onRequestClose={handleAccountInfoModalClose}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                      Paysofter Account Fund
                    </Text>
                    <Text style={styles.modalText}>
                      Paysofter Account Fund option settles payments using the
                      payer's funded Paysofter Account Fund.
                    </Text>
                    <Button title="Learn more" onPress={handleLearnMore} />
                    <Button
                      title="Close"
                      onPress={handleAccountInfoModalClose}
                    />
                  </View>
                </View>
              </Modal>

              {success && (
                <Message variant="success">
                  OTP sent to your email {formattedPayerEmail} successfully.
                </Message>
              )}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}

              <View style={styles.formGroup}>
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
                <View style={styles.row}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Paysofter Account ID"
                    value={accountId}
                    onChangeText={(text) => setAccountId(text)}
                    maxLength={12}
                  />
                  {/* <Button title="Info" onPress={handleInfoModalShow} /> */}
                </View>
              </View>

              <Modal
                visible={showInfoModal}
                onRequestClose={handleInfoModalClose}
                transparent={true}
                animationType="slide"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Paysofter Account ID</Text>
                    <Text style={styles.modalText}>
                      A uniquely assigned 12-digit Paysofter Account ID. Don't
                      have a Paysofter account? You're just about 3 minutes
                      away!
                    </Text>
                    <View style={styles.learnMoreBtn}>
                      <Button
                        title="Create A Free Account"
                        onPress={() => {
                          Linking.openURL("https://paysofter.com/register/");
                        }}
                      />
                    </View>
                    <Button title="Close" onPress={handleInfoModalClose} />
                  </View>
                </View>
              </Modal>

              <View style={styles.formGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Security Code </Text>
                  <TouchableOpacity onPress={handleSecurityCodeModalShow}>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      size={16}
                      // style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Account Security Code"
                    value={securityCode}
                    onChangeText={(text) => setSecurityCode(text)}
                    secureTextEntry={!securityCodeVisible}
                    maxLength={4}
                  />
                  {/* <Button title="Info" onPress={handleSecurityCodeModalShow} /> */}
                  <TouchableOpacity onPress={toggleSecurityCodeVisibility}>
                    {/* <Text>{securityCodeVisible ? "Hide" : "Show"}</Text> */}

                    <Text>
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
              </View>

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
                      A 4-digit randomly generated Paysofter Account Security
                      Code that expires at a given time. Having issue applying
                      the security code? Refresh your paysofter account page,
                      logout and login, or clear browsing data.
                    </Text>
                    <Button
                      title="Learn More"
                      onPress={() => {
                        /* Link to paysofter.com */
                      }}
                    />
                    <Button
                      title="Close"
                      onPress={handleSecurityCodeModalClose}
                    />
                  </View>
                </View>
              </Modal>

              <View style={styles.submitContainer}>
                <TouchableOpacity onPress={submitHandler}>
                  <Text style={styles.roundedPrimaryBtn}>{`Pay (${formatAmount(
                    amount
                  )} ${currency})`}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.errorContainer}>
            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  learnMoreBtn: {
    padding: 5,
    marginBottom: 10,
  },
  formGroup: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  submitContainer: {
    marginTop: 20,
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

  errorContainer: {
    paddingVertical: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
    padding: 10,
  },
});

export default PaysofterAccountFund;
