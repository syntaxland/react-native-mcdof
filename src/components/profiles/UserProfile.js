// UserProfile.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { updateUserProfile, updateUserAvatar } from "../../actions/userProfileActions";
import { sendEmailOtp } from "../../actions/emailOtpActions";
import { styles } from "../screenStyles";
import Accordion from "react-native-collapsible/Accordion";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const userProfile = useSelector((state) => state.userProfile);
  const { loading: profileLoading, error: profileError, profile } = userProfile;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, success, error } = updateProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigation.navigate("Login");
    }
  }, [navigation, userInfo]);

  const [successMessage, setSuccessMessage] = useState("");

  const handleAvatarChange = (avatar) => {
    if (avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);
      dispatch(updateUserAvatar(formData));
    }
  };

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    if (userInfo) {
      setUserData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        phone_number: userInfo.phone_number,
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (success) {
      setSuccessMessage("Profile updated successfully.");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }, [success]);

  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };

  const handleResendEmailOtp = () => {
    dispatch(sendEmailOtp(userInfo.email, userInfo.first_name));
    navigation.navigate("VerifyEmailOtp");
  };

  const handleVerifyEmail = () => {
    if (!userInfo.is_verified) {
      handleResendEmailOtp();
    }
  };

  const SECTIONS = [
    {
      title: "Bio",
      content: (
        <View style={styles.accordionContent}>
          {!userInfo.is_verified && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleVerifyEmail}
            >
              <Text style={styles.buttonText}>Verify Email</Text>
            </TouchableOpacity>
          )}
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Username</Text>
            <Text style={styles.formText}>{profile.username}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>First Name</Text>
            <TextInput
              style={styles.formInput}
              value={userData.first_name}
              onChangeText={(text) => handleInputChange("first_name", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Last Name</Text>
            <TextInput
              style={styles.formInput}
              value={userData.last_name}
              onChangeText={(text) => handleInputChange("last_name", text)}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email Address</Text>
            <Text style={styles.formText}>{profile.email}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Phone Number</Text>
            <TextInput
              style={styles.formInput}
              value={userData.phone_number}
              onChangeText={(text) => handleInputChange("phone_number", text)}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      title: "Update Avatar",
      content: (
        <View style={styles.accordionContent}>
          <Text style={styles.formLabel}>Avatar</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Handle avatar change
            }}
          >
            <Text style={styles.buttonText}>Choose Avatar</Text>
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        {loading && <Loader />}
        {profileLoading && <Loader />}

        {successMessage !== "" && (
          <Text style={styles.successMessage}>{successMessage}</Text>
        )}

        {error && <Message variant="danger">{error}</Message>}
        {profileError && <Message variant="danger">{error}</Message>}

        <Accordion sections={SECTIONS} />
      </View>
    </ScrollView>
  );
};

export default UserProfile;
