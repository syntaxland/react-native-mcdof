// PromoProduct.js
import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { listPromoProducts } from "../../actions/promoActions";
import Loader from "../Loader";
import Message from "../Message";
import Product from "../Product";

const PromoProduct = () => {
  const dispatch = useDispatch();

  const promoProductList = useSelector((state) => state.promoProductList);
  const { loading, error, promoProducts } = promoProductList;

  useEffect(() => {
    dispatch(listPromoProducts());
  }, [dispatch]);

  const renderItem = ({ item }) => <Product product={item} />;

  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <View>
          {promoProducts.length === 0 ? (
            <Text style={styles.noPromoProducts}>Running offers appear here.</Text>
          ) : (
            <>
              <FlatList
                data={promoProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  noPromoProducts: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default PromoProduct;
