// SellCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { sellCreditPoint } from "../../redux/actions/creditPointActions";
import { useHistory } from "react-router-dom";
import Message from "../../Message";
import Loader from "../../Loader";

function SellCreditPoint() {
  const dispatch = useDispatch(); 
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const sellCreditPointState = useSelector(
    (state) => state.sellCreditPointState
  );
  const { success, error, loading } = sellCreditPointState;

  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");

  const [messsage, setMesssage] = useState("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        window.location.reload();
        // history.push("/dashboard");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, history]);

  const lowerCaseUsername = username.toLowerCase().trim();
  const creditPointData = {
    // username: username,
    username: lowerCaseUsername,
    amount: amount,
    password: password,
  };
  console.log("creditPointData:", creditPointData);

  const handleSellCreditPoint = () => {
    if (amount < 100) {
      setMesssage("The minimum credit point transfer amount is 100.");
    } else {
      dispatch(sellCreditPoint(creditPointData));
    }
  };

  return (
    <Container>
      <Row className="justify-content-center py-2">
        <Col md={8}>
          {loading && <Loader />}
          {success && (
            <Message variant="success">
              You have transferred {amount} credit points to {username}{" "}
              successfully.
            </Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {messsage && <Message variant="danger">{messsage}</Message>}

          <p className="rounded mt-2 py-1 text-center">
            <i
              className="fa fa-warning"
              style={{ fontSize: "18px", color: "yellow" }}
            ></i>{" "}
            Warning! This action will transfer the credit point amount from your
            account to the receiver's credit point wallet.
            {/* Please enter the password for your account email <strong>({userInfo.email}</strong>):{" "} */}
          </p>

          <Form>
            <Form.Group>
              <Form.Label>Receiver's Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter cps receiver's username"
                className="rounded"
                required
                maxLength={12}
              />
            </Form.Group>

            <Form.Group className="py-1">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter cps amount"
                className="rounded"
                required
              />
            </Form.Group>

            <Form.Group className="py-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="rounded"
                required
                maxLength={100}
              />
            </Form.Group>
            <div className="py-2">
              <Button
                variant="success"
                onClick={handleSellCreditPoint}
                className="rounded text-center w-100"
                disabled={password === "" || username === "" || amount === ""}
              >
                Sell/Share CPS
              </Button>
            </div>
            <div className="py-2 d-flex justify-content-center text-center">
              <Form.Text className="text-danger">{error}</Form.Text>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SellCreditPoint;
