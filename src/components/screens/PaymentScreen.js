// PaymentScreen.js
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import PaystackPayment from "../payment/PaystackPayment";
import Paysofter from "../payment/Paysofter";
import { styles } from "../screenStyles";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const order_id = route.params.id;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [paysofterPublicKey, setPaysofterPublicKey] = useState("");
  const [paystackPublicKey, setPaystackPublicKey] = useState("");
  const [reference, setReference] = useState("");
  const userEmail = userInfo.email;

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    // Fetch payment details from your API
    // Adjust the logic according to your API response
    const fetchPaymentDetails = async () => {
      // Fetch payment details here using your API endpoint
    };

    fetchPaymentDetails();
  }, []);

  const handlePaymentGatewaySelection = (paymentGateway) => {
    setSelectedPaymentGateway(paymentGateway);
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  // Define your payment data here based on the selected payment gateway
  const paymentData = {
    reference,
    order_id,
    // Add other necessary payment data here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackIcon}>
          <FontAwesomeIcon
            // size={24}
            color="blue"
            icon={faArrowLeft}
          />{" "}
          {/* Go Back */}
          Previous
        </Text>
      </TouchableOpacity>

      <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>
      {/* Render payment gateway buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentGatewaySelection("paystack")}
      >
        <Text style={styles.buttonText}>Pay with Paystack</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePaymentGatewaySelection("paysofter")}
      >
        <Text style={styles.buttonText}>Pay with Paysofter</Text>
      </TouchableOpacity>
      {/* Render other payment gateway buttons */}
      {/* Add modals or additional components here */}
      {selectedPaymentGateway === "paystack" && (
        <PaystackPayment paymentData={paymentData} />
      )}

      {/* {selectedPaymentGateway === "paysofter" && (
        <Paysofter
          // paymentData={paymentData}
          reference={reference}
          order_id={order_id}
          userEmail={userEmail}
          paysofterPublicKey={paysofterPublicKey}
        />
      )} */}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: "#007bff",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

export default PaymentScreen;

