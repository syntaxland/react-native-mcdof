// PaysofterButton.js
import React, { useState, useEffect } from "react";
import { View, Text, Button, Modal } from "react-native";
import { useSelector } from "react-redux";
import CardPayment from "./CardPayment";
import UssdPayment from "./UssdPayment";
import BankPayment from "./BankPayment";
import TransferPayment from "./TransferPayment";
import PaysofterAccountFund from "./PaysofterAccountFund";
import PaysofterPromise from "./PaysofterPromise";
import QrPayment from "./QrPayment";
import { styles } from "./paysofterStyles";

const PaysofterButton = ({
  showPaymentModal,
  setShowPaymentModal,
  reference,
  userEmail,
  promoTotalPrice,
  publicApiKey,
  paymentDetails,
  handlePaymentDetailsChange,
  paymentData,
  paysofterPaymentData,
}) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("card");
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const handlePaymentOptionChange = (option) => {
    setSelectedPaymentOption(option);
  };

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          title="Pay Now"
          onPress={() => setShowPaymentModal(true)}
        />
      </View>

      <Modal visible={showPaymentModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Mock Payment (Test)</Text>
          <Text>{userEmail}</Text>
          <Text>
            NGN{" "}
            {promoTotalPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.optionsList}>
            <Button
              title="Debit Card"
              onPress={() => handlePaymentOptionChange("card")}
              color={selectedPaymentOption === "card" ? "#007bff" : null}
            />
            <Button
              title="Paysofter Account Fund"
              onPress={() => handlePaymentOptionChange("account-fund")}
              color={selectedPaymentOption === "account-fund" ? "#007bff" : null}
            />
            <Button
              title="Paysofter Promise"
              onPress={() => handlePaymentOptionChange("promise")}
              color={selectedPaymentOption === "promise" ? "#007bff" : null}
            />
            <Button
              title="More Options"
              onPress={handleMoreOptions}
              color="#007bff"
            />
            {showMoreOptions && (
              <>
                <Button
                  title="Transfer"
                  onPress={() => handlePaymentOptionChange("transfer")}
                  color={selectedPaymentOption === "transfer" ? "#007bff" : null}
                />
                <Button
                  title="Bank"
                  onPress={() => handlePaymentOptionChange("bank")}
                  color={selectedPaymentOption === "bank" ? "#007bff" : null}
                />
                <Button
                  title="USSD"
                  onPress={() => handlePaymentOptionChange("ussd")}
                  color={selectedPaymentOption === "ussd" ? "#007bff" : null}
                />
                <Button
                  title="Visa QR"
                  onPress={() => handlePaymentOptionChange("qr")}
                  color={selectedPaymentOption === "qr" ? "#007bff" : null}
                />
              </>
            )}
          </View>
          <View style={styles.paymentContainer}>
            {selectedPaymentOption === "card" && (
              <CardPayment
                paymentDetails={paymentDetails}
                handlePaymentDetailsChange={handlePaymentDetailsChange}
                promoTotalPrice={promoTotalPrice}
                paymentData={paymentData}
                reference={reference}
                userEmail={userEmail}
                publicApiKey={publicApiKey}
                paysofterPaymentData={paysofterPaymentData}
              />
            )}
            {selectedPaymentOption === "account-fund" && (
              <PaysofterAccountFund
                promoTotalPrice={promoTotalPrice}
                paymentData={paymentData}
                reference={reference}
                userEmail={userEmail}
                publicApiKey={publicApiKey}
              />
            )}
            {selectedPaymentOption === "promise" && (
              <PaysofterPromise
                promoTotalPrice={promoTotalPrice}
                userEmail={userEmail}
                publicApiKey={publicApiKey}
                paymentData={paymentData}
                reference={reference}
              />
            )}
            {selectedPaymentOption === "bank" && <BankPayment />}
            {selectedPaymentOption === "transfer" && <TransferPayment />}
            {selectedPaymentOption === "ussd" && <UssdPayment />}
            {selectedPaymentOption === "qr" && <QrPayment />}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PaysofterButton;
