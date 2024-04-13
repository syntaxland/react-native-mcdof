// OrderItem.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listOrderItems } from "../../actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";

function OrderItem() {
  const dispatch = useDispatch();

  const orderItemsList = useSelector((state) => state.orderItemsList);
  const { loading, error, orderItems } = orderItemsList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orderItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(listOrderItems());
  }, [dispatch]);

  return (
    <div>
      <h2>Order Items</h2>
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
                {/* <th>ID</th> */}
                <th>Image</th>
                <th>Name</th>
                <th>Order ID</th>
                <th>Qty</th>
                <th>Price</th>
                <th>User</th>
                <th>Created</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  {/* <td>{item._id}</td> */}
                  <td>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      style={{ width: "80px", height: "80px" }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.order.order_id}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.order.user.first_name} {item.order.user.last_name}
                  </td>
                  <td>{new Date(item.order.createdAt).toLocaleString()}</td>
                  <td>
                    {item.order.isPaid ? (
                      <Link
                        // to={`/add-review/${item._id}`}
                        to={{
                          pathname: '/add-review',
                          search: `?orderItemId=${item._id}`,
                        }}  
                        className="btn btn-success btn-sm rounded"
                      >
                        Add Review
                      </Link>
                    ) : (
                      <span>Order Not Paid</span>
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

export default OrderItem;
