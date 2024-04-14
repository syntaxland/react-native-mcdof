// SavedItems.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getUserFavoriteProducts } from '../../actions/productAction';
import Product from '../Product';
import Message from '../Message';
import Loader from '../Loader';
import { styles } from '../screenStyles';

const SavedItems = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => { 
    dispatch(getUserFavoriteProducts());
  }, [dispatch]);

  const userFavoriteProducts = useSelector((state) => state.userFavoriteProducts);
  const { loading, error, products } = userFavoriteProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItemContainer}
      onPress={() => navigation.navigate('ProductDetails', { productId: item._id })}
    >
      <Product product={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Products</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FlatList
          data={currentItems}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.productList}
        />
      )}
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === 1 && styles.disabled]}
          onPress={prevPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>
          Page {currentPage} of {totalPages}
        </Text>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === totalPages && styles.disabled]}
          onPress={nextPage}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavedItems;
