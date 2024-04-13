// MessageInbox.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = messages.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(messages.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  const [expandedMessages, setExpandedMessages] = useState([]);

  const expandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) => [...prevExpanded, messageId]);
  };

  return (
    <div>
      <h2 className="text-center py-3">Message Inbox</h2>
      {loadingError && <Message variant="danger">{loadingError}</Message>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <ListGroup>
            {currentItems.map((message) => (
              <ListGroup.Item key={message.id}>
                <h4>{message.subject}</h4>
                <p>{message.sender.username}</p>
                <p>{new Date(message.timestamp).toLocaleString()}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      expandedMessages.includes(message.id)
                        ? message.message
                        : message.message.split(" ").length > 10
                        ? message.message
                            .split(" ")
                            .slice(0, 10)
                            .join(" ") + " ..."
                        : message.message
                    ),
                  }}
                />
                {message.message.split(" ").length > 10 &&
                  !expandedMessages.includes(message.id) && (
                    <Button
                      variant="link"
                      onClick={() => expandMessage(message.id)}
                    >
                      Read More
                    </Button>
                  )}
                  
                <div className="d-flex justify-content-end">
                  <Button variant="success" className="rounded" size="sm">
                    <i className="fa fa-edit"></i> Edit
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNumbers.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default MessageInbox;
