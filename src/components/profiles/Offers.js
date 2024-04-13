// PromoProduct.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listPromoProducts } from "../../actions/promoActions";
import Product from "../Product";
import Loader from "../Loader";
import Message from "../Message";

const PromoProduct = () => {
  const dispatch = useDispatch();

  const promoProductList = useSelector((state) => state.promoProductList);
  const { loading, error, promoProducts } = promoProductList;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = promoProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(promoProducts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    dispatch(listPromoProducts());
  }, [dispatch]);

  return (
    <div className="horizontal-scroll-container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {promoProducts.length === 0 ? (
            <div className="no-promo-products-message text-center">
              Running offers appear here.
            </div>
          ) : (
            <>
              <div className="horizontal-scroll">
                <Row>
                  {currentItems.map((product) => (
                    <Col key={product._id} xs={12} sm={12} md={6} lg={3} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </div>
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>
                  {pageNumbers.map((number) => (
                    <li
                      key={number}
                      className={`page-item ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === pageNumbers.length ? "disabled" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PromoProduct;
