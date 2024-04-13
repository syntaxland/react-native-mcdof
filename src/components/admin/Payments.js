// Payments.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { getAllPaymentsList } from "../../actions/paymentActions";

function Payments() {
  const dispatch = useDispatch();

  const listAllPayments = useSelector((state) => state.listAllPayments);
  const { loading, error, payments } = listAllPayments;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(payments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(getAllPaymentsList());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center">Payments (All Users)</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>SN</th>
                <th>Order ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Amount Paid</th>
                <th>Payment Reference</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((payment, index) => (
                <tr key={payment.id}>
                  <td>{index + 1}</td>
                  {/* <td>{payment.order.order_id}</td> */}
                  {/* <td>{payment.order.user.first_name}</td> */}
                  {/* <td>{payment.order.user.email}</td> */}

                  <td>{payment.order_id}</td>
                  <td>{payment.first_name}</td>
                  <td>{payment.user.email}</td>

                  <td>{payment.amount}</td>
                  <td>{payment.reference}</td>
                  {/* <td>{payment.reference.reference}</td> */}
                  {new Date(payment.created_at).toLocaleString()}
                </tr>
              ))}
            </tbody>
          </Table>
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
}

export default Payments;
