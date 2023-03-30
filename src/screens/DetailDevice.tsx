import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import BackIcon from '../components/BackIcon';
import {styles as styleGlobal} from '../styles/Global';
import SwitchButton from '../components/SwitchButton';
import CustomButton from '../components/Button/CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const DetailDevice = ({navigation, route}: {navigation: any; route: any}) => {
  return (
    <View style={styleGlobal.container}>
      <BackIcon navigation={navigation} />
      <View style={[styles.container]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
            {route.params?.name}
          </Text>
          <SwitchButton />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            maxWidth: '50%',
            paddingVertical: 16,
          }}>
          <Text>IF</Text>
          <AntDesign name="arrowright" size={20} color="#000" />
          <Text>DO</Text>
          <Text>Activate</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              <MaterialIcons
                name="location-on"
                size={24}
                color="#000"
                style={{
                  marginTop: 10,
                }}
              />
              <View style={{marginLeft: 8}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
                  Location
                </Text>
                <Text>Living room</Text>
              </View>
              <View>{/* Image */}</View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <MaterialCommunityIcons
                name="clock"
                size={24}
                color="#000"
                style={{
                  marginTop: 10,
                }}
              />
              <View style={{marginLeft: 8}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
                  Time
                </Text>
                <Text>Around</Text>
                <Text>15:00 - 17:00 </Text>
              </View>
              <View>{/* Image */}</View>
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              backgroundColor: 'black',
              borderRadius: 20,
            }}>
            <Image
              source={require('../assets/images/lamp.png')}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 120,
              }}
            />
          </View>
        </View>
      </View>
      <View style={[styles.container, {marginTop: 20}]}>
        <Text style={styles.schedule_header}>Today's usage</Text>
        <View style={styles.schedule_time}>
          <Text>2 Hourses - </Text>
          <Text>1.5 KwH</Text>
        </View>
        <CustomButton
          label="Set schedule"
          onPress={() => {
            navigation.navigate('Schedule');
          }}
          styleText={styles.schedule_button_label}
          styleButton={styles.schedule_button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 14,
    width: '100%',
  },
  schedule_header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  schedule_time: {
    flexDirection: 'row',
    padding: 10,
  },
  schedule_button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 20,
  },
  schedule_button_label: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DetailDevice;
