// GetBuyerCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getBuyerCreditPoint } from "../../actions/creditPointActions";
import Message from "../Message";
import Loader from "../Loader";
import Pagination from "../Pagination";

function GetBuyerCreditPoint() {
  const dispatch = useDispatch();

  const getBuyerCreditPointState = useSelector(
    (state) => state.getBuyerCreditPointState
  );
  const { loading, creditPoints, error } = getBuyerCreditPointState;
  console.log("GetBuyerCreditPoint:", creditPoints);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo.access:", userInfo.access);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = creditPoints?.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    dispatch(getBuyerCreditPoint());
  }, [dispatch]);

  return (
    <div>
      <hr />
      <h1 className="text-center py-3">
        <i className="fas fa-credit-card"></i> Buyer/Recieved CPS List
      </h1>
      <hr />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {currentItems.length === 0 ? (
            <div className="text-center py-3">Buyer cps appear here.</div>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>CPS ID</th>
                  <th>Seller</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Success</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((cps, index) => (
                  <tr key={cps.id}>
                    <td>{index + 1}</td>
                    <td>{cps.cps_sell_id}</td> 
                    <td>{cps.seller_username}</td>
                    <td>{cps.buyer_username}</td>
                    <td style={{ color: "green" }}> {cps.amount}</td>
                    <td>
                      {cps.is_success ? (
                        <>
                          <i
                            className="fas fa-check-circle"
                            style={{ fontSize: "16px", color: "green" }}
                          ></i>{" "}
                          Yes
                        </>
                      ) : (
                        <>
                          <i
                            className="fas fa-times-circle"
                            style={{ fontSize: "16px", color: "red" }}
                          ></i>{" "}
                          No
                        </>
                      )}
                    </td>
                    <td>
                      {new Date(cps.created_at).toLocaleString("en-US", {
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
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={creditPoints.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default GetBuyerCreditPoint;
