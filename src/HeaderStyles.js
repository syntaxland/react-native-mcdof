// HeaderStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#6c757d', 
    // backgroundColor: "#0f172a",

  },
  // logo: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   marginLeft: 5,
  //   paddingLeft: 5,
  // },
  logo: {
    width: 80,
    height: 40,
    resizeMode: "contain",
    marginLeft: 10, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  searchButton: {
    padding: 10,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    color: 'white',
    marginRight: 5,
  },
  username: {
    color: 'white',
    marginRight: 10,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    marginRight: 10,
  },
  logout: {
    color: 'white',
    marginLeft: 10,
  },
  login: {
    color: 'white',
    marginLeft: 10,
  },
  cartIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  cartCount: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 5,
  },
});

export default styles;
