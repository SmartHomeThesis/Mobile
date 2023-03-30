import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {gray} from '../../styles/Colors';

const BackIcon = ({navigation}: {navigation: any}) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: gray.secondary,
        width: 40,
        borderRadius: 8,
        backgroundColor: 'white',
      }}
      onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back-outline" size={30} color="black" />
    </TouchableOpacity>
  );
};

export default BackIcon;
