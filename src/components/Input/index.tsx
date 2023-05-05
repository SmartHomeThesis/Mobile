import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {gray} from '../../styles/Colors';

interface input {
  subheader: string;
  isFocused: string;
  nameIcon: string;
  setIsFocused(type: string): void;
  type: string;
  value?: string;
  onChangeValue?: (text: string) => void;
  placeholder?: string;
}

const CustomInput = (props: input) => {
  return (
    <View>
      <Text style={styles.subheader}>{props.subheader}</Text>
      <View
        style={[
          styles.input,
          props.isFocused === props.type && {
            borderColor: '#b2cdfb',
            borderWidth: 2,
          },
        ]}>
        <Ionicons
          style={{marginRight: 8}}
          name={props.nameIcon}
          size={20}
          color="black"
        />
        <TextInput
          onFocus={() => props.setIsFocused(props.type)}
          onBlur={() => props.setIsFocused('')}
          style={{flex: 1}}
          placeholder={
          props.placeholder
          }
          onChangeText={props.onChangeValue}
          value={props.value}
          secureTextEntry={props.type === 'password' ? true : false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subheader: {
    fontWeight: '500',
    fontSize: 18,
    color: 'black',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: gray.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#f7f8f9',
  },
});
export default CustomInput;
