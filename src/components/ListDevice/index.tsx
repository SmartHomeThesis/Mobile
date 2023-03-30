import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {devices} from '../../types';
import CustomText from '../CustomText';
import {gray} from '../../styles/Colors';
import SwitchButton from '../SwitchButton';

const index = ({id, name, status, image, onPress}: devices) => {
  return (
    <TouchableOpacity style={styles.box} onPress={onPress}>
      <View style={styles.inner}>
        <Image
          source={image}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 140,
          }}
        />
        <CustomText style={styles.deviceName}>{name}</CustomText>
        <SwitchButton
          feed={name === 'LampGarage' ? 'smart-home.door' : 'smart-home.light'}
          style={styles.switchContainer}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '50%',
    height: '50%',
    padding: 8,
  },
  inner: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 20,
    borderColor: gray.primary,
    alignItems: 'center',
  },
  switchContainer: {
    position: 'absolute',
    top: 20,
    right: 0,
    transform: [{rotate: '-90deg'}],
  },
  deviceName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default index;
