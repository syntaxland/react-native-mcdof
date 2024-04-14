// Referrals.js
import React, { useEffect, useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { generateReferralLink, getUserReferrals } from "../../actions/promoActions";
import Loader from "../Loader";
import Message from "../Message";

const Referrals = () => {
  const dispatch = useDispatch();

  const referralState = useSelector((state) => state.referral);
  const { referralLink, referralCode, referralError, loading } = referralState;

  const userReferralState = useSelector((state) => state.userReferralState);
  const {
    loading: userReferralsLoading,
    userReferrals,
    error: userReferralsError,
  } = userReferralState;

  const [isReferralLinkCopied, setIsReferralLinkCopied] = useState(false);
  const [isReferralCodeCopied, setIsReferralCodeCopied] = useState(false);

  useEffect(() => {
    dispatch(generateReferralLink());
    dispatch(getUserReferrals());
  }, [dispatch]);

  const copyToClipboard = (textToCopy) => {
    // Implement copying to clipboard in React Native
    setIsReferralLinkCopied(true);
    setTimeout(() => setIsReferralLinkCopied(false), 2000);
  };

  const shareReferralLink = () => {
    // Implement sharing in React Native
    console.log("Referral link shared");
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Referrals</Text>
        {userReferralsLoading ? (
          <Loader />
        ) : userReferralsError ? (
          <Message variant="danger">{userReferralsError}</Message>
        ) : (
          <Text style={styles.userReferrals}>
            <Text style={styles.usersCount}>{userReferrals.length > 0 ? userReferrals[0].referred_users.length : 0}</Text>
            {" Referred Users"}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Referral Link</Text>
        {loading ? (
          <Loader />
        ) : referralError ? (
          <Message variant="danger">{referralError}</Message>
        ) : (
          <View>
            <Text style={styles.referralText}>
              Your Referral Code: {referralCode}
            </Text>
            <TouchableOpacity onPress={() => copyToClipboard(referralCode)}>
              <Text style={styles.copyButton}>{isReferralCodeCopied ? "Copied" : "Copy"}</Text>
            </TouchableOpacity>

            <Text style={styles.referralText}>
              Your Referral Link: {referralLink}
            </Text>
            <TouchableOpacity onPress={() => copyToClipboard(referralLink)}>
              <Text style={styles.copyButton}>{isReferralLinkCopied ? "Copied" : "Copy"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={shareReferralLink}>
              <Text style={styles.shareButton}>Share</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userReferrals: {
    fontSize: 16,
  },
  usersCount: {
    fontWeight: "bold",
  },
  referralText: {
    fontSize: 16,
  },
  copyButton: {
    color: "blue",
    marginBottom: 5,
  },
  shareButton: {
    color: "blue",
    marginBottom: 5,
  },
});

export default Referrals;
