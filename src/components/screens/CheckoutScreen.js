import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createOrder } from "../../redux/actions/orderActions";
import { styles } from "../screenStyles";
import Message from "../../Message";
import Loader from "../../Loader";
import { formatAmount } from "../../FormatAmount";

import { API_URL } from "../../config/apiConfig";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error } = orderCreate;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const [order_id, setOrderId] = useState("");
  const [paymentMethod] = useState("Paystack");

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(`${API_URL}/api/get-order-id/`, {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      });
      setOrderId(response.data.order_id);
    } catch (error) {
      console.log(error);
    }
    // setRefreshing(false);
    wait(2000).then(() => setRefreshing(false));
  }, [userInfo.access]);

  // useEffect(() => {
  //   onRefresh();
  // }, [onRefresh]);

  useEffect(() => {
    const getOrderId = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/get-order-id/`, {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        });
        setOrderId(response.data.order_id);
      } catch (error) {
        console.log(error);
      }
    };

    getOrderId();
  }, [userInfo.access]);

  const shippingPrice = cartItems.length > 0 ? 1000 : 0;
  const taxPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price * 0.03,
    0
  );

  const totalPrice =
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) +
    shippingPrice +
    taxPrice;

  const createdAt = new Date().toISOString();

  const createOrderHandler = async () => {
    const orderItems = cartItems.map((item) => ({
      product: item.product,
      name: item.name,
      qty: item.qty,
      price: item.price,
      image: item.image,
    }));

    await dispatch(
      createOrder({
        orderItems,
        paymentMethod,
        itemsPrice: cartItems.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        ),
        shippingPrice,
        taxPrice,
        totalPrice,
        order_id,
        createdAt,
      })
    ).catch((error) => {
      console.log("Error creating order:", error);
      throw error;
    });

    navigation.navigate("Shipment", { orderId: order_id });
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

      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Order created successfully!</Message>
          )}

          <View style={styles.container}>
            <Text style={styles.title}>Order Summary</Text>
            {cartItems.map((item) => (
              <View key={item.product} style={{ marginBottom: 10 }}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 100 }}
                />
                <Text>{item.name}</Text>
                <Text>
                  {item.qty} x NGN {formatAmount(item.price)} = NGN{" "}
                  {formatAmount(item.qty * item.price)}
                </Text>
              </View>
            ))}
            <Text>Order ID: {order_id}</Text>
            <Text>Payment Method: {paymentMethod}</Text>
            <Text>Shipping Cost: NGN {formatAmount(shippingPrice)}</Text>
            <Text>Tax: NGN {formatAmount(taxPrice)}</Text>
            <Text>Total Amount: NGN {formatAmount(totalPrice)}</Text>
            <Text>Timestamp: {createdAt}</Text>

            <View style={{ marginBottom: 10, padding: 10 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: cartItems.length > 0 ? "green" : "gray",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                disabled={cartItems.length === 0}
                onPress={createOrderHandler}
              >
                <Text
                  style={{ color: "#fff", textAlign: "center", padding: 2 }}
                >
                  Continue to Shipment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;
