// QrPayment.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QrPayment = () => {
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login"); 
    }
  }, [userInfo, navigation]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visa QR</Text>
      <Text>Coming soon...</Text>
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
});

export default QrPayment;
