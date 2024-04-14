import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemDetails: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  promoText: {
    color: 'green',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  promoContainer: {
    paddingVertical: 10,
  },
  timestamp: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
