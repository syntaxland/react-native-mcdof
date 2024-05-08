// SupportTicketDetails.js
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  replySupportTicket,
  getTicketDetail,
  listSupportTicketReply,
} from "../../redux/actions/supportActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { TextInput, Button } from "react-native-paper";

const SupportTicketDetails = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { id } = route.params;

  const [replyMessage, setReplyMessage] = useState("");

  const replySupportTicketState = useSelector(
    (state) => state.replySupportTicketState
  );
  const { loading, success, error } = replySupportTicketState;

  const ticketDetailList = useSelector((state) => state.ticketDetailList);
  const { tickets } = ticketDetailList;

  const listSupportTicketReplyState = useSelector(
    (state) => state.listSupportTicketReplyState
  );
  const { ticketReplies } = listSupportTicketReplyState;

  useEffect(() => {
    dispatch(getTicketDetail(id));
    dispatch(listSupportTicketReply(id));
  }, [dispatch, id]);

  const handleSubmitReply = () => {
    const replyticketData = {
      ticket_id: id,
      message: replyMessage,
    };
    dispatch(replySupportTicket(replyticketData));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Support Ticket Details</Text>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          <Text style={styles.ticketID}>Ticket ID: {id}</Text>
          <View style={styles.messageContainer}>
            {tickets?.map((message) => (
              <View key={message.id} style={styles.messageItem}>
                <Text>Subject: {message.subject}</Text>
                <Text>User: {message.first_name}</Text>
                <Text>Message: {message.message}</Text>
                <Text>{new Date(message.created_at).toLocaleString()}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.title}>Responses:</Text>
          <View style={styles.messageContainer}>
            {ticketReplies?.map((message) => (
              <View key={message.id} style={styles.messageItem}>
                <Text>User: {message.first_name}</Text>
                <Text>Message: {message.message}</Text>
                <Text>
                  Timestamp: {new Date(message.created_at).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
          <TextInput
            label="Message"
            value={replyMessage}
            onChangeText={(text) => setReplyMessage(text)}
            mode="outlined"
            multiline
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleSubmitReply}
            style={styles.button}
          >
            Submit Reply
          </Button>
          {success && (
            <Message variant="success">Message sent successfully.</Message>
          )}
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
  content: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  ticketID: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  messageContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  messageItem: {
    marginBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
});

export default SupportTicketDetails;
