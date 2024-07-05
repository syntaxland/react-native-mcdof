// Paysofter.js
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ApplyPromoCode from "../../ApplyPromoCode";
import PaysofterButton from "./PaysofterButton";
import { styles } from "../screenStyles";
import { formatAmount } from "../../FormatAmount";

const Paysofter = ({
  order_id,
  totalPrice,
  taxPrice,
  shippingPrice,
  itemsPrice,
  finalItemsPrice,
  promoDiscount,
  discountPercentage,
  shipmentSave,
  reference,
  paysofterPublicKey,
  userEmail,
  promoTotalPrice,
  currency,
  paymentData,
  amount,
}) => {
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const createdAt = new Date().toISOString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paysofter</Text>

      <View style={styles.viewContainer}>
        <Text>Order ID: {paymentData.order_id}</Text>
        <Text>
          Shipping Cost: {formatAmount(paymentData.shippingPrice)}{" "}
          {paymentData?.currency}{" "}
        </Text>
        <Text>
          Tax: {formatAmount(paymentData.taxPrice)} {paymentData?.currency}{" "}
        </Text>
        <Text>
          Total Amount: {formatAmount(paymentData.totalPrice)}{" "}
          {paymentData?.currency}{" "}
        </Text>
        <Text>
          Promo Discount: {formatAmount(paymentData?.promoDiscount)}{" "}
          {paymentData?.currency}{" "}
        </Text>
        <Text>
          Final Total Amount: {formatAmount(paymentData?.finalTotalPrice)}{" "}
          {paymentData?.currency}{" "}
        </Text>
        <Text>Timestamp: {createdAt}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <ApplyPromoCode order_id={paymentData.order_id} />
      </View>
      <View style={styles.buttonContainer}>
        <PaysofterButton
          paymentData={paymentData}
          reference={reference}
          userEmail={userEmail}
          promoTotalPrice={promoTotalPrice}
          publicApiKey={paysofterPublicKey}
          currency={currency}
          amount={amount}
        />

        {/* <Paystack
              paystackKey={paystackPublicKey}
              amount={paymentData.totalPrice}
              billingEmail={userEmail}
              billingMobile={paymentData.billingMobile}
              reference={reference}
              activityIndicatorColor="green"
              onCancel={() => setPaymentInitiated(false)}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              autoStart={true}
            /> */}
      </View>
    </View>
  );
};

export default Paysofter;
