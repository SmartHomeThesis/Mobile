import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ResetPassword from "../screens/ResetPassword";
import BottomTab from "./BottomTabNavigator";
import IntroScreen from "../screens/IntroScreen";
import SignUp from "../screens/SignUp";
import OTPVerify from "../screens/OTPVerify";
import {useAppSelector} from "../hooks";
const Stack = createNativeStackNavigator();
const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={IntroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="OTP" component={OTPVerify} />
      <Stack.Screen name="App" component={BottomTab} />
    </Stack.Navigator>
  );
};

export default AuthStack;
