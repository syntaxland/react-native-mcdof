// Feedback.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import { listFeedbacks } from "../../actions/feedbackActions";

import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function Feedback() {
  const dispatch = useDispatch();
  // const history = useHistory();

  const feedbackList = useSelector((state) => state.feedbackList);
  const { loading, feedbacks, error } = feedbackList;
  console.log("feedbacks:", feedbacks);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = feedbacks.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = feedbacks
    ? feedbacks.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    dispatch(listFeedbacks());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center py-3">
        <i className="fas fa-feedback"></i> Feedbacks
      </h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="text-center py-3">Feedbacks appear here.</div>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>User</th>
                  <th>Subject</th>
                  <th>Category</th>
                  <th>Message</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((feedback, index) => (
                  <tr key={feedback.id}>
                    <td>{index + 1}</td>
                    <td>{feedback.email}</td>
                    <td>{feedback.subject}</td>
                    <td>{feedback.category}</td>
                    <td>{feedback.message}</td>
                    <td>
                      {new Date(feedback.created_at).toLocaleString("en-US", {
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
          <div className="py-2">
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={feedbacks.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
