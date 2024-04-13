// SupportTicketDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import {
  replySupportTicket,
  getTicketDetail, 
  listSupportTicketReply,
} from "../../actions/supportActions"; 
import Loader from "../Loader";
import Message from "../Message";

function SupportTicketDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [replyMessage, setReplyMessage] = useState("");

  const replySupportTicketState = useSelector(
    (state) => state.replySupportTicketState
  );
  const { loading, success, error } = replySupportTicketState;

  // const listSupportMessageState = useSelector(
  //   (state) => state.listSupportMessageState
  // );

  const ticketDetailList = useSelector(
    (state) => state.ticketDetailList
  );
  const { tickets } = ticketDetailList;
  console.log("tickets:", tickets);

  const listSupportTicketReplyState = useSelector(
    (state) => state.listSupportTicketReplyState
  );
  const { ticketReplies } = listSupportTicketReplyState;
  console.log("ticketReplies:", ticketReplies);

  useEffect(() => {
    const ticketId = id;
    dispatch(getTicketDetail(ticketId));
    dispatch(listSupportTicketReply(ticketId));
  }, [dispatch, id]);

  const handleSubmitReply = (e) => {
    e.preventDefault();

    const replyticketData = {
      ticket_id: id,
      message: replyMessage,
    };

    dispatch(replySupportTicket(replyticketData));
  };

  // useEffect(() => {
  //   if (!userInfo) {
  //     // Redirect to login or handle unauthorized access
  //   }
  // }, [dispatch, userInfo]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        // history.push("/dashboard");
        window.location.reload();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const ticketsFormatted = tickets ? tickets : [];
  const ticketRepliesFormatted = ticketReplies ? ticketReplies : [];

  return (
    <div>
      <div>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h2 className="text-center">Support Ticket Details</h2>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {/* {success && (
              <Message variant="success">Ticket replied successfully.</Message>
            )} */}

            <h2>Ticket ID: {id}</h2>

            <ul className="border rounded p-4 py-2">
              {ticketsFormatted.map((message) => (
                <li key={message.id} className="border rounded p-4 py-2">
                  <p>Subject: {message.subject}</p>
                  <p>
                    User:{" "}
                    {message.first_name.charAt(0).toUpperCase() +
                      message.first_name.slice(1)}
                  </p>
                  <p>Message: {message.message}</p>
                  <p>{new Date(message.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
            <h2>Responses:</h2>

            <ul>
              {ticketRepliesFormatted.map((message) => (
                <div className="py-2">
                <li key={message.id} className="border rounded p-4 py-2">
                  <p>
                    User:{" "}
                    {message.first_name.charAt(0).toUpperCase() +
                      message.first_name.slice(1)}
                  </p>
                  <p>Message: {message.message}</p>
                  <p>
                    Timestamp: {new Date(message.created_at).toLocaleString()}
                  </p>
                  {/* <p>Rating: {message.rating}</p> */}
                </li>
                </div>
              ))}
            </ul>


            

            <Form onSubmit={handleSubmitReply}>
              <Form.Group controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={4}
                  value={replyMessage}
                  maxLength={1000}
                  onChange={(e) => setReplyMessage(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <div className="py-2">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="success"
                >
                  Submit Reply
                </Button>
              </div>
              {success && (
                <Message variant="success">Message sent successfully.</Message>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SupportTicketDetails;
