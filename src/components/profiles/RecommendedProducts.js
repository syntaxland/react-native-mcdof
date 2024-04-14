// RecommendedProducts.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedProducts } from "../../actions/productAction";
import Product from "../Product";
import Message from "../Message";
import Loader from "../Loader";

const RecommendedProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendedProducts());
  }, [dispatch]);

  const recommendedProducts = useSelector(
    (state) => state.recommendedProducts
  );
  const { loading, error, productsRecommended } = recommendedProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsRecommended?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(productsRecommended?.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderItem = ({ item }) => <Product product={item} />;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Recommended Products
      </Text>
      {currentItems?.length === 0 ? (
        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          Recommended products appear here.
        </Text>
      ) : (
        <FlatList
          data={currentItems}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
        />
      )}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {pageNumbers.map((number) => (
          <TouchableOpacity
            key={number}
            onPress={() => handlePagination(number)}
            style={{
              backgroundColor:
                currentPage === number ? "blue" : "transparent",
              padding: 10,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: currentPage === number ? "white" : "black" }}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RecommendedProducts;
