// DeleteAccount.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAccount } from "../../actions/userProfileActions";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Message from "../Message";
import Loader from "../Loader";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const deleteProfile = useSelector((state) => state.deleteProfile);
  const { success, error, loading } = deleteProfile;

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    }
  }, [success, navigation]);

  const handleDelete = () => {
    dispatch(deleteUserAccount(password));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      <View style={styles.form}>
        {loading && <Loader />}
        {success && (
          <Message variant="success">
            Account deleted successfully. You will be logged out.
          </Message>
        )}
        {error && <Message variant="danger">{deleteProfile.error}</Message>}

        <TextInput
          style={styles.input}
          value={userInfo.email}
          editable={false}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
        <Button
          title="Delete Account"
          onPress={handleDelete}
          color="#dc3545"
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
  form: {
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default DeleteAccount;
