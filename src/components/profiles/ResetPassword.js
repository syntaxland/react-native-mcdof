// ResetPassword.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../actions/userProfileActions";

const ResetPassword = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { token } = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const resetPwd = useSelector((state) => state.resetPassword);
  const { success, error, loading } = resetPwd;

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    }
  }, [success, navigation]);

  const handleSubmit = () => {
    if (newPassword === confirmNewPassword) {
      dispatch(resetPassword(token, newPassword));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      {success && <Text style={styles.successMessage}>Password reset successfully.</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />
      <Button
        title="Reset Password"
        onPress={handleSubmit}
        disabled={loading}
        color="#007bff"
      />
      {loading && <ActivityIndicator style={styles.loader} size="large" color="#007bff" />}
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
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 10,
  },
  successMessage: {
    color: "green",
    marginBottom: 16,
  },
  errorMessage: {
    color: "red",
    marginBottom: 16,
  },
  loader: {
    marginTop: 16,
  },
});

export default ResetPassword;
