// Orders.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
// import { faBox, faCheck, faToggleOn } from '@fortawesome/free-solid-svg-icons';
import {
  getOrders,
  confirmOderDelivery,
  deleteOrder,
} from "../../actions/orderActions";
import Message from "../Message";
import Loader from "../Loader";

function Orders() {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  console.log("Orders:", orders);

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = orderDelete;
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(deleteSuccess);
  // const [delivered, setDelivered] = useState(false);

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

  const handleConfirmDelivery = (orderId) => {
    dispatch(confirmOderDelivery(orderId));
  };

  useEffect(() => {
    dispatch(getOrders());
    if (deleteSuccess) {
      setShowDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteSuccess(false);
        dispatch({ type: "ORDER_DELETE_RESET" });
      }, 3000);
    }
  }, [dispatch, deleteSuccess]);

  const deleteHandler = (id) => {
    const orderToDelete = orders.find((order) => order._id === id);

    if (!orderToDelete.isPaid) {
      if (window.confirm("Are you sure you want to delete this order?")) {
        dispatch(deleteOrder(id));
        setTimeout(() => {
          dispatch({ type: "ORDER_DELETE_RESET" });
        }, 3000);
      }
    }
  };

  return (
    <div>
      <h1 className="text-center py-3">
        <i className="fas fa-luggage-cart"></i> Orders
      </h1>
      {deleteLoading && <Loader />}

      {showDeleteSuccess && (
        <Message variant="success" className="position-relative">
          Order deleted successfully
          <Button
            className="close-button"
            onClick={() => {
              setShowDeleteSuccess(false);
              dispatch({ type: "ORDER_DELETE_RESET" });
            }}
            variant="link"
            style={{
              position: "absolute",
              right: "0",
              textDecoration: "none",
              color: "inherit",
              padding: "0.5rem",
              lineHeight: "1",
            }}
          >
            <i className="fas fa-times">Close</i>
          </Button>
        </Message>
      )}

      {deleteError && <Message variant="danger">{deleteError}</Message>}
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
                {/* <th>Email</th> */}
                <th>Payment Method</th>
                <th>Tax (3%)</th>
                <th>Shipping Price</th>
                <th>Total Price</th>
                {/* <th>Promo Total Price</th>
                <th>Promo Discount</th> */}
                <th>Paid</th>
                <th>Paid At</th>
                <th>Delivered</th>
                {/* <th>Delivered At</th> */}
                <th>Delivery Status</th>
                <th>Created At</th>
                <th></th>
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
                  {/* <td>{order.user.email}</td> */}
                  <td>{order.paymentMethod}</td>
                  <td>{order.taxPrice}</td>
                  <td>{order.shippingPrice}</td>
                  <td>{order.totalPrice}</td>
                  {/* <td>{order.promo_total_price}</td>
                  <td>{order.promo_discount}</td> */}
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
                  <td>{new Date(order.paidAt).toLocaleString()}</td>
                  <td>{order.isDelivered ? "Yes" : "No"}</td>
                  {/* <td>{order.deliveredAt}</td> */}

                  {/* <td>
                    {order.isDelivered ? (

                  <Button variant="success" className={`toggle-button ${delivered ? 'delivered' : ''}`} onClick={handleToggleDelivered}>
                  {delivered ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faBox} />}
                  </Button>
                    ) : (
                      <span>Order Not Paid</span>
                    )}
                  </td> */}

                  <td>
                    <Button
                      variant="success"
                      className={`toggle-button ${
                        order.is_delivered ? "delivered" : ""
                      }`}
                      onClick={() => handleConfirmDelivery(order._id)}
                    >
                      <FontAwesomeIcon icon={faToggleOn} />
                    </Button>
                    <span>
                      {order.is_delivered ? "Delivered" : "Not Delivered"}
                    </span>
                  </td>

                  {/* <td>
                    {order.isPaid ? (

                      <Link
                        to={{
                          pathname: '/add-review',
                          search: `?orderItemId=${order._id}`,
                        }}
                        className="btn btn-success btn-sm rounded"
                      >
                        Confirm Delivery
                      </Link>
                    ) : (
                      <span>Order Not Paid</span>
                    )}
                  </td> */}

                  <td>{new Date(order.createdAt).toLocaleString()}</td>

                  <td>
                    {order.isPaid ? (
                      <Button className="rounded" size="sm" disabled>
                        <i className="fas fa-edit"></i>
                      </Button>
                    ) : (
                      <Button
                        className="rounded"
                        variant="success"
                        size="sm"
                        // onClick={() => editHandler(order._id)}
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    )}
                  </td>
                  <td>
                    {order.isPaid ? (
                      <Button className="rounded" size="sm" disabled>
                        <i className="fas fa-trash"></i>
                      </Button>
                    ) : (
                      <Button
                        className="rounded"
                        variant="danger"
                        size="sm"
                        onClick={() => deleteHandler(order._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    )}
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

export default Orders;
