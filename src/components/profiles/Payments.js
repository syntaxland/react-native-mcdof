// Payments.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { listPayments } from "../../actions/paymentActions";
import { styles } from "../screenStyles";

const Payments = () => {
  const dispatch = useDispatch();
  const paymentList = useSelector((state) => state.paymentList);
  const { loading, error, payments } = paymentList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(listPayments());
  }, [dispatch]);

  const renderPaymentItem = ({ item, index }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentText}>{index + 1}</Text>
      <Text style={styles.paymentText}>{item.order_id}</Text>
      <Text style={styles.paymentText}>{item.first_name}</Text>
      <Text style={styles.paymentText}>{item.user.email}</Text>
      <Text style={styles.paymentText}>NGN {item.amount}</Text>
      <Text style={styles.paymentText}>NGN {item.promo_code_discount_amount}</Text>
      <Text style={styles.paymentText}>NGN {item.items_amount}</Text>
      <Text style={styles.paymentText}>{item.promo_code_discount_percentage}%</Text>
      <Text style={styles.paymentText}>NGN {item.final_total_amount}</Text>
      <Text style={styles.paymentText}>{item.reference}</Text>
      <Text style={styles.paymentText}>
        {new Date(item.created_at).toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        })}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payments</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={payments}
          renderItem={renderPaymentItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.paymentList}
        />
      )}
    </View>
  );
};

export default Payments;
