// CardPayment.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import DatePicker from "react-native-datepicker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions/cartActions";
import {
  createPayment,
  resetPaymentState,
  createPaysofterPayment,
  resetCreatePaysofterPaymentState,
} from "../../redux/actions/paymentActions";
import { Picker } from "@react-native-picker/picker";
import { Card } from "react-native-paper";
import { formatAmount } from "../../FormatAmount";
import { MONTH_CHOICES, YEAR_CHOICES } from "./payment-constants";
import Message from "../../Message";
import Loader from "../../Loader";

const CardPayment = ({
  // promoTotalPrice,
  paymentData,
  reference,
  publicApiKey,
  amount,
  currency,
  userEmail,
  // paysofterPublicKey,
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

  const paysofterPayment = useSelector((state) => state.paysofterPayment);
  const { loading, success, error } = paysofterPayment;

  const [monthChoices, setMonthChoices] = useState([]);
  const [yearChoices, setYearChoices] = useState([]);

  useEffect(() => {
    setMonthChoices(MONTH_CHOICES);
    setYearChoices(YEAR_CHOICES);
  }, []);

  const [cardType, setCardType] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
  });

  const handlePaymentDetailsChange = (name, value) => {
    let detectedCardType = "";
    if (name === "cardNumber") {
      if (/^4/.test(value)) {
        detectedCardType = "Visa";
      } else if (/^5[1-5]/.test(value)) {
        detectedCardType = "Mastercard";
      }
      setCardType(detectedCardType);
    }
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const isFormValid = () => {
    return (
      paymentDetails.cardNumber &&
      paymentDetails.expirationMonth &&
      paymentDetails.expirationYear &&
      paymentDetails.cvv
    );
  };

  const createdAt = new Date().toISOString();

  const submitHandler = () => {
    const paysofterPaymentData = {
      payment_id: reference,
      public_api_key: publicApiKey,
      email: userEmail,
      amount: amount,
      currency: currency,
      created_at: createdAt,
      card_number: paymentDetails.cardNumber,
      expiration_month: paymentDetails.expirationMonth,
      expiration_year: paymentDetails.expirationYear,
      cvv: paymentDetails.cvv,
    };

    dispatch(createPaysofterPayment(paysofterPaymentData));
  };

  useEffect(() => {
    if (success) {
      dispatch(createPayment(paymentData));
      const timer = setTimeout(() => {
        dispatch(clearCart());
        dispatch(resetPaymentState());
        dispatch(resetCreatePaysofterPaymentState());
        navigation.navigate("Home");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>Debit Card</Text>
            {success && (
              <Message variant="success">Payment made successfully.</Message>
            )}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Card Number</Text>
              <TextInput
                style={styles.input}
                value={paymentDetails.cardNumber}
                onChangeText={(value) =>
                  handlePaymentDetailsChange("cardNumber", value)
                }
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                maxLength={16}
              />
              {cardType ? <Text>Detected Card Type: {cardType}</Text> : null}
            </View>

            <View style={styles.spaceBtwGroup}>
              <Text style={styles.label}>Expiration Month</Text>
              <View style={styles.dateContainer}>
                <Picker
                  selectedValue={paymentDetails.expirationMonth}
                  // style={styles.picker}
                  onValueChange={(value) =>
                    handlePaymentDetailsChange("expirationMonth", value)
                  }
                >
                  <Picker.Item label="Select Month" value="" />
                  {monthChoices.map(([value, label]) => (
                    <Picker.Item key={value} label={label} value={value} />
                  ))}
                </Picker>
              </View>

              <Text style={styles.label}>Expiration Year</Text>
              <View style={styles.dateContainer}>
                <Picker
                  selectedValue={paymentDetails.expirationYear}
                  // style={styles.picker}
                  onValueChange={(value) =>
                    handlePaymentDetailsChange("expirationYear", value)
                  }
                >
                  <Picker.Item label="Select Year" value="" />
                  {yearChoices.map(([value, label]) => (
                    <Picker.Item key={value} label={label} value={value} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={paymentDetails.cvv}
                onChangeText={(value) =>
                  handlePaymentDetailsChange("cvv", value)
                }
                placeholder="123"
                secureTextEntry
                maxLength={3}
                keyboardType="numeric"
              />
            </View>

            <TouchableOpacity
              // style={styles.roundedPrimaryBtn}
              style={!isFormValid() ? styles.roundedDisabledBtn : styles.roundedPrimaryBtn}
              onPress={submitHandler}
              disabled={!isFormValid()}
            >
              <Text style={styles.btnText}>
                Pay ({formatAmount(amount)} {currency})
              </Text>
            </TouchableOpacity>

            <View style={styles.errorContainer}>
              {error && <Text style={styles.error}>{error}</Text>}
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: "white",
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  spaceBtwGroup: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingVertical: 2,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
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
  roundedPrimaryBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  roundedDisabledBtn: {
    backgroundColor: "#d3d3d3",
    color: "#fff",
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CardPayment;
