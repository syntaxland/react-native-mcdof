// SupportMessage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTicket,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-native-table-component";
import { styles } from "../screenStyles";
import Loader from "../Loader";
import Message from "../Message";
import Pagination from "../Pagination";

const SupportMessage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { loading, tickets, error } = listSupportTicketState;

  const listSupportMessageState = useSelector(
    (state) => state.listSupportMessageState
  );
  const {
    loading: listSupportMessageloading,
    ticketMessages,
    error: listSupportMessageError,
  } = listSupportMessageState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(listSupportTicket());
    dispatch(listSupportMessage());
  }, [dispatch]);

  const handleCreateTicket = () => {
    navigation.navigate("CreateSupportMessage");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>
          <FontAwesomeIcon icon={faTicket} size={24} color="black" /> Support Ticket
        </Text>

        {loading || listSupportMessageloading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {ticketMessages.length === 0 ? (
              <Text style={styles.emptyText}>Support Ticket appear here.</Text>
            ) : (
              <Table style={styles.table}>
                <Table.Header>
                  <Table.Cell>SN</Table.Cell>
                  <Table.Cell>Ticket ID</Table.Cell>
                  <Table.Cell>User</Table.Cell>
                  <Table.Cell>Subject</Table.Cell>
                  <Table.Cell>Category</Table.Cell>
                  <Table.Cell>Message</Table.Cell>
                  <Table.Cell>Status</Table.Cell>
                  <Table.Cell>Resolved</Table.Cell>
                  <Table.Cell>Created At</Table.Cell>
                </Table.Header>
                {ticketMessages.map((ticket, index) => (
                  <Table.Row key={ticket.id}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{ticket.ticket_id}</Table.Cell>
                    <Table.Cell>{ticket.email}</Table.Cell>
                    <Table.Cell>{ticket.subject}</Table.Cell>
                    <Table.Cell>{ticket.category}</Table.Cell>
                    <Table.Cell>{ticket.message}</Table.Cell>
                    <Table.Cell style={{ color: !ticket.is_closed ? "red" : "green" }}>
                      {!ticket.is_closed ? "Closed" : "Active"}
                    </Table.Cell>
                    <Table.Cell>
                      <FontAwesomeIcon
                        icon={!ticket.is_resolved ? faCheckCircle : faTimesCircle}
                        size={24}
                        color={!ticket.is_resolved ? "green" : "red"}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(ticket.created_at).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table>
            )}
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={ticketMessages.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateTicket}
        >
          <Text style={styles.buttonText}>Create A New Support Ticket</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SupportMessage;
