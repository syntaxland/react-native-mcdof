// PaysofterAccountFundPromise.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { debitPaysofterAccountFund } from "../../actions/paymentActions";
import Message from "../Message";
import Loader from "../Loader";
import VerifyAccountFundPromiseOtp from "./VerifyAccountFundPromiseOtp";

const PaysofterAccountFundPromise = ({
  promoTotalPrice,
  paymentData,
  reference,
  userEmail,
  publicApiKey,
  duration,
  paymenthMethod,
  paymentProvider,
  currency,
}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const debitPaysofterAccountState = useSelector(
    (state) => state.debitPaysofterAccountState
  );
  const {
    loading,
    success,
    formattedPayerEmail,
    error,
  } = debitPaysofterAccountState;
  console.log(
    "formattedPayerEmail:",
    formattedPayerEmail,
    "paymenthMethod:",
    paymenthMethod
  );

  const [accountId, setAccountId] = useState("");
  const [accountIdError, setAccountIdError] = useState("");

  const [securityCode, setSecurityCode] = useState("");
  const [securityCodeError, setSecurityCodeError] = useState("");

  const [formError, setFormError] = useState("");
  // const [currency, setCurrency] = useState("");

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAccountInfoModal, setShowAccountInfoModal] = useState(false);
  const [showSecurityCodeModal, setShowSecurityCodeModal] = useState(false);
  const [
    showVerifyAccountFundPromiseOtp,
    setShowVerifyAccountFundPromiseOtp,
  ] = useState(false);
  const [securityCodeVisible, setSecurityCodeVisible] = useState(false);

  const handleAccountInfoModalShow = () => {
    setShowAccountInfoModal(true);
  };

  const handleAccountInfoModalClose = () => {
    setShowAccountInfoModal(false);
  };

  const handleSecurityCodeModalShow = () => {
    setShowSecurityCodeModal(true);
  };

  const handleSecurityCodeModalClose = () => {
    setShowSecurityCodeModal(false);
  };

  const toggleSecurityCodeVisibility = () => {
    setSecurityCodeVisible(!securityCodeVisible);
  };

  const handleInfoModalShow = () => {
    setShowInfoModal(true);
  };

  const handleInfoModalClose = () => {
    setShowInfoModal(false);
  };

  const debitAccountData = {
    account_id: accountId,
    security_code: securityCode,
    amount: promoTotalPrice,
    // public_api_key: publicApiKey,
  };

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "accountId":
        setAccountId(value);
        setAccountIdError("");
        break;

      case "securityCode":
        setSecurityCode(value);
        setSecurityCodeError("");
        break;

      default:
        break;
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!accountId) {
      setAccountIdError("Please enter Account ID.");
    } else {
      setAccountIdError("");
    }

    if (!securityCode) {
      setSecurityCodeError("Please enter Security Code.");
    } else {
      setSecurityCodeError("");
    }

    if (!accountId || !securityCode) {
      setFormError("Please attend to the errors within the form.");
      return;
    } else {
      dispatch(debitPaysofterAccountFund(debitAccountData));
      localStorage.setItem(
        "debitAccountData",
        JSON.stringify(debitAccountData)
      );
    }

    // try {
    //   localStorage.setItem(
    //     "debitAccountData",
    //     JSON.stringify(debitAccountData)
    //   );
    //   dispatch(debitPaysofterAccountFund(debitAccountData));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setShowVerifyAccountFundPromiseOtp(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [dispatch, success]);

  return (
    <>
      {showVerifyAccountFundPromiseOtp ? (
        <VerifyAccountFundPromiseOtp
          promoTotalPrice={promoTotalPrice}
          paymentData={paymentData}
          reference={reference}
          buyerEmail={userEmail}
          publicApiKey={publicApiKey}
          securityCode={securityCode}
          accountId={accountId}
          formattedPayerEmail={formattedPayerEmail}
          currency={currency}
          duration={duration}
          paymenthMethod={paymenthMethod}
          paymentProvider={paymentProvider}
        />
      ) : (
        <Row className="justify-content-center">
          <Col>
            <Row className="text-center py-2">
              <Col md={10}>
                <h2 className="py-2 text-center">Paysofter Account Fund</h2>
              </Col>
              <Col md={2}>
                <Button
                  variant="outline"
                  onClick={handleAccountInfoModalShow}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Paysofter Account Fund option settles payments using the user's funded Paysofter Account Fund."
                >
                  <i className="fa fa-info-circle"> </i>
                </Button>

                <Modal
                  show={showAccountInfoModal}
                  onHide={handleAccountInfoModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center w-100 py-2">
                      Paysofter Account Fund
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="text-center">
                      Paysofter Account Fund option settles payments using the
                      payer's funded Paysofter Account Fund.{" "}
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
                            Learn more
                          </Button>
                        </span>
                      </a>
                    </p>
                  </Modal.Body>
                </Modal>
              </Col>
            </Row>

            {success && (
              <Message variant="success">
                OTP sent to your email {formattedPayerEmail} successfully.
              </Message>
            )}

            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}

            {formError && <Message variant="danger">{formError}</Message>}

            <Form>
              {/* <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  as="select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  disabled
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                </Form.Control>
              </Form.Group> */}

              <Form.Group controlId="accountId">
                <Form.Label>Account ID</Form.Label>

                <Row className="text-center py-2">
                  <Col md={10}>
                    <Form.Control
                      type="text"
                      placeholder="Enter Paysofter Account ID"
                      value={accountId}
                      // onChange={(e) => setAccountId(e.target.value)}

                      onChange={(e) =>
                        handleFieldChange("accountId", e.target.value)
                      }
                      // required
                      maxLength={12}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline"
                      onClick={handleInfoModalShow}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="A unqiuely assigned 12-digit Paysofter Account ID. Don't have a Paysofter account? Click here."
                    >
                      <i className="fa fa-info-circle"> </i>
                    </Button>

                    <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                      <Modal.Header closeButton>
                        <Modal.Title className="text-center w-100 py-2">
                          Paysofter Account ID
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="text-center">
                          A unqiuely assigned 12-digit Paysofter Account ID.
                          Don't have a Paysofter account? You're just about 3
                          minutes away!{" "}
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
                <Form.Text className="text-danger">{accountIdError}</Form.Text>
              </Form.Group>

              <Form.Group controlId="securityCode">
                <Form.Label>Security Code</Form.Label>
                <Row className="text-center py-2">
                  <Col md={10}>
                    <Form.Control
                      // type="password"
                      type={securityCodeVisible ? "text" : "password"}
                      placeholder="Enter Account Security Code"
                      value={securityCode}
                      // onChange={(e) => setSecurityCode(e.target.value)}
                      onChange={(e) =>
                        handleFieldChange("securityCode", e.target.value)
                      }
                      // required
                      maxLength={4}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline"
                      onClick={handleSecurityCodeModalShow}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="A 4-digit randomly generated Paysofter Account Security Code that expires at a given time  (e.g. every hour). Having issue applying the security code? Refresh your paysofter account page, logout and login or clear browsing data."
                    >
                      <i className="fa fa-info-circle"> </i>
                    </Button>

                    <Modal
                      show={showSecurityCodeModal}
                      onHide={handleSecurityCodeModalClose}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title className="text-center w-100 py-2">
                          Paysofter Account Security Code
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="text-center">
                          A 4-digit randomly generated Paysofter Account
                          Security Code that expires at a given time (e.g. every
                          hour). Having issue applying the security code?
                          Refresh your paysofter account page, logout and login
                          or clear browsing data.{" "}
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
                                Learn More
                              </Button>
                            </span>
                          </a>
                        </p>
                      </Modal.Body>
                    </Modal>
                  </Col>
                  <span className="d-flex justify-content-left">
                    <Button
                      variant="outline"
                      className="rounded"
                      size="sm"
                      onClick={toggleSecurityCodeVisibility}
                    >
                      {securityCodeVisible ? (
                        <span>
                          <i className="fa fa-eye-slash"></i> Hide
                        </span>
                      ) : (
                        <span>
                          <i className="fa fa-eye"></i> Show
                        </span>
                      )}
                    </Button>
                  </span>
                </Row>
                <Form.Text className="text-danger">
                  {securityCodeError}
                </Form.Text>
              </Form.Group>

              <div className="py-3 text-center">
                <Button
                  className="w-100 rounded"
                  type="submit"
                  variant="primary"
                  onClick={submitHandler}
                >
                  Pay{" "}
                  <span>
                    (NGN{" "}
                    {promoTotalPrice?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    )
                  </span>
                </Button>
              </div>
              <div className="py-2 d-flex justify-content-center">
                <Form.Text className="text-danger">{error}</Form.Text>
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PaysofterAccountFundPromise;
