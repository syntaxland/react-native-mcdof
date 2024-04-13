// OrderShipment.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { getAllShipments } from '../../actions/orderActions'; 
import Message from '../Message';
import Loader from '../Loader';

function OrderShipment() {
  const dispatch = useDispatch();

  const allUserShipments = useSelector((state) => state.allUserShipments);
  const { loading, error, shipments } = allUserShipments;
  console.log("All shipments:", shipments);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = shipments.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(shipments.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  useEffect(() => {
    dispatch(getAllShipments());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-center py-3">Shipments (All Users)</h2>
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
                <th>Address</th>
                <th>City</th>
                <th>Postal Code</th>
                <th>Country</th>
                <th>Shipping Price</th>
                <th>Is Delivered</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((address, index) => (
                <tr key={address._id}>
                  <td>{index + 1}</td>
                  <td>{address.order.order_id}</td>
                  <td>{address.order.user.first_name}</td>
                  <td>{address.order.user.email}</td>
                  <td>{address.address}</td>
                  <td>{address.city}</td>
                  <td>{address.postalCode}</td>
                  <td>{address.country}</td>
                  <td>{address.shippingPrice}</td>
                  <td>{address.isDelivered ? 'Yes' : 'No'}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>

          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
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
                    currentPage === number ? 'active' : ''
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
                  currentPage === pageNumbers.length ? 'disabled' : ''
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

export default OrderShipment;
