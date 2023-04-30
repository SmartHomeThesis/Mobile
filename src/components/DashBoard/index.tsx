import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {devices} from '../../types';
import {gray, orange} from '../../styles/Colors';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../CustomText';

interface DashBoardProps {
  name: string;
  numdevice: number;
  imageRoom: any;
  listDevice: Array<devices>;
  temperature: number;
}

const index = ({
  name,
  numdevice,
  imageRoom,
  listDevice,
  temperature,
}: DashBoardProps) => {
  const [device, setDevice] = useState([
    {
      id: listDevice[0].id,
      status: listDevice[0].status,
    },
    {
      id: listDevice[1].id,
      status: listDevice[1].status,
    },
    {
      id: listDevice[2].id,
      status: listDevice[1].status,
    },
    {
      id: listDevice[3].id,
      status: listDevice[1].status,
    },
  ]);

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
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 10,
              alignItems: 'center',
            }}>
            <IconMaterial
              name="waves"
              size={20}
              color="black"
              style={{
                backgroundColor:
                  temperature < 24 ? gray.secondary : orange.primary,
                borderRadius: 10,
                padding: 5,
                marginRight: 10,
              }}
            />
            <CustomText
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {temperature}
              {'°'}
            </CustomText>
          </View>
          {listDevice.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor:
                    device[index].status === true ? 'white' : gray.tertiary,
                  borderRadius: 20,
                  marginLeft: 10,
                }}
                onPress={() => {
                  setDevice(
                    device.map(item => {
                      if (item.id === listDevice[index].id) {
                        return {
                          ...item,
                          status: !item.status,
                        };
                      }
                      return item;
                    }),
                  );
                }}>
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default index;
