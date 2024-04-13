// ChangePassword.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changePassword } from "../../actions/userProfileActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import Message from "../Message";
import Loader from "../Loader";

function ChangePassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const userChangePassword = useSelector((state) => state.userChangePassword);
  const { success, error, loading } = userChangePassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      dispatch(changePassword(oldPassword, newPassword));
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
      <h2 className="text-center">Change Password</h2>
      {success && (
        <Message variant="success">Password changed successfully.</Message>
      )}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="oldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            value={oldPassword}
            className="rounded"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            className="rounded"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmNewPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            className="rounded"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success" className="rounded mt-2 w-100">
          Change Password
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;
