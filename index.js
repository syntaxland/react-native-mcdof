// // index.js
// import React from "react";
// import { AppRegistry } from "react-native";
// import { Provider } from "react-redux";
// import { name as appName } from "./app.json";
// import App from "./App";
// import { initializeStore } from "./src/redux/store";

// const reduxState = async () => {
//   try {
//     const store = await initializeStore();
//     AppRegistry.registerComponent(appName, () => () => (
//       <Provider store={store}>
//         <App />
//       </Provider>
//     ));
//   } catch (error) {
//     console.error("Error initializing store:", error);
//   }
// };

// reduxState();

// // import React from "react";
// // import { AppRegistry } from "react-native";
// // import { Provider } from "react-redux";
// // import { name as appName } from "./app.json";
// // import App from "./App";
// // import { initializeStore } from "./src/redux/store";

// // const store = initializeStore();

// // const reduxState = () => (
// //   <Provider store={store}>
// //     <App />
// //   </Provider>
// // );

// // AppRegistry.registerComponent(appName, () => reduxState);
