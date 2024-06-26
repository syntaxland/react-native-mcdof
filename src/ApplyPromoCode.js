// ApplyPromoCode.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  // TouchableOpacity,
} from "react-native";
import { applyPromoCode } from "./redux/actions/promoActions";
import Message from "./Message";
import Loader from "./Loader";

const ApplyPromoCode = ({ order_id }) => {
  const dispatch = useDispatch();

  const applyPomoCodeState = useSelector((state) => state.applyPomoCodeState);
  const { loading, success, discountPercentage, promoDiscount, error } =
    applyPomoCodeState;

  const [promoCode, setPromoCode] = useState("");

  const applyCodeHandler = () => {
    dispatch(applyPromoCode(promoCode, order_id));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {}, 3000);
    }
  }, [success]);

  return (
    <View>
      <View>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">
            Promo code "{promoCode}" with {discountPercentage}% discount applied
            successfully.
          </Message>
        )}
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter promo code if any"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <View
          style={[
            // styles.buttonContainer,
            { backgroundColor: "#dc3545", borderRadius: 5 },
          ]}
        >
          <Button
            title="Apply Promo Code"
            onPress={applyCodeHandler}
            disabled={!promoCode.trim()}
          />
        </View>

        {/* <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: "#dc3545", padding: 7, borderRadius: 5 },
          ]}
          onPress={applyCodeHandler}
          disabled={!promoCode.trim()}
        >
          <Text style={styles.buttonText}>Apply Promo Code</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ApplyPromoCode;
