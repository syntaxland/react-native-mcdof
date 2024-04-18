import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCartPlus,
  // faSearch,
  faHome,
  // faHand,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "./redux/actions/userActions";
import { getUserProfile } from "./redux/actions/userProfileActions";
import styles from "./HeaderStyles";

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");
  const [greeting, setGreeting] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate("Login");
  };

  const searchHandler = () => {
    if (keyword.trim()) {
      navigation.navigate("ProductSearch", { keyword });
    } else {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning!");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {/* <Text style={styles.logo}>
          <FontAwesomeIcon
            icon={faHome}
            size={24}
            color="white"
            style={styles.cartIcon}
          />
          Mcdof Shop{" "}
        </Text> */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands or categories."
            value={keyword}
            onChangeText={setKeyword}
            onSubmitEditing={searchHandler}
          />
          <TouchableOpacity style={styles.searchButton} onPress={searchHandler}>
            {/* <FontAwesomeIcon
            icon={faSearch}
            size={24}
            color="white"
            style={styles.cartIcon}
          /> */}
          </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          {userInfo && userInfo.avatar && (
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            {/* <Text style={styles.greeting}>{greeting}</Text> */}
            <Text style={styles.username}>
              {userInfo && userInfo.first_name
                ? userInfo.first_name.charAt(0).toUpperCase() +
                  userInfo.first_name.slice(1)
                : ""}
            </Text>
          </TouchableOpacity>

          {userInfo ? (
            <TouchableOpacity onPress={logoutHandler}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.login}>Sign in</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={styles.cartIcon}>
              <FontAwesomeIcon
                icon={faCartPlus}
                size={24}
                color="white"
                style={styles.cartIcon}
              />

              {cartItems.length > 0 && (
                <Text style={styles.cartCount}>{cartItems.length}</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
