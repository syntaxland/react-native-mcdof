// VerifyUsdAccountFundOtp.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../../../actions/cartActions";
import {
  // createPayment,
  createPaysofterPayment,
  debitPaysofterUsdAccountFund,
  verifyOtp,
} from "../../../actions/paymentActions";
import { buyCreditPoint } from "../../../actions/creditPointActions";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Loader from "../../Loader";
import Message from "../../Message";

const VerifyUsdAccountFundOtp = ({
  amount,
  paymentData,
  reference,
  userEmail,
  currency,
  paysofterPublicKey,
  formattedPayerEmail,
}) => {
  const [otp, setOtp] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const createdAt = new Date().toISOString();

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const otpVerifyState = useSelector((state) => state.otpVerifyState);
  const { loading, success, error } = otpVerifyState;

  const buyCreditPointState = useSelector((state) => state.buyCreditPointState);
  const {
    success: buyCreditPointSuccess,
    error: buyCreditPointError,
  } = buyCreditPointState;

  console.log("formattedPayerEmail:", formattedPayerEmail);

  const sendOtpData =
    JSON.parse(localStorage.getItem("debitUsdAccountData")) || [];
  console.log("sendOtpData:", sendOtpData, sendOtpData.account_id);

  const paysofterPaymentData = {
    payment_id: reference,
    email: userEmail,
    amount: amount,
    public_api_key: paysofterPublicKey,
    created_at: createdAt,
  };

  const otpData = {
    otp: otp,
    account_id: sendOtpData.account_id,
    amount: amount,
    currency: currency,
  };

  const debitUsdAccountData = {
    account_id: sendOtpData.account_id,
    security_code: sendOtpData.security_code,
    amount: amount,
  };

  const handleVerifyEmailOtp = () => {
    dispatch(verifyOtp(otpData));
  };

  const handleResendEmailOtp = () => {
    setResendLoading(true);
    setResendMessage("");
    try {
      dispatch(
        debitPaysofterUsdAccountFund(JSON.stringify(debitUsdAccountData))
      );
      setResendMessage(`OTP resent to ${formattedPayerEmail} successfully.`);
      setResendDisabled(true);
    } catch (error) {
      setResendMessage("Error resending OTP. Please try again.");
    }
    setResendLoading(false);
  };

  useEffect(() => {
    let timer;
    if (countdown > 0 && resendDisabled) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    } else if (!resendDisabled) {
      setCountdown(60);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown, resendDisabled]);

  const creditPointData = {
    amount: amount,
  };

  useEffect(() => {
    if (success) {
      dispatch(createPaysofterPayment(paysofterPaymentData));
      dispatch(buyCreditPoint(creditPointData));
      localStorage.removeItem("debitUsdAccountData");
      setShowSuccessMessage(true);
      setTimeout(() => {
        // window.location.reload();
      }, 5000);
    }
    // eslint-disable-next-line
  }, [dispatch, success, history]);

  useEffect(() => {
    if (buyCreditPointSuccess) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [buyCreditPointSuccess, history]);

  return (
    <Container>
      <Row className="justify-content-center text-center mt-5">
        <Col>
          <div className="border rounded p-4 py-2">
            <h1 className="py-2">Verify OTP ({currency})</h1>
            {showSuccessMessage && (
              <Message variant="success">Payment made successfully!</Message>
            )}
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {resendMessage && (
              <Message variant={resendLoading ? "info" : "success"}>
                {resendMessage}
              </Message>
            )}

            {buyCreditPointSuccess && (
              <Message variant="success">
                Your account has been credited with the CPS purchased for{" "}
                {amount} {currency}.
              </Message>
            )}

            {buyCreditPointError && (
              <Message variant="danger">{buyCreditPointError}</Message>
            )}

            <Form className="py-2">
              <Form.Group controlId="otp">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </Form.Group>
              <div className="py-3">
                <Button
                  onClick={handleVerifyEmailOtp}
                  disabled={loading || success}
                  variant="success"
                  type="submit"
                  className="rounded"
                >
                  Verify OTP
                </Button>
              </div>
            </Form>
            <p>
              OTP has been sent to email: {formattedPayerEmail} for Paysofter
              Account ID: {sendOtpData.account_id} and expires in 10 minutes. It
              might take a few seconds to deliver.
            </p>
            <Button
              variant="link"
              type="submit"
              disabled={resendDisabled || resendLoading}
              onClick={handleResendEmailOtp}
            >
              {resendLoading
                ? "Resending OTP..."
                : resendDisabled
                ? `Resend OTP (${countdown}sec)`
                : "Resend OTP"}
            </Button>
          </div>

          <div className="py-2 d-flex justify-content-center">
            <Form.Text className="text-danger">{error}</Form.Text>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyUsdAccountFundOtp;
