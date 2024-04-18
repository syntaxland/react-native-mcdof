// PaystackPayment.js
import React, { useEffect, useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Paystack from 'paystack-react-native'; 
import { useNavigation, useRoute } from "@react-navigation/native";
import { clearCart } from '../../redux/actions/cartActions';
import { createPayment } from '../../redux/actions/paymentActions';
import ApplyPromoCode from '../../ApplyPromoCode';
import Loader from '../../Loader';
import Message from '../../Message';

import axios from 'axios';
import { API_URL } from "../../config/apiConfig"; 

const PaystackPayment = () => {
  const dispatch = useDispatch();
    const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);


  const [paystackPublicKey, setPaystackPublicKey] = useState('');
  const [reference, setReference] = useState('');
  const userEmail = userInfo.email;

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { loading, success, error } = paymentCreate;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState(''); 
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/get-payment-details/`, {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        });
        setPaystackPublicKey(response.data.paystackPublicKey);
        setReference(response.data.reference);
      } catch (error) {
        console.log(error);
      }
    };

    getPaymentDetails();
  }, [userInfo.access]);

  const handleInitSdk = () => {
    Paystack.initSdk(paystackPublicKey);
  };

  const handleChargeCard = () => {
    const paymentParams = {
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc,
      email: userEmail,
      amount: parseInt(amount), // Ensure amount is converted to an integer
      currency: 'NGN',
      subAccount: '', // You can set this if necessary
      transactionCharge: 0, // You can set this if necessary
      bearer: '', // You can set this if necessary
      reference,
    };

    Paystack.chargeCard(paymentParams);
  };

  return (
    <View>
      <Button title="Initialize SDK" onPress={handleInitSdk} />
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
      />
      <TextInput
        placeholder="Expiry Month"
        value={expiryMonth}
        onChangeText={setExpiryMonth}
      />
      <TextInput
        placeholder="Expiry Year"
        value={expiryYear}
        onChangeText={setExpiryYear}
      />
      <TextInput placeholder="CVC" value={cvc} onChangeText={setCvc} />
      <TextInput placeholder="Email" value={userEmail} editable={false} />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        placeholder="Reference"
        value={reference}
        onChangeText={setReference}
      />
      <Button title="Pay Now" onPress={handleChargeCard} />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {/* Additional UI elements as needed */}
    </View>
  );
};

export default PaystackPayment;
