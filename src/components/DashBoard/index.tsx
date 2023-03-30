import {View, Text, Image, ImageBackground} from 'react-native';
import React from 'react';
import {devices} from '../../types';
import {gray} from '../../styles/Colors';

interface DashBoardProps {
  name: string;
  numdevice: number;
  imageRoom: any;
  listDevice: Array<devices>;
}

const index = ({name, numdevice, imageRoom, listDevice}: DashBoardProps) => {
  return (
    <View
      style={{
        borderRadius: 25,
        overflow: 'hidden',
        flex: 1 / 3,
        position: 'relative',
        marginVertical: 16,
      }}>
      <ImageBackground
        source={imageRoom}
        resizeMode="cover"
        style={{
          flex: 1 / 3,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      <View
        style={{
          paddingTop: 20,
          paddingLeft: 20,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
          <Text
            style={{
              color: gray.primary,
            }}>
            {numdevice} / {numdevice} is on
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 15,
          }}>
          {listDevice.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 20,
                  marginLeft: 10,
                }}>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default index;
