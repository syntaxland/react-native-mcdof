import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/screens/HomeScreen";
import LoginScreen from "../components/screens/LoginScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0f172a",
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#6c757d",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeTaps") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Login") {
            iconName = focused ? "log-in" : "log-out";
          }
          return (
            <Ionicons
              name={iconName}
              size={focused ? 32 : 18}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTaps"
        options={{
          title: "Home",
        }}
        component={HomeScreen}
      />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
};
