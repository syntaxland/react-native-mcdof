// AdminDashboard.js
import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Orders from "./Orders";
import Payments from "./Payments";
import OrderShipment from "./OrderShipment";
import SendMessage from "./SendMessage";
import MessageInbox from "./MessageInbox";
import SendEmail from "./SendEmail";
import Dashboard from "./Dashboard";
import CreditPoint from "./CreditPoint";
import SetPromoCode from "./SetPromoCode";
import PromoTimer from "./ApplyPromoCode";
// import LiveChat from "./LiveChat";
import SupportTicket from "./SupportTicket";
import Feedback from "./Feedback";

function AdminDashboard({ history }) {
  const [activeTab, setActiveTab] = useState("admin-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserDashboard = () => {
    history.push("/dashboard/users");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;

      case "payments":
        return <Payments />;

      case "order-shipment":
        return <OrderShipment />;

      case "send-message":
        return <SendMessage />;

      case "message-inbox":
        return <MessageInbox />;

      case "send-email":
        return <SendEmail />;

      case "credit-point-requests":
        return <CreditPoint />;

      case "promo-code":
        return <PromoTimer />;

      case "set-promo-code":
        return <SetPromoCode />;

      case "support-ticket":
        return <SupportTicket />;

      case "feedback":
        return <Feedback />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={sidebarOpen ? 3 : 1} className="sidebar">
          <Button
            variant="link"
            className="sidebar-toggle-button"
            onClick={handleSidebarToggle}
          >
            {/* <FontAwesomeIcon icon={sidebarOpen ? faBars : faBars} /> */}
            <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
          </Button>

          {sidebarOpen && (
            <div className="sidebar-content">
              <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("admin-dashboard")}
                >
                  <i className="fa fa-dashboard"></i> Admin Dashboard
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "orders" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("orders")}
                >
                  <i className="fas fa-luggage-cart"></i> Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "payments" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("payments")}
                >
                  <i className="fas fa-credit-card"></i> Payments
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-shipment" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-shipment")}
                >
                  <i className="fas fa-shipping-fast"></i> Shipments
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "send-message" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("send-message")}
                >
                  <i className="fa-solid fa-message"></i> Send Message
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "send-email" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("send-email")}
                >
                  <i className="fa-solid fa-envelope"></i> Send Email
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "message-inbox" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("message-inbox")}
                >
                  <i className="fa fa-message"></i> Inbox
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "credit-point-requests"
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("credit-point-requests")}
                >
                  <i className="fas fa-sack-dollar"></i> Credit Point
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "set-promo-code" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("set-promo-code")}
                >
                  <i className="fas fa-gift"></i> Create Promo Code
                </Button>
              </div>

              {/* <div>
                <Button
                  variant={activeTab === "promo-code" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("promo-code")}
                >
                  <i className="fas fa-gift"></i> Promo Code
                </Button>
              </div> */}

              <div>
                <Button
                  variant={activeTab === "feedback" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("feedback")}
                >
                  <i className="fa fa-comments"></i> Feedback
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "support-ticket" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("support-ticket")}
                >
                  <i className="fa fa-ticket"></i> Support Ticket
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "live-chat" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("live-chat")}
                >
                  <i className="fas fa-comments"></i> Live Chat
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "admin-dashboard" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleUserDashboard()}
                >
                  User Dashboard
                </Button>
              </div>
            </div>
          )}
        </Col>
        <Col xs={sidebarOpen ? 9 : 11} className="main-content">
          {renderTabContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
