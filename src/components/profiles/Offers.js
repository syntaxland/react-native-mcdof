// Offers.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { listPromoProducts } from "../../redux/actions/promoActions";
import Product from "../../Product";
import Loader from "../../Loader";
import Message from "../../Message";
import Pagination from "../../Pagination";

const Offers = () => {
  const dispatch = useDispatch();

  const promoProductList = useSelector((state) => state.promoProductList);
  const { loading, error, promoProducts } = promoProductList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promoProducts?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(promoProducts?.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(listPromoProducts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <View>
              {promoProducts?.length === 0 ? (
                <Text style={styles.noPromoProductsMessage}>
                  Running offers appear here.
                </Text>
              ) : (
                <>
                  <ScrollView horizontal={true}>
                    <View style={styles.productContainer}>
                      {currentItems?.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                    </View>
                  </ScrollView>
                  <View style={styles.pagination}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      paginate={paginate}
                    />
                  </View>
                </>
              )}
            </View>
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
  noPromoProductsMessage: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  productContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default Offers;

