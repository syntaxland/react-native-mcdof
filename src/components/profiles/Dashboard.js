// Dashboard.js
import React, { useEffect } from "react";
import { View, Text, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCreditPointBalance } from "../../redux/actions/creditPointActions";
import { listPayments } from "../../redux/actions/paymentActions";
import { getOrders } from "../../redux/actions/orderActions";
import { LineChart, PieChart } from "react-native-chart-kit";
// import SellCreditPoint from "../CreditPoint/SellCreditPoint"; 
// import SelectCurrency from "../CreditPoint/SelectCurrency";

function Dashboard() {
  const dispatch = useDispatch();

  const creditPointBal = useSelector((state) => state.creditPointBal);
  const { loading: creditPointLoading, error: creditPointError, creditPointBalance } = creditPointBal;

  const paymentList = useSelector((state) => state.paymentList);
  const { loading: paymentLoading, error: paymentError, payments } = paymentList;

  const orderList = useSelector((state) => state.orderList);
  const { loading: orderLoading, error: orderError, orders } = orderList;

  // useEffect(() => {
  //   dispatch(getCreditPointBalance());
  //   dispatch(listPayments());
  //   dispatch(getOrders());
  // }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Display loaders or error messages if data is loading or an error occurred */}
      {creditPointLoading || paymentLoading || orderLoading ? (
        <Text>Loading...</Text>
      ) : creditPointError || paymentError || orderError ? (
        <Text>Error: {creditPointError || paymentError || orderError}</Text>
      ) : (
        <View>
          {/* Render dashboard content */}
          <Text>Total Payment: {payments.reduce((total, payment) => total + parseFloat(payment.amount), 0)}</Text>
          
          {/* Render line chart */}
          <LineChart
            data={{
              labels: payments.map((payment) => new Date(payment.created_at).toLocaleString()),
              datasets: [{
                data: payments.map((payment) => payment.amount),
              }]
            }}
            width={300}
            height={220}
            yAxisSuffix="NGN"
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
          />

          {/* Render pie charts */}
          <PieChart
            data={[{
              name: 'Paid Orders',
              population: orders.filter((order) => order.isPaid).length,
              color: '#1F77B4',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            }, {
              name: 'Unpaid Orders',
              population: orders.filter((order) => !order.isPaid).length,
              color: '#FF6384',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            }]}
            width={200}
            height={200}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            absolute
          />

          <PieChart
            data={[{
              name: 'Delivered Orders',
              population: orders.filter((order) => order.is_delivered).length,
              color: '#008000',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            }, {
              name: 'Undelivered Orders',
              population: orders.filter((order) => !order.is_delivered).length,
              color: '#FFA500',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            }]}
            width={200}
            height={200}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            absolute
          />

          {/* Render credit point balance */}
          <Text>Credit Point Balance: {creditPointBalance.balance} NGN</Text>

          {/* Render modals */}
          <Modal
            visible={false} // Set to true when you want to show the modal
            animationType="slide"
            transparent={true}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                {/* <SellCreditPoint /> */}
              </View>
            </View>
          </Modal>

          <Modal
            visible={false} // Set to true when you want to show the modal
            animationType="slide"
            transparent={true}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                {/* <SelectCurrency /> */}
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}

export default Dashboard;
