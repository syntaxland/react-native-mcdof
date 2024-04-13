// SetPromoCode.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createPromoCode } from "../../actions/promoActions";
import Message from "../Message";
import Loader from "../Loader";

const SetPromoCode = ({ history }) => {
  const dispatch = useDispatch();
  const createPromoCodeState = useSelector(
    (state) => state.createPromoCodeState
  );
  const { loading, success, error } = createPromoCodeState;

  const [promoData, setPromoData] = useState({
    promo_code: "",
    discount_percentage: 0,
    expiration_date: "",
    expiration_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoData({
      ...promoData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedDateTime = new Date(
      `${promoData.expiration_date} ${promoData.expiration_time}`
    );
    const isoExpirationDate = combinedDateTime.toISOString();

    dispatch(
      createPromoCode({ ...promoData, expiration_date: isoExpirationDate })
    );
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col xs={12} sm={12} md={6} lg={8} xl={8}>
          <h2 className="text-center">Create Promo Code</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {success && (
            <Message variant="success">
              Promo code created successfully.
            </Message>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="promo_code">
              <Form.Label>Promo Code</Form.Label>
              <Form.Control
                type="text"
                name="promo_code"
                value={promoData.promo_code}
                onChange={handleChange}
                className="rounded"
                required
                placeholder="Enter Promo Code e.g. NEW2023"
              />
            </Form.Group>
            <Form.Group controlId="discount_percentage">
              <Form.Label>Discount Percentage</Form.Label>
              <Form.Control
                type="number"
                name="discount_percentage"
                value={promoData.discount_percentage}
                onChange={handleChange}
                className="rounded"
                required
              />
            </Form.Group>
            <Form.Group controlId="expiration_date">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                name="expiration_date"
                value={promoData.expiration_date}
                onChange={handleChange}
                required
                className="rounded"
              />
            </Form.Group>
            <Form.Group controlId="expiration_time">
              <Form.Label>Expiration Time (HH:MM)</Form.Label>
              <Form.Control
                type="time"
                name="expiration_time"
                value={promoData.expiration_time}
                onChange={handleChange}
                required
                className="rounded"
              />
            </Form.Group>
            <Button className="w-100 rounded" type="submit" variant="success">
              Create Promo Code
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SetPromoCode;
