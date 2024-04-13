// Settings.js
import React from "react";
import {
  //  useDispatch, 
  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import {
  // getUserProfile,
  // updateUserAvatar,
} from "../../actions/userProfileActions";
import { Form, Button, Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

// import { lightTheme, darkTheme, GlobalStyle } from "./Themes";
// import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

function Settings() {
  // const dispatch = useDispatch();

  // const userProfile = useSelector((state) => state.userProfile);
  // const { loading: profileLoading, error: profileError, profile } = userProfile;
  // console.log("userProfile:", userProfile, "profile:", profile);

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, error } = updateProfile;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  // const handleAvatarChange = (e) => {
  //   const avatar = e.target.files[0];
  //   if (avatar) {
  //     const formData = new FormData();
  //     formData.append("avatar", avatar);
  //     dispatch(updateUserAvatar(formData));
  //   }
  // };

  const handleDeleteAccount = () => {
    history.push("/delete-account");
  };

  const handleChangePassword = () => {
    history.push("/change-password");
  };

  return (
    <Container Fluid>
      <Row>
        <h2 className="text-center py-3">
          <i className="fas fa-gear"></i> Settings
        </h2>

        {loading && <Loader />}

        {error && <Message variant="danger">{error}</Message>}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Dark Mode</Accordion.Header>
              <Accordion.Body>
                <Button variant="transparent">
                  <FontAwesomeIcon icon={faSun} /> Light{" "}
                  <i
                    className="fa fa-toggle-off"
                    style={{ fontSize: "18px", color: "white" }}
                  ></i>{" "}
                </Button>

                <Button variant="transparent">
                  <FontAwesomeIcon icon={faMoon} /> Dark{" "}
                  <i
                    className="fa fa-toggle-on"
                    style={{ fontSize: "18px", color: "red" }}
                  ></i>{" "}
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Change Password</Accordion.Header>
              <Accordion.Body>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="****************"
                    readOnly
                  />
                </Form.Group>
                <div className="py-2"></div>
                <Button
                  className="rounded"
                  variant="success"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey="2">
              <Accordion.Header>Update Avatar</Accordion.Header>
              <Accordion.Body>
                <Form.Group>
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item> */}

            <Accordion.Item eventKey="3">
              <Accordion.Header>Delete Account</Accordion.Header>
              <Accordion.Body>
                <p>
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="warning-icon"
                  />{" "}
                  Warning! This action is irreversible and all your data will be
                  deleted from our database.
                </p>
                <Button
                  variant="danger"
                  onClick={handleDeleteAccount}
                  className="rounded"
                >
                  Delete Account
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;
