// UserProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"; 
import {
  getUserProfile,
  updateUserProfile, 
  updateUserAvatar,
} from "../../actions/userProfileActions";
import { sendEmailOtp } from "../../actions/emailOtpActions";
import { Form, Button, Row, Col, Container, Accordion } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

function UserProfile() {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;
  console.log("userProfile:", userProfile, "profile:", profile);

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, success, error } = updateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo:", userInfo);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  // const { loading: updateAvatarLoading, success: updateAvatarSuccess, error: updateAvatarError } = useSelector((state) => state.updateUserAvatar);

  const handleAvatarChange = (e) => {
    const avatar = e.target.files[0];
    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      dispatch(updateUserAvatar(formData));
    }
  };

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    // avatar: "",
  });

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  // useEffect(() => {
  //   if (userProfile && userProfile.profile) {
  //     const profile = userProfile.profile;
  //     setUserData({
  //       ...userData,
  //       first_name: profile.first_name,
  //       last_name: profile.last_name,
  //       phone_number: profile.phone_number,
  //       avatar: profile.avatar,
  //     });
  //   }
  // }, [userProfile, userData]);

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      setUserData({
        first_name: userProfile.profile.first_name,
        last_name: userProfile.profile.last_name,
        phone_number: userProfile.profile.phone_number,
        avatar: userProfile.profile.avatar,
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (userInfo) {
      setUserData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number: userInfo.phone_number,
        avatar: userInfo.avatar,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };

  // const handleDeleteAccount = () => {
  //   // setUserData({ ...userData, password: "" }); // Clear the password field
  //   history.push("/delete-account");
  // };

  const handleResendEmailOtp = () => {
    dispatch(sendEmailOtp(userInfo.email, userInfo.first_name));
    history.push("/verify-email-otp");
  };

  const handleVerifyEmail = () => {
    if (!userInfo.is_verified) {
      handleResendEmailOtp();
    }
  };

  // const handleChangePassword = () => {
  //   history.push("/change-password");
  // };

  return (
    <Container Fluid>
      <Row>
        

        {userInfo.is_verified ? (
            <h2 className="text-center">
            Profile <i className="fas fa-user-check"></i>
          </h2>
          ) : (
            <h2 className="text-center">
          Profile <i className="fas fa-user"></i>
        </h2>
          )}
          
        {loading && <Loader />}
        {profileLoading && <Loader />}

        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}

        {error && <Message variant="danger">{error}</Message>}
        {profileError && <Message variant="danger">{error}</Message>}

        <p>
          Verified{" "}
          {userInfo.is_verified ? (
            <i
              className="fas fa-check-circle"
              // className="fas fa-badge-check"
              style={{ fontSize: "18px", color: "white" }}
            ></i>
          ) : (
            <i
              className="fas fa-times-circle"
              // className="fas fa-badge-check"
              style={{ fontSize: "18px", color: "red" }}
            ></i>
          )}
        </p>

        {/* <Col
          xs={3}
          id="sidebar"
          className={`bg-dark ${sidebarOpen ? "open" : "closed"}`}
        >

          <div className="sidebar-content">
            <Accordion defaultActiveKey="0">

            <Accordion.Item eventKey="0">
              <Accordion.Header>Bio</Accordion.Header>
              <Accordion.Body>
                Bio
              </Accordion.Body>
            </Accordion.Item>
            </Accordion>
          </div>

          <Button className="toggle-button" onClick={toggleSidebar}>
           X <i className={`bi bi-x-lg ${sidebarOpen ? "open" : "closed"}`}></i>
          </Button>

        </Col> */}

        <Col>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Bio</Accordion.Header>
              <Accordion.Body>
                <Form encType="multipart/form-data">
                  {!userInfo.is_verified && (
                    <Button variant="primary" onClick={handleVerifyEmail}>
                      Verify Email
                    </Button>
                  )}

                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={profile.username}
                      readOnly
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={profile.email}
                      readOnly
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone_number"
                      value={userData.phone_number}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  {/* <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </Form.Group> */}

                  <div className="d-flex justify-content-right pt-3">
                    <Button
                      className="rounded"
                      variant="success"
                      onClick={handleUpdateProfile}
                    >
                      Update Profile
                    </Button>{" "}
                  </div>

                  {/* <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={userData.password}
                      readOnly
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Button
                    rounded
                    variant="success"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </Button> */}
                </Form>
              </Accordion.Body>
            </Accordion.Item>

            {/* <Accordion.Item eventKey="1">
              <Accordion.Header>Change Password</Accordion.Header>
              <Accordion.Body>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="****************"
                    value={userInfo.password}
                    readOnly
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button
                  className="rounded"
                  variant="success"
                  onClick={handleChangePassword}
                >
                  Change Password
                </Button>
              </Accordion.Body>
            </Accordion.Item> */}

            <Accordion.Item eventKey="2">
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
            </Accordion.Item>

            {/* <Accordion.Item eventKey="3">
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
            </Accordion.Item> */}

          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
