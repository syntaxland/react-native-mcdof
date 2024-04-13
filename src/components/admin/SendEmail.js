// SendEmail.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { sendEmail } from "../../actions/messagingActions";
import Message from "../Message";
import Loader from "../Loader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SendEmail = () => {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailMessaging = useSelector((state) => state.emailMessaging);
  const { sending, error, sent } = emailMessaging;

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bold",
    "italic",
    "underline",
    "align",
    "link",
    "image",
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    const emailData = {
      subject,
      message,
    };
    console.log("emailData:", emailData);

    dispatch(sendEmail(emailData));
  };

  useEffect(() => {
    if (sent) {
      setSuccessMessage("Email sent successfully.");
      setTimeout(() => {
        setSuccessMessage("");
        setSubject("");
        setMessage("");
      }, 3000);
    }
  }, [sent]);

  return (
    <Row>
      <div className="d-flex justify-content-center">
        <Col md={9}>
          <div>
            <h2 className="text-center py-3">Send Email To All</h2>
            {error && <Message variant="danger">{error}</Message>}
            {successMessage && (
              <Message variant="success">{successMessage}</Message>
            )}
            {sending ? (
              <Loader />
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="subject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    maxLength={50}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="message">
                  <Form.Label>Message</Form.Label>
                  <ReactQuill
                    value={message}
                    onChange={setMessage}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter message"
                    // style={{ height: "150px" }}
                    maxLength={5000}
                    required
                  />
                </Form.Group>

                <div className="text-center py-2">
                  <Button
                    className="rounded w-100"
                    type="submit"
                    variant="success"
                  >
                    Send Email <i className="fa fa-paper-plane"></i>
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </div>
    </Row>
  );
};

export default SendEmail;
