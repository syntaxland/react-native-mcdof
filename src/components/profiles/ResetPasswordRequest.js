// ResetPasswordRequest
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetLink } from "../../actions/userProfileActions";

const ResetPasswordRequest = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const sendPasswordLink = useSelector((state) => state.sendPasswordResetLink);
  const { success, error, loading } = sendPasswordLink;

  const handleSubmit = () => {
    dispatch(sendPasswordResetLink(email));
  };

  useEffect(() => {
    if (success) {
      // Navigate to login screen after successful password reset link sent
      navigation.navigate("Login");
    }
  }, [success]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      {success && <Text style={styles.successMessage}>Password reset link sent successfully to {email}.</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
      />
      <Button title="Send Reset Link" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  successMessage: {
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ResetPasswordRequest;

