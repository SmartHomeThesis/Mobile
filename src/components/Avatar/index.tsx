import {View, Text, Image} from 'react-native';
import React from 'react';

interface AvatarProps {
  url: any;
  width?: number;
  height?: number;
}

const index = ({url, width = 100, height = 100}: AvatarProps) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        borderRadius: width / 2,
        overflow: 'hidden',
      }}>
      <Image
        source={url}
        resizeMode="contain"
        style={{
          width: width,
          height: height,
        }}
      />
    </View>
  );
};

export default index;
