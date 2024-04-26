// options.js
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Image, View, Text } from "react-native";
import styles from "../HeaderStyles";
import logoImage from "../../assets/logo.png";

export const navOptions = (nav, cartItemsCount) => {
  return {
    headerTintColor: "#cbd5e1",
    headerStyle: {
      backgroundColor: "#6c757d",
    },
    headerRight: () => (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => nav.navigate("Cart")}
        >
          <View style={styles.cartIcon}>
            <Ionicons
              name="cart-outline"
              size={24}
              color="white"
              style={styles.cartIcon}
            />
            {cartItemsCount > 0 && (
              <Text style={styles.cartCount}>{cartItemsCount}</Text>
            )}
          </View>
        </TouchableOpacity>

        <Ionicons
          name="menu"
          size={32}
          color="white"
          onPress={() => nav.toggleDrawer()}
        />
      </View>
    ),
    headerLeft: () => (
      <TouchableOpacity onPress={() => nav.navigate("Home")}>
        <Image source={logoImage} style={styles.logo} />
      </TouchableOpacity>
    ),
  };
};
