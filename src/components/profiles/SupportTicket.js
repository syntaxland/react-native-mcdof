// SupportTicket.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../screenStyles";
import { listSupportTicket } from "../../actions/supportActions";

const SupportTicket = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const listSupportTicketState = useSelector((state) => state.listSupportTicketState);
  const { loading, tickets, error } = listSupportTicketState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(listSupportTicket());
  }, [dispatch]);

  const handleCreateTicket = () => {
    navigation.navigate("CreateSupportTicket");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Support Ticket</Text>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        {tickets && tickets.length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.text}>Support Ticket appear here.</Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={tickets}
              keyExtractor={(item) => item.ticket_id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("SupportTicketDetail", { ticketId: item.ticket_id })}
                >
                  <View style={styles.listItem}>
                    <Text style={styles.listItemText}>{`#${item.ticket_id}`}</Text>
                    <Text style={styles.listItemText}>{item.subject}</Text>
                    <Text style={styles.listItemText}>{item.category}</Text>
                    <Text style={[styles.listItemText, { color: item.is_closed ? "red" : "green" }]}>
                      {item.is_closed ? "Closed" : "Active"}
                    </Text>
                    <Text style={styles.listItemText}>
                      {item.is_resolved ? (
                        <FontAwesome
                          icon={faCheckCircle}
                          style={[styles.icon, { color: "green" }]}
                        />
                      ) : (
                        <FontAwesome
                          icon={faTimesCircle}
                          style={[styles.icon, { color: "red" }]}
                        />
                      )}
                    </Text>
                    <Text style={styles.listItemText}>
                      {new Date(item.created_at).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateTicket}
          >
            <Text style={styles.buttonText}>Create A New Support Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SupportTicket;
