// Feedback.js
import React, { useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listFeedbacks } from "../../actions/feedbackActions";

function Feedback() {
  const history = useHistory();
  const dispatch = useDispatch();

  const feedbackList = useSelector((state) => state.feedbackList);
  const {
    // loading: listSupportTicketLoading,
    feedbacks,
    // error: listSupportTicketError,
  } = feedbackList;
  console.log("feedbacks:", feedbacks);

  useEffect(() => {
    dispatch(listFeedbacks());
  }, [dispatch]);

  const handleSendFeedback = () => {
    history.push("/feedback");
  };

  return (
    <Row>
      <Col>
        <div className="py-3">
          <div className="d-flex justify-content-center mt-5 py-3"> 
            <p>Would you want to send us a feedback?</p>
            {"  "}
            <p>
              <Button
                variant="primary"
                onClick={handleSendFeedback}
                className="rounded"
              >
                Send Feedback
              </Button>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Feedback;
