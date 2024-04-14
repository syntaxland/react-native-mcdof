// Paysofter.js
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";
// import PaysofterButton from "./PaysofterButton";
import ApplyPromoCode from "../../ApplyPromoCode";
import LoaderPaysofter from "../../LoaderPaysofter";
import Message from "../../Message";
import { styles } from "./paysofterStyles";

const Paysofter = ({
  reference,
  order_id,
  totalPrice,
  taxPrice,
  userEmail,
  shippingPrice,
  itemsPrice,
  finalItemsPrice,
  promoDiscount,
  discountPercentage,
  promoTotalPrice,
  shipmentSave,
  paysofterPublicKey,
}) => {
  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { loading, error } = paymentCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const createdAt = new Date().toISOString();

  const paymentData = {
    reference: reference,
    order_id: order_id,
    amount: totalPrice,
    email: userEmail,
    items_amount: itemsPrice,
    final_items_amount: finalItemsPrice,
    promo_code_discount_amount: promoDiscount,
    promo_code_discount_percentage: discountPercentage,
    final_total_amount: promoTotalPrice,
  };

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>
          {item.qty} x NGN {item.price} = NGN {item.qty * item.price}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paysofter Payment Option</Text>
      {loading && <LoaderPaysofter />}
      {error && <Message variant="danger">{error}</Message>}
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.product.toString()}
      />
      <Text style={styles.boldText}>Order ID: {order_id}</Text>
      <Text style={styles.boldText}>
        Shipping Address: {shipmentSave.address}, {shipmentSave.city},{" "}
        {shipmentSave.country}
      </Text>
      <Text style={styles.boldText}>
        Shipping Cost: NGN{" "}
        {shippingPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
      <Text style={styles.boldText}>
        Tax: NGN{" "}
        {taxPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
      <Text style={styles.boldText}>
        Total Amount: NGN{" "}
        {totalPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Text>
      <Text style={styles.boldText}>
        Promo Discount: NGN{" "}
        {promoDiscount ? (
          <Text style={styles.promoText}>
            {promoDiscount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            ({discountPercentage}%)
          </Text>
        ) : (
          <Text>0</Text>
        )}
      </Text>
      <Text style={styles.boldText}>
        Final Total Amount: NGN{" "}
        {promoTotalPrice ? (
          <Text>
            {promoTotalPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        ) : (
          <Text>
            {totalPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Text>
        )}
      </Text>
      <Text style={[styles.boldText, styles.timestamp]}>Timestamp: {createdAt}</Text>
      <View style={styles.promoContainer}>
        <ApplyPromoCode order_id={order_id} />
      </View>
      <View style={styles.buttonContainer}>
        {/* <PaysofterButton
          paymentData={paymentData}
          reference={reference}
          userEmail={userEmail}
          promoTotalPrice={promoTotalPrice}
          publicApiKey={paysofterPublicKey}
        /> */}
      </View>
    </View>
  );
};

export default Paysofter;
