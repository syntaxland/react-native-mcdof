// stack.js
import { createStackNavigator } from "@react-navigation/stack";
import { navOptions } from "./options";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import HomeScreen from "../components/screens/HomeScreen";
import CartScreen from "../components/screens/CartScreen";
import LoginScreen from "../components/screens/LoginScreen";
import RegisterScreen from "../components/screens/RegisterScreen";
import ProductDetailScreen from "../components/screens/ProductDetailScreen";
import VerifyEmailOtp from "../components/emailOtp/VerifyEmailOtp";
import CheckoutScreen from "../components/screens/CheckoutScreen";
import ShipmentScreen from "../components/screens/ShipmentScreen";
import PaymentScreen from "../components/screens/PaymentScreen";
import FeedbackScreen from "../components/screens/FeedbackScreen";
import SupportTicketScreen from "../components/screens/SupportTicketScreen";
import Orders from "../components/profiles/Orders"; 
import Payments from "../components/profiles/Payments"; 
import OrderItem from "../components/profiles/OrderItem"; 
import SavedItems from "../components/profiles/SavedItems"; 
import OrderShipment from "../components/profiles/OrderShipment"; 
import Reviews from "../components/profiles/Reviews"; 
import Offers from "../components/profiles/Offers"; 
import Feedback from "../components/profiles/Feedback"; 
import SupportTicket from "../components/profiles/SupportTicket"; 
import SupportTicketDetails from "../components/profiles/SupportTicketDetails"; 
import Dashboard from "../components/profiles/Dashboard";
import MessageInbox from "../components/profiles/MessageInbox";
import UserProfile from "../components/profiles/UserProfile";
import Settings from "../components/profiles/Settings";



const Stack = createStackNavigator();

export const HomeStack = () => {
  const navigation = useNavigation();
  const cartItemsCount = useSelector((state) => state?.cart?.cartItems?.length);

  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation, cartItemsCount)}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Product Detail" component={ProductDetailScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="VerifyEmailOtp" component={VerifyEmailOtp} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Shipment" component={ShipmentScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="Create Ticket" component={SupportTicketScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />

      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="Purchased Items" component={OrderItem} />
      <Stack.Screen name="Saved Items" component={SavedItems} />
      <Stack.Screen name="Shipments" component={OrderShipment} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="Support Ticket" component={SupportTicket} />
      <Stack.Screen name="Ticket Details" component={SupportTicketDetails} />
      <Stack.Screen name="MessageInbox" component={MessageInbox} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export const UserDashboardStack = () => {
  const navigation = useNavigation();
  // const cartItemsCount = useSelector((state) => state.cart?.cartItems?.length);

  return (
    <Stack.Navigator screenOptions={() => navOptions(navigation)}>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      {/* <Stack.Screen name="Cart" component={CartScreen} /> */}
     

    </Stack.Navigator>
  );
};
