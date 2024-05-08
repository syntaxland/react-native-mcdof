// Feedback.js
import React, { useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { listFeedbacks } from "../../redux/actions/feedbackActions";

function Feedback() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const feedbackList = useSelector((state) => state.feedbackList);
  const { feedbacks } = feedbackList;

  useEffect(() => {
    dispatch(listFeedbacks());
  }, []);

  const handleSendFeedback = () => {
    navigation.navigate("FeedbackScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Would you want to send us a feedback?</Text>
        <TouchableOpacity onPress={handleSendFeedback} style={styles.button}>
          <Text style={styles.buttonText}>Send Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
  },
  text: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Feedback;
