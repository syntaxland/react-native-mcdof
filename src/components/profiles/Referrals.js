// Referrals.js
import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  generateReferralLink,
  getUserReferrals,
  // generateReferralLinkButton,
} from "../../actions/promoActions";
import Loader from "../Loader";
import Message from "../Message";
// import NotificationAlert from "../NotificationAlert";

function Referrals() {
  const dispatch = useDispatch();
  const referralState = useSelector((state) => state.referral);
  const { referralLink, referralCode, referralError, loading } = referralState;
  console.log("referralLink:", referralLink);

  const referralButton = useSelector((state) => state.referralButton);
  const { referralErrorButton, loading: loadingButton } = referralButton;

  const userReferralState = useSelector((state) => state.userReferralState);
  const {
    loading: userReferralsLoading,
    userReferrals,
    error: userReferralsError,
  } = userReferralState;
  console.log("userReferrals:", userReferrals);

  const [isReferralLinkCopied, setIsReferralLinkCopied] = useState(false);
  const [isReferralCodeCopied, setIsReferralCodeCopied] = useState(false);
  // const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);

  useEffect(() => {
    dispatch(generateReferralLink());
    dispatch(getUserReferrals());
  }, [dispatch]);

  // const handleGenerateReferral = () => {
  //   setShowConfirmationAlert(true);
  // };

  // const handleConfirmGenerate = () => {
  //   dispatch(generateReferralLinkButton());
  //   setShowConfirmationAlert(false);
  // };

  const copyToClipboard = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      if (textToCopy === referralLink) {
        setIsReferralLinkCopied(true);
        setTimeout(() => setIsReferralLinkCopied(false), 2000);
      } else if (textToCopy === referralCode) {
        setIsReferralCodeCopied(true);
        setTimeout(() => setIsReferralCodeCopied(false), 2000);
      }
    });
  };

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Referral Link",
          text: "Check out this referral link!",
          url: referralLink,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Share failed:", error));
    } else {
      console.log("Web Share API not supported");
      // Fallback: Provide instructions to manually share the link
      alert("Please manually share the referral link: " + referralLink);
    }
  };

  return (
    <div>
      <Row className="d-flex justify-content-center">
        <Col>
          <div>
            <h1 className="text-center py-3">Referrals</h1>
            <hr />

            {/* {showConfirmationAlert && (
              <NotificationAlert
                variant="info"
                message="This action will generate a new referral link if not existing and render the former ones invalid. Are you sure you want to proceed?"
                onClose={() => setShowConfirmationAlert(false)}
              >
                <Button variant="danger" onClick={handleConfirmGenerate}>
                  OK
                </Button>
              </NotificationAlert>
            )} */}

            {userReferralsLoading ? (
              <Loader />
            ) : userReferralsError ? (
              <Message variant="danger">{userReferralsError}</Message>
            ) : (
              <>
                <h5 className="text-right py-2">
                  <i className="fas fa-users"></i> Referred Users:{" "}
                  {userReferrals.map((referrals) => (
                    <>
                      {/* <span key={referrals.id}>
                        ({referrals.referred_users.length || 0})
                      </span> */}

                      <span key={referrals.id}>
                        (
                        {referrals.referred_users.length !== 0
                          ? referrals.referred_users.length
                          : 0}
                        )
                      </span>
                    </>
                  ))}
                </h5>
              </>
            )}
          </div>
          <hr />
          <h1 className="text-center py-3">Referral Link</h1>
          {loading || loadingButton ? (
            <Loader />
          ) : referralError || referralErrorButton ? (
            <Message variant="danger">
              {referralError || referralErrorButton}
            </Message>
          ) : (
            <div>
              <h5 className="pt-3">Your Referral Code:</h5>
              <div>
                {referralCode}{" "}
                <span>
                  <Button
                    variant="success"
                    className="rounded"
                    size="sm"
                    onClick={() => copyToClipboard(referralCode)}
                  >
                    {isReferralCodeCopied ? (
                      <span>
                        <i className="fa fa-check"></i> Copied
                      </span>
                    ) : (
                      <span>
                        <i className="fa fa-copy"></i> Copy
                      </span>
                    )}
                  </Button>
                </span>
              </div>

              <h5 className="pt-3">Your Referral Link:</h5>
              <div>
                <span style={{ color: "blue" }}>{referralLink}</span>{" "}
                <span>
                  <Button
                    variant="success"
                    className="rounded"
                    size="sm"
                    onClick={() => copyToClipboard(referralLink)}
                  >
                    {isReferralLinkCopied ? (
                      <span>
                        <i className="fa fa-check"></i> Copied
                      </span>
                    ) : (
                      <span>
                        <i className="fa fa-copy"></i> Copy
                      </span>
                    )}
                  </Button>
                </span>
                <span>
                  <Button
                    variant="link"
                    className="rounded"
                    onClick={shareReferralLink}
                  >
                    Share <i className="fas fa-share-alt"></i>
                  </Button>
                </span>
              </div>
              <hr />

              {/* <div className="py-3 mt-5 text-center">
                <span>Referral link not found?</span>{" "}
                <Button
                  variant="danger"
                  className="rounded"
                  onClick={handleGenerateReferral}
                >
                  Generate
                </Button>
              </div> */}
            </div>
          )}

          {/* <hr /> */}
        </Col>
      </Row>
    </div>
  );
}

export default Referrals;
