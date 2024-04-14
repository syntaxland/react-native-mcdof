// Reviews.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getUseReviews } from "../../actions/orderActions";
import Message from "../Message";
import Loader from "../Loader";
import Rating from "../Rating";
import { styles } from "../screenStyles";

const Reviews = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getUseReviews());
  }, [dispatch]);

  const renderReviewItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.reviewItemContainer}
      onPress={() =>
        navigation.navigate("EditReview", { reviewId: item._id })
      }
    >
      <View style={styles.reviewItem}>
        <View style={styles.reviewItemHeader}>
          <Text style={styles.reviewItemSN}>{index + 1}</Text>
          <Image
            source={{ uri: item.product.image }}
            style={styles.reviewItemImage}
          />
          <Text style={styles.reviewItemName}>{item.product.name}</Text>
        </View>
        <View style={styles.reviewItemDetails}>
          <Text style={styles.reviewItemText}>
            Order ID: {item.order_id}
          </Text>
          <Text style={styles.reviewItemText}>
            User: {item.user.first_name} {item.user.last_name}
          </Text>
          <Rating value={item.rating} color={"#f8e825"} />
          <Text style={styles.reviewItemText}>{item.comment}</Text>
          <Text style={styles.reviewItemText}>
            Created At: {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item._id.toString()}
          style={styles.reviewList}
        />
      )}
    </View>
  );
};

export default Reviews;
