// RecommendedProducts.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecommendedProducts } from "../actions/productAction";
import Product from "../../Product";
import Message from "../../Message";
import Loader from "../../Loader";
import Pagination from "../../Pagination";

function RecommendedProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecommendedProducts());
  }, [dispatch]);

  const recommendedProducts = useSelector((state) => state.recommendedProducts);
  const { loading, error, productsRecommended } = recommendedProducts;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsRecommended?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalItems = productsRecommended?.length;

  return (
    <View>
      <ScrollView>
        <View>
          <Text style={{ textAlign: "center", fontSize: 24, marginTop: 20 }}>
            Recommended Products
          </Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems?.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  Recommended products appear here.
                </Text>
              ) : (
                <View>
                  {currentItems?.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </View>
              )}
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default RecommendedProducts;
