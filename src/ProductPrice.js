// ProductPrice.js
import React from "react";
import { Text, View } from "react-native";
import { formatAmount } from "./FormatAmount";

const ProductPrice = ({ price, promoPrice }) => {
  const discountPercentage = promoPrice
    ? ((price - promoPrice) / price) * 100
    : 0;

  const formattedPrice = price;
  const formattedPromoPrice = promoPrice;

  return (
    <View>
      <Text>
        NGN{" "}
        {promoPrice ? (
          <Text style={{ textDecorationLine: "line-through" }}>
            {formatAmount(formattedPrice)}
          </Text>
        ) : (
          formatAmount(formattedPrice)
        )}
        {promoPrice && (
          <>
            {" "}
            <Text style={{ color: "red" }}>
              NGN {formatAmount(formattedPromoPrice)}
            </Text>
            <Text> </Text>
          </>
        )}
      </Text>

      {promoPrice && (
        <View>
          <Text style={{ color: "green" }}>
            {discountPercentage.toFixed(2)}% Off
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProductPrice;
