// OrderShipment.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserShipments } from "../../actions/orderActions";
import Message from "../Message";
import Loader from "../Loader";

const OrderShipment = () => {
  const dispatch = useDispatch();

  const userShipments = useSelector((state) => state.userShipments);
  const { loading, error, shipments } = userShipments;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getUserShipments());
  }, [dispatch]);

  // Function to get current items for the current page
  const getCurrentItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return shipments.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Function to handle pagination
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shipments</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <FlatList
            data={getCurrentItems()}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.shipmentItem}>
                <Text style={styles.itemText}>Order ID: {item.order.order_id}</Text>
                <Text style={styles.itemText}>Address: {item.address}</Text>
                <Text style={styles.itemText}>City: {item.city}</Text>
                <Text style={styles.itemText}>Postal Code: {item.postalCode}</Text>
                <Text style={styles.itemText}>Country: {item.country}</Text>
                <Text style={styles.itemText}>Shipping Price: {item.shippingPrice}</Text>
                <Text style={styles.itemText}>Is Delivered: {item.isDelivered ? "Yes" : "No"}</Text>
              </View>
            )}
          />
          <View style={styles.pagination}>
            <TouchableOpacity
              onPress={() => handlePaginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={styles.pageButton}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageNumber}>{currentPage}</Text>
            <TouchableOpacity
              onPress={() => handlePaginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(shipments.length / itemsPerPage)}
            >
              <Text style={styles.pageButton}>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <View style={styles.liveTracking}>
        <Text style={styles.title}>Live Shipment Tracking</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  shipmentItem: {
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  pageButton: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: 4,
    marginHorizontal: 8,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  liveTracking: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
});

export default OrderShipment;
