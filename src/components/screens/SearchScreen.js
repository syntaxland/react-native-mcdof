// SearchScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Picker,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { searchProducts } from "../../actions/productAction";
import Product from "../Product";
import Loader from "../Loader";
import Message from "../Message";

const SearchScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { keyword } = route.params;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("createdAt");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    dispatch(
      searchProducts(keyword)
    );
  }, [dispatch, keyword]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results for "{keyword}"</Text>
      <ScrollView>
        {/* Filters */}
        <View style={styles.filterContainer}>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Filter by Category" value="" />
            <Picker.Item label="Shower" value="Shower" />
            <Picker.Item label="Basins" value="Basins" />
          </Picker>
          {/* Add more filter pickers here */}

          {/* Sort Order */}
          <Picker
            selectedValue={sortOrder}
            style={styles.picker}
            onValueChange={(itemValue) => setSortOrder(itemValue)}
          >
            <Picker.Item label="Sort by" value="" />
            <Picker.Item label="Latest" value="-createdAt" />
            <Picker.Item label="Oldest" value="createdAt" />
            <Picker.Item label="Rating" value="rating" />
            {/* Add more sorting options here */}
          </Picker>
        </View>

        {/* Product List */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products.length === 0 ? (
          <Message variant="danger">No products found for "{keyword}"</Message>
        ) : (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    marginRight: 10,
  },
});

export default SearchScreen;
