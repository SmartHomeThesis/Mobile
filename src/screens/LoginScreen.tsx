import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/Button/CustomButton';
import {blue, gray} from '../styles/Colors';
import CustomInput from '../components/Input';
import {styles} from '../styles/Authentication';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [isFocused, setIsFocused] = useState<string>('');

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
        />
        <CustomInput
          subheader="Password"
          nameIcon="lock-closed-outline"
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          type="password"
        />
        {/* Forgot password */}
        <TouchableOpacity
          style={{
            flexDirection: 'row-reverse',
            marginBottom: 40,
          }}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text style={{fontWeight: '600', fontSize: 18, color: blue.primary}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <CustomButton
          label="Sign in"
          onPress={() => navigation.navigate('App')}
          styleButton={styles.button}
          styleText={styles.buttonText}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
