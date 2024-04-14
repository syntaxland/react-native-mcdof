// SupportTicketScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createSupportTicket } from "../../actions/supportActions";
import Loader from "../Loader";
import Message from "../Message";

const SupportTicketScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("support");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createSupportTicketState = useSelector(
    (state) => state.createSupportTicketState
  );
  const { loading, success, error } = createSupportTicketState;

  const submitHandler = () => {
    const ticketData = {
      subject: subject,
      category: category,
      message: message,
    };

    dispatch(createSupportTicket(ticketData));
  };

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create A New Support Ticket</Text>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Ticket created successfully.</Message>}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChangeText={setSubject}
          maxLength={80}
        />
        <TextInput
          style={styles.input}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          maxLength={1000}
          multiline
        />
        <Button
          title="Submit"
          onPress={submitHandler}
          disabled={message === "" || subject === "" || loading || success}
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
  },
});

export default SupportTicketScreen;
