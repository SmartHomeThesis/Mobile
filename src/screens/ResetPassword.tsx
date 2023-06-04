import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/Input";
import CustomButton from "../components/Button/CustomButton";
import BackIcon from "../components/BackIcon";
import { styles } from "../styles/Authentication";
import { styles as GlobalStyle } from "../styles/Global";

const ResetPassword = ({ navigation }: { navigation: any }) => {
  const [isFocused, setIsFocused] = useState<string>("");

  return (
    <View style={GlobalStyle.container}>
      <BackIcon navigation={navigation} />
      <View
        style={[ { backgroundColor: "white", marginTop: 16 , borderRadius:20,padding:20 }]}
      >
        <Text style={[styles.header, { color: "black" }]}>
          Forgot Password?
        </Text>
        <Text style={styles.title}>
          Don't worry! It occurs. Please enter the email address linked with
          your account.
        </Text>
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <CustomInput
            subheader="Email"
            nameIcon="mail-outline"
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            type="email"
          />
          <CustomButton
            label="Send code"
            onPress={() => navigation.navigate("Home")}
            styleButton={[styles.button, { width: "100%" }]}
            styleText={styles.buttonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;
