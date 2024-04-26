import React from "react";
import { View, Text, TouchableOpacity, Linking  } from "react-native";

const currentYear = new Date().getFullYear();

function Footer() {
  const softGlobalLink = () => {
    Linking.openURL("http://softglobal.org");
  };

  return (
    <View style={{ backgroundColor: "#6c757d", paddingVertical: 10 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#fff" }}>
          &copy; Mcdofshop, {currentYear}. All rights reserved.
        </Text>
        <TouchableOpacity onPress={softGlobalLink}>
          <Text style={{ color: "#fff", fontSize: 12,  fontStyle: 'italic' }}>
            Powered by SoftGlobal
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Footer;
