// Settings.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faExclamationTriangle,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "../screenStyles";
import Accordion from "react-native-collapsible/Accordion";

const Settings = () => {
  const navigation = useNavigation();
  const updateProfile = useSelector((state) => state.updateProfile);
  const { loading, error } = updateProfile;

  const handleDeleteAccount = () => {
    navigation.navigate("DeleteAccount");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const SECTIONS = [
    {
      title: "Dark Mode",
      content: (
        <View style={styles.accordionContent}>
          <TouchableOpacity style={styles.accordionButton}>
            <FontAwesomeIcon icon={faSun} style={styles.icon} />
            <Text style={styles.accordionButtonText}>Light</Text>
            {/* Add toggle icon */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.accordionButton}>
            <FontAwesomeIcon icon={faMoon} style={styles.icon} />
            <Text style={styles.accordionButtonText}>Dark</Text>
            {/* Add toggle icon */}
          </TouchableOpacity>
        </View>
      ),
    },
    {
      title: "Change Password",
      content: (
        <View style={styles.accordionContent}>
          <Text style={styles.formLabel}>Password</Text>
          <Text style={styles.formPlaceholder}>****************</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      ),
    },
    {
      title: "Delete Account",
      content: (
        <View style={styles.accordionContent}>
          <Text style={styles.warning}>
            <FontAwesomeIcon icon={faExclamationTriangle} style={styles.icon} />
            Warning! This action is irreversible and all your data will be
            deleted from our database.
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={handleDeleteAccount}
          >
            <Text style={[styles.buttonText, styles.dangerButtonText]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      ),
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        <Accordion sections={SECTIONS} />
      </View>
    </ScrollView>
  );
};

export default Settings;
