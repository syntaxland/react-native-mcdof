// SelectCurrency.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import BuyCreditPoint from "./BuyCreditPoint";
import BuyUsdCreditPoint from "./BuyUsdCreditPoint";
import Select from "react-select"; 

function SelectCurrency() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      window.location.href = "/login";
    }
  }, [userInfo]);

  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption.value);
  };

  const CURRENCY_CHOICES = [
    ["NGN", "Nigerian Naira"],
    ["USD", "United States Dollar"],
  ];

  return (
    <Row className="d-flex justify-content-center text-center">
      <Col>
        <Row className="py-2 d-flex justify-content-center">
          <Col md={10}>
            <div>
              <Select
                options={CURRENCY_CHOICES.map(([value, label]) => ({
                  value,
                  label,
                }))}
                value={{
                  value: selectedCurrency,
                  label: selectedCurrency,
                }}
                onChange={handleCurrencyChange}
                placeholder="Currencies"
                className="rounded py-2 mb-2"
                required
              />
            </div>
          </Col>
        </Row>

        <div className="py-2">
          {selectedCurrency === "NGN" && (
            <BuyCreditPoint currency={selectedCurrency} />
          )}
          
          {selectedCurrency === "USD" && (
            <BuyUsdCreditPoint currency={selectedCurrency} />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default SelectCurrency;
