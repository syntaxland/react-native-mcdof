// LiveChat.js
import React, {  } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import ChatBot from "react-simple-chatbot";

function LiveChat() {
  const history = useHistory();

  const handleLiveChat = () => {
    history.push("/live-chat");
  };

  return (
    <Row>
      <Col>
        <div className="py-3">
          {/* <ChatBot steps={chatbotSteps} opened={true} /> */}
          <div>
            <ChatBot
              steps={[
                {
                  id: "0",
                  message:
                    "Welcome to our chatbot! I'm Mc, how can I assist you today?",
                  trigger: "1",
                },
                {
                  id: "1",
                  message: "What do you want to know?",
                  trigger: "2",
                },
                {
                  id: "2",
                  user: true,
                  trigger: "3",
                },
                {
                  id: "3",
                  message:
                    "Great! Click the button below to chat with one of our available agents online.",
                  end: true,
                },
              ]}
            />
          </div>

          <div className="d-flex justify-content-center mt-5 py-3">
            <span>Want to chat with our available agent online?</span>{" "}
            <Button
              variant="danger"
              onClick={handleLiveChat}
              className="rounded"
            >
              Chat Now
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default LiveChat;
