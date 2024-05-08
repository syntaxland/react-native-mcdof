// SavedItems.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavoriteProducts } from '../../redux/actions/productAction';
import Product from '../../Product';
import Message from '../../Message';
import Loader from '../../Loader';
import Pagination from "../../Pagination";

function SavedItems() {
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getUserFavoriteProducts());
  }, [dispatch]);

  const userFavoriteProducts = useSelector((state) => state.userFavoriteProducts);
  const { loading, error, products } = userFavoriteProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Saved Products</Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.map((product) => (
                <Product key={product._id} product={product} />
              ))}
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
      </ScrollView>
    </SafeAreaView>
  );
}

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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default SavedItems;
