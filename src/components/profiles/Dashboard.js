// Dashboard.js
import React, {
  useEffect,
  // useState
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  // Modal,
  // TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { LineChart, PieChart } from "react-native-chart-kit";
import { getCreditPointBalance } from "../../actions/creditPointActions";
import { listPayments } from "../../actions/paymentActions";
import { getOrders } from "../../actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";
// import SellCreditPoint from "../CreditPoint/SellCreditPoint";
// import SelectCurrency from "../CreditPoint/SelectCurrency";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCreditPointBalance());
    dispatch(listPayments());
    dispatch(getOrders());
  }, [dispatch]);

  const creditPointBal = useSelector((state) => state.creditPointBal);
  const {
    loading,
    error,
    // creditPointBalance
  } = creditPointBal;

  const paymentList = useSelector((state) => state.paymentList);
  const {
    loading: paymentLoading,
    error: paymentError,
    payments,
  } = paymentList;

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderLoading, error: orderError, orders } = orderList;

  // const [buyCreditPointModal, setBuyCreditPointModal] = useState(false);
  // const handleBuyCreditPointClose = () => {
  //   setBuyCreditPointModal(false);
  // };

  // const [sellCreditPointModal, setSellCreditPointModal] = useState(false);
  // const handleSellCreditPointClose = () => {
  //   setSellCreditPointModal(false);
  // };

  const getTotalPayment = () => {
    let totalPayment = 0;
    payments.forEach((payment) => {
      totalPayment += parseFloat(payment.amount);
    });
    return totalPayment;
  };

  const paidOrderRateData = {
    labels: [
      `Paid Orders (${(
        (orders?.filter((order) => order.isPaid)?.length / orders?.length) *
        100
      ).toFixed(1)}%)`,
      `Unpaid Orders (${(
        (orders?.filter((order) => !order.isPaid)?.length / orders?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders?.filter((order) => order.isPaid)?.length,
          orders?.filter((order) => !order.isPaid)?.length,
        ],
        backgroundColor: ["#1F77B4", "#FF6384"],
      },
    ],
  };

  const unfulfilledOrderRateData = {
    labels: [
      `Delivered Orders (${(
        (orders?.filter((order) => order.is_delivered)?.length /
          orders.length) *
        100
      ).toFixed(1)}%)`,
      `Undelivered Orders (${(
        (orders?.filter((order) => !order.is_delivered)?.length /
          orders?.length) *
        100
      ).toFixed(1)}%)`,
    ],
    datasets: [
      {
        data: [
          orders?.filter((order) => order.is_delivered)?.length,
          orders?.filter((order) => !order.is_delivered)?.length,
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
    <ScrollView contentContainerStyle={styles.container}>
      {loading || paymentLoading || orderLoading ? (
        <Loader />
      ) : error || paymentError || orderError ? (
        <Message variant="danger">
          {error || paymentError || orderError}
        </Message>
      ) : (
        <View style={styles.content}>
          <View style={styles.barChartContainer}>
            <Text style={styles.heading}>Total Payment</Text>
            <View style={styles.barContainer}>
              <View
                style={{
                  width: `${(getTotalPayment() / 100) * 200}px`,
                  backgroundColor: "#1E90FF",
                  height: 20,
                  borderRadius: 10,
                }}
              ></View>
            </View>
            <Text>
              <Text style={styles.icon}>💵</Text> NGN{" "}
              {getTotalPayment().toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.lineGraphContainer}>
            <Text style={styles.heading}>Payments</Text>
            <LineChart
              data={{
                labels: payments.map((payment) =>
                  new Date(payment.created_at).toLocaleString()
                ),
                datasets: [
                  {
                    data: payments.map((payment) => payment.amount),
                  },
                ],
              }}
              width={300}
              height={200}
              yAxisLabel="NGN"
              chartConfig={{
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <View style={styles.ordersContainer}>
            <Text style={styles.heading}>Orders</Text>
            <View style={styles.pieChartContainer}>
              <Text style={styles.subHeading}>Paid Order Rate</Text>
              <PieChart
                data={[
                  {
                    name: "Paid Orders",
                    population: orders?.filter((order) => order.isPaid)?.length,
                    color: "#1F77B4",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "Unpaid Orders",
                    population: orders?.filter((order) => !order.isPaid)
                      ?.length,
                    color: "#FF6384",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                ]}
                width={300}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </View>
            <View style={styles.pieChartContainer}>
              <Text style={styles.subHeading}>Order Fulfilment Rate</Text>
              <PieChart
                data={[
                  {
                    name: "Delivered Orders",
                    population: orders?.filter((order) => order.is_delivered)
                      ?.length,
                    color: "#008000",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                  {
                    name: "Undelivered Orders",
                    population: orders?.filter((order) => !order.is_delivered)
                      ?.length,
                    color: "#FFA500",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15,
                  },
                ]}
                width={300}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#fff",
                  backgroundGradientTo: "#fff",
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
              />
            </View>
          </View>
        </View>
      )}

      {/* <Modal visible={buyCreditPointModal} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Buy Credit Point</Text>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={handleBuyCreditPointClose}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
          {buyCreditPointModal && <SelectCurrency />}
        </View>
      </Modal>

      <Modal visible={sellCreditPointModal} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Sell/Share Credit Point</Text>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={handleSellCreditPointClose}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
          {sellCreditPointModal && <SellCreditPoint />}
        </View>
      </Modal> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  content: {
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  barChartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  barContainer: {
    width: 200,
    height: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  lineGraphContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  ordersContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "#1E90FF",
  },
  pieChartContainer: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 16,
  },
});

export default Dashboard;
