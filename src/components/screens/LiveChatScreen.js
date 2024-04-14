// LiveChatScreen.js
import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import "./LiveChat.css";

const API_URL = process.env.REACT_APP_API_URL;

function LiveChat() {
  // const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { rooms } = useSelector((state) => state.chatRooms);
  console.log("rooms:", rooms, rooms.room_name);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [room] = useState("payment");
  const [isConnected, setIsConnected] = useState(false);

  const client = new W3CWebSocket(`ws://${API_URL}/ws/chat/${room}/`);

  const onButtonClicked = (e) => {
    client.send(
      JSON.stringify({
        type: "message",
        message: value,
        name: name,
      })
    );
    setValue("");
    e.preventDefault();
  };

  useEffect(() => {
    if (userInfo.first_name) {
      setName(
        userInfo.first_name.charAt(0).toUpperCase() +
          userInfo.first_name.slice(1)
      );
    }
  }, [userInfo.first_name]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      setIsConnected(true);
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply! ", dataFromServer.type);
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            msg: dataFromServer.message,
            name: dataFromServer.name,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    };
    // eslint-disable-next-line
  }, [client.onmessage]); 

  return (
    <Row>
      <Col>
        <div className="py-3">
          <Row className="d-flex justify-content-between py-1">
            <Col>
              {isConnected && (
                <span style={{ fontSize: "18px", color: "green" }}>
                  <FontAwesomeIcon icon={faDotCircle} /> Online
                </span>
              )}
            </Col>

            <Col>Time: {new Date().toLocaleTimeString()}</Col>
          </Row>

          <Card
            style={{
              height: 500,
              maxHeight: 500,
              overflow: "auto",
              boxShadow: "none",
            }}
          >
            {messages.map((message, index) => (
              <Card key={index}>
                <Card.Header>
                  <strong>{message.name}</strong> - {message.timestamp}
                </Card.Header>
                <Card.Body>{message.msg}</Card.Body>
              </Card>
            ))}
          </Card>

          <Form onSubmit={onButtonClicked}>
            <Form.Group controlId="room">
              <Form.Label></Form.Label>
              <div className="expandable-textarea">
                <Form.Control
                  as="textarea"
                  rows="1"
                  placeholder="Enter message"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </div>
            </Form.Group>
            <div className="text-center py-2">
              <Button className="rounded w-100" type="submit" variant="primary">
                Send <i className="fa fa-paper-plane"></i>
              </Button>
            </div>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default LiveChat;
