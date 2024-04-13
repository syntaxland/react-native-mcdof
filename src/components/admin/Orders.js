// Orders.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
// import { faBox, faCheck, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { getAllOrders } from "../../actions/orderActions";
import Message from "../Message";
import Loader from "../Loader";

function Orders() {
  const dispatch = useDispatch();

  const allOrderList = useSelector((state) => state.allOrderList);
  const { loading, error, orders } = allOrderList;
  console.log("Orders:", orders);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-center"><i className="fas fa-luggage-cart"></i> Orders (All Users)</h1>

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
                <th>Payment Method</th>
                <th>Tax (3%)</th>
                <th>Shipping Price</th>
                <th>Total Price</th>
                <th>Paid</th>
                <th>Paid At</th>
                <th>Delivered</th>
                {/* <th>Delivered At</th> */}
                {/* <th>Delivery Status</th> */}
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.order_id}</td>
                  <td>
                    {order.user.first_name} {order.user.last_name}
                  </td>
                  <td>{order.user.email}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.taxPrice}</td>
                  <td>{order.shippingPrice}</td>
                  <td>{order.totalPrice}</td>
                  {/* <td>{order.isPaid ? "Yes" : "No"}</td> */}
                  <td>
                    {order.isPaid ? (
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
                  {/* <td>{order.paidAt}</td> */}
                  {new Date(order.paidAt).toLocaleString()}
                  <td>{order.isDelivered ? "Yes" : "No"}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
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

export default Orders;
