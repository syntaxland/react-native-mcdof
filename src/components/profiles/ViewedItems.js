// ViewedItems.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { getUserViewedProducts } from '../../actions/productAction';
import Product from '../Product';
import Message from '../Message';
import Loader from '../Loader';

const ViewedItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserViewedProducts());
  }, [dispatch]);

  const userViewedProducts = useSelector((state) => state.userViewedProducts);
  const { loading, error, products } = userViewedProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <View>
      <Text style={styles.title}>
        <FontAwesomeIcon icon={faToggleOn} /> Viewed Products
      </Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ScrollView>
            {currentItems.map((product) => (
              <Product key={product._id} product={product} />
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
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  paginationButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activePaginationButton: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
});

export default ViewedItems;

