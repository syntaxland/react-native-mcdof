// FeedbackScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createFeedback } from "../../actions/feedbackActions";
import Loader from "../../Loader";
import Message from "../../Message";

const FeedbackScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const feedbackCreate = useSelector((state) => state.feedbackCreate);
  const { loading, success, error } = feedbackCreate;

  const submitHandler = () => {
    const feedbackData = {
      subject: subject,
      category: category,
      message: message,
    };

    dispatch(createFeedback(feedbackData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Feedback</Text>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Feedback sent successfully.</Message>}
        <View style={styles.inputContainer}>
          <Text>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={(value) => setCategory(value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={subject}
            onChangeText={(value) => setSubject(value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Message</Text>
          <TextInput
            style={[styles.input, { height: 120 }]}
            placeholder="Message"
            multiline={true}
            value={message}
            onChangeText={(value) => setMessage(value)}
          />
        </View>
        <Button title="Submit Feedback" onPress={submitHandler} />
      </View>
    </ScrollView>
  );
};

export default FeedbackScreen;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
};
