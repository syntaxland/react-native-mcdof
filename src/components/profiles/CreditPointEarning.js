// CreditPointEarning.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { getCreditPointEarnings } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";

const CreditPointEarning = () => {
  const dispatch = useDispatch();

  const creditPointEarningState = useSelector(
    (state) => state.creditPointEarningState
  );
  const {
    loading: creditPointEarningLoading,
    creditPointEarnings,
    error: creditPointEarningError,
  } = creditPointEarningState;

  console.log("User creditPointEarnings:", creditPointEarnings);

  useEffect(() => {
    dispatch(getCreditPointEarnings());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditPointEarnings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(creditPointEarnings.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Row>
        <div className="justify-content-md-center">
          <Col>
            <hr />
            <div>
              <h1 className="text-center py-3">Bonus Point Earnings</h1>
              <hr />
              {creditPointEarningLoading ? (
                <Loader />
              ) : creditPointEarningError ? (
                <Message variant="danger">{creditPointEarningError}</Message>
              ) : (
                <>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>User</th>
                        <th>Order ID</th>
                        <th>Bonus Points Earned</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((earnings, index) => (
                        <tr key={earnings.id}>
                          <td>{index + 1}</td>
                          <td>
                            {earnings.first_name} {earnings.last_name}
                          </td>
                          <td> {earnings.order_id} </td>
                          <td style={{ color: "green" }}>
                            {earnings.credit_points_earned}
                          </td>
                          <td>
                            {new Date(earnings.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
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

              <hr />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
};

export default CreditPointEarning;
