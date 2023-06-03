import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {devices} from '../../types';
import CustomText from '../CustomText';
import {gray} from '../../styles/Colors';
import SwitchButton from '../SwitchButton';

const index = ({id,name, feed_name, status, image, onPress,online}: devices) => {

  return (
    <TouchableOpacity style={[styles.box,{
    }]} onPress={onPress} disabled={!online}>
      <View style={[styles.inner,{
          opacity: online ? 1 : 0.7
      }]}>
        <Image
          source={image}
          resizeMode="cover"
          style={{
            width: '80%',
            height: 140,
          }}
        />
        <CustomText style={styles.deviceName}>{name}</CustomText>
        <SwitchButton
          feed={feed_name}
          style={styles.switchContainer}
          status={status}
          isDisable={!online}
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
    overflow: 'hidden',
    backgroundColor:"white",
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
