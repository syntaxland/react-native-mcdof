// stack.js
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/screens/HomeScreen";
import CartScreen from "../components/screens/CartScreen";
import LoginScreen from "../components/screens/LoginScreen";
import RegisterScreen from "../components/screens/RegisterScreen";
import ProductDetailScreen from "../components/screens/ProductDetailScreen";
import VerifyEmailOtp from "../components/emailOtp/VerifyEmailOtp";
import CheckoutScreen from "../components/screens/CheckoutScreen";
import ShipmentScreen from "../components/screens/ShipmentScreen";
import PaymentScreen from "../components/screens/PaymentScreen";
import { navOptions } from "./options";
import { useNavigation } from "@react-navigation/native";
import Dashboard from "../components/profiles/Dashboard";
// import { HomeTabs } from "./taps";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      {/* <Stack.Screen name="Home" component={HomeTabs} /> */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Product Detail" component={ProductDetailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyEmailOtp" component={VerifyEmailOtp} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Shipment" component={ShipmentScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />

    </Stack.Navigator>
  );
};

export const UserDashboardStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
     

    </Stack.Navigator>
  );
};
