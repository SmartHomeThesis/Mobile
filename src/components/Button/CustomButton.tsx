import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({
  label,
  onPress,
  styleText,
  styleButton,
    children,
}: {
  label?: string;
  onPress: any;
  styleText?: object;
  styleButton: object;
  children?: any;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      {children || <Text style={styleText}>{label}</Text>}
    </TouchableOpacity>
  );
}
