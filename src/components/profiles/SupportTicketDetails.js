// SupportTicketDetails.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { replySupportTicket, getTicketDetail, listSupportTicketReply } from "../../actions/supportActions";
import { styles } from "../screenStyles";
import Loader from "../Loader";
import Message from "../Message";

const SupportTicketDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const dispatch = useDispatch();
  const [replyMessage, setReplyMessage] = useState("");

  const replySupportTicketState = useSelector((state) => state.replySupportTicketState);
  const { loading, success, error } = replySupportTicketState;

  const ticketDetailList = useSelector((state) => state.ticketDetailList);
  const { tickets } = ticketDetailList;

  const listSupportTicketReplyState = useSelector((state) => state.listSupportTicketReplyState);
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

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }
  }, [success, navigation]);

  const ticketsFormatted = tickets ? tickets : [];
  const ticketRepliesFormatted = ticketReplies ? ticketReplies : [];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Support Ticket Details</Text>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        <Text>Ticket ID: {id}</Text>

        <View style={styles.list}>
          {ticketsFormatted.map((message, index) => (
            <View key={index} style={styles.message}>
              <Text>Subject: {message.subject}</Text>
              <Text>User: {message.first_name}</Text>
              <Text>Message: {message.message}</Text>
              <Text>Created At: {new Date(message.created_at).toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.subTitle}>Responses:</Text>

        <View style={styles.list}>
          {ticketRepliesFormatted.map((message, index) => (
            <View key={index} style={styles.message}>
              <Text>User: {message.first_name}</Text>
              <Text>Message: {message.message}</Text>
              <Text>Timestamp: {new Date(message.created_at).toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Enter your reply"
          value={replyMessage}
          onChangeText={(text) => setReplyMessage(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmitReply}>
          <Text style={styles.buttonText}>Submit Reply</Text>
        </TouchableOpacity>

        {success && <Message variant="success">Message sent successfully.</Message>}
      </View>
    </ScrollView>
  );
};

export default SupportTicketDetails;
