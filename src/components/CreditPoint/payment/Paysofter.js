// Paysofter.js
import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import PaysofterButton from "./PaysofterButton";
// import LoaderPaysofter from "../../LoaderPaysofter";
// import Message from "../../Message";
import "./Paysofter.css"; 

function Paysofter({ currency, amount, paysofterPublicKey, userEmail }) {
  // const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  // const { success, error, loading } = buyCreditPointState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-3">Paysofter Payment Option</h1>
            {/* {loading && <LoaderPaysofter />}
            {error && <Message variant="danger">{error}</Message>} */}

            <ListGroup variant="flush" className="text-center py-2">
              <ListGroup.Item>
                Amount:{" "}
                {amount?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}{currency}
              </ListGroup.Item>
            </ListGroup>

            <div>
              <PaysofterButton
                showPaymentModal={showPaymentModal}
                setShowPaymentModal={setShowPaymentModal}
                userEmail={userEmail}
                currency={currency}
                amount={amount}
                paysofterPublicKey={paysofterPublicKey} 
              />
            </div>
          </Col>
        </div>
      </Row>
    </>
  );
}

export default Paysofter;
