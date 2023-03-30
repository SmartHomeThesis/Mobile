import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/Input';
import CustomButton from '../components/Button/CustomButton';
import BackIcon from '../components/BackIcon';
import {styles} from '../styles/Authentication';

const ResetPassword = ({navigation}: {navigation: any}) => {
  const [isFocused, setIsFocused] = useState<string>('');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BackIcon navigation={navigation} />
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        <Text style={[styles.header, {color: 'black'}]}>Forgot Password?</Text>
        <Text style={styles.title}>
          Don't worry! It occurs. Please enter the email address linked with
          your account.
        </Text>
        <View style={{width: '100%', paddingHorizontal: 20}}>
          <CustomInput
            subheader="Email"
            nameIcon="mail-outline"
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            type="email"
          />
          <CustomButton
            label="Send code"
            onPress={() => navigation.navigate('Home')}
            styleButton={[styles.button, {width: '100%'}]}
            styleText={styles.buttonText}
          />
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;
