// UserDashboard.js
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
// import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { login } from "../../actions/userActions";
import { getUserProfile } from "../../actions/userProfileActions";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Payments from "./Payments";
import Favorites from "./SavedItems";
import OrderShipment from "./OrderShipment";
import OrderItem from "./OrderItem";
import Reviews from "./Reviews";
import Dashboard from "./Dashboard";
import MessageInbox from "./MessageInbox";
import CreditPoint from "./CreditPoint";
import PromoProduct from "./Offers";
import RecommendedProducts from "./RecommendedProducts";
import ViewedItems from "./ViewedItems";
// import LiveChat from "./LiveChat";
import Referrals from "./Referrals";
import SupportTicket from "./SupportTicket";
import Feedback from "./Feedback";
import Settings from "./Settings";

function UserDashboard({ history }) {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userProfile);
  const { profile } = userProfile;
  console.log("profile:", profile);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("userInfo:", userInfo);

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const [activeTab, setActiveTab] = useState("user-dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAdminDashboard = () => {
    history.push("/dashboard/admin");
  };

  // const handleAddbusiness = () => {
  //   history.push("/create-marketplace-seller");
  // };

  // const handleMarketplaceDashboard = () => {
  //   history.push("/dashboard/marketplace/sellers");
  // };

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;

      case "orders":
        return <Orders />;

      case "payments":
        return <Payments />;

      case "favorites":
        return <Favorites />;

      case "order-shipment":
        return <OrderShipment />;

      case "order-items":
        return <OrderItem />;

      case "reviews":
        return <Reviews />;

      case "message-inbox":
        return <MessageInbox />;

      case "credit-point":
        return <CreditPoint />;

      case "recommended-products":
        return <RecommendedProducts />;

      case "offers":
        return <PromoProduct />;

      case "viewed-products":
        return <ViewedItems />;

      case "referrals":
        return <Referrals />;

      // case "live-chat":
      //   return <LiveChat />;

      case "support-ticket":
        return <SupportTicket />;

      case "feedback":
        return <Feedback />;

      case "settings":
        return <Settings />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid>
      <Row className="main-section">
        <Col xs={sidebarOpen ? 4 : 1} className="sidebar">
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
                    activeTab === "user-dashboard" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  // activeClassName="active-link"
                  onClick={() => handleTabChange("user-dashboard")}
                >
                  <i className="fa fa-dashboard"></i> Dashboard
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "profile" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("profile")}
                >
                  <i className="fas fa-user"></i> Profile
                </Button>
              </div>
              <div>
                <Button
                  variant={activeTab === "orders" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("orders")}
                >
                  <i className="fa fa-cart-arrow-down"></i> Orders
                </Button>
              </div>
              <div>
                <Button
                  variant={
                    activeTab === "order-items" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("order-items")}
                >
                  <i className="fa fas fa-cart-plus"></i> Purchased Items
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
                  variant={activeTab === "reviews" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("reviews")}
                >
                  <i className="fas fa-star"></i> Reviews
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "referrals" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("referrals")}
                >
                  <i className="fa fa-user-plus"></i> Referrals
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "credit-point" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("credit-point")}
                >
                  <i className="fas fa-sack-dollar"></i> Bonus Point
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
                  variant={activeTab === "favorites" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("favorites")}
                >
                  <i className="fa fa-heart"></i> Saved Items
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "viewed-products" ? "info" : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("viewed-products")}
                >
                  <i className="fa fa-eye"></i> Viewed Items
                </Button>
              </div>

              <div>
                <Button
                  variant={
                    activeTab === "recommended-products"
                      ? "info"
                      : "outline-info"
                  }
                  className="sidebar-link"
                  onClick={() => handleTabChange("recommended-products")}
                >
                  <i className="fa fa-thumbs-up"></i> Recommended
                </Button>
              </div>

              <div>
                <Button
                  variant={activeTab === "offers" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("offers")}
                >
                  <i className="fa fa-gift"></i> Offers
                </Button>
              </div>

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

              {/* <div>
                <Button
                  variant={activeTab === "live-chat" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("live-chat")}
                >
                  <i className="fas fa-comments"></i> Live Chat
                </Button>
              </div> */}

              <div>
                <Button
                  variant={activeTab === "settings" ? "info" : "outline-info"}
                  className="sidebar-link"
                  onClick={() => handleTabChange("settings")}
                >
                  <i className="fas fa-gear"></i> Settings
                </Button>
              </div>

              <div>
                {profile?.is_superuser || profile?.is_staff ? (
                  <div>
                    <Button
                      variant={
                        activeTab === "admin-dashboard"
                          ? "info"
                          : "outline-info"
                      }
                      className="sidebar-link"
                      onClick={() => handleAdminDashboard()}
                    >
                      <i className="fas fa-user-check"></i> Go to Admin
                      Dashboard
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {/* <div className="">
                {!profile?.is_marketplace_seller ? (
                  <div className="mt-3">
                    
                    <Button
                      size="sm"
                      className="sidebar-link py-2"
                      variant="outline-success"
                      onClick={handleAddbusiness}
                    >
                      <i className="fa fa-user-alt"></i> Create Seller Account
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        className="sidebar-link py-2"
                        variant="outline-success"
                        onClick={handleMarketplaceDashboard}
                      >
                        <i className="fa fa-user-alt"></i> Go to Marketplace
                        Dashboard
                      </Button>
                    </div>
                  </>
                )}
              </div> */}

            </div>
          )}
        </Col>
        <Col xs={sidebarOpen ? 8 : 11} className="main-content">
          {renderTabContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard;
