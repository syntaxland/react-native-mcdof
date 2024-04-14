// OrderItem.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { listOrderItems } from "../../actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";
import { styles } from "../screenStyles";

const OrderItem = () => {
  const dispatch = useDispatch();

  const orderItemsList = useSelector((state) => state.orderItemsList);
  const { loading, error, orderItems } = orderItemsList;

  useEffect(() => {
    dispatch(listOrderItems());
  }, [dispatch]);

  const renderItem = ({ item, index }) => (
    <View style={styles.orderItemContainer}>
      <Text style={styles.orderItemIndex}>{index + 1}</Text>
      <Image
        source={{ uri: item.image }}
        style={styles.orderItemImage}
      />
      <View style={styles.orderItemDetails}>
        <Text style={styles.orderItemName}>{item.name}</Text>
        <Text style={styles.orderItemOrderID}>Order ID: {item.order.order_id}</Text>
        <Text style={styles.orderItemQty}>Qty: {item.qty}</Text>
        <Text style={styles.orderItemPrice}>Price: {item.price}</Text>
        <Text style={styles.orderItemUser}>
          User: {item.order.user.first_name} {item.order.user.last_name}
        </Text>
        <Text style={styles.orderItemCreated}>
          Created: {new Date(item.order.createdAt).toLocaleString()}
        </Text>
        <TouchableOpacity
          style={styles.orderItemButton}
          onPress={() => handleReviewNavigation(item._id)}
          disabled={!item.order.isPaid}
        >
          <Text style={styles.orderItemButtonText}>
            {item.order.isPaid ? "Add Review" : "Order Not Paid"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleReviewNavigation = (itemId) => {
    // Navigate to Add Review screen with order item ID
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Items</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FlatList
          data={orderItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default OrderItem;
