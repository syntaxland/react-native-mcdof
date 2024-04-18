import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { formatAmount } from "../../FormatAmount";
import { styles } from "../screenStyles";

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { id: productId, qty = 1 } = route.params || {};

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigation.navigate("Checkout");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackIcon}>
          <FontAwesomeIcon
            // size={24}
            color="blue"
            icon={faArrowLeft}
          />{" "}
          {/* Go Back */}
          Previous
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Shopping Cart</Text>
          {cartItems.length === 0 ? (
            <Text style={styles.error}>Your cart is empty</Text>
          ) : (
            <>
              {cartItems.map((item) => (
                <View key={item.product} style={{ marginBottom: 10 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text>{item.name}</Text>
                  <Text>Price: NGN {formatAmount(item.price)}</Text>
                  <Text>Quantity: {item.qty}</Text>
                  <TouchableOpacity
                    onPress={() => removeFromCartHandler(item.product)}
                  >
                    <Text style={{ color: "red" }}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={{ marginBottom: 10, padding: 10 }}>  
                <TouchableOpacity
                  style={{
                    backgroundColor: cartItems.length > 0 ? "green" : "gray",
                    padding: 15,
                    borderRadius: 5,
                    marginTop: 10,
                  }}
                  disabled={cartItems.length === 0}
                  onPress={checkoutHandler}
                >
                  <Text
                    style={{ color: "#fff", textAlign: "center", padding: 2 }}
                  >
                    Proceed To Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
