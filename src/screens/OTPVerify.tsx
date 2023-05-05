import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import BackIcon from "../components/BackIcon";
import { styles as authenStyle } from "../styles/Authentication";
import { styles as GlobalStyle } from "../styles/Global";
import CustomButton from "../components/Button";
import { gray } from "../styles/Colors";
import {registerAccount} from "../redux/reducers/addMemberSlice";
import {useAppDispatch} from "../hooks";
interface otpProps {
  navigation: any;
  route: any;
}
const OtpVerify = ({ navigation, route }: otpProps) => {
  const [opt1, setOpt1] = useState<string>("1");
  const [opt2, setOpt2] = useState<string>("3");
  const [opt3, setOpt3] = useState<string>("4");
  const [opt4, setOpt4] = useState<string>("5");
  const [opt5, setOpt5] = useState<string>("6");
  const [opt6, setOpt6] = useState<string>("7");
  const { username, email, phone, password } = route.params;
  const dispatch = useAppDispatch()
  const handleRegister = async () => {
    const otp = opt1 + opt2 + opt3 + opt4 + opt5 + opt6;
    try{
    await  dispatch(registerAccount({username, email, phone, password, otp}))
      navigation.navigate("Login")
    }
    catch (err){
      console.log(err)
    }
  };
  return (
    <View style={GlobalStyle.container}>
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
        <Text style={[{ color: "black", textAlign: "center", fontSize: 20 }]}>
          Verification
        </Text>
        <Text
          style={[{ textAlign: "center", color: gray.primary, fontSize: 16 }]}
        >{`Code has sent to 
         ${email}`}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <TextInput
            style={styles.inputOTP}
            keyboardType="numeric"
            maxLength={1}
            value={opt1}
            onChangeText={(text) => setOpt1(text)}
          />
          <TextInput
            style={styles.inputOTP}
            keyboardType="numeric"
            maxLength={1}
            value={opt2}
            onChangeText={(text) => setOpt2(text)}
          />
          <TextInput
            style={styles.inputOTP}
            keyboardType="numeric"
            maxLength={1}
            value={opt3}
            onChangeText={(text) => setOpt3(text)}
          />
          <TextInput
            style={styles.inputOTP}
            keyboardType="numeric"
            maxLength={1}
            value={opt4}
            onChangeText={(text) => setOpt4(text)}
          />
          <TextInput
            style={styles.inputOTP}
            keyboardType="numeric"
            maxLength={1}
            value={opt5}
            onChangeText={(text) => setOpt5(text)}
          />
          <TextInput
            style={styles.inputOTP}
            keyboardType="numeric"
            maxLength={1}
            value={opt6}
            onChangeText={(text) => setOpt6(text)}
          />
        </View>
        <CustomButton
          label={"Register"}
          onPress={handleRegister}
          styleButton={[authenStyle.button, { width: "100%" }]}
          styleText={authenStyle.buttonText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputOTP: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: gray.primary,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default OtpVerify;
