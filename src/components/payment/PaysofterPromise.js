// PaysofterPromise.js
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
import Message from "../Message";
import Loader from "../Loader";
import PaysofterAccountFundPromise from "./PaysofterAccountFundPromise";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

const PaysofterPromise = ({
  promoTotalPrice,
  paymentData,
  reference,
  userEmail,
  publicApiKey,
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
  const { loading, success, error } = debitPaysofterAccountState;

  const [duration, setDuration] = useState("Within 1 day");
  const [currency, setCurrency] = useState("NGN");
  const [paymenthMethod, setPaymenthMethod] = useState("Paysofter Promise");
  const [paymentProvider, setPaymentProvider] = useState("Paysofter");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showPaysofterAccountFundPromise, setShowPaysofterAccountFundPromise] =
    useState(false);

  const handleShowPaysofterAccountFundPromise = () => {
    setShowPaysofterAccountFundPromise(true);
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const submitHandler = () => {
    // Handle form submission here
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {}, 3000);
    }
  }, [success]);

  return (
    <>
      {showPaysofterAccountFundPromise ? (
        <PaysofterAccountFundPromise
          promoTotalPrice={promoTotalPrice}
          userEmail={userEmail}
          publicApiKey={publicApiKey}
          paymentData={paymentData}
          reference={reference}
          currency={currency}
          duration={duration}
          paymenthMethod={paymenthMethod}
          paymentProvider={paymentProvider}
        />
      ) : (
        <View style={{ padding: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}
            >
              Paysofter Promise
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
                    Paysofter Promise option escrows or places in custody the
                    payment made to a seller until a specified condition has
                    been fulfilled.
                  </Text>
                  <Button title="Close" onPress={handleInfoModalClose} />
                </View>
              </View>
            </Modal>
          </View>

          {success && (
            <Message variant="success">Payment made successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}

          <View style={{ marginVertical: 10 }}>
            <Text>Currency</Text>
            <TextInput
              value={currency}
              onChangeText={setCurrency}
              editable={false}
              style={{ borderWidth: 1, borderColor: "gray", padding: 8 }}
            />
          </View>

          {/* Other form fields */}

          <Button title="Submit" onPress={submitHandler} />
          <Button
            title="Proceed to Paysofter Account Fund"
            onPress={handleShowPaysofterAccountFundPromise}
          />
        </View>
      )}
    </>
  );
};

export default PaysofterPromise;
