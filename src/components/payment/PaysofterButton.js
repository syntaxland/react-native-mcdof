// PaysofterButton.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTimes,
  faCreditCard,
  // faExchange,
  // faBank,
  // faMobile,
  // faQrcode,
  faList,
  faMoneyBills,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import CardPayment from "./CardPayment";
import PaysofterAccountFund from "./PaysofterAccountFund";
import PaysofterPromise from "./PaysofterPromise";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import QrPayment from "./QrPayment";
import { formatAmount } from "./FormatAmount";

const PaysofterButton = ({
  reference,
  userEmail,
  promoTotalPrice,
  currency,
  publicApiKey,
  paymentDetails,
  handlePaymentDetailsChange,
  paymentData,
  paysofterPaymentData,
  amount,
}) => {
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.center}>
          <Button
            title="Pay Now"
            onPress={() => setShowPaymentModal(true)}
            color="#007bff"
          />
        </View>

        <Modal
          visible={showPaymentModal}
          animationType="slide"
          onRequestClose={() => setShowPaymentModal(false)}
        >
          <View style={styles.modalHeader}>
            <Card style={styles.card}>
              <Card.Content>
                <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                  <Text style={styles.closeButton}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      size={16}
                      style={styles.icon}
                      color="red"
                    />{" "}
                    Close
                  </Text>
                </TouchableOpacity>

                <Text style={styles.modalTitle}>Paysofter (Mock Payment)</Text>
                <Text>{userInfo.email}</Text>
                <Text>{`${formatAmount(amount)} ${currency}`}</Text>
              </Card.Content>
            </Card>
          </View>

          <ScrollView>
            <View style={styles.options}>
              <Card style={styles.card}>
                <Card.Content>
                  <Text style={styles.title}>Options</Text>
                  <View style={styles.optionsList}>
                   

                    {currency === "USD" && (
                      <View style={styles.payOptionBtn}>
                        <Text style={styles.payBtnText}>
                          <TouchableOpacity
                            onPress={() => handlePaymentOptionChange("card")}
                            style={
                              selectedPaymentOption === "card"
                                ? styles.roundedPrimaryBtn
                                : styles.roundedDisabledBtn
                            }
                          >
                            <Text style={styles.payBtnText}>
                              <FontAwesomeIcon
                                icon={faCreditCard}
                                size={16}
                                style={styles.icon}
                                color="#fff"
                              />{" "}
                              <Text style={styles.btnText}>
                                {" "}
                                Debit Card (USD){" "}
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    )}

                    {currency === "NGN" && (
                      <View style={styles.payOptionBtn}>
                        <Text style={styles.payBtnText}>
                          <TouchableOpacity
                            onPress={() => handlePaymentOptionChange("card")}
                            style={
                              selectedPaymentOption === "card"
                                ? styles.roundedPrimaryBtn
                                : styles.roundedDisabledBtn
                            }
                          >
                            <Text style={styles.payBtnText}>
                              <FontAwesomeIcon
                                icon={faCreditCard}
                                size={16}
                                style={styles.icon}
                                color="#fff"
                              />{" "}
                              <Text style={styles.btnText}>
                                {" "}
                                Debit Card (NGN){" "}
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    )}

                    {currency === "NGN" && (
                      <View style={styles.payOptionBtn}>
                        <Text style={styles.payBtnText}>
                          <TouchableOpacity
                            onPress={() =>
                              handlePaymentOptionChange("account-fund")
                            }
                            style={
                              selectedPaymentOption === "account-fund"
                                ? styles.roundedPrimaryBtn
                                : styles.roundedDisabledBtn
                            }
                          >
                            <Text style={styles.payBtnText}>
                              <FontAwesomeIcon
                                icon={faMoneyBills}
                                size={16}
                                style={styles.icon}
                                color="#fff"
                              />{" "}
                              <Text style={styles.btnText}>
                                {" "}
                                Paysofter Account Fund
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    )}

                    {currency === "USD" && (
                      <View style={styles.payOptionBtn}>
                        <Text style={styles.payBtnText}>
                          <TouchableOpacity
                            onPress={() =>
                              handlePaymentOptionChange("account-fund")
                            }
                            style={
                              selectedPaymentOption === "account-fund"
                                ? styles.roundedPrimaryBtn
                                : styles.roundedDisabledBtn
                            }
                          >
                            <Text style={styles.payBtnText}>
                              <FontAwesomeIcon
                                icon={faMoneyBills}
                                size={16}
                                style={styles.icon}
                                color="#fff"
                              />{" "}
                              <Text style={styles.btnText}>
                                {" "}
                                Paysofter Account Fund (USD)
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    )}

                    {currency === "NGN" && (
                      <View style={styles.payOptionBtn}>
                        <Text style={styles.payBtnText}>
                          <TouchableOpacity
                            onPress={() => handlePaymentOptionChange("promise")}
                            style={
                              selectedPaymentOption === "promise"
                                ? styles.roundedPrimaryBtn
                                : styles.roundedDisabledBtn
                            }
                          >
                            <Text style={styles.payBtnText}>
                              <FontAwesomeIcon
                                icon={faMoneyBillWave}
                                size={16}
                                style={styles.icon}
                                color="#fff"
                              />{" "}
                              <Text style={styles.btnText}>
                                {" "}
                                Paysofter Promise (NGN)
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    )}

                    {currency === "USD" && (
                      <View style={styles.payOptionBtn}>
                        <Text style={styles.payBtnText}>
                          <TouchableOpacity
                            onPress={() => handlePaymentOptionChange("promise")}
                            style={
                              selectedPaymentOption === "promise"
                                ? styles.roundedPrimaryBtn
                                : styles.roundedDisabledBtn
                            }
                          >
                            <Text style={styles.payBtnText}>
                              <FontAwesomeIcon
                                icon={faMoneyBillWave}
                                size={16}
                                style={styles.icon}
                                color="#fff"
                              />{" "}
                              <Text style={styles.btnText}>
                                {" "}
                                Paysofter Promise (USD)
                              </Text>
                            </Text>
                          </TouchableOpacity>
                        </Text>
                      </View>
                    )}

                    <View style={styles.payOptionBtn}>
                      <Text style={styles.payBtnText}>
                        <TouchableOpacity
                          onPress={handleMoreOptions}
                          style={
                            styles.roundedPrimaryBtn
                          }
                        >
                          <Text style={styles.payBtnText}>
                            <FontAwesomeIcon
                              icon={faList}
                              size={16}
                              style={styles.icon}
                              color="#fff"
                            />{" "}
                            <Text style={styles.btnText}> More Options</Text>
                          </Text>
                        </TouchableOpacity>
                      </Text>
                    </View>

                    {showMoreOptions && (
                      <>
                        <View style={styles.payOptionBtn}>
                          <Button
                            title="Transfer"
                            onPress={() =>
                              handlePaymentOptionChange("transfer")
                            }
                            color={
                              selectedPaymentOption === "transfer"
                                ? "#007bff"
                                : "#6c757d"
                            }
                            disabled
                          />
                        </View>

                        <View style={styles.payOptionBtn}>
                          <Button
                            title="Bank"
                            onPress={() => handlePaymentOptionChange("bank")}
                            color={
                              selectedPaymentOption === "bank"
                                ? "#007bff"
                                : "#6c757d"
                            }
                            disabled
                          />
                        </View>

                        <View style={styles.payOptionBtn}>
                          <Button
                            title="USSD"
                            onPress={() => handlePaymentOptionChange("ussd")}
                            color={
                              selectedPaymentOption === "ussd"
                                ? "#007bff"
                                : "#6c757d"
                            }
                            disabled
                          />
                        </View>

                        <View style={styles.payOptionBtn}>
                          <Button
                            title="Visa QR"
                            onPress={() => handlePaymentOptionChange("qr")}
                            color={
                              selectedPaymentOption === "qr"
                                ? "#007bff"
                                : "#6c757d"
                            }
                            disabled
                          />
                        </View>
                      </>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </View>

            <View style={styles.paymentContainer}>
              {selectedPaymentOption === "card" && (
                <CardPayment
                  paymentData={paymentData}
                  paymentDetails={paymentDetails}
                  handlePaymentDetailsChange={handlePaymentDetailsChange}
                  promoTotalPrice={promoTotalPrice}
                  currency={currency}
                  amount={amount}
                  reference={reference}
                  userEmail={userEmail}
                  publicApiKey={publicApiKey}
                  paysofterPaymentData={paysofterPaymentData}
                />
              )}

              {selectedPaymentOption === "account-fund" && (
                <PaysofterAccountFund
                  promoTotalPrice={promoTotalPrice}
                  amount={amount}
                  currency={currency}
                  paymentData={paymentData}
                  reference={reference}
                  userEmail={userEmail}
                  paysofterPublicKey={publicApiKey}
                />
              )}

              {selectedPaymentOption === "promise" && (
                <PaysofterPromise
                  promoTotalPrice={promoTotalPrice}
                  amount={amount}
                  currency={currency}
                  userEmail={userEmail}
                  sellerApiKey={publicApiKey}
                  paymentData={paymentData}
                  reference={reference}
                />
              )}

              {selectedPaymentOption === "bank" && <BankPayment />}
              {selectedPaymentOption === "transfer" && <TransferPayment />}
              {selectedPaymentOption === "ussd" && <UssdPayment />}
              {selectedPaymentOption === "qr" && <QrPayment />}
            </View>
          </ScrollView>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // flex: 1,
  },
  center: {
    alignItems: "center",
  },
  modalHeader: {
    padding: 10,
    textAlign: "center",
    justifyContent: "center",
    // alignItems: "center",
  },
  closeButton: {
    // alignSelf: "flex-end",
    alignSelf: "center",
    padding: 10,
    fontSize: 18,
    color: "red",
  },
  payOptionBtn: {
    padding: 3,
  },
  payBtnText: {
    alignSelf: "center",
    fontSize: 18,
    textAlign: "center",
  },
  modalHeading: {
    // textAlign: "center",
    // justifyContent: "center",
    // alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    // textAlign: "center",
  },
  options: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  paymentDetails: {
    padding: 20,
  },
  icon: {
    marginRight: 5,
  },
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 7,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedDisabledBtn: {
    backgroundColor: "#d3d3d3",
    color: "#fff",
    padding: 7,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default PaysofterButton;
