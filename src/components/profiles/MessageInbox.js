// MessageInbox.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../actions/messagingActions";
import Message from "../Message";
import Loader from "../Loader";
import DOMPurify from "dompurify";

const MessageInbox = () => {
  const dispatch = useDispatch();

  const messaging = useSelector((state) => state.messaging);
  const { loading, messages, loadingError } = messaging;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.sender}>{item.sender.username}</Text>
      <Text style={styles.timestamp}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Text style={styles.message}>
        {item.message.split(" ").length > 10
          ? item.message.split(" ").slice(0, 10).join(" ") + " ..."
          : item.message}
      </Text>
      {item.message.split(" ").length > 10 && (
        <Button
          title="Read More"
          onPress={() => expandMessage(item.id)}
          color="#007bff"
        />
      )}
    </View>
  );

  return (
    <View>
      <Text style={styles.title}>Message Inbox</Text>
      {loadingError && <Message variant="danger">{loadingError}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          {/* Pagination buttons */}
          <View style={styles.pagination}>
            <Button
              title="Previous"
              onPress={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              color="#007bff"
            />
            <Text style={styles.pageNumber}>{currentPage}</Text>
            <Button
              title="Next"
              onPress={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage * itemsPerPage >= messages.length || loading
              }
              color="#007bff"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = {
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sender: {
    fontSize: 16,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 14,
    marginBottom: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default MessageInbox;
