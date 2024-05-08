// Orders.js
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import {
  getOrders,
  // confirmOrderDelivery,
  // deleteOrder,
} from "../../redux/actions/orderActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { DataTable } from "react-native-paper";
import Pagination from "../../Pagination";

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
  const currentItems = orders?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders?.length / itemsPerPage);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getOrders());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(getOrders());
    if (deleteSuccess) {
      setShowDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteSuccess(false);
      }, 3000);
    }
  }, [dispatch, deleteSuccess]);

  // const handleConfirmDelivery = (orderId) => {
  //   dispatch(confirmOrderDelivery(orderId));
  // };

  // const deleteHandler = (id) => {
  //   const orderToDelete = orders?.find((order) => order._id === id);

  //   if (!orderToDelete.isPaid) {
  //     // Implement your confirmation logic here
  //     dispatch(deleteOrder(id));
  //   }
  // };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>
            <FontAwesomeIcon icon={faCartPlus} /> Orders
          </Text>
          {deleteLoading && <Loader />}
          {showDeleteSuccess && (
            <Message variant="success">Order deleted successfully</Message>
          )}
          {deleteError && <Message variant="danger">{deleteError}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <ScrollView horizontal={true}>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={styles.snHeaderCell}>
                      SN
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Order ID
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      User
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Payment Method
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Tax (3%)
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Shipping Price
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Total Price
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Paid
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Delivered
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Delivery Status
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Created At
                    </DataTable.Title>
                  </DataTable.Header>

                  {currentItems?.map((order, index) => (
                    <DataTable.Row key={order._id}>
                      <DataTable.Cell style={styles.snCell}>
                        {indexOfFirstItem + index + 1}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.order_id}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.user.first_name} {order.user.last_name}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.paymentMethod}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.taxPrice}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.shippingPrice}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.totalPrice}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.isPaid ? "Yes" : "No"}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.isDelivered ? "Yes" : "No"}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {order.is_delivered ? "Delivered" : "Not Delivered"}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {new Date(order.createdAt).toLocaleString()}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>
              </ScrollView>

              <View style={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  paginate={handlePagination}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  headerCell: {
    width: 150,
    marginLeft: 20,
    borderRightWidth: 1,
    borderColor: "black",
  },
  cell: {
    width: 150,
    marginLeft: 10,
  },
  snHeaderCell: {
    width: 50,
    borderRightWidth: 1,
    borderColor: "black",
  },
  snCell: {
    width: 50,
  },
});

export default Orders;
