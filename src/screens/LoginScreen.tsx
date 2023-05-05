import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/Button/CustomButton";
import { blue, gray } from "../styles/Colors";
import CustomInput from "../components/Input";
import { styles } from "../styles/Authentication";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginAccount } from "../redux/reducers/loginSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CustomText from "../components/CustomText";

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
      const resultLogin = await dispatch(loginAccount({ email, password }));
      const originResult = unwrapResult(resultLogin);
      if (originResult?.status === 200) {
        navigation.navigate("App");
      }
    } catch (error) {
      console.log(error);
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
        {state.status === "loading" && (
          <CustomButton
            onPress={handleLogin}
            styleButton={styles.button}
            styleText={styles.buttonText}
          >
            <ActivityIndicator size="small" color="white" />
          </CustomButton>
        )}
        {state.status !== "loading" && (
          <CustomButton
            label="Sign in"
            onPress={handleLogin}
            styleButton={styles.button}
            styleText={styles.buttonText}
          />
        )}
        <View
          style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <CustomText>Don't have an account? </CustomText>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text
              style={{ fontWeight: "600", fontSize: 18, color: blue.primary }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
