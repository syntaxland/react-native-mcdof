// RegisterScreen.js
import React, {
  useState,
  useEffect,
  useMemo,
  // useCallback
} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUser,
  faEnvelope,
  faKey,
  faPhone,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-native-phone-input";
import { register } from "../../redux/actions/userActions";
import { sendEmailOtp } from "../../redux/actions/emailOtpActions";
import { styles } from "../screenStyles";
import Message from "../../Message";
import Loader from "../../Loader";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  // const [referralCode, setReferralCode] = useState("");

  const [isTermsConditionsRead, setIsTermsConditionsRead] = useState(false);
  const [termsConditionsError, setTermsConditionsError] = useState("");

  const [formError, setFormError] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  // useEffect(() => {
  //   const { referralCode } = navigation.getParam('referralCode', '');
  //   if (referralCode) {
  //     setReferralCode(referralCode);
  //   }
  // }, []);

  // const [refreshing, setRefreshing] = useState(false);
  // const wait = (timeout) => {
  //   return new Promise((resolve) => {
  //     setTimeout(resolve, timeout);
  //   });
  // };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   // dispatch(listProducts());
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case "isTermsConditionsRead":
        setIsTermsConditionsRead(value);
        setTermsConditionsError("");
        break;

      case "username":
        setUsername(value);
        setUsernameError("");
        break;

      case "firstName":
        setFirstName(value);
        setFirstNameError("");
        break;

      case "lastName":
        setLastName(value);
        setLastNameError("");
        break;

      case "email":
        setEmail(value);
        setEmailError("");
        break;

      case "password":
        setPassword(value);
        setPasswordError("");
        break;

      case "confirmPassword":
        setConfirmPassword(value);
        setConfirmPasswordError("");
        break;

      case "phoneNumber":
        setPhoneNumber(value);
        setPhoneNumberError("");
        break;

      default:
        break;
    }
  };

  const lowerCaseEmail = email.toLowerCase();
  const lowerCaseUsername = username.toLowerCase().trim();

  const formData = useMemo(() => {
    return {
      first_name: firstName,
      last_name: lastName,
      username: lowerCaseUsername,
      email: lowerCaseEmail,
      password,
      phone_number: phoneNumber,
      // referral_code: referralCode,
      is_terms_conditions_read: isTermsConditionsRead,
    };
  }, [
    firstName,
    lastName,
    lowerCaseEmail,
    lowerCaseUsername,
    password,
    phoneNumber,
    // referralCode,
    isTermsConditionsRead,
  ]);

  console.log("formData:", formData);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Please enter your username.");
    } else if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters.");
    } else if (/[^a-zA-Z0-9_]/.test(username)) {
      setUsernameError("Username must not contain special characters.");
      return;
    } else {
      setUsernameError("");
    }

    if (!firstName) {
      setFirstNameError("Please enter your first name.");
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Please enter your last name.");
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Please enter your email.");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your password.");
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
    } else {
      setConfirmPasswordError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Please enter your phone number.");
    } else if (phoneNumber.length < 9) {
      setPhoneNumberError("Phone number must be at least 9 digits.");
    } else {
      setPhoneNumberError("");
    }

    if (!isTermsConditionsRead) {
      setTermsConditionsError("Please accept the terms and conditions.");
    } else {
      setTermsConditionsError("");
    }

    if (
      !username ||
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !isTermsConditionsRead
    ) {
      setFormError("Please check the errors in the form and fix them.");
      return;
    } else {
      await AsyncStorage.setItem("registrationData", JSON.stringify(formData));
      dispatch(register(formData));
    }
  };

  const handleTermsAndConditions = () => {
    navigation.navigate("TermsAndConditions");
  };

  useEffect(() => {
    if (success) {
      dispatch(sendEmailOtp(lowerCaseEmail, firstName));
      AsyncStorage.setItem("registrationData", JSON.stringify(formData));
      const timer = setTimeout(() => {
        navigation.navigate("VerifyEmailOtp");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, success, navigation, email, firstName, formData]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Register</Text>
          {loading && <Loader />}
          {error && <Message variant="error">{error}</Message>}
          {formError && <Message variant="error">{formError}</Message>}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(value) => handleFieldChange("username", value)}
            />
          </View>
          {usernameError && <Text style={styles.error}>{usernameError}</Text>}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={(value) => handleFieldChange("firstName", value)}
            />
          </View>
          {firstNameError && <Text style={styles.error}>{firstNameError}</Text>}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(value) => handleFieldChange("lastName", value)}
            />
          </View>
          {lastNameError && <Text style={styles.error}>{lastNameError}</Text>}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(value) => handleFieldChange("email", value)}
            />
          </View>
          {emailError && <Text style={styles.error}>{emailError}</Text>}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faKey} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={(value) => handleFieldChange("password", value)}
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <FontAwesomeIcon
                icon={passwordVisible ? faEye : faEyeSlash}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {passwordError && <Text style={styles.error}>{passwordError}</Text>}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faKey} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={(value) =>
                handleFieldChange("confirmPassword", value)
              }
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <FontAwesomeIcon
                icon={confirmPasswordVisible ? faEye : faEyeSlash}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          {confirmPasswordError && (
            <Text style={styles.error}>{confirmPasswordError}</Text>
          )}

          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faPhone} style={styles.icon} />
            <PhoneInput
              initialCountry={"us"}
              value={phoneNumber}
              onChangePhoneNumber={(value) => {
                setPhoneNumber(value);
                handleFieldChange("phoneNumber", value);
              }}
              style={styles.input}
              textStyle={{ fontSize: 16 }}
              textProps={{ placeholder: "Phone Number" }}
            />
          </View>
          {phoneNumberError && (
            <Text style={styles.error}>{phoneNumberError}</Text>
          )}

          <BouncyCheckbox
            isChecked={isTermsConditionsRead}
            onPress={(isChecked) => {
              setIsTermsConditionsRead(isChecked);
              handleFieldChange("isTermsConditionsRead", isChecked);
            }}
            text="I agree to the Terms and Conditions"
            textStyle={{
              marginLeft: 8,
              textDecorationLine: "none",
            }}
            size={25}
            fillColor="green"
            unFillColor="#FFFFFF"
            iconStyle={{ borderColor: "red" }}
            innerIconStyle={{ borderWidth: 2 }}
          />
          <TouchableOpacity onPress={handleTermsAndConditions}>
            <Text style={{ color: "blue" }}>Terms & Conditions</Text>
          </TouchableOpacity>
          {termsConditionsError && (
            <Text style={styles.error}>{termsConditionsError}</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              onPress={submitHandler}
              disabled={loading}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Already have an account? Login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
