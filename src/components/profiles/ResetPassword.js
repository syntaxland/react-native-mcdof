// ResetPassword.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { resetPassword } from "../../actions/userProfileActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const resetPwd = useSelector((state) => state.resetPassword);
  const { success, error, loading } = resetPwd;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      dispatch(resetPassword(token, newPassword));
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    }
  }, [success, history]);

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <h1 className="text-center">Reset Password</h1>
          {success && (
            <Message variant="success">Password reset successfully.</Message>
          )}
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" className="rounded mt-2 w-100">
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;
