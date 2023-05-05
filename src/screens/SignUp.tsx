import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/Input";
import CustomButton from "../components/Button/CustomButton";
import BackIcon from "../components/BackIcon";
import { styles } from "../styles/Authentication";
import { styles as GlobalStyle } from "../styles/Global";

const SignUp = ({ navigation }: { navigation: any }) => {
  const [isFocused, setIsFocused] = useState<string>("");
  const [email, setEmail] = useState<string>("kingnamland@gmail.com");
  const [password, setPassword] = useState<string>("1234567");
  const [username, setUsername] = useState<string>("NAMLB");
  const [phone, setPhone] = useState<string>("0123321123");

  return (
    <ScrollView style={GlobalStyle.container}>
      <BackIcon navigation={navigation} />
      <View
        style={[
          {
            backgroundColor: "white",
            marginTop: 16,
            borderRadius: 20,
            padding: 20,
          },
        ]}
      >
        <Text style={[styles.header, { color: "black" }]}>
          Create new account ?
        </Text>
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <CustomInput
            subheader="Username"
            nameIcon="person-outline"
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            type="username"
            placeholder="Enter your username"
            onChangeValue={setUsername}
            value={username}
          />
          <CustomInput
            subheader="Email"
            nameIcon="mail-outline"
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            type="email"
            placeholder={"Enter your email"}
            onChangeValue={setEmail}
            value={email}
          />
          <CustomInput
            subheader="Phone"
            nameIcon="phone-portrait-outline"
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            type="phone"
            placeholder={"Enter your phone number"}
            onChangeValue={setPhone}
            value={phone}
          />

          <CustomInput
            subheader="Password"
            nameIcon="lock-closed-outline"
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            type="password"
            placeholder={"Enter your password"}
            onChangeValue={setPassword}
            value={password}
          />
          <CustomButton
            label="Continue"
            onPress={() => navigation.navigate("OTP",{
                username,
                email,
                phone,
                password
            })}
            styleButton={[styles.button, { width: "100%" }]}
            styleText={styles.buttonText}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
