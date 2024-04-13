// PromoCode.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { applyPromoCode, clearPromoCode } from "../../actions/promoActions";
import Message from "../Message";
import Loader from "../Loader";

const PromoCode = () => {
  const dispatch = useDispatch();
  const promoCodeState = useSelector((state) => state.promoCodeState);
  const { loading, promoCode, error } = promoCodeState;
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [message, setMessage] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (promoCode) {
      setMessage(`Promo Code Applied: ${promoCode}`);
    }
  }, [promoCode]);

  useEffect(() => {
    const countdownTimer = setTimeout(() => {
      dispatch(clearPromoCode());
    }, 100000);

    return () => clearTimeout(countdownTimer);
  }, [dispatch]);

  const applyCodeHandler = async () => {
    if (!promoCodeInput) {
      setMessage("Please enter a promo code.");
      return;
    }
    setShowLoader(true);

    dispatch(applyPromoCode(promoCodeInput))
      .then(() => {
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        setMessage("Invalid or expired promo code.");
      });
  };

  return (
    <div>
      <div>
        {message && <Message variant="success">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
      </div>

      <div>
        <Form onSubmit={applyCodeHandler}>
          <Form.Group controlId="promoCode">
            <Form.Control
              type="text"
              placeholder="Enter Promo Code"
              className="rounded"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
            />
          </Form.Group>
          <Button
            className="rounded"
            variant="success"
            type="submit"
            disabled={loading}
          >
            Apply Promo Code
          </Button>
        </Form>

        {showLoader && <Loader />}
      </div>
    </div>
  );
};

export default PromoCode;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { applyPromoCode, clearPromoCode } from '../../actions/promoActions';
// import Message from "../Message";
// import Loader from "../Loader";

// const PromoCode = () => {
//   const dispatch = useDispatch();
//   const promoCodeState = useSelector((state) => state.promoCodeState);
//   const { loading, promoCode, error } = promoCodeState;
//   console.log("Promo Code:", promoCode);

//   useEffect(() => {
//     // Start a countdown timer here and dispatch clearPromoCode when it ends.
//     const countdownTimer = setTimeout(() => {
//       dispatch(clearPromoCode());
//     }, /* Your countdown duration in milliseconds */);

//     return () => clearTimeout(countdownTimer);
//   }, [dispatch]);

//   const applyCodeHandler = () => {
//     // Dispatch applyPromoCode action with the entered promo code.
//     dispatch(applyPromoCode('WLC2023')); // Replace with user input
//   };

//   return (
//     <div>
//       {promoCodeState.promoCode ? (
//         <p>Promo Code Applied: {promoCodeState.promoCode}</p>
//       ) : (
//         <button onClick={applyCodeHandler}>Apply Promo Code</button>
//       )}
//     </div>
//   );
// };

// export default PromoCode;
