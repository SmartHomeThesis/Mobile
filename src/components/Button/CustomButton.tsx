import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({
  label,
  onPress,
  styleText,
  styleButton,
}: {
  label: string;
  onPress: any;
  styleText?: object;
  styleButton: object;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styleButton}>
      <Text style={styleText}>{label}</Text>
    </TouchableOpacity>
  );
}
