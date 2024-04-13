// npm install --global eas-cli && npx create-expo-app mcdofshop && cd mcdofshop && eas init --id 39d2bff7-18f5-42c5-830e-069da9eaf39b

// npm install --global eas-cli && eas init --id 39d2bff7-18f5-42c5-830e-069da9eaf39b



// import { createStore, combineReducers, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from "@react-native-async-storage/async-storage";

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// import {
//   productListReducers,
//   productDetailsReducers,
//   saveProductReducer,
//   userFavoriteProductsReducer,
//   userViewedProductsReducer,
//   removeProductReducer,
//   updateProductSaveCountReducer,
//   viewedProductReducer,
//   recommendedProductsReducer,
//   productSearchReducer,
// } from "./reducers/productReducers";
// import { cartReducer } from "./reducers/cartReducers";
// import {
//   userLoginReducers,
//   userRegisterReducers,
// } from "./reducers/userReducers";

// const rootReducer = combineReducers({
//   productList: productListReducers,
//   productDetails: productDetailsReducers,
//   productSave: saveProductReducer,
//   userFavoriteProducts: userFavoriteProductsReducer,
//   userViewedProducts: userViewedProductsReducer,
//   viewedProduct: viewedProductReducer,
//   productRemove: removeProductReducer,
//   updateProductSaveCount: updateProductSaveCountReducer,
//   recommendedProducts: recommendedProductsReducer,
//   productSearch: productSearchReducer,

//   cart: cartReducer,
//   userLogin: userLoginReducers,
//   userRegister: userRegisterReducers,
// });

// const getCartItems = async () => {
//   try {
//     const cartItems = await AsyncStorage.getItem("cartItems");
//     return cartItems ? JSON.parse(cartItems) : [];
//   } catch (error) {
//     console.error("Error getting cart items from AsyncStorage:", error);
//     return [];
//   }
// };

// const getUserInfo = async () => {
//   try {
//     const userInfo = await AsyncStorage.getItem("userInfo");
//     return userInfo ? JSON.parse(userInfo) : null;
//   } catch (error) {
//     console.error("Error getting user info from AsyncStorage:", error);
//     return null;
//   }
// };

// const getUserRegisterData = async () => {
//   try {
//     const registerData = await AsyncStorage.getItem("registerData");
//     return registerData ? JSON.parse(registerData) : null;
//   } catch (error) {
//     console.error("Error getting register data from AsyncStorage:", error);
//     return null;
//   }
// };

// const initialState = {
//   cart: { cartItems: await getCartItems() },
//   userLogin: { userInfo: await getUserInfo() },
//   userRegister: { registerData: await getUserRegisterData() },
// };

// // const middleware = [thunk];

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(
//   persistedReducer,
//   initialState,
//   applyMiddleware(thunk)
// );

// export const persistor = persistStore(store);

// export default store;



// import React, {
//   useState,
//   // useEffect
// } from "react";
// import { StatusBar } from "expo-status-bar"; 
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Platform,
//   ScrollView,
//   TextInput,
//   Button,
//   TouchableOpacity,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// console.log("Mcdofshop!");

// function HomeScreen() {
//   const navigation = useNavigation();

//   const [keyword, setKeyword] = useState("");

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar style="dark" />
//       <View style={styles.platformStyle}>
//         <Text>Platform: {Platform.OS === "ios" ? "iOS" : "Android"}</Text>
//       </View>
//       <ScrollView>
//         <View style={styles.containerStyle}>
//           <View>
//             <Text style={styles.h2Style}>Hi Mcdofshop!</Text>
//             <Text>This is home ...</Text>
//             <Button
//               // style={styles.btnStyle}
//               title="Login"
//               onPress={() => navigation.navigate("Login")}
//             />
//           </View>
//           <View
//             style={{
//               padding: 20,
//               alignItems: "center",
//               marginTop: 50,
//               paddingVertical: 8,
//             }}
//           >
//             <TextInput
//               defaultValue={keyword}
//               onChangeText={(word) => setKeyword(word)}
//               style={styles.textInputStyle}
//             />

//             <TouchableOpacity
//               style={styles.btnStyle}
//               onPress={() => console.log("keyword:", keyword)}
//             >
//               <Text>Send</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footerStyle}>
//         <Text>Mcdofshop, 2024. All rights reserved.</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   containerStyle: {
//     flex: 1,
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     backgroundColor: "#6c757d",
//     height: 1600,
//   },
//   h2Style: {
//     paddingVertical: 8,
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   platformStyle: {
//     backgroundColor: "#007bff",
//     paddingVertical: 8,
//     alignItems: "flex-end",
//     marginTop: 16,
//   },
//   btnStyle: {
//     backgroundColor: "#007bff",
//     paddingVertical: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 4,
//     // marginBottom: 10,
//     elevation: 3,
//     padding: 16,
//     height: 40,
//     width: 300,
//   },
//   textInputStyle: {
//     padding: 8,
//     borderWidth: 1,
//     borderRadius: 4,
//     fontSize: 14,
//     height: 40,
//     width: 300,
//   },
//   footerStyle: {
//     alignItems: "center",
//     marginTop: 16,
//     marginBottom: 20,
//     paddingVertical: 8,
//     backgroundColor: "#007bff",
//   },
// });

// export default HomeScreen;
