// Dashboard.js
import React, { useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, Dimensions, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, PieChart } from "react-native-chart-kit";
import { listPayments } from "../../redux/actions/paymentActions";
import { getOrders } from "../../redux/actions/orderActions";
import Message from "../../Message";
import Loader from "../../Loader";

function Dashboard() {
  const dispatch = useDispatch();

  const paymentList = useSelector((state) => state.paymentList);
  const {
    loading: paymentLoading,
    error: paymentError,
    payments,
  } = paymentList;

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderLoading, error: orderError, orders } = orderList;

  useEffect(() => {
    dispatch(listPayments());
    dispatch(getOrders());
  }, [dispatch]);

  const getTotalPayment = () => {
    let totalPayment = 0;
    payments?.forEach((payment) => {
      totalPayment += parseFloat(payment.amount);
    });
    return totalPayment;
  };

  const screenWidth = Dimensions.get("window").width;

  const lineGraphData = payments
    ? {
        labels: payments?.map((payment) =>
          new Date(payment.created_at).toLocaleString()
        ),
        datasets: [
          {
            data: payments?.map((payment) => parseFloat(payment.amount)),
          },
        ],
      }
    : null;

  const paidOrderRateData = orders
    ? [
        {
          name: `Paid Orders (${(
            (orders.filter((order) => order.isPaid).length / orders.length) *
            100
          ).toFixed(1)}%)`,
          population: orders.filter((order) => order.isPaid).length,
          color: "#1F77B4",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: `Unpaid Orders (${(
            (orders.filter((order) => !order.isPaid).length / orders.length) *
            100
          ).toFixed(1)}%)`,
          population: orders.filter((order) => !order.isPaid).length,
          color: "#FF6384",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ]
    : null;

  const unfulfilledOrderRateData = orders
    ? [
        {
          name: `Delivered Orders (${(
            (orders.filter((order) => order.is_delivered).length /
              orders.length) *
            100
          ).toFixed(1)}%)`,
          population: orders.filter((order) => order.is_delivered).length,
          color: "#008000",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: `Undelivered Orders (${(
            (orders.filter((order) => !order.is_delivered).length /
              orders.length) *
            100
          ).toFixed(1)}%)`,
          population: orders.filter((order) => !order.is_delivered).length,
          color: "#FFA500",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ]
    : null;

  // const lineGraphData = {
  //   labels: payments?.map((payment) =>
  //     new Date(payment.created_at).toLocaleString()
  //   ),
  //   datasets: [
  //     {
  //       data: payments?.map((payment) => parseFloat(payment.amount)),
  //     },
  //   ],
  // };

  // const paidOrderRateData = [
  //   {
  //     name: `Paid Orders (${(
  //       (orders?.filter((order) => order.isPaid).length / orders?.length) *
  //       100
  //     ).toFixed(1)}%)`,
  //     population: orders?.filter((order) => order.isPaid).length,
  //     color: "#1F77B4",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: `Unpaid Orders (${(
  //       (orders?.filter((order) => !order.isPaid).length / orders?.length) *
  //       100
  //     ).toFixed(1)}%)`,
  //     population: orders?.filter((order) => !order.isPaid).length,
  //     color: "#FF6384",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  // ];

  // const unfulfilledOrderRateData = [
  //   {
  //     name: `Delivered Orders (${(
  //       (orders?.filter((order) => order.is_delivered).length /
  //         orders?.length) *
  //       100
  //     ).toFixed(1)}%)`,
  //     population: orders?.filter((order) => order.is_delivered).length,
  //     color: "#008000",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  //   {
  //     name: `Undelivered Orders (${(
  //       (orders?.filter((order) => !order.is_delivered).length /
  //         orders?.length) *
  //       100
  //     ).toFixed(1)}%)`,
  //     population: orders?.filter((order) => !order.is_delivered).length,
  //     color: "#FFA500",
  //     legendFontColor: "#7F7F7F",
  //     legendFontSize: 15,
  //   },
  // ];

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Rainy Days"], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const pieChartData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ padding: 10 }}>
          {paymentLoading || orderLoading ? (
            <Loader />
          ) : paymentError || orderError ? (
            <Message variant="danger">{paymentError || orderError}</Message>
          ) : (
            <>
              <View>
                <Text>Total Payment</Text>
                <Text>NGN {getTotalPayment().toFixed(2)}</Text>
              </View>
              <View>
                <Text>Payments</Text>
                <LineChart
                  data={data}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                />
                {/* <LineChart
                  // data={lineGraphData}
                  // width={screenWidth}
                  height={220}
                  yAxisSuffix="NGN "
                  chartConfig={{
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#08130D",
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                    strokeWidth: 2,
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false,
                    decimalPlaces: 2,
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                /> */}
              </View>
              <View>
                <Text>Orders</Text>
                <PieChart
                  data={pieChartData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  center={[10, 50]}
                  absolute
                />
                {/* <PieChart
                  // data={paidOrderRateData}
                  // width={screenWidth}
                  height={220}
                  chartConfig={{
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#08130D",
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2,
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false,
                    decimalPlaces: 2,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
                <PieChart
                  // data={unfulfilledOrderRateData}
                  // width={screenWidth}
                  height={220}
                  chartConfig={{
                    backgroundGradientFrom: "#1E2923",
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientTo: "#08130D",
                    backgroundGradientToOpacity: 0.5,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    strokeWidth: 2,
                    barPercentage: 0.5,
                    useShadowColorFromDataset: false,
                    decimalPlaces: 2,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                /> */}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;
