// BuyCreditPoint.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { getPaymentApiKeys } from "../../actions/paymentActions";
import PaymentScreen from "./payment/PaymentScreen";
// import Select from "react-select";

function BuyCreditPoint({ currency }) {
  const dispatch = useDispatch();

  const getPaymentApiKeysState = useSelector(
    (state) => state.getPaymentApiKeysState
  );
  const { paystackPublicKey, paysofterPublicKey } = getPaymentApiKeysState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userEmail = userInfo.email;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    } else {
      dispatch(getPaymentApiKeys());
    }
  }, [userInfo, dispatch]);

  const [amount, setAmount] = useState("");
  const [showPaymentScreen, setShowPaymentScreen] = useState(false);

  const handleShowPaymentScreen = () => {
    setShowPaymentScreen(true);
  };

  const BUY_CPS_CHOICES = [
    ["500", "500 cps for 500 NGN"],
    ["1000", "1,000 cps for 1,000 NGN"],
    ["5000", "5,200 cps for 5,000 NGN"],
    ["10000", "10,800 cps for 10,000 NGN"],
    ["15000", "16,500 cps for 15,000 NGN"],
    ["20000", "24,000 cps for 20,000 NGN"],
    ["50000", "60,000 cps for 50,000 NGN"],
    ["100000", "125,000 cps for 100,000 NGN"],
    ["200000", "255,000 cps for 200,000 NGN"],
    ["500000", "700,000 cps for 500,000 NGN"],
    ["1000000", "1,500,000 cps for 1,000,000 NGN"],
  ];

  console.log("amount:", currency, amount);

  return (
    <Container>
      {showPaymentScreen ? (
        <PaymentScreen
          currency={currency}
          amount={amount}
          paysofterPublicKey={paysofterPublicKey}
          paystackPublicKey={paystackPublicKey}
          userEmail={userEmail}
        />
      ) : (
        <Row className="justify-content-center py-2">
          <Col>
            <Form>
              <Form.Group>
                {/* <Form.Label>Amount</Form.Label> */}
                <Form.Control
                  as="select"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="rounded py-2 mb-2"
                  required
                >
                  <option value="">Select CPS Amount</option>
                  {BUY_CPS_CHOICES.map((type) => (
                    <option key={type[0]} value={type[0]}>
                      {type[1]}
                    </option>
                  ))}
                </Form.Control>
                {/* <Select
                  value={amount}
                  onChange={(selectedOption) => setAmount(selectedOption)}
                  options={BUY_CPS_CHOICES.map((type) => ({
                    value: type[0],
                    label: type[1],
                  }))}
                  placeholder="Select CPS Amount"
                /> */}
              </Form.Group>
            </Form>

            <div className="py-2">
              <Button
                variant="primary"
                onClick={handleShowPaymentScreen}
                className="rounded mt-2 text-center w-100"
                disabled={amount === ""}
              >
                Buy Credit Point (NGN)
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default BuyCreditPoint;
