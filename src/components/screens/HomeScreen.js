// HomeScreen.js
import React, {
  useCallback,
  //  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import {
  useDispatch,
  //  useSelector
} from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { listProducts } from "../../redux/actions/productAction";
import GetProductScreen from "./GetProductScreen";
// import RecommendedProducts from "./RecommendedProducts";
import Header from "../../Header";
import { styles } from "../screenStyles";

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(listProducts());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
          <Header />

          <GetProductScreen />

          {/* <View style={{ padding: 10 }}>
        {userInfo ? <RecommendedProducts /> : null}
      </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
