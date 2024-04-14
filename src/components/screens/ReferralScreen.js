// ReferralScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { referUser } from "../actions/referralActions";

const ReferralScreen = () => {
  const dispatch = useDispatch();
  const { referralCode, referralError } = useSelector((state) => state.referral);

  const [referralInput, setReferralInput] = useState("");

  const referUserHandler = () => {
    dispatch(referUser(referralInput));
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Refer a Friend</Text>
      {referralError && <Text>Error: {referralError}</Text>}
      {referralCode ? (
        <Text>Referral code: {referralCode}</Text>
      ) : (
        <>
          <TextInput
            placeholder="Enter friend's referral code"
            value={referralInput}
            onChangeText={setReferralInput}
            style={{ borderWidth: 1, borderColor: "gray", marginBottom: 16, padding: 8 }}
          />
          <Button title="Refer" onPress={referUserHandler} />
        </>
      )}
    </View>
  );
};

export default ReferralScreen;
