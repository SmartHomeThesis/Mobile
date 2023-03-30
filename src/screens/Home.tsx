import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles as stylesGlobal} from '../styles/Global';
import CustomText from '../components/CustomText';
import CustomTab from '../components/CustomTab';
import {gray} from '../styles/Colors';
import {LivingRoom, BedRoom, ParkingGarage} from '../constant/device';
import ListDevice from '../components/ListDevice';
import Avatar from '../components/Avatar';

interface sennsorProps {
  name: string;
  unit: string;
  param: string;
}

const Sensor = ({name, unit, param}: sennsorProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        marginVertical: 6,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 20,
      }}>
      <CustomText style={{fontWeight: 'bold'}}>
        {name}
        <Text style={{color: gray.primary, fontWeight: '500'}}>/ {unit}</Text>
      </CustomText>
      <CustomText style={{fontSize: 24, fontWeight: '500'}}>{param}</CustomText>
    </View>
  );
};

const Home = ({navigation}: {navigation: any}) => {
  const [tab, setTab] = React.useState<number>(0);

  return (
    <ScrollView contentContainerStyle={stylesGlobal.container}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          },
        ]}>
        <CustomText style={{fontSize: 24, fontWeight: '400'}}>
          Good morning,{`\n`}
          <Text style={{fontWeight: 'bold'}}>Mira</Text>
        </CustomText>
        <Icon name="bell-badge-outline" size={20} color="black" />
      </View>
      <View
        style={{
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomText
          style={{color: gray.primary, fontSize: 18, fontWeight: '500'}}>
          Family Members
        </CustomText>
        {/* Icon */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Avatar
            url={require('../assets/images/dog_avatar.png')}
            width={30}
            height={30}
          />
          <Avatar
            url={require('../assets/images/man_avatar.png')}
            width={30}
            height={30}
          />
          <Avatar
            url={require('../assets/images/man2_avatar.png')}
            width={30}
            height={30}
          />
          <Avatar
            url={require('../assets/images/woman_avatar.png')}
            width={30}
            height={30}
          />
        </View>
      </View>
      <Sensor name="Temperature" unit="°C" param="25" />
      <Sensor name="Humidity" unit="%" param="50" />
      <CustomTab selectionMode={0} onSelectSwitch={setTab} />
      {tab === 0 && (
        <View style={styles.boxContainer}>
          {LivingRoom.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              status={item.status}
              image={item.image}
              key={index}
              onPress={() => {
                navigation.navigate('DetailDevice', {
                  id: item.id,
                  name: item.name,
                });
              }}
            />
          ))}
        </View>
      )}
      {tab === 1 && (
        <View style={styles.boxContainer}>
          {BedRoom.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              status={item.status}
              image={item.image}
              key={index}
              onPress={() => {
                navigation.navigate('DetailDevice', {
                  id: item.id,
                  name: item.name,
                });
              }}
            />
          ))}
        </View>
      )}
      {tab === 2 && (
        <View style={styles.boxContainer}>
          {ParkingGarage.map((item, index) => (
            <ListDevice
              id={item.id}
              name={item.name}
              status={item.status}
              image={item.image}
              key={index}
              onPress={() => {
                navigation.navigate('DetailDevice', {
                  id: item.id,
                  name: item.name,
                });
              }}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
  },
});

export default Home;
