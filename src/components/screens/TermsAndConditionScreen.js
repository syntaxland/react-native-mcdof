// TermsAndConditionScreen.js
import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const TermsAndConditionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>

      <Text style={styles.sectionTitle}>Section 1: Introduction</Text>
      <Text style={styles.paragraph}>
        Welcome to our eCommerce platform! These terms and conditions outline
        the rules and regulations for the use of our services.
      </Text>

      <Text style={styles.sectionTitle}>Section 2: eCommerce Platform</Text>
      <Text style={styles.paragraph}>
        - Users can browse and purchase products/services through our platform.
      </Text>
      <Text style={styles.paragraph}>
        - Payments, shipping, and returns are subject to our eCommerce terms
        and conditions.
      </Text>

      <Text style={styles.sectionTitle}>Section 3: User Responsibilities</Text>
      <Text style={styles.paragraph}>
        - Users are responsible for maintaining the security of their accounts
        and passwords.
      </Text>
      <Text style={styles.paragraph}>
        - Users must comply with both general and specific terms and conditions
        related to their activities on our platform.
      </Text>

      <Text style={styles.sectionTitle}>Section 4: Changes to Terms</Text>
      <Text style={styles.paragraph}>
        We reserve the right to revise these terms and conditions at any time.
        By using our platform, you agree to be bound by the current version of
        these terms and conditions.
      </Text>

      <Text style={styles.sectionTitle}>Section 5: Contact Information</Text>
      <Text style={styles.paragraph}>
        If you have any questions about these terms and conditions, please
        contact us at support@mcdofshop.com.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default TermsAndConditionScreen;
