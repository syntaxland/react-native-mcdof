// SupportTicketScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper"; 
import { Picker } from "@react-native-picker/picker"; 

import { createSupportTicket } from "../../redux/actions/supportActions";
import Loader from "../../Loader";
import Message from "../../Message";

const SupportTicketScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); 

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("support"); // Initialize category state
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo]);

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
    if (success) {
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1000);
    }
  }, [success, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Create A New Support Ticket</Text>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">Ticket created successfully.</Message>
          )}
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Support" value="support" />
            <Picker.Item label="Billing" value="billing" />
            <Picker.Item label="Abuse" value="abuse" />
            <Picker.Item label="OTP" value="otp" />
            <Picker.Item label="Payments" value="payments" />
            <Picker.Item label="Services" value="services" />
            <Picker.Item label="Credit Points" value="credit_points" />
            <Picker.Item label="Referrals" value="referrals" />
            <Picker.Item label="Others" value="others" />
          </Picker>
          <TextInput
            label="Subject"
            value={subject}
            onChangeText={(text) => setSubject(text)}
            mode="outlined"
            style={styles.input}
            maxLength={80}
          />
          <TextInput
            label="Message"
            value={message}
            onChangeText={(text) => setMessage(text)}
            mode="outlined"
            style={styles.input}
            multiline
            numberOfLines={4}
            maxLength={1000}
          />
          <Button
            mode="contained"
            onPress={submitHandler}
            disabled={message === "" || subject === "" || loading || success}
            style={styles.button}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 10,
  },
});

export default SupportTicketScreen;
