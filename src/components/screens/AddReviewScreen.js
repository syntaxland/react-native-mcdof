// AddReviewScreen.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loader from "../Loader";
import Message from "../Message";
import { addReview } from "../../actions/orderActions";

const AddReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { orderItemId } = route.params;

  const reviewAdd = useSelector((state) => state.orderAddReview);
  const { loading, success, error } = reviewAdd;

  const submitHandler = () => {
    dispatch(addReview(orderItemId, rating, comment));
    setRating(5);
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
        <Text style={styles.title}>Add Review</Text>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Review added successfully.</Message>}
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
        <Button title="Submit Review" onPress={submitHandler} />
      </View>
    </ScrollView>
  );
};

export default AddReviewScreen;

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
