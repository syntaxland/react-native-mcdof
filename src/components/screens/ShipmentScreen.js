import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { saveShipment } from "../../redux/actions/orderActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { styles } from "../screenStyles";

const ShipmentScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [userInfo, navigation]);

  const { loading, success, error } = useSelector(
    (state) => state.shipmentSave
  );

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const order_id = route.params.id;

  const submitHandler = () => {
    const shipmentData = {
      address,
      city,
      postalCode,
      country,
      order_id,
    };
    dispatch(saveShipment(shipmentData));
    navigation.navigate("Payment", { order_id });
  };

  useEffect(() => {
    if (success) {
      // navigation.navigate('Payment', { order_id });
    }
  }, [success, navigation, order_id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.goBackIcon}>
          <FontAwesomeIcon
            // size={24}
            color="blue"
            icon={faArrowLeft}
          />{" "}
          {/* Go Back */}
          Previous
        </Text>
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Shipping Address</Text>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          {success && (
            <Message variant="success">Shipment created successfully!</Message>
          )}
          <TextInput
            style={styles.input}
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter postal code"
            value={postalCode}
            onChangeText={setPostalCode}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter country"
            value={country}
            onChangeText={setCountry}
          />
          <Button
            title="Proceed to Payment"
            onPress={submitHandler}
            disabled={
              address === "" ||
              city === "" ||
              postalCode === "" ||
              country === "" ||
              loading ||
              success
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView> 
  );
};

export default ShipmentScreen;
