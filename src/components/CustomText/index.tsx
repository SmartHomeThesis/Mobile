import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const CustomText = (props: any) => {
  return (
    <Text style={[styles.defaultStyle, props.style]}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    fontSize: 16,
    color: 'black',
  },
});

export default CustomText;
