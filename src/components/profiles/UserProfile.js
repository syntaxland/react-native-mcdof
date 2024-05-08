// UserProfile.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  getUserProfile,
  updateUserProfile,
  // updateUserAvatar,
} from "../../redux/actions/userProfileActions";
import { sendEmailOtp } from "../../redux/actions/emailOtpActions";
import Message from "../../Message";
import Loader from "../../Loader";
import Accordion from "react-native-collapsible/Accordion";

function UserProfile() {
  const dispatch = useDispatch();

  // Redux state selectors
  const userProfile = useSelector((state) => state.userProfile);
  const updateProfile = useSelector((state) => state.updateProfile);
  const userLogin = useSelector((state) => state.userLogin);

  // Destructure profile, loading, and error from userProfile state
  const { loading: profileLoading, error: profileError, profile } = userProfile;

  // Destructure loading, success, and error from updateProfile state
  const { loading, success, error } = updateProfile;

  // Destructure userInfo from userLogin state
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      // Redirect to login if userInfo is not available
      // Handle navigation based on your navigation method (e.g., React Navigation)
      // navigation.navigate('Login');
    } else {
      // Fetch user profile data
      dispatch(getUserProfile());
    }
  }, [dispatch, userInfo]);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
  });

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      setUserData({
        first_name: userProfile.profile.first_name,
        last_name: userProfile.profile.last_name,
        phone_number: userProfile.profile.phone_number,
        email: userProfile.profile.email,
        avatar: userProfile.profile.avatar,
      });
    }
  }, [userProfile]);
  // Handle input change
  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  // Handle update profile
  const handleUpdateProfile = () => {
    dispatch(updateUserProfile(userData));
  };



  // Handle resend email OTP
  const handleResendEmailOtp = () => {
    dispatch(sendEmailOtp(userInfo.email, userInfo.first_name));
    // Navigate to verify email OTP screen
    // navigation.navigate('VerifyEmailOTP');
  };

  // Handle verify email
  const handleVerifyEmail = () => {
    if (!userInfo.is_verified) {
      handleResendEmailOtp();
    }
  };

  // Define sections for Accordion
  const SECTIONS = [
    { title: "Bio", content: "Bio content here" },
    // Add more sections as needed
  ];

  // Render Accordion content
  const renderContent = (section) => {
    return (
      <View>
        {/* Render content for each section */}
        <Text>{section.content}</Text>
      </View>
    );
  };

  const renderHeader = (section) => {
    return (
      <View>
        <Text>{section.title}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View>
        <Text style={styles.title}>Profile</Text>
        {profileLoading && <Loader>Loading...</Loader>}
        {profileError && <Message>Error: {profileError}</Message>}
        {success && <Message>Profile updated successfully.</Message>}
        {error && <Message>Error: {error}</Message>}

        {/* <Accordion
          sections={SECTIONS}
          renderHeader={renderHeader}
          renderContent={renderContent}
        /> */}

        {/* Render form inputs */}
        <TextInput
          placeholder="First Name"
          value={userData.first_name}
          onChangeText={(text) => handleInputChange("first_name", text)}
        />
        <TextInput
          placeholder="Last Name"
          value={userData.last_name}
          onChangeText={(text) => handleInputChange("last_name", text)}
        />
        <TextInput
          placeholder="Email"
          value={userData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />

        <TextInput
          placeholder="Phone Number"
          value={userData.phone_number}
          onChangeText={(text) => handleInputChange("phone_number", text)}
        />

        <Button title="Update Profile" onPress={handleUpdateProfile} />

        {!userInfo.is_verified && (
          <Button title="Verify Email" onPress={handleVerifyEmail} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  headerCell: {
    width: 150,
    marginLeft: 20,
    borderRightWidth: 1,
    borderColor: "black",
  },
  cell: {
    width: 150,
    marginLeft: 10,
  },
  snHeaderCell: {
    width: 50,
    borderRightWidth: 1,
    borderColor: "black",
  },
  snCell: {
    width: 50,
  },
});

export default UserProfile;
