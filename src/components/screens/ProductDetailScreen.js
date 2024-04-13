// ProductDetailScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { listProductDetails } from "../../redux/actions/productAction";
import ProductPrice from "../../ProductPrice";
import Rating from "../../Rating";
import { formatAmount } from "../../FormatAmount";
import Loader from "../../Loader";
import Message from "../../Message";
import { styles } from "../screenStyles";

function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { id } = route.params;
  console.log("id:", id);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigation.navigate("Cart", { id, qty });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBackIcon}>
              <FontAwesomeIcon
                // size={24}
                color="blue"
                icon={faArrowLeft}
              />{" "}
              Previous
            </Text>
          </TouchableOpacity>
          <View style={styles.container}>
            <Image
              source={{ uri: product.image }}
              style={{ width: "100%", height: 300 }}
            />

            <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 10 }}>
              {product.name}
            </Text>
            <Rating
              value={product.rating}
              text={`${product?.numReviews} reviews`}
              color="blue"
            />
            <ProductPrice
              price={product?.price}
              promoPrice={product?.promo_price}
            />

            <Text style={{ marginTop: 10 }}>{product.description}</Text>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: "bold" }}>
                Price: NGN {formatAmount(product.price)}
              </Text>
              <Text>
                Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </Text>

              {product.countInStock > 0 && (
                <View style={{ marginTop: 10 }}>
                  <Text>Qty</Text>
                  <Picker
                    selectedValue={qty}
                    onValueChange={(itemValue) => setQty(itemValue)}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <Picker.Item
                        key={x + 1}
                        label={`${x + 1}`}
                        value={x + 1}
                      />
                    ))}
                  </Picker>
                </View>
              )}

              <TouchableOpacity
                style={{
                  backgroundColor: product.countInStock > 0 ? "green" : "gray",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                disabled={product.countInStock === 0}
                onPress={addToCartHandler}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default ProductDetailScreen;
