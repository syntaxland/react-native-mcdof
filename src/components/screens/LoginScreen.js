// LoginScreen.js
import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../redux/actions/userActions";
import Loader from "../../Loader";
import Message from "../../Message";
import { styles } from "../screenStyles";

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, userInfo, success } = useSelector(
    (state) => state.userLogin
  );

  const lowerCaseEmail = email.toLowerCase();
  const loginData = useMemo(() => {
    return {
      email: lowerCaseEmail.trim(),
      password: password.trim(),
    };
  }, [lowerCaseEmail, password]);

  const submitHandler = () => {
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, userInfo, dispatch, navigation]);

  // useEffect(() => {
  //   if (userInfo && success) {
  //     navigation.navigate("Home");
  //   }
  // }, [success, userInfo, dispatch, navigation]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          {loading && <Loader />}
          {error && <Message variant="error">{error}</Message>}
          {success && <Message variant="success">Login successful</Message>}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faKey} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              onPress={submitHandler}
              disabled={loading || !email || !password}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
