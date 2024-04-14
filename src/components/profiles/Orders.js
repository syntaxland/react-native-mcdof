// Orders.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { getOrders, confirmOderDelivery, deleteOrder } from "../../actions/orderActions";
import Message from "../Message";
import Loader from "../Loader";

const Orders = () => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = orderDelete;
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(deleteSuccess);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getOrders());
    if (deleteSuccess) {
      setShowDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteSuccess(false);
        dispatch({ type: "ORDER_DELETE_RESET" });
      }, 3000);
    }
  }, [dispatch, deleteSuccess]);

  const handleConfirmDelivery = (orderId) => {
    dispatch(confirmOderDelivery(orderId));
  };

  const deleteHandler = (id) => {
    const orderToDelete = orders.find((order) => order._id === id);

    // You can implement your own modal or confirmation dialogue in React Native
    // For simplicity, we'll use a basic alert
    if (!orderToDelete.isPaid) {
      if (window.confirm("Are you sure you want to delete this order?")) {
        dispatch(deleteOrder(id));
        setTimeout(() => {
          dispatch({ type: "ORDER_DELETE_RESET" });
        }, 3000);
      }
    }
  };

  return (
    <View>
      <Text style={styles.title}>
        <FontAwesomeIcon icon={faToggleOn} /> Orders
      </Text>
      {deleteLoading && <Loader />}
      {showDeleteSuccess && <Message variant="success">Order deleted successfully</Message>}
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ScrollView>
            {currentItems.map((order, index) => (
              <View key={order._id} style={styles.orderContainer}>
                {/* Display order details */}
              </View>
            ))}
          </ScrollView>

          <View style={styles.pagination}>
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text>Previous</Text>
            </TouchableOpacity>
            {/* Render page numbers */}
            {pageNumbers.map((number) => (
              <TouchableOpacity
                key={number}
                style={[
                  styles.paginationButton,
                  currentPage === number && styles.activePaginationButton,
                ]}
                onPress={() => paginate(number)}
              >
                <Text>{number}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.paginationButton}
              onPress={() => paginate(currentPage + 1)}
              disabled={currentPage === pageNumbers.length}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  orderContainer: {
    // Style for each order container
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  paginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  activePaginationButton: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
});

export default Orders;

