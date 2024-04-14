// ReviewScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, FlatList, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "@react-navigation/native";
import { listReviews } from "../../actions/orderActions";
import Rating from "../Rating";

const ReviewScreen = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  
  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(listReviews(productId));
  }, [dispatch, productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Math.ceil(reviews.length / itemsPerPage);

  const renderReviewItem = ({ item, index }) => (
    <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
      <Text>{index + 1}</Text>
      <Image
        source={{ uri: item.product.image }}
        style={{ width: 80, height: 80, borderRadius: 10 }}
      />
      <Text>{item.product.name}</Text>
      <Text>{`${item.user.first_name} ${item.user.last_name}`}</Text>
      <Rating value={item.rating} color={"#f8e825"} />
      <Text>{item.comment}</Text>
      <Text>{new Date(item.createdAt).toLocaleString()}</Text>
      <Button title="Like" onPress={() => console.log("Liked")} />
    </View>
  );

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ textAlign: "center", fontSize: 24, marginBottom: 10 }}>
        Reviews
      </Text>
      <FlatList
        data={currentItems}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item._id}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button title="Previous" onPress={handlePrevPage} disabled={currentPage === 1} />
        <Text>{currentPage}/{pageNumbers}</Text>
        <Button title="Next" onPress={handleNextPage} disabled={currentPage === pageNumbers} />
      </View>
    </View>
  );
};

export default ReviewScreen;
