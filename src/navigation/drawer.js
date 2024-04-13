// drawer.js
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStack, UserDashboardStack } from "./stack";

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
  return (
    <Drawer.Navigator
      // initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "Home",
        }}
      />

      <Drawer.Screen
        name="Dashboard"
        component={UserDashboardStack}
        options={{
          title: "Dashboard",
        }}
      />
    </Drawer.Navigator>
  );
};
