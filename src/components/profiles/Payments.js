// Payments.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { listPayments } from "../../actions/paymentActions";

function Payments() {
  const dispatch = useDispatch();

  const paymentList = useSelector((state) => state.paymentList);
  const { loading, error, payments } = paymentList;

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
    dispatch(listPayments());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center">Payments</h1>
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
                <th>Total Amount (Tax + Shipping)</th>

                <th>Discount Amount</th>
                <th>Total Items Amount</th>
                <th>Discount Percentage</th>
                <th>Final Total Amount Paid</th>

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

                  <td>NGN {payment.amount}</td>

                  <td>NGN {payment.promo_code_discount_amount}</td>
                  <td>NGN {payment.items_amount}</td>
                  <td>{payment.promo_code_discount_percentage}%</td>
                  <td>NGN {payment.final_total_amount}</td>

                  <td>{payment.reference}</td>
                  {/* <td>{payment.reference.reference}</td> */}
                  {/* {new Date(payment.created_at).toLocaleString()} */}
                  <td>
                      {new Date(payment.created_at).toLocaleString("en-US", {
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
