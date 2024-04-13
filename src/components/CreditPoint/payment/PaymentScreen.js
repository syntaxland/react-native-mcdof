// PaymentScreen.js
import React, { useEffect, useState } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Paystack from "./Paystack";
import Paysofter from "./Paysofter";

function PaymentScreen({
  amount,
  currency,
  paysofterPublicKey,
  paystackPublicKey,
  userEmail,
}) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const handlePaymentGatewaySelection = (paymentGateway) => {
    setSelectedPaymentGateway(paymentGateway);
  };

  console.log("amount:", currency, amount);

  return (
    <>
      <Row>
        <div className="d-flex justify-content-center ">
          <Col>
            <h1 className="text-center py-2">Payment Page</h1>

            <div className="text-center py-2">
              <Row className="text-center py-2">
                <Col md={10}>
                  <Button
                    variant="dark"
                    onClick={() => handlePaymentGatewaySelection("paystack")}
                    className="mr-2 rounded w-100"
                  >
                    Pay with Paystack
                  </Button>
                </Col>
                <Col md={2}>
                  <Button variant="outline"></Button>
                </Col>
              </Row>

              <Row className="text-center py-2">
                <Col md={10}>
                  <Button
                    variant="primary"
                    onClick={() => handlePaymentGatewaySelection("paysofter")}
                    className="mr-2 rounded w-100"
                  >
                    Pay with Paysofter
                  </Button>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline"
                    onClick={handleInfoModalShow}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Don't have a Paysofter account? Click here."
                  >
                    <i className="fa fa-info-circle"> </i>
                  </Button>

                  <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                    <Modal.Header closeButton>
                      <Modal.Title className="text-center w-100 py-2">
                        Paysofter Account
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="text-center">
                        Don't have a Paysofter account? You're just about 3
                        minutes away! Sign up for a much softer payment
                        experience.{" "}
                        <a
                          href="https://paysofter.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          <span>
                            <Button
                              variant="primary"
                              size="sm"
                              className="text-center py-2"
                            >
                              Create A Free Account
                            </Button>
                          </span>
                        </a>
                      </p>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </div>

            {selectedPaymentGateway === "paystack" && (
              <Paystack
                currency={currency}
                amount={amount}
                userEmail={userEmail}
                paystackPublicKey={paystackPublicKey}
              />
            )}

            {selectedPaymentGateway === "paysofter" && (
              <Paysofter
                userEmail={userEmail}
                currency={currency}
                amount={amount}
                paysofterPublicKey={paysofterPublicKey}
              />
            )}
          </Col>
        </div>
      </Row>
    </>
  );
}

export default PaymentScreen;
