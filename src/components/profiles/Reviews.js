// Reviews.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUseReviews } from "../../redux/actions/orderActions";
import Message from "../../Message";
import Loader from "../../Loader";
import Rating from "../../Rating";
import Pagination from "../../Pagination"; 

const Reviews = () => {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  useEffect(() => {
    dispatch(getUseReviews());
  }, [dispatch]);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Reviews</Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <ScrollView horizontal={true}>
                <View style={styles.tableContainer}>
                  <View style={styles.tableHeader}>
                    <Text style={styles.headerCell}>SN</Text>
                    <Text style={styles.headerCell}>Product</Text>
                    <Text style={styles.headerCell}>Name</Text>
                    <Text style={styles.headerCell}>Order ID</Text>
                    <Text style={styles.headerCell}>User</Text>
                    <Text style={styles.headerCell}>Rating</Text>
                    <Text style={styles.headerCell}>Comment</Text>
                    <Text style={styles.headerCell}>Created At</Text>
                  </View>
                  {currentItems.map((review, index) => (
                    <View key={review._id} style={styles.tableRow}>
                      <Text style={styles.cell}>{index + 1}</Text>
                      <Text style={styles.cell}>{review.product.name}</Text>
                      <Text style={styles.cell}>{review.product.name}</Text>
                      <Text style={styles.cell}>{review.order_id}</Text>
                      <Text style={styles.cell}>
                        {review.user.first_name} {review.user.last_name}
                      </Text>
                      <Rating
                        value={review.rating}
                        color={"#f8e825"}
                        size={20}
                      />
                      <Text style={styles.cell}>{review.comment}</Text>
                      <Text style={styles.cell}>
                        {new Date(review.createdAt).toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>
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
  tableContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Reviews;
