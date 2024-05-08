// OrderShipment.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserShipments } from "../../redux/actions/orderActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { DataTable } from "react-native-paper";
import Pagination from "../../Pagination";

const OrderShipment = () => {
  const dispatch = useDispatch();

  const userShipments = useSelector((state) => state.userShipments);
  const { loading, error, shipments } = userShipments;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shipments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(shipments.length / itemsPerPage);

  useEffect(() => {
    dispatch(getUserShipments());
  }, [dispatch]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView horizontal={true} vertical={true}>
        <View style={styles.container}>
          <Text style={styles.title}>Shipments</Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={styles.snHeaderCell}>SN</DataTable.Title>
                  <DataTable.Title style={styles.headerCell}>Order ID</DataTable.Title>
                  <DataTable.Title style={styles.headerCell}>Address</DataTable.Title>
                  <DataTable.Title style={styles.headerCell}>City</DataTable.Title>
                  <DataTable.Title style={styles.headerCell}>Postal Code</DataTable.Title>
                  <DataTable.Title style={styles.headerCell}>Country</DataTable.Title>
                  <DataTable.Title style={styles.headerCell}>Shipping Price</DataTable.Title>
                  <DataTable.Title style={styles.headerCell}>Is Delivered</DataTable.Title>
                </DataTable.Header>
                {currentItems.map((address, index) => (
                  <DataTable.Row key={address._id}>
                    <DataTable.Cell style={styles.snCell}>{indexOfFirstItem + index + 1}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{address.order.order_id}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{address.address}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{address.city}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{address.postalCode}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{address.country}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{address.shippingPrice}</DataTable.Cell>
                    <DataTable.Cell style={styles.cell}>{address.isDelivered ? "Yes" : "No"}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </>
          )}
        </View>
        
      </ScrollView>
      <View style={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={handlePagination}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // padding: 8, 
    // paddingVertical: 10,
    // paddingBottom: 10,
  },
  container: {
    flex: 1,
    // padding: 10,
    // paddingVertical: 10,
    // paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  headerCell: {
    flex: 1.5,
    minWidth: 200,
    marginLeft: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  cell: {
    flex: 1.5,
    minWidth: 200,
    marginLeft: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  snHeaderCell: {
    flex: 0.8,
    // justifyContent: "center",
    // alignItems: "center",
  },
  snCell: {
    flex: 0.8,
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default OrderShipment;

