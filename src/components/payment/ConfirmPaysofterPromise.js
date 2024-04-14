// ConfirmPaysofterPromise.js
import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../actions/cartActions";
import { useNavigation } from "@react-navigation/native";

const ConfirmPaysofterPromise = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);

  const handleConfirmPromise = () => {
    dispatch(clearCart());
    Linking.openURL("https://paysofter.com/promise/buyer");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Paysofter Promise</Text>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Promise successfully created!</Text>
        <Text style={styles.description}>
          Is Promise fulfilled? Check your email or login to your Paysofter
          account to check out the Promise status to confirm.
        </Text>
        <Button
          title="Confirm Promise (at Paysofter)"
          onPress={handleConfirmPromise}
          color="#007bff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  content: {
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
});

export default ConfirmPaysofterPromise;
