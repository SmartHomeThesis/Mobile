import {View, Text} from 'react-native';
import React from 'react';
import {LivingRoom, BedRoom, ParkingGarage} from '../constant/device';
import DashBoard from '../components/DashBoard';

const Room = () => {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}>
      <DashBoard
        name="Living room"
        numdevice={4}
        imageRoom={require('../assets/images/livingroom.jpg')}
        temperature={25}
        listDevice={LivingRoom}
      />
      <DashBoard
        name="Bed room"
        numdevice={4}
        imageRoom={require('../assets/images/bedroom.jpg')}
        temperature={23}
        listDevice={BedRoom}
      />
      <DashBoard
        name="Garage"
        numdevice={4}
        imageRoom={require('../assets/images/garage.jpg')}
        temperature={25}
        listDevice={ParkingGarage}
      />
    </View>
  );
};

export default Room;
