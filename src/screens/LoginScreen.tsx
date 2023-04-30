import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/Button/CustomButton";
import { blue, gray } from "../styles/Colors";
import CustomInput from "../components/Input";
import { styles } from "../styles/Authentication";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginAccount } from "../redux/reducers/loginSlice";
import { API_PUBLIC_ENDPOINT } from "react-native-dotenv";

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [isFocused, setIsFocused] = useState<string>("");
  const [email, setEmail] = useState<string>(
    "hanh.huynhth34224002@hcmut.edu.vn"
  );
  const [password, setPassword] = useState<string>("12345678");
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.login);
  const handleLogin = async () => {
    try {
      await dispatch(loginAccount({ email, password }));
      state.isAuthen && navigation.navigate("App");
    } catch (error) {
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi, Welcome Back!</Text>
      <Text style={styles.title}>
        Sign in to access back your account and the whole features!
      </Text>
      <KeyboardAvoidingView style={styles.content}>
        {/* Email */}
        <CustomInput
          subheader="Email"
          nameIcon="mail-outline"
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          type="email"
          value={email}
          onChangeValue={setEmail}
        />
        <CustomInput
          subheader="Password"
          nameIcon="lock-closed-outline"
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          type="password"
          value={password}
          onChangeValue={setPassword}
        />
        {/* Forgot password */}
        <TouchableOpacity
          style={{
            flexDirection: "row-reverse",
            marginBottom: 40,
          }}
          onPress={() => navigation.navigate("ResetPassword")}
        >
          <Text
            style={{ fontWeight: "600", fontSize: 18, color: blue.primary }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          label="Sign in"
          onPress={handleLogin}
          styleButton={styles.button}
          styleText={styles.buttonText}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
