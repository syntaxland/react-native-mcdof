// HeaderStyles.js

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    marginRight: 5,
  },
  link: {
    color: "blue",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  promo: {
    fontSize: 14,
    color: "green",
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#0f172a",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  outlineInfo: {
    // backgroundColor: "#fff",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "blue",
  },
  info: {
    // backgroundColor: "blue",
    backgroundColor: "#17a2b8",
  },
  outlineDanger: {
    // backgroundColor: "#fff",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "red",
  },
  danger: {
    backgroundColor: "#dc3545",
    // backgroundColor: "red", 
  },
  textMuted: {
    color: "#999",
  },
});

export default styles;
