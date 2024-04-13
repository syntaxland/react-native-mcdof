// GetProductScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productAction";
import Product from "../../Product";
import Loader from "../../Loader";
import Message from "../../Message";
import Pagination from "../../Pagination";
import { styles } from "../screenStyles";

function GetProductScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  console.log("product length:", products?.length);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalItems = products?.length;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ textAlign: "center", fontSize: 24, marginTop: 20 }}>
            Latest Products
          </Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems?.length === 0 ? (
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                  Latest products appear here.
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
    </SafeAreaView>
  );
}

export default GetProductScreen;
