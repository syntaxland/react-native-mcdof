// DeleteAccount.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAccount } from "../../actions/userProfileActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Message from "../Message";
import Loader from "../Loader";

function DeleteAccount() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteProfile = useSelector((state) => state.deleteProfile);
  const { success, error, loading } = deleteProfile;

  const [password, setPassword] = useState("");

  // const [deleteSuccess, setDeleteSuccess] = useState(false);

  // const userProfile = useSelector((state) => state.userProfile);
  // const { error: deleteAccountError } = userProfile;
  // const { error: deleteAccountError, deleteAccountSuccess } = userProfile;

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  const handleDelete = () => {
    dispatch(deleteUserAccount(password));
    // setDeleteSuccess(true);
    // history.push("/");
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={6}>
          <h2 className="mb-4">Delete Account</h2>
          {/* {deleteSuccess && ( 
            <Message variant="success">
              Account deleted successfully.
            </Message>
          )} */}

          {loading && <Loader />}
          {success && (
            <Message variant="success">
              Account deleted successfully. You will be logged out.
            </Message>
          )}
          {error && <Message variant="danger">{deleteProfile.error}</Message>}

          <Form>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={userInfo.email}
                readOnly
                className="rounded mt-2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password to confirm account deletion"
                className="rounded mt-2"
              />
            </Form.Group>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="rounded mt-2 text-center w-100"
            >
              Delete Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DeleteAccount;
