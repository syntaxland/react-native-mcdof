// Dashboard.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";
import { getAllPaymentsList } from "../../actions/paymentActions";
import { getAllOrders } from "../../actions/orderActions";
import { Line, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  PointElement
);

function Dashboard() {
  const dispatch = useDispatch();

  const listAllPayments = useSelector((state) => state.listAllPayments);
  const { 
    loading: paymentLoading,
    error: paymentError,
    payments,
  } = listAllPayments;
  console.log("payments:", payments);

  const allOrderList = useSelector((state) => state.allOrderList);
  const { loading: orderLoading, error: orderError, orders } = allOrderList;
  console.log("Orders from state:", orders);

  useEffect(() => {
    dispatch(getAllPaymentsList());
    dispatch(getAllOrders());
  }, [dispatch]);

  // const lineGraphData = {
  //   labels: payments.map((payment) =>
  //     new Date(payment.created_at).toLocaleString()
  //   ),
  //   datasets: [
  //     {
  //       label: "Amount Paid (NGN)",
  //       fill: false,
  //       borderColor: "rgba(75,192,192,1)",
  //       borderWidth: 2,
  //       data: payments.map((payment) => payment.amount),
  //     },
  //   ],
  // };

  const lineGraphData = {
    labels: payments.map((payment) =>
      new Date(payment.created_at).toLocaleString()
    ),
    datasets: [
      {
        label: "Amount Paid (NGN)",
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        data: payments.map((payment) => payment.amount),
        orderIds: payments.map((payment) => payment.order_id),
        firstNames: payments.map((payment) => payment.first_name), 
      },
    ],
  };
  
  const lineChartOptions = {
    // ...
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            if (label) {
              const index = context.dataIndex;
              const orderId = context.dataset.orderIds[index];
              const firstName = context.dataset.firstNames[index];
              // return `${label}: NGN ${context.formattedValue} (${orderId})`;
              return `${label}: NGN ${context.formattedValue} - Order ID: ${orderId} - User: ${firstName}`;
            }
            return null;
          },
        },
      },
    },
  };

  const getTotalPayment = () => {
    let totalPayment = 0;
    payments.forEach((payment) => {
      totalPayment += parseFloat(payment.amount);
    });
    return totalPayment;
  };

  const totalPayment = getTotalPayment();
  const creditPoints = totalPayment * 0.01;

  console.log("totalPayment:", totalPayment, "creditPoints:", creditPoints);

  // const withdrawCreditPoints =
  //   totalPayment >= 500000 ? (
  //     <Link
  //       to={{
  //         pathname: "/credit-point",
  //         search: `?creditPoints=${creditPoints}`,
  //       }}
  //     >
  //       <Button variant="success" className="rounded" size="sm">
  //         Withdraw Points
  //       </Button>
  //     </Link>
  //   ) : (
  //     <p>
  //       <Button variant="outline" className="rounded" size="sm" disabled>
  //         Earned points mature from NGN 5000
  //       </Button>
  //     </p>
  //   );

  const paidOrderRateData = {
    labels: [
      `Paid Orders (${(
        (orders.filter((order) => order.isPaid).length / orders.length) *
        100
      ).toFixed(1)}%)`,
      `Unpaid Orders (${(
        (orders.filter((order) => !order.isPaid).length / orders.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders.filter((order) => order.isPaid).length,
          orders.filter((order) => !order.isPaid).length,
        ],
        backgroundColor: ["#1F77B4", "#FF6384"],
      },
    ],
  };

  const unfulfilledOrderRateData = {
    labels: [
      `Delivered Orders (${(
        (orders.filter((order) => order.is_delivered).length / orders.length) *
        100
      ).toFixed(1)}%)`,
      `Undelivered Orders (${(
        (orders.filter((order) => !order.is_delivered).length / orders.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders.filter((order) => order.is_delivered).length,
          orders.filter((order) => !order.is_delivered).length,
        ],
        backgroundColor: ["#008000", "#FFA500"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="justify-content-center text-center">
      <div>
        {paymentLoading || orderLoading ? (
          <Loader />
        ) : paymentError || orderError ? (
          <Message variant="danger">{paymentError || orderError}</Message>
        ) : (
          <div>
            <Row>
              <Col>
                <div>
                  <div className="bar-chart">
                    <h2 className="pt-4">Total Payments (All Users)</h2>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${(getTotalPayment() / 100) * 200}px`,
                        }}
                      ></div>
                    </div>
                    <p>
                      NGN{" "}
                      {getTotalPayment().toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="line-graph mt-4">
                  <h2 className="py-3">Payments (All Users)</h2>
                  <Line data={lineGraphData} options={lineChartOptions}/>
                </div>
              </Col>
              <hr />
              <div className="mt-4 py-3">
                <h2 className="py-3">Orders (All Users)</h2>
                <Row>
                  <Col>
                    <h5 className="py-3">Paid Order Rate</h5>
                    <div className="chart-container">
                      <Pie
                        data={paidOrderRateData}
                        options={pieChartOptions}
                        width={200}
                        height={200}
                      />
                    </div>
                  </Col>
                  <Col>
                    <h5 className="py-3">Order Fulfilment Rate</h5>
                    <div className="chart-container">
                      <Pie
                        data={unfulfilledOrderRateData}
                        options={pieChartOptions}
                        width={200}
                        height={200}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <hr />
              
              {/* <Col>
                <h2 className="py-3">Shipments</h2>
                <div className="py-3"></div>
              </Col>
              <hr /> */}

              <Col>
                <h2 className="py-3">Credit Points</h2>
                <div></div>
              </Col>
              <hr />

              <Col>
                <h2 className="py-3">Messages</h2>
                <div></div>
              </Col>
              <hr />


            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
 