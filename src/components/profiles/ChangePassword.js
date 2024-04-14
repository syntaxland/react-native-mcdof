// ChangePassword.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../actions/userProfileActions";

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { success, error, loading } = userChangePassword;

  const handleSubmit = () => {
    if (newPassword === confirmNewPassword) {
      dispatch(changePassword(oldPassword, newPassword));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      {success && <Text style={styles.successMessage}>Password changed successfully.</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry={true}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />
      <Button title="Change Password" onPress={handleSubmit} disabled={loading} />
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
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  successMessage: {
    color: "green",
    marginBottom: 16,
  },
  errorMessage: {
    color: "red",
    marginBottom: 16,
  },
});

export default ChangePasswordScreen;
