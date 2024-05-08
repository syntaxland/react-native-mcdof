// MessageInbox.js
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { WebView } from "react-native-webview";
import { getMessages } from "../../redux/actions/messagingActions";
import Message from "../../Message";
import Loader from "../../Loader";

const MessageInbox = () => {
  const dispatch = useDispatch();

  const messaging = useSelector((state) => state.messaging);
  const { loading, messages, loadingError } = messaging;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(messages.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getMessages());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Text style={styles.title}>Message Inbox</Text>
          {loadingError && <Message variant="danger">{loadingError}</Message>}
          {loading ? (
            <Loader />
          ) : (
            <ScrollView>
              {currentItems.map((message) => (
                <View key={message.id} style={{ marginVertical: 10 }}>
                  <Text style={{ fontWeight: "bold" }}>{message.subject}</Text>
                  <Text>From: {message.sender.username}</Text>
                  <Text>
                    Date: {new Date(message.timestamp).toLocaleString()}
                  </Text>
                  <View style={{ marginTop: 5 }}>
                    <WebView
                      source={{ html: message.message }}
                      style={{
                        height: expandedMessages.includes(message.id)
                          ? null
                          : 100,
                      }}
                    />
                    {message.message.split(" ").length > 10 &&
                      !expandedMessages.includes(message.id) && (
                        <Button
                          title="Read More"
                          onPress={() => expandMessage(message.id)}
                        />
                      )}
                  </View>
                </View>
              ))}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginVertical: 10,
                }}
              >
                <Button
                  title="Previous"
                  onPress={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    title={number.toString()}
                    onPress={() => paginate(number)}
                    disabled={currentPage === number}
                  />
                ))}
                <Button
                  title="Next"
                  onPress={() => paginate(currentPage + 1)}
                  disabled={currentPage === pageNumbers.length}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  headerCell: {
    width: 150,
    marginLeft: 20,
    borderRightWidth: 1,
    borderColor: "black",
  },
  cell: {
    width: 150,
    marginLeft: 10,
  },
  snHeaderCell: {
    width: 50,
    borderRightWidth: 1,
    borderColor: "black",
  },
  snCell: {
    width: 50,
  },
});

export default MessageInbox;
