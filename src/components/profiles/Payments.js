// Payments.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { listPayments } from "../../redux/actions/paymentActions";
import Message from "../../Message";
import Loader from "../../Loader";
import { DataTable } from "react-native-paper";
import Pagination from "../../Pagination";

const Payments = () => {
  const dispatch = useDispatch();

  const paymentList = useSelector((state) => state.paymentList);
  const { loading, error, payments } = paymentList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(payments.length / itemsPerPage);

  useEffect(() => {
    dispatch(listPayments());
  }, [dispatch]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Payments</Text>
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
                      Email
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Total Amount (Tax + Shipping)
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Discount Amount
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Total Items Amount
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Discount Percentage
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Final Total Amount Paid
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Payment Reference
                    </DataTable.Title>
                    <DataTable.Title style={styles.headerCell}>
                      Created At
                    </DataTable.Title>
                  </DataTable.Header>

                  {currentItems.map((payment, index) => (
                    <DataTable.Row key={payment.id}>
                      <DataTable.Cell style={styles.snCell}>
                        {indexOfFirstItem + index + 1}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {payment.order_id}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {payment.first_name}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {payment.user.email}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        NGN {payment.amount}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        NGN {payment.promo_code_discount_amount}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        NGN {payment.items_amount}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {payment.promo_code_discount_percentage}%
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        NGN {payment.final_total_amount}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {payment.reference}
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.cell}>
                        {new Date(payment.created_at).toLocaleString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                        })}
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
    width: 180,
    marginLeft: 10,
  },
  cell: {
    width: 180,
    marginLeft: 10,
  },
  snHeaderCell: {
    width: 50,
  },
  snCell: {
    width: 50,
  },
});

export default Payments;

