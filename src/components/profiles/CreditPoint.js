// CreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import {
  getCreditPointList,
  getUserCreditPointPayments,
  getCreditPointEarnings,
} from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";
import CreditPointEarning from "./CreditPointEarning";
// import GetBuyCreditPoint from "../CreditPoint/GetBuyCreditPoint"; 
// import GetSellCreditPoint from "../CreditPoint/GetSellCreditPoint";
// import GetBuyerCreditPoint from "../CreditPoint/GetBuyerCreditPoint";

const CreditPoint = () => {
  const dispatch = useDispatch();
  const creditPointList = useSelector((state) => state.creditPointList);
  const { loading, creditPointRequests, error } = creditPointList;

  const userCreditPointPayments = useSelector(
    (state) => state.userCreditPointPayments
  );
  const {
    loading: creditPointPaymentsLoading,
    creditPointPayments,
    error: creditPointPaymentsError,
  } = userCreditPointPayments;
  console.log("User creditPointPayments:", creditPointPayments);
  console.log("User creditPointRequests:", creditPointRequests);
  console.log();

  useEffect(() => {
    dispatch(getCreditPointList());
    dispatch(getUserCreditPointPayments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCreditPointEarnings());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPagePayments, setCurrentPagePayments] = useState(1);

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditPointRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const indexOfLastItemPayments = currentPagePayments * itemsPerPage;
  const indexOfFirstItemPayments = indexOfLastItemPayments - itemsPerPage;
  const currentItemsPayments = creditPointPayments.slice(
    indexOfFirstItemPayments,
    indexOfLastItemPayments
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginatePayments = (pageNumber) => setCurrentPagePayments(pageNumber);

  const totalPages = Math.ceil(creditPointRequests.length / itemsPerPage);
  const totalPagesPayments = Math.ceil(
    creditPointPayments.length / itemsPerPage
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pageNumbersPayments = Array.from(
    { length: totalPagesPayments },
    (_, i) => i + 1
  );

  return (
    <>
      <Row>
        <div className="justify-content-md-center">
          <Col>
            {/* <div>
              <GetBuyCreditPoint />
            </div>

            <div>
              <GetSellCreditPoint />
            </div>

            <div>
              <GetBuyerCreditPoint />
            </div> */}

            <div>
              <CreditPointEarning />
            </div>

            <div>
              <h1 className="text-center py-3">Referral Bonus Point</h1>
              <hr />

              {creditPointPaymentsLoading ? (
                <Loader />
              ) : creditPointPaymentsError ? (
                <Message variant="danger">{creditPointPaymentsError}</Message>
              ) : (
                <>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Referrer</th>
                        <th>Referred User</th>
                        {/* <th>Order ID</th> */}
                        {/* <th>Credit Points Earned</th> */}
                        <th>Referral Bonus</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItemsPayments.map((payment, index) => (
                        <tr key={payment.id}>
                          <td>{index + 1}</td>
                          <td>
                            {payment.referrer_first_name}{" "}
                            {payment.referrer_last_name}
                          </td>
                          <td>
                            {payment.referred_first_name}{" "}
                            {payment.referred_last_name}
                          </td>
                          {/* <td>{payment.order_id}</td> */}
                          {/* <td style={{ color: "green" }}>{payment.credit_points_earned}</td> */}
                          <td style={{ color: "green" }}>
                            {payment.referral_credit_points_bonus}
                          </td>
                          <td>
                            {new Date(payment.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                      <li
                        className={`page-item ${
                          currentPagePayments === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            paginatePayments(currentPagePayments - 1)
                          }
                        >
                          Previous
                        </button>
                      </li>
                      {pageNumbersPayments.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            currentPagePayments === number ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginatePayments(number)}
                          >
                            {number}
                          </button>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPagePayments === totalPagesPayments
                            ? "disabled"
                            : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            paginatePayments(currentPagePayments + 1)
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </>
              )}
            </div>

            <div>
              <hr />
              <h1 className="py-3 text-center">
              Bonus Point Withdrawal Requests
              </h1>
              <hr />

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
                        <th>Request Ref</th>
                        {/* <th>Email</th> */}
                        {/* <th>Account Name</th> */}
                        {/* <th>Account Number</th> */}
                        {/* <th>Bank</th> */}
                        <th>Amount</th>
                        <th>Paid</th>
                        <th>Paid At</th>
                        <th>Delivered</th>
                        <th>Delivered At</th>
                        <th>Request Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((creditPoint, index) => (
                        <tr key={creditPoint.id}>
                          <td>{index + 1}</td>
                          <td>{creditPoint.request_ref}</td>
                          {/* <td>{creditPoint.email}</td> */}
                          {/* <td>{creditPoint.account_name}</td> */}
                          {/* <td>{creditPoint.account_number}</td> */}
                          {/* <td>{creditPoint.bank_name}</td> */}
                          <td style={{ color: "red" }}>
                            {creditPoint.credit_point_amount}
                          </td>
                          {/* <td>{creditPoint.is_paid ? "Yes" : "No"}</td> */}
                          <td>
                            {creditPoint.is_paid ? (
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
                          <td>{creditPoint.paid_at}</td>
                          <td>{creditPoint.is_delivered ? "Yes" : "No"}</td>
                          <td>{creditPoint.delivered_at}</td>
                          <td>
                            {new Date(creditPoint.created_at).toLocaleString()}
                          </td>
                          <td>
                            <Button
                              className="rounded"
                              variant="success"
                              size="sm"
                              disabled
                            >
                              Confirm Payment
                            </Button>
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
            </div>
            <hr />
            <span className="d-flex justify-content-center text-center py-3">
              Note: A bonus point request payment is processed in more or less
              5 business days.
            </span>
            <hr />
          </Col>
        </div>
      </Row>
    </>
  );
};

export default CreditPoint;
