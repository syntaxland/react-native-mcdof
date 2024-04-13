// SupportMessage.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import {
  listSupportTicket,
  listSupportMessage,
} from "../../actions/supportActions";
import Message from "../Message";
import Loader from "../Loader";  
import Pagination from "../Pagination";

function SupportMessage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const listSupportTicketState = useSelector(
    (state) => state.listSupportTicketState
  );
  const { loading, success, tickets, error } = listSupportTicketState;
  console.log("tickets:", tickets);

  const listSupportMessageState = useSelector(
    (state) => state.listSupportMessageState
  );
  const {
    loading: listSupportMessageloading,
    ticketMessages,
    error: listSupportMessageError,
  } = listSupportMessageState;
  console.log("ticketMessages:", ticketMessages);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = tickets.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = ticketMessages
    ? ticketMessages.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(listSupportTicket());
    dispatch(listSupportMessage());
  }, [dispatch]);

  const handleCreateTicket = () => {
    history.push("/create-support-message");
  };

  return (
    <div>
      <h1 className="text-center py-3">
        <i className="fas fa-ticket"></i> Support Ticket
      </h1>
      {loading || listSupportMessageloading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="text-center py-3">Support Ticket appear here.</div>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Ticket ID</th>
                  <th>User</th>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Resolved</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td>{index + 1}</td>
                    <td>{ticket.ticket_id}</td>
                    <td>{ticket.email}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.category}</td>
                    <td>{ticket.message}</td>
                    <td>
                      {!ticket.is_closed ? (
                        <span style={{ color: "red" }}>Closed</span>
                      ) : (
                        <span style={{ color: "green" }}>Active</span>
                      )}
                    </td>
                    <td>
                    {!ticket.is_resolved ? (
                      <i
                        className="fas fa-check-circle"
                        style={{ fontSize: "16px", color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-times-circle"
                        style={{ fontSize: "16px", color: "red" }}
                      ></i>
                    )}
                  </td>
                    
                    <td>
                      {new Date(ticket.created_at).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
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
      <div className="d-flex justify-content-center mt-5 py-3">
            <Button
              variant="success"
              onClick={handleCreateTicket}
              className="rounded"
            >
             Create A New Support Ticket 
            </Button>
          </div>
    </div>
  );
}

export default SupportMessage;
