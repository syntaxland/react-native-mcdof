// drawer.js
import React, { useState, useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeStack, 
  // UserDashboardStack
 } from "./stack";

import { Text, View, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
// import { styles } from "./screens/screenStyles";
import { logout } from "../redux/actions/userActions";

const Drawer = createDrawerNavigator();

export const MyDrawer = (props) => {
  return (
    <>
      <SafeAreaProvider>
        <Drawer.Navigator
          // initialRouteName="Home"
          screenOptions={{ headerShown: false }}
          // drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerContent={(props) => (
            <View style={{ flex: 1, backgroundColor: "#6c757d" }}>
              <CustomDrawerContent {...props} />
            </View>
          )}
        >
          <Drawer.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              title: "Home",
            }}
          />

          {/* <Drawer.Screen
            name="Dashboard"
            component={UserDashboardStack}
            options={{
              title: "Dashboard", 
            }}
          /> */}
        </Drawer.Navigator>
      </SafeAreaProvider>
    </>
  );
};

export const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>
          {userInfo
            ? `${greeting}, ${
                userInfo.first_name.charAt(0).toUpperCase() +
                userInfo.first_name.slice(1)
              }!`
            : `${greeting}!`}
        </Text>
      </View>

      <DrawerItemList {...props} />

      {userInfo ? (
        <>
          <DrawerItem
            label="Dashboard"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Profile"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Orders"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Purchased Items"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Payments"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Shipments"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Reviews"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Inbox"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Saved Items"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Offers"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Feedback"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Support Tickets"
            onPress={() => navigation.navigate("Home")}
          />

          <DrawerItem
            label="Settings"
            onPress={() => navigation.navigate("Home")}
          />
        </>
      ) : (
        <></>
      )}

      <DrawerItem
        label={() => (
          <Text style={styles.drawerItem}>{userInfo ? "Logout" : "Login"}</Text>
        )}
        onPress={() => {
          if (userInfo) {
            logoutHandler();
          } else {
            navigation.navigate("Login");
          }
        }}
      />

      <DrawerItem
        label={() => (
          <Text style={styles.drawerItem}>{userInfo ? "" : "Register"}</Text>
        )}
        onPress={() => {
          if (!userInfo) {
            navigation.navigate("Register");
          }
        }}
        style={styles.drawerItem}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    color: "blue",
  },
  greetingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
