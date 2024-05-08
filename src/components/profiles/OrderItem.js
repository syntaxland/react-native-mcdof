// OrderItem.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { listOrderItems } from "../../redux/actions/orderActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { DataTable } from "react-native-paper";
import { Link } from "@react-navigation/native";
import Pagination from "../../Pagination";

const OrderItem = () => {
  const dispatch = useDispatch();

  const orderItemsList = useSelector((state) => state.orderItemsList);
  const { loading, error, orderItems } = orderItemsList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orderItems.length / itemsPerPage);

  useEffect(() => {
    dispatch(listOrderItems());
  }, [dispatch]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Purchased Items</Text>
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
                      Image
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Name
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Order ID
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Qty
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Price
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      User
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Created
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Status
                    </DataTable.Title>
                  </DataTable.Header>

                  {currentItems.map((item, index) => (
                    <DataTable.Row key={item._id}>
                      <DataTable.Cell style={styles.snCell}>
                        {indexOfFirstItem + index + 1}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.image}
                        />
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {item.name}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {item.order.order_id}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {item.qty}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {item.price}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {item.order.user.first_name}{" "}
                        {item.order.user.last_name}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {new Date(item.order.createdAt).toLocaleString()}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {item.order.isPaid ? (
                          <Link
                            to={{
                              pathname: "/add-review",
                              search: `?orderItemId=${item._id}`,
                            }}
                          >
                            Add Review
                          </Link>
                        ) : (
                          <Text>Order Not Paid</Text>
                        )}
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
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 10,
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
    width: 150,
    marginLeft: 10,
  },
  cell: {
    width: 150,
    marginLeft: 10,
  },
  snHeaderCell: {
    width: 50,
  },
  snCell: {
    width: 50,
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default OrderItem;
