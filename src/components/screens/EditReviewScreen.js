import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import Loader from "../Loader";
import Message from "../Message";
import { editReview } from "../../actions/orderActions";

const EditReviewScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const { reviewId } = route.params;

  const reviewEdit = useSelector((state) => state.orderEditReview);
  const { loading, success, error } = reviewEdit;

  const submitHandler = () => {
    dispatch(editReview(reviewId, rating, comment));
    setRating("");
    setComment("");
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
        <Text style={styles.title}>Edit Review</Text>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Review updated successfully!</Message>}
        <View style={styles.inputContainer}>
          <Text>Rating</Text>
          <TextInput
            style={styles.input}
            placeholder="Rating"
            value={rating.toString()}
            onChangeText={(value) => setRating(parseFloat(value))}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Comment</Text>
          <TextInput
            style={styles.input}
            placeholder="Comment"
            value={comment}
            onChangeText={(value) => setComment(value)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitHandler}>
          <Text style={styles.buttonText}>Update Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditReviewScreen;

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
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};
