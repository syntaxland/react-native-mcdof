// Feedback.js
import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "@react-navigation/native";
import { listFeedbacks } from "../../actions/feedbackActions";

const FeedbackScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const feedbackList = useSelector((state) => state.feedbackList);
  const { feedbacks } = feedbackList;

  useEffect(() => {
    dispatch(listFeedbacks());
  }, [dispatch]);

  const handleSendFeedback = () => {
    history.push("/feedback");
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Would you like to send us feedback?</Text>
        <Button
          title="Send Feedback"
          onPress={handleSendFeedback}
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
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
});

export default FeedbackScreen;
