// PromoScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { applyPromoCode, setTimer } from "../actions/promoActions";

const PromoScreen = () => {
  const dispatch = useDispatch();
  const { promoCode, promoError, timer } = useSelector((state) => state.promo);
  const [inputCode, setInputCode] = useState("");

  const applyPromoCodeHandler = () => {
    dispatch(applyPromoCode(inputCode));
  };

  useEffect(() => {
    // Start the countdown timer
    const interval = setInterval(() => {
      if (timer > 0) {
        dispatch(setTimer(timer - 1));
      }
    }, 1000);

    // Clean up
    return () => {
      clearInterval(interval);
    };
  }, [timer, dispatch]);

  return (
    <View>
      <Text>Promo Code</Text>
      {promoError && <Text>Error: {promoError}</Text>}
      {promoCode ? (
        <>
          <Text>Promo code applied successfully</Text>
          {timer > 0 ? (
            <Text>Time left: {timer} seconds</Text>
          ) : (
            <Text>Promo code expired</Text>
          )}
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter promo code"
            onChangeText={(text) => setInputCode(text)}
            value={inputCode}
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 16, padding: 8 }}
          />
          <Button title="Apply Promo Code" onPress={applyPromoCodeHandler} />
        </>
      )}
    </View>
  );
};

export default PromoScreen;
