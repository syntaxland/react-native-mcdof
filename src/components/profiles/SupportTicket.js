// SupportTicket.js
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Button, DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { listSupportTicket } from "../../redux/actions/supportActions";
import Message from "../../Message";
import Loader from "../../Loader";
import Pagination from "../../Pagination";

const SupportTicket = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { loading, tickets, error } = listSupportTicketState;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tickets
    ? tickets.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(listSupportTicket());
  }, [dispatch]);

  const handleCreateTicket = () => {
    navigation.navigate("Create Ticket"); 
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            <Text style={styles.icon}>🎫</Text> Support Ticket
          </Text>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {currentItems.length === 0 ? (
                <Text style={styles.noTicketsText}>
                  Support Ticket appear here.
                </Text>
              ) : (
                <ScrollView horizontal={true}>
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>SN</DataTable.Title>
                      <DataTable.Title>Ticket ID</DataTable.Title>
                      <DataTable.Title>Subject</DataTable.Title>
                      <DataTable.Title>Category</DataTable.Title>
                      <DataTable.Title>Status</DataTable.Title>
                      <DataTable.Title>Resolved</DataTable.Title>
                      <DataTable.Title>Created At</DataTable.Title>
                    </DataTable.Header>
                    {currentItems.map((ticket, index) => (
                      <DataTable.Row key={ticket.id}>
                        <DataTable.Cell>{index + 1}</DataTable.Cell>
                        <DataTable.Cell>
                          <Button
                            onPress={() =>
                              navigation.navigate("Ticket Details", {
                                ticketId: ticket.ticket_id,
                              })
                            }
                          >
                            #{ticket.ticket_id}
                          </Button>
                        </DataTable.Cell>
                        <DataTable.Cell>{ticket.subject}</DataTable.Cell>
                        <DataTable.Cell>{ticket.category}</DataTable.Cell>
                        <DataTable.Cell>
                          {ticket.is_closed ? (
                            <Text style={{ color: "red" }}>Closed</Text>
                          ) : (
                            <Text style={{ color: "green" }}>Active</Text>
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          {ticket.is_resolved ? (
                            <Text style={{ color: "green" }}>Resolved</Text>
                          ) : (
                            <Text style={{ color: "red" }}>Not Resolved</Text>
                          )}
                        </DataTable.Cell>
                        <DataTable.Cell>
                          {new Date(ticket.created_at).toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          })}
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))}
                  </DataTable>
                </ScrollView>
              )}
              <View style={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(tickets.length / itemsPerPage)}
                  paginate={paginate}
                />
              </View>
            </>
          )}
          <View style={styles.createTicketButton}>
            <Button mode="contained" onPress={handleCreateTicket}>
              Create A New Support Ticket
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
  },
  noTicketsText: {
    textAlign: "center",
    paddingTop: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  createTicketButton: {
    alignItems: "center",
    marginTop: 20,
  },
});

export default SupportTicket;
